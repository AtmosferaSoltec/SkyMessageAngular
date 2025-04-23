import { Component, inject } from '@angular/core';
import { EnviarMensajeService } from '../../enviar-mensaje.service';

@Component({
    selector: 'app-tabla-excel-contactos',
    imports: [],
    templateUrl: './tabla-excel-contactos.component.html'
})
export class TablaExcelContactosComponent {

  service = inject(EnviarMensajeService);
}
