import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { lastValueFrom } from "rxjs";

export const isAdminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const res = await lastValueFrom(authService.isAdmin());
  if (res?.valueOf() === true) {
    return true;
  } else {
    router.navigate(["menu", 'enviar-mensajes']);
    return false;
  }
};
