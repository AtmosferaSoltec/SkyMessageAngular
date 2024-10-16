import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EnvioService {
  private readonly baseUrl = `${environment.baseUrl}/api/envio`;
  private readonly http = inject(HttpClient);

  send(req: any) {
    return this.http.post(this.baseUrl, req);
  }

  getAll() {
    return this.http.get(this.baseUrl);
  }

  getAllHistorial() {
    return this.http.get(`${this.baseUrl}/historial`);
  }

  stopEnvio(id: number) {
    const url = `${this.baseUrl}/stop/${id}`;
    console.log(url);
    
    return this.http.post(url, {});
  }
}
