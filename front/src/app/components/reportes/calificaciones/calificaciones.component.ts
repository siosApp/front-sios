import { Component, OnInit } from '@angular/core';


declare var $:any;
@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }



  abrirComentario(){
    $('#sa-warningt').modal('show');
  }

  volver(){
    $('#sa-warningt').modal('hide');
  }
}
