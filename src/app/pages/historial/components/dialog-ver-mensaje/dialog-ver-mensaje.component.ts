import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Historial from "../../../../interfaces/historial";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-dialog-ver-mensaje",
    imports: [CommonModule],
    templateUrl: "./dialog-ver-mensaje.component.html"
})
export class DialogVerMensajeComponent {
  readonly dialogRef = inject(MatDialogRef<DialogVerMensajeComponent>);

  readonly historial = inject<Historial>(MAT_DIALOG_DATA);

  isLoadingImage = true;
}
