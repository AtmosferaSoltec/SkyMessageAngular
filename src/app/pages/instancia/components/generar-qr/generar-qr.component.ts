import { trigger } from '@angular/animations';
import { Component, inject, OnInit, signal } from '@angular/core';
import { fadeInOut } from '../../../../animations/fade-in-out';
import { animPrueba } from '../../../../animations/anim-prueba';
import * as QRCode from 'qrcode';
import { MatIconModule } from '@angular/material/icon';
import { SecondsPipe } from '../../../../pipes/seconds.pipe';
import { InstanciaService } from '../../../../services/instancia.service';
import { InstanciaPageService } from '../../instancia-page.service';

@Component({
    selector: 'app-generar-qr',
    imports: [MatIconModule, SecondsPipe],
    templateUrl: './generar-qr.component.html',
    animations: [
        trigger('fadeInOut', fadeInOut()),
        trigger('prueba', animPrueba()),
    ],
    standalone: true,
})
export class GenerarQRComponent implements OnInit {

  isLoadingInstance = signal(false);
  instanciaService = inject(InstanciaService);
  service = inject(InstanciaPageService);

  ngOnInit(): void {
    this.pollEstado();
  }

  pollEstado() {
    this.instanciaService.pollEstado().subscribe({
      next: (data: any) => {
        console.log('pull');
        this.isLoadingInstance.set(data?.status?.accountStatus?.status === 'loading');
        this.service.isConnected.set(data?.status?.accountStatus?.status === 'authenticated');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onQrScanned() {
    this.instanciaService.notifyScan('34', 'Pruebita').subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  isLoading = false;
  imageQR?: string;

  generarQR() {
    this.isLoading = true;
    this.instanciaService.generarQR().subscribe({
      next: (data: any) => {
        QRCode.toDataURL(data?.qrCode).then((url) => {
          this.imageQR = url;
          this.startTimer();
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  timer: number = 0;
  interval: any;

  startTimer() {
    this.timer = 40;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.imageQR = undefined;
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
