import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export function httpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  const reqClon = req.clone({
    headers,
  });

  return next(reqClon).pipe(
    catchError((err) => {
      const data = err?.error;
      console.log(data);
      
      return throwError(data?.message || 'Error desconocido');
    })
  );
}
