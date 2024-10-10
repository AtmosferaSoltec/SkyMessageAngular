import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarQRComponent } from './components/generar-qr/generar-qr.component';
import { InstanciaConectadaComponent } from './components/instancia-conectada/instancia-conectada.component';
import { InstanciaService } from '../../services/instancia.service';
import { InstanciaPageService } from './instancia-page.service';

@Component({
  selector: 'app-instancia',
  standalone: true,
  imports: [CommonModule, GenerarQRComponent, InstanciaConectadaComponent],
  templateUrl: './instancia.component.html',
})
export class InstanciaComponent implements OnInit {
  
  instanciaService = inject(InstanciaService);
  isLoading = signal(false);

  service = inject(InstanciaPageService)

  ngOnInit(): void {
    this.getEstado();
  }

  getEstado() {
    this.isLoading.set(true);
    this.instanciaService.getEstado().subscribe({
      next: (data: any) => {
        if (data?.status?.accountStatus?.status === 'authenticated') {
          this.service.isConnected.set(true);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
