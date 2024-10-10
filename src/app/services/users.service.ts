import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly baseUrl = `${environment.baseUrl}/api/usuario`;
  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get(this.baseUrl);
  }

  add(data: any) {
    data.password = data.user;
    data.idTipoUsuario = 2 //Usuario;
    return this.http.post(this.baseUrl, data);
  }

  update(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  restore(id: number) {
    return this.http.put(`${this.baseUrl}/${id}`, {});
  }
}
