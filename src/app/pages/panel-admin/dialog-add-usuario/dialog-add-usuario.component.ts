import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-dialog-add-usuario',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './dialog-add-usuario.component.html'
})
export class DialogAddUsuarioComponent {

  readonly dialogRef = inject(MatDialogRef<DialogAddUsuarioComponent>);

  formulario = new FormGroup({
    nombre: new FormControl(""),
    user: new FormControl(""),
    instance: new FormControl(""),
    token: new FormControl(""),
  });

  usuarioService = inject(UsersService);

  add() {
    if (this.formulario.invalid) {
      return;
    }
    this.usuarioService
      .add(this.formulario.value)
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
