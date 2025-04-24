import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import Usuario from '../../interfaces/usuario';
import { EstadoPipe } from '../../pipes/estado.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUsuarioComponent } from './dialog-edit-usuario/dialog-edit-usuario.component';
import { ButtonComponent } from "../../components/button/button.component";
import { DialogAddUsuarioComponent } from './dialog-add-usuario/dialog-add-usuario.component';

@Component({
    selector: 'app-panel-admin',
    imports: [
        CommonModule,
        EstadoPipe,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        ButtonComponent
    ],
    templateUrl: './panel-admin.component.html',
    standalone: true,
})
export class PanelAdminComponent implements OnInit {
  listUsuarios = signal<Usuario[]>([]);

  usuarioService = inject(UsersService);

  ngOnInit(): void {
    this.listarUsuarios();
  }

  getUsers(): Usuario[] {
    const filterUser = this.listUsuarios().filter((u)=> (u.tipoUsuario === 'User'));
    return filterUser;
  }

  listarUsuarios() {
    this.usuarioService.getUsers().subscribe({
      next: (data: any) => {
        this.listUsuarios.set(data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  readonly dialog = inject(MatDialog);

  agregar() {
    const dialogRef = this.dialog.open(DialogAddUsuarioComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.listarUsuarios();
      }
    });
  }

  editar(usuario: Usuario) {
    const dialogRef = this.dialog.open(DialogEditUsuarioComponent, {
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.listarUsuarios();
      }
    });
  }

  eliminar(usuario: Usuario) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Se eliminara el usuario ${usuario.nombre}`,
      icon: 'warning',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.id).subscribe({
          next: (data: any) => {
            Swal.fire(
              'Eliminado',
              'Usuario eliminado correctamente',
              'success'
            );
            this.listarUsuarios();
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    });
  }

  restore(usuario: Usuario) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Se restaurara el usuario ${usuario.nombre}`,
      icon: 'warning',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.restore(usuario.id).subscribe({
          next: (data: any) => {
            Swal.fire(
              'Restaurado',
              'Usuario restaurado correctamente',
              'success'
            );
            this.listarUsuarios();
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    });
  }
}
