import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styles: []
})
export class VerSolicitudComponent implements OnInit {

  form:FormGroup;

  constructor() { }


  openAlert(){
    $('#sa-warningt').modal('show');
  }

  openAlert02(){
    $('#custom-width-modal01').modal('show');
  }

  openAlert01(){
    $('#danger-alert').modal('show');
  }
  volver(){
    $('#sa-warningt').modal('hide');
  }
  volver01(){
    $('#danger-alert').modal('hide');
  }
  volver02(){
    $('#custom-width-modal01').modal('hide');
  }


  ngOnInit() {
  }

}
