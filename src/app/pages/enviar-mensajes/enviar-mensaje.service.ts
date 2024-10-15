import { inject, Injectable, signal } from "@angular/core";
import Plantilla from "../../interfaces/plantilla";
import { EnvioService } from "../../services/envio.service";
import Swal from "sweetalert2";
import { FireStorageService } from "../../services/fire-storage.service";

@Injectable({
  providedIn: "root",
})
export class EnviarMensajeService {
  plantilla = signal<Plantilla | null>(null);
  mensaje = signal("");

  // Imagen
  file = signal<File | null>(null);
  fileUrl = signal<string | null>(null);
  fileType = signal<number | null>(null);

  archivo = signal<File | null>(null);

  listContactos = signal<any[]>([]);

  envioService = inject(EnvioService);
  fireStorageService = inject(FireStorageService);

  async send() {
    let tipoEnvio = 1;
    let urlArchivoFirebase = "";
    if (this.file()) {
      try {
        urlArchivoFirebase = await this.fireStorageService.uploadImage(
          this.file()!
        );
        tipoEnvio = 2;
      } catch (error) {
        Swal.fire("Error", "Ha ocurrido un error al subir el archivo", "error");
        return;
      }
    }

    //Validar si el mensaje esta vacio
    if (this.mensaje().trim() === "") {
      Swal.fire("Mensaje vacío", "Por favor ingrese un mensaje", "warning");
      return;
    }

    // Validar si hay contactos
    if (this.listContactos().length === 0) {
      Swal.fire(
        "Sin contactos",
        "Por favor suba un archivo con los contactos",
        "warning"
      );
      return;
    }

    const req = {
      mensaje: this.mensaje(),
      tipoEnvio: tipoEnvio,
      urlArchivo: urlArchivoFirebase,
      destinatarios: this.listContactos().map((contacto) => {
        return {
          nombre: contacto.nombre,
          telf: String(contacto.celular),
        };
      }),
    };

    this.envioService.send(req).subscribe({
      next: (data: any) => {
        Swal.fire("Mensaje enviado", "El mensaje ha sido enviado", "success");
        this.plantilla.set(null);
        this.mensaje.set("");
        this.file.set(null);
        this.fileUrl.set(null);
        this.fileType.set(null);
        this.listContactos.set([]);
        this.archivo.set(null);
      },
      error: (error: any) => {
        Swal.fire(
          "Error",
          "Ha ocurrido un error al enviar el mensaje",
          "error"
        );
      },
    });
  }
}
