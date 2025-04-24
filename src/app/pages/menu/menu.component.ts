import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
    selector: 'app-menu',
    imports: [NavbarComponent, RouterModule],
    templateUrl: './menu.component.html',
    standalone: true,
})
export class MenuComponent {}
