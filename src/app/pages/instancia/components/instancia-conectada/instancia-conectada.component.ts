import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../components/button/button.component';
import { InstanciaService } from '../../../../services/instancia.service';
import Swal from 'sweetalert2';
import { InstanciaPageService } from '../../instancia-page.service';

@Component({
    selector: 'app-instancia-conectada',
    imports: [ButtonComponent],
    templateUrl: './instancia-conectada.component.html',
    standalone: true,
})
export class InstanciaConectadaComponent implements OnInit {
  readonly instanciaService = inject(InstanciaService);

  service = inject(InstanciaPageService);
  isLoading = signal(false);
  perfil = signal<any>(null);

  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil() {
    this.isLoading.set(true);
    this.instanciaService.getPerfil().subscribe({
      next: (data: any) => {
        this.perfil.set(data);
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
        });
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  terminarInstancia() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas terminar la instancia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading.set(true);
        this.instanciaService.terminarInstancia().subscribe({
          next: (data: any) => {
            console.log(data);
            
            Swal.fire({
              icon: 'success',
              title: 'Instancia terminada',
              text: 'La instancia ha sido terminada correctamente',
            });
            this.service.isConnected.set(false);
          },
          error: (error: any) => {
            console.log(error);
            
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error,
            });
          },
          complete: () => {
            this.isLoading.set(false);
          },
        });
      }
    });
  }
}
