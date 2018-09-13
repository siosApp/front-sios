import { Component, OnInit } from '@angular/core';
import { mensajeRequerimiento } from '../../utils/params';
import { FormGroup } from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styles: []
})

export class RequerimientoComponent implements OnInit {

  mensaje:string;
  form:FormGroup;
  requerimientoEditar:any;


  constructor() { }
  

  volver(){
    $('#sa-warningt').modal('hide');
  }



  openAlert(){
    this.mensaje = "Va a borrar su requerimiento.";//mensajeRequerimiento;
    $('#sa-warningt').modal('show');
  }
  
  
  
  confirmarOperacion(){
    
    this.volver();
  }
  
  
  
  ngOnInit() {
  }






}
