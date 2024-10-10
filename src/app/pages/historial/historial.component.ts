import { Component, inject, OnInit, signal } from '@angular/core';
import { EnvioService } from '../../services/envio.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import Historial from '../../interfaces/historial';
import { NumEnvioPipe } from '../../pipes/num-envio.pipe';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NumEnvioPipe],
  templateUrl: './historial.component.html',
})
export class HistorialComponent implements OnInit {
  envioService = inject(EnvioService);
  listHistorial = signal<Historial[]>([]);

  ngOnInit(): void {
    this.envioService.getAllHistorial().subscribe({
      next: (data: any) => {
        console.log(data);
        this.listHistorial.set(data);
      },
    });
  }
}
