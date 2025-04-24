import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SelectPlantillaComponent } from './components/select-plantilla/select-plantilla.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { SubirExcelContactosComponent } from './components/subir-excel-contactos/subir-excel-contactos.component';
import { TablaExcelContactosComponent } from './components/tabla-excel-contactos/tabla-excel-contactos.component';

@Component({
    selector: 'app-enviar-mensajes',
    imports: [
        CommonModule,
        SelectPlantillaComponent,
        MensajeComponent,
        SubirExcelContactosComponent,
        TablaExcelContactosComponent,
    ],
    templateUrl: './enviar-mensajes.component.html',
    standalone: true,
})
export class EnviarMensajesComponent {}
