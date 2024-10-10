import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PrefsService } from '../../services/prefs.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  authService = inject(AuthService);
  isLoading = signal(false);
  error?: any;

  formulario = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  router = inject(Router);

  prefsService = inject(PrefsService);

  async login() {
    try {
      if (this.formulario.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes llenar todos los campos',
        });
        return;
      }
      const { user, password } = this.formulario.value;
      this.isLoading.set(true);
      const res: any = await this.authService.login(user!, password!);
      this.prefsService.saveToken(res.access_token)
      this.router.navigate(['menu', 'enviar-mensajes']);
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading.set(false);
    }
  }
}
