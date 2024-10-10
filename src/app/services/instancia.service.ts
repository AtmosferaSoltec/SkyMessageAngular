import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanciaService {

  private readonly baseUrl = `${environment.baseUrl}/api/whatsapp`;
  private readonly http = inject(HttpClient);


  notifyScan(userId: string, status: string) {
    return this.http.post(`${this.baseUrl}/scan`, { userId, status });
  }

  getPerfil() {
    return this.http.get(`${this.baseUrl}/perfil`);
  }

  getEstado() {
    return this.http.get(`${this.baseUrl}/estado`);
  }

  pollEstado() {
    return interval(5000).pipe(
      switchMap(() => this.getEstado())
    )
  }

  terminarInstancia() {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  // Generar QR
  generarQR() {
    return this.http.get(`${this.baseUrl}/qr`, {});
  }

}
