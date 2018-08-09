import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http:HttpClient) { }

  crearProvincia (provincia){
    return this.http.post('http://localhost:8082/provincia/crearProvincia', provincia);
  }
}
