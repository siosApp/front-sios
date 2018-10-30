import { Component } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-mis-requerimientos',
  templateUrl: './mis-requerimientos.component.html',
  styleUrls: ['./mis-requerimientos.component.css']
})
export class MisRequerimientosComponent {

  constructor() { }

  aceptarOferta(){
      $('#aceptar-oferta').modal('show');
  }
  
  volver(){
    $('#aceptar-oferta').modal('hide');
  
}

}
