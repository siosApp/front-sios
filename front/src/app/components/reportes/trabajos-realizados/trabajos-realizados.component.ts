import { Component } from '@angular/core';
declare var $: any; 
@Component({
  selector: 'app-trabajos-realizados',
  templateUrl: './trabajos-realizados.component.html',
  styleUrls: ['./trabajos-realizados.component.css']
})
export class TrabajosRealizadosComponent {

  constructor() { }

 
  abrirComentario(){
    $('#sa-warningt').modal('show');
  }

  volver(){
    $('#sa-warningt').modal('hide');
  }

}
