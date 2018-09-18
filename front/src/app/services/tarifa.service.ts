import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { Tarifa } from '../models/tarifa';


@Injectable({
    providedIn: 'root'
  })
  export class TarifaService {
  
    constructor(private http:HttpClient) { }
  
   
    crearTarifa(tarifa){
        console.log("Tarifa: ",tarifa);
        let url=`${URL_API}/tarifa/crearTarifa?montoTarifa=${tarifa.montoTarifa}`;
        return this.http.post(url,null); 
    }
    getTarifas(){
        let url=`${URL_API}/tarifa/getListTarifa`;
        return this.http.get(url);
      }
      updateTarifa(tarifa:Tarifa){
        let url=`${URL_API}/tarifa/editarTarifa?idTarifa=${tarifa.id}&montoTarifa=${tarifa.montoTarifa}`;
        return this.http.put(url,null);
      }

      deleteTarifa(tarifa:Tarifa){
        let url=`${URL_API}/tarifa/bajaTarifa?idTarifa=${tarifa.id}`;
        return this.http.put(url,null);
      }

      habilitarTarifa(id){
        let url= `${URL_API}/tarifa/habilitarTarifa?idTarifa=${id}`;
        return this.http.put(url,null);
      }

      getTarifaById(id){
        let url=`${URL_API}/tarifa/findTarifaById?idTarifa=${id}`;
        return this.http.get(url);
      }

  }