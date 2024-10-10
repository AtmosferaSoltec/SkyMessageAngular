import { transition, style, animate } from '@angular/animations';

const slideInOut = () => [
    // Animación de entrada (desde arriba hacia abajo)
    transition(':enter', [
      style({ transform: 'translateY(-100%)', opacity: 0 }), // Comienza fuera de la pantalla (arriba)
      animate('1000ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 })), // Entra a su posición original
    ]),
    // Animación de salida (desde abajo hacia arriba)
    transition(':leave', [
      animate('1000ms ease-in-out', style({ transform: 'translateY(100%)', opacity: 0 })), // Se mueve hacia abajo y desaparece
    ]),
  ];

export { slideInOut };
