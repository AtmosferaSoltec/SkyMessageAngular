import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EnviarMensajeService } from "../../enviar-mensaje.service";

@Component({
    selector: "app-subir-archivo",
    imports: [MatIconModule, MatButtonModule, MatTooltipModule],
    templateUrl: "./subir-archivo.component.html"
})
export class SubirArchivoComponent {

  service = inject(EnviarMensajeService);
  listMedia = [
    {
      tipoEnvio: 2,
      icon: "add_photo_alternate",
      tip: "Agregar Imagen",
      accept: ".png, .jpg, .jpeg",
    },
    {
      tipoEnvio: 3,
      icon: "picture_as_pdf",
      tip: "Agregar Documento",
      accept: ".pdf",
    },
    {
      tipoEnvio: 4,
      icon: "movie",
      tip: "Agregar Video",
      accept: ".mp4",
    },
  ];
  

  onArchivoSelected(event: any, tipo: number) {
    this.service.archivo.set(null);
    const file: File = event.target.files[0];
    if (file) {
      this.service.tipoEnvio.set(tipo);
      this.service.archivo.set(file);
    }
  }
}
