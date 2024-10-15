import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EnviarMensajeService } from '../../enviar-mensaje.service';
import { ButtonComponent } from '../../../../components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonComponent, MatButtonModule, MatTooltipModule],
  templateUrl: './mensaje.component.html',
})
export class MensajeComponent {
  service = inject(EnviarMensajeService);

  onArchivoSelected(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Obtener la URL temporal del archivo
      this.service.fileUrl.set(URL.createObjectURL(file));

      // Guardar el archivo
      this.service.file.set(file);

      // Verificar el tipo de archivo
      if (file.type.startsWith('image/')) {
        this.service.fileType.set(1); // Es una imagen
      } else if (file.type === 'application/pdf') {
        this.service.fileType.set(2); // Es un PDF
      }
    }
  }

  clearImage(): void {
    this.service.file.set(null);
    this.service.fileUrl.set(null);
    this.service.fileType.set(null);
    (document.querySelector('input[type="file"]') as HTMLInputElement).value =
      '';
  }

  setMensaje(event: any) {
    this.service.mensaje.set(event?.target?.value || '');
  }

}
