import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../../components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import * as xls from 'xlsx';
import { EnviarMensajeService } from '../../enviar-mensaje.service';

@Component({
  selector: 'app-subir-excel-contactos',
  standalone: true,
  imports: [MatIconModule, ButtonComponent],
  templateUrl: './subir-excel-contactos.component.html'
})
export class SubirExcelContactosComponent {

  service = inject(EnviarMensajeService);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.service.archivo.set(file);
      this.leerExcel(file);
    }
  }

  removeFile() {
    this.service.archivo.set(null);
  }

  leerExcel(file: File) {
    let fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = (e) => {
      const data = new Uint8Array(fr.result as ArrayBuffer);
      const workBook = xls.read(data, { type: 'array' });
      const sheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[sheetName];
      const excelData: any[] = xls.utils.sheet_to_json(workSheet);
      const listExcel = excelData.map((item: any) => {
        const miembro = {
          nombre: item.Nombre,
          celular: item.Celular,
        };
        return miembro;
      });
      
      this.service.listContactos.set(listExcel);
    };
  }

}
