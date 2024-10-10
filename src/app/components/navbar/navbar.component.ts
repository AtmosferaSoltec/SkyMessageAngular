import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';
import { InstanciaService } from '../../services/instancia.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  menuList = [
    {
      icon: 'outgoing_mail',
      name: 'Enviar Mensajes',
      link: '/menu/enviar-mensajes',
      detail:
        'Selecciona un archivo xlxs para extraer los datos y enviar mensajes.',
    },
    {
      icon: 'update',
      name: 'Historial',
      link: '/menu/historial',
      detail:
        'Revisa el historial de mensajes enviados como mensaje previo al reparto',
    },
    {
      icon: 'cable',
      name: 'Instancia',
      link: '/menu/instancia',
      detail: 'Conecta y desconecta la instancia (Recomendado mantener activo)',
    },
  ];

  router = inject(Router);

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      }
    });
  }

  isAdmin = signal(false);

  ngOnInit(): void {
    this.verificarIsAdmin();
    this.verificarInstancia();
  }

  authService = inject(AuthService);
  verificarIsAdmin() {
    this.authService.isAdmin().subscribe({
      next: (data: any) => {
        if (data === true) {
          this.isAdmin.set(true);
        }
      },
    });
  }

  isAuthenticaded = signal(false);
  instanciaService = inject(InstanciaService);
  verificarInstancia() {
    this.instanciaService.getEstado().subscribe({
      next: (data: any) => {
        const estado = data?.status?.accountStatus?.status === 'authenticated';
        this.isAuthenticaded.set(estado);
      },
    });
  }
}
