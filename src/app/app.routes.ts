import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    loadChildren: () =>
      import('./pages/menu/menu.routes').then((m) => m.menuRoutes),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
