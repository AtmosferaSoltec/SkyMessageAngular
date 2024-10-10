import { inject, Injectable, signal } from '@angular/core';
import Plantilla from '../../interfaces/plantilla';
import { EnvioService } from '../../services/envio.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class EnviarMensajeService {
  plantilla = signal<Plantilla | null>(null);
  mensaje = signal('');
  imagenUrl = signal<string | null>(null);

  archivo = signal<File | null>(null);

  listContactos = signal<any[]>([]);

  envioService = inject(EnvioService);

  send() {
    //Validar si el mensaje esta vacio
    if (this.mensaje().trim() === '') {
      Swal.fire('Mensaje vacío', 'Por favor ingrese un mensaje', 'warning');
      return;
    }

    // Validar si hay contactos
    if (this.listContactos().length === 0) {
      Swal.fire(
        'Sin contactos',
        'Por favor suba un archivo con los contactos',
        'warning'
      );
      return;
    }

    const req = {
      mensaje: this.mensaje(),
      tipoEnvio: 1,
      destinatarios: this.listContactos().map((contacto) => {
        return {
          nombre: contacto.nombre,
          telf: String(contacto.celular),
        };
      }),
    };

    this.envioService.send(req).subscribe({
      next: (data: any) => {
        Swal.fire('Mensaje enviado', 'El mensaje ha sido enviado', 'success');
        this.plantilla.set(null);
        this.mensaje.set('');
        this.imagenUrl.set(null);
        this.listContactos.set([]);
        this.archivo.set(null);
      },
      error: (error: any) => {
        Swal.fire(
          'Error',
          'Ha ocurrido un error al enviar el mensaje',
          'error'
        );
      },
    });
  }
}
