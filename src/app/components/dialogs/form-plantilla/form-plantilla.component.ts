import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { PlantillaService } from '../../../services/plantilla.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Plantilla from '../../../interfaces/plantilla';

@Component({
  selector: 'app-form-plantilla',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './form-plantilla.component.html',
})
export class FormPlantillaComponent implements OnInit{

  readonly dialogRef = inject(MatDialogRef<FormPlantillaComponent>);
  plantillaService = inject(PlantillaService);

  readonly plantilla = inject<Plantilla>(MAT_DIALOG_DATA);

  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    cuerpo: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.plantilla) {
      this.formulario.patchValue(this.plantilla);
    }
    
  }

  save() {
    if (this.formulario.invalid) {
      Swal.fire('Error', 'Todos los campos son requeridos', 'error');
      return;
    }

    if (this.plantilla) {
      this.plantillaService.update(this.plantilla.id, this.formulario.value).subscribe({
        next: (data: any) => {
          Swal.fire('Guardado', 'Plantilla actualizada correctamente', 'success');
          this.dialogRef.close(data);
        },
        error: (error: any) => {
          Swal.fire('Error', error, 'error');
        },
      });
    } else {
      this.plantillaService.create(this.formulario.value).subscribe({
        next: (data: any) => {
          Swal.fire('Guardado', 'Plantilla guardada correctamente', 'success');
          this.dialogRef.close(data);
        },
        error: (error: any) => {
          Swal.fire('Error', error, 'error');
        },
      });
    }
  }

  dismiss() {
    this.dialogRef.close();
  }
}
