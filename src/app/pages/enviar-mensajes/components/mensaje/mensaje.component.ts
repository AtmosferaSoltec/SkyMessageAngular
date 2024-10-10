import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EnviarMensajeService } from '../../enviar-mensaje.service';
import { ButtonComponent } from '../../../../components/button/button.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonComponent, MatButtonModule],
  templateUrl: './mensaje.component.html',
})
export class MensajeComponent {
  service = inject(EnviarMensajeService);

  onImgSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Crea una URL para mostrar la imagen seleccionada
      this.service.imagenUrl.set(URL.createObjectURL(file));
    }
  }

  clearImage(): void {
    this.service.imagenUrl.set(null);
    (document.querySelector('input[type="file"]') as HTMLInputElement).value =
      '';
  }

  setMensaje(event: any) {
    this.service.mensaje.set(event?.target?.value || '');
  }

}
