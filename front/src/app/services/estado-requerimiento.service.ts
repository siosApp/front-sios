import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EstadoRequerimientoService {

  constructor(private http: HttpClient) { }

  getEstadosVigentes() {
    return this.http.get('http://localhost:8082/estadoRequerimiento/listEstadoRequerimientoVigente')
  }
}
