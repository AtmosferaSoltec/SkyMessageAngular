import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EnviarMensajeService } from '../../enviar-mensaje.service';
import { ButtonComponent } from '../../../../components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubirArchivoComponent } from "../subir-archivo/subir-archivo.component";
import { ArchivoAdjuntoComponent } from "../archivo-adjunto/archivo-adjunto.component";

@Component({
    selector: 'app-mensaje',
    imports: [CommonModule, MatIconModule, ButtonComponent, MatButtonModule, MatTooltipModule, SubirArchivoComponent, ArchivoAdjuntoComponent],
    templateUrl: './mensaje.component.html'
})
export class MensajeComponent {
  service = inject(EnviarMensajeService);

  setMensaje(event: any) {
    this.service.mensaje.set(event?.target?.value || '');
  }

}
