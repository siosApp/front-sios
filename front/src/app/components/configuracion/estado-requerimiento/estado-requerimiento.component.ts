import { Component } from '@angular/core';
import { EstadoRequerimientoService } from '../../../services/estado-requerimiento.service';
import { EstadoRequerimiento } from '../../../models/estado-requerimiento';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeAlta,mensajeBaja } from '../../../utils/params';

declare var $:any;

@Component({
  selector: 'app-estado-requerimiento',
  templateUrl: './estado-requerimiento.component.html',
  styles: []
})
export class EstadoRequerimientoComponent {

  habilitaEstado:boolean;
  mensaje:string;
  form:FormGroup;
  estados:EstadoRequerimiento[]=[];
  estadoAEditar:EstadoRequerimiento;
  estadosVigentes$: Object;

  constructor(private service:EstadoRequerimientoService) {
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
        nombre: this.estadoAEditar.nombreEstado
      });
    })
  }
  // crearEstado(){

  // }
  guardarEstado(){
    console.log("fuera del form");
    let nuevoNombre=this.form.controls['nombre'].value;
    if(this.estadoAEditar!=null){
      let estadoActualizado:EstadoRequerimiento = new EstadoRequerimiento(this.estadoAEditar.id,nuevoNombre,this.estadoAEditar.fechaBaja);
      this.service.updateEstado(estadoActualizado).subscribe( response =>{
        this.estadoAEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getEstados().subscribe((response:any) => this.estados=response);
      });
    }
    else{
      let nuevoEstado:EstadoRequerimiento = new EstadoRequerimiento(null,nuevoNombre,null);
      this.service.crearEstado(nuevoEstado).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getEstados().subscribe((response:any) => this.estados=response);
      })
    }
  }
  openAlert(estado){
    if(estado.fechaBaja == null){
      this.estadoAEditar = estado;
      this.mensaje = mensajeBaja;
      this.habilitaEstado = false;
    }
    else{
      this.estadoAEditar=estado;
      this.mensaje=mensajeAlta;
      this.habilitaEstado=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    this.estadoAEditar=null;
    $('#danger-alert').modal('hide');
  }
  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
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
