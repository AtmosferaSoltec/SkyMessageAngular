import { transition, style, animate } from '@angular/animations';

const fadeInOut = () => [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1000ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('1000ms', style({ opacity: 0 }))]),
];

export { fadeInOut };
