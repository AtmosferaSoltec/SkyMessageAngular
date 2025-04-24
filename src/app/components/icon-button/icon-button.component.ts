import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-icon-button',
    imports: [MatIconModule],
    templateUrl: './icon-button.component.html',
    standalone: true,
})
export class IconButtonComponent {

  @Input() icon!: string
}
