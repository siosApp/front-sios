import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { mensajeOferta } from '../../../utils/params';




declare var $:any;
@Component({
  selector: 'app-ofertar-requerimiento',
  templateUrl: './ofertar-requerimiento.component.html',
  styles: []
})



export class OfertarRequerimientoComponent implements OnInit {

  form:FormGroup;
  mensaje:string;
  constructor() { }




  openAlert(){
    this.mensaje = mensajeOferta;
    $('#sa-warningt').modal('show');
  }
  volver(){
    $('#sa-warningt').modal('hide');
  }





  ngOnInit() {
  }

}
