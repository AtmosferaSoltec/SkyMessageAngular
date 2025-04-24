import { Component, inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Usuario from '../../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-dialog-edit-usuario',
    imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
    templateUrl: './dialog-edit-usuario.component.html',
    standalone: true,
})
export class DialogEditUsuarioComponent {
  readonly dialogRef = inject(MatDialogRef<DialogEditUsuarioComponent>);
  readonly usuario = inject<Usuario>(MAT_DIALOG_DATA);

  formulario = new FormGroup({
    nombre: new FormControl(this.usuario.nombre),
    user: new FormControl(this.usuario.user),
    instance: new FormControl(this.usuario.instance),
    token: new FormControl(this.usuario.token),
  });

  usuarioService = inject(UsersService);

  editar() {
    if (this.formulario.invalid) {
      return;
    }
    this.usuarioService
      .update(this.usuario.id, this.formulario.value)
      .subscribe({
        next: (data: any) => {
          this.dialogRef.close(data);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  dismiss(): void {
    this.dialogRef.close();
  }
}
