import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent {}
