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

  tipoEnvio = signal<number>(1);
  archivo = signal<File | null>(null);
  excel = signal<File | null>(null);

  listContactos = signal<any[]>([]);

  envioService = inject(EnvioService);
  fireStorageService = inject(FireStorageService);

  async send() {
    let urlArchivoFirebase = "";
    if (this.archivo()) {
      try {
        urlArchivoFirebase = await this.fireStorageService.uploadImage(
          this.archivo()!,
          this.tipoEnvio()
        );
      } catch (error) {
        Swal.fire("Error", "Ha ocurrido un error al subir el archivo", "error");
        return;
      }
    }

    console.log(urlArchivoFirebase);
    

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
      tipoEnvio: this.tipoEnvio(),
      urlArchivo: urlArchivoFirebase,
      destinatarios: this.listContactos().map((contacto) => {
        return {
          nombre: contacto.nombre,
          telf: String(contacto.celular),
        };
      }),
    };

    console.log(req);
    
    this.envioService.send(req).subscribe({
      next: (data: any) => {
        Swal.fire("Mensaje enviado", "El mensaje ha sido enviado", "success");
        this.plantilla.set(null);
        this.mensaje.set("");
        this.archivo.set(null);
        this.tipoEnvio.set(1);
        this.listContactos.set([]);
        this.excel.set(null);
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
