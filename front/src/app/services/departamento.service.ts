import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { Departamento } from '../models/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http:HttpClient) { }

  getDepartamentos(){
    let url=`${URL_API}/departamento/listAllDepartamentos`;
    return this.http.get(url);
  }
  getDepartamentosByProvincia(idProvincia){
    //Le mando el id
    let url=`${URL_API}/departamento/listDepartamentosVigente?provincia=${idProvincia}`;
    return this.http.get(url);
  }
  getDepartamentoById(id){
    let url=`${URL_API}/departamento?id=${id}`;
    return this.http.get(url);
  }
  getDepartamentoByNombre(nombre){
    let url=`${URL_API}/departamento/departamentoByNombre?nombre=${nombre}`;
    return this.http.get(url);
  }
  updateDepartamento(Departamento:Departamento){
    let url=`${URL_API}/departamento/editarDepartamento`;
    return this.http.put(url,Departamento);
  }
  deleteDepartamento(Departamento:Departamento){
    let url=`${URL_API}/departamento/deshabilitarDepartamento?id=${Departamento.id}`;
    return this.http.put(url,null);
  }
  crearDepartamento(departamento){
    let url=`${URL_API}/departamento/crearDepartamento`;
    console.log("URL: ", url);
    console.log("Departamento:",departamento);
    
    return this.http.post(url,departamento); 
  }
  habilitarDepartamento(id){
    let url= `${URL_API}/departamento/habilitarDepartamento?id=${id}`;
    return this.http.put(url,null);
  }
}