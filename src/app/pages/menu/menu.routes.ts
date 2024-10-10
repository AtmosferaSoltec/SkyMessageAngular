import { Routes } from "@angular/router";
import { EnviarMensajesComponent } from "../enviar-mensajes/enviar-mensajes.component";
import { HistorialComponent } from "../historial/historial.component";
import { InstanciaComponent } from "../instancia/instancia.component";
import { PanelAdminComponent } from "../panel-admin/panel-admin.component";
import { authGuard } from "../../guards/auth.guard";
import { isAdminGuard } from "../../guards/is-admin.guard";

export const menuRoutes: Routes = [
    {
      path: 'enviar-mensajes',
      component: EnviarMensajesComponent,
      canActivate: [authGuard]
    },
    {
      path: 'historial',
      component: HistorialComponent,
      canActivate: [authGuard]
    },
    {
      path: 'instancia',
      component: InstanciaComponent,
      canActivate: [authGuard]
    },
    {
      path: 'panel-admin',
      component: PanelAdminComponent,
      canActivate: [authGuard, isAdminGuard]
    }
  ];