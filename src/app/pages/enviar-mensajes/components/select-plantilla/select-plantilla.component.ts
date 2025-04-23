import { Component, inject, OnInit, signal } from '@angular/core';
import Plantilla from '../../../../interfaces/plantilla';
import { PlantillaService } from '../../../../services/plantilla.service';
import { EnviarMensajeService } from '../../enviar-mensaje.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonComponent } from '../../../../components/button/button.component';
import { IconButtonComponent } from '../../../../components/icon-button/icon-button.component';
import { FormPlantillaComponent } from '../../../../components/dialogs/form-plantilla/form-plantilla.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-select-plantilla',
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatTooltipModule,
        ButtonComponent,
        IconButtonComponent,
    ],
    templateUrl: './select-plantilla.component.html'
})
export class SelectPlantillaComponent implements OnInit {
  plantillaService = inject(PlantillaService);
  service = inject(EnviarMensajeService);

  listPlantillas = signal<Plantilla[]>([]);

  ngOnInit(): void {
    this.getAllPlantillas();
  }

  getAllPlantillas() {
    this.plantillaService.getAll().subscribe({
      next: (data) => {
        this.listPlantillas.set(data);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  setPlantilla() {
    this.service.mensaje.set(this.service.plantilla()?.cuerpo || '');
  }

  removePlantilla() {
    this.service.plantilla.set(null);
    this.service.mensaje.set('');
  }

  readonly dialog = inject(MatDialog);

  addPlantilla() {
    const dialogRef = this.dialog.open(FormPlantillaComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getAllPlantillas();
      }
    });
  }

  editPlantilla() {
    const dialogRef = this.dialog.open(FormPlantillaComponent, {
      data: this.service.plantilla(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getAllPlantillas();
      }
    });
  }
}
