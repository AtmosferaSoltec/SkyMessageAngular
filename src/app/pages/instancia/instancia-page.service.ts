import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstanciaPageService {

  isConnected = signal(false);
  
}
