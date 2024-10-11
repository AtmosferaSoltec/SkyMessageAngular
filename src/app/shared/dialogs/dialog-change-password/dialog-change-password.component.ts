import { Component, inject, signal } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ButtonComponent } from "../../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-dialog-change-password",
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, MatIconModule],
  templateUrl: "./dialog-change-password.component.html",
})
export class DialogChangePasswordComponent {
  readonly dialogRef = inject(MatDialogRef<DialogChangePasswordComponent>);

  formulario = new FormGroup({
    oldPass: new FormControl("", [Validators.required]),
    newPass: new FormControl("", [Validators.required]),
    confirmPass: new FormControl("", [Validators.required]),
  });

  authService = inject(AuthService);

  oldPassError = signal<string | null>(null);
  newPassError = signal<string | null>(null);
  confirmPassError = signal<string | null>(null);

  isLoading = signal(false);
  error?: any;

  async save() {
    const { oldPass, newPass, confirmPass } = this.formulario.value;
    if (!oldPass) {
      this.oldPassError.set("Debe ingresar la contraseña actual");
      return;
    }

    if (!newPass) {
      this.newPassError.set("Debe ingresar la nueva contraseña");
      return;
    }

    if (!confirmPass) {
      this.confirmPassError.set("Debe confirmar la nueva contraseña");
      return;
    }

    if (newPass !== confirmPass) {
      this.confirmPassError.set("Las contraseñas no coinciden");
      return;
    }

    try {
      this.isLoading.set(true);
      const res: any = await this.authService.changePassword(oldPass, newPass);
      this.dialogRef.close(res);
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading.set(false);
    }
  }

  dismiss() {
    this.dialogRef.close();
  }
}
