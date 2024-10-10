import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type ButtonType = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: ` <button
    [type]="type"
    class="flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg bg-colorBlack hover:bg-colorBlack2 hover:text-white active:text-white active:bg-black"
    [className]="getClass()"
  >
    @if (icon) {
    <mat-icon>{{ icon }}</mat-icon>
    }
    <span class="text-lg font-bold">{{ text }}</span>
  </button>`,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() theme: ButtonType = 'primary';
  @Input() icon?: string;
  @Input() text: string = '';

  getClass() {
    switch (this.theme) {
      case 'primary':
        return 'flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg bg-colorBlack hover:bg-colorBlack2 hover:text-white active:text-white active:bg-black';
      case 'secondary':
        return 'flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg bg-colorGrey text-colorBlack hover:bg-colorBlack hover:text-white active:text-white active:bg-black';
    }
  }
}
