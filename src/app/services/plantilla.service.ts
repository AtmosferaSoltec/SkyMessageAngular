import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import Plantilla from '../interfaces/plantilla';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService {
  private readonly baseUrl = `${environment.baseUrl}/api/plantilla`;
  private readonly http = inject(HttpClient);

  getAll(): Observable<Plantilla[]> {
    return this.http.get(this.baseUrl).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  create(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  update(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }
}
