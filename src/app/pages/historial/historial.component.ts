import { Component, inject, OnInit, signal } from "@angular/core";
import { EnvioService } from "../../services/envio.service";
import { CommonModule } from "@angular/common";
import Historial from "../../interfaces/historial";
import { NumEnvioPipe } from "../../pipes/num-envio.pipe";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialog } from "@angular/material/dialog";
import { DialogVerMensajeComponent } from "./components/dialog-ver-mensaje/dialog-ver-mensaje.component";

@Component({
    selector: "app-historial",
    imports: [
        CommonModule,
        NumEnvioPipe,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    templateUrl: "./historial.component.html",
    standalone: true,
})
export class HistorialComponent implements OnInit {
  envioService = inject(EnvioService);
  listHistorial = signal<Historial[]>([]);

  ngOnInit(): void {
    this.envioService.getAllHistorial().subscribe({
      next: (data: any) => {
        this.listHistorial.set(data);
      },
    });
  }

  readonly dialog = inject(MatDialog);

  verMensaje(historial: Historial) {
    const dialogRef = this.dialog.open(DialogVerMensajeComponent, {
      data: historial,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        //this.getAllPlantillas();
      }
    });
  }

  detenerEnvio(historial: Historial) {
    if (!historial.id) {
      return;
    }
    console.log(historial.id);
    this.envioService.stopEnvio(historial.id).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
