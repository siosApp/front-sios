import { Component, OnInit } from '@angular/core';
import { EstadoSolicitudService } from '../../../services/estado-solicitud.service';
import { EstadoSolicitud } from '../../../models/estado-solicitud';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeAlta,mensajeBaja } from '../../../utils/params';

declare var $:any;

@Component({
  selector: 'app-estado-solicitud',
  templateUrl: './estado-solicitud.component.html',
  styles: []
})
export class EstadoSolicitudComponent {

  habilitaEstado:boolean;
  mensaje:string;
  form:FormGroup;
  estados:EstadoSolicitud[]=[];
  estadoAEditar:EstadoSolicitud;

  constructor(private service:EstadoSolicitudService) {
    service.getEstados().subscribe((response:any)=>{
      this.estados=response;
      console.log(this.estados);
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
  }
  editarEstado(id){
    this.service.getEstadoById(id).subscribe( (response:any) =>{
      this.estadoAEditar=response;
      console.log(this.estadoAEditar);
      this.form.setValue({
        nombre: this.estadoAEditar.nombreEstadoSolicitud
      });
    })
  }
  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
  }
  guardarEstado(){
    console.log("fuera del form");
    let nuevoNombre=this.form.controls['nombre'].value;
    if(this.estadoAEditar!=null){
      let estadoActualizado:EstadoSolicitud= new EstadoSolicitud(this.estadoAEditar.id,nuevoNombre,this.estadoAEditar.fechaBaja);
      this.service.updateEstado(estadoActualizado).subscribe( response =>{
        this.estadoAEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getEstados().subscribe((response:any) => this.estados=response);
      });
    }
    else{
      let nuevoEstado:EstadoSolicitud= new EstadoSolicitud(null,nuevoNombre,null);
      this.service.crearEstado(nuevoEstado).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getEstados().subscribe((response:any) => this.estados=response);
      })
    }
  }
  openAlert(estado){
    if(estado.fechaBaja ==null){
      this.estadoAEditar=estado;
      this.mensaje=mensajeBaja;
      this.habilitaEstado=false;
    }
    else{
      this.estadoAEditar=estado;
      this.mensaje=mensajeAlta;
      this.habilitaEstado=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    $('#danger-alert').modal('hide');
  }
  cancelar(){
    this.estadoAEditar=null;
  }
  confirmarOperacion(){
    if(this.habilitaEstado){
      this.service.habilitarEstado(this.estadoAEditar.id).subscribe(()=>{
        this.service.getEstados().subscribe((response:any) => this.estados=response);
      });
    }
    else{
      this.service.deleteEstado(this.estadoAEditar).subscribe(()=>{
        this.service.getEstados().subscribe((response:any) => this.estados=response);
      });
    }
    this.volver();
  }
}
