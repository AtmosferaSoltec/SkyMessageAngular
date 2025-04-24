import { Component, inject } from "@angular/core";
import { EnviarMensajeService } from "../../enviar-mensaje.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-archivo-adjunto",
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: "./archivo-adjunto.component.html",
  standalone: true,
})
export class ArchivoAdjuntoComponent {
  service = inject(EnviarMensajeService);

  getFileSize(bytes: number | undefined): string {
    if (bytes === undefined) return "0";
    const kbSize = bytes / 1024;
    const mbSize = bytes / 1048576;
    if (mbSize >= 1) {
      return mbSize.toFixed(2) + " MB";
    } else {
      return kbSize.toFixed(2) + " KB";
    }
  }

  getTipoArchivoColor() {
    switch (this.service.tipoEnvio()) {
      case 2:
        return "text-yellow-500";
      case 3:
        return "text-red-500";
      case 4:
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  }

  getTipoArchivoIcon() {
    switch (this.service.tipoEnvio()) {
      case 2:
        return "add_photo_alternate";
      case 3:
        return "picture_as_pdf";
      case 4:
        return "movie";
      default:
        return "insert_drive_file";
    }
  }

  eliminarArchivo() {
    this.service.tipoEnvio.set(1);
    this.service.archivo.set(null);
  }
}
