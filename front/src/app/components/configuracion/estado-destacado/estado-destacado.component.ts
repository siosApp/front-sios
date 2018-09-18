import { Component, OnInit } from '@angular/core';
import { EstadoDestacadoService } from '../../../services/estado-destacado.service';
import { EstadoDestacado } from '../../../models/estado-destacado';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeAlta,mensajeBaja } from '../../../utils/params';

declare var $:any;

@Component({
  selector: 'app-estado-destacado',
  templateUrl: './estado-destacado.component.html',
  
})
export class EstadoDestacadoComponent {

  habilitaEstadoDestacado:boolean;
  mensaje:string;
  form:FormGroup;
  estadoDestacados:EstadoDestacado[]=[];
  estadoDestacadooEditar:EstadoDestacado;

  constructor(private service:EstadoDestacadoService) {
    service.getEstadoDestacado().subscribe((response:any)=>{
      this.estadoDestacados=response;
      console.log(this.estadoDestacados);
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
  }
  editarEstadoDestacado(id){
    this.service.getEstadoDestacadoById(id).subscribe( (response:any) =>{
      this.estadoDestacadooEditar=response;
      console.log(this.estadoDestacadooEditar);
      this.form.setValue({
        nombre: this.estadoDestacadooEditar.nombreEstadoDestacado
      });
    })
  }
  
  guardarEstadoDestacado(){
    
    let nuevoNombre=this.form.controls['nombre'].value;
    if(this.estadoDestacadooEditar!=null){
      let estadoDestacadoActualizado:EstadoDestacado= new EstadoDestacado(this.estadoDestacadooEditar.id,nuevoNombre,this.estadoDestacadooEditar.fechaBaja);
      this.service.updateEstadoDestacado(estadoDestacadoActualizado).subscribe( response =>{
        this.estadoDestacadooEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getEstadoDestacado().subscribe((response:any) => this.estadoDestacados=response);
      });
    }
    else{
      let nuevoEstadoDestacado:EstadoDestacado= new EstadoDestacado(null,nuevoNombre,null);
      this.service.crearEstadoDestacado(nuevoEstadoDestacado).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getEstadoDestacado().subscribe((response:any) => this.estadoDestacados=response);
      })
    }
  }
  openAlert(estadoDestacado){
    if(estadoDestacado.fechaBaja ==null){
      this.estadoDestacadooEditar=estadoDestacado;
      this.mensaje=mensajeBaja;
      this.habilitaEstadoDestacado=false;
    }
    else{
      this.estadoDestacadooEditar=estadoDestacado;
      this.mensaje=mensajeAlta;
      this.habilitaEstadoDestacado=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    this.estadoDestacadooEditar=null;
    $('#danger-alert').modal('hide');
  }

  abrirModal(){
    this.form.reset();
    this.estadoDestacadooEditar=null;
    $('#con-close-modal').modal('show');
  }

  confirmarOperacion(){
    if(this.habilitaEstadoDestacado){
      this.service.habilitarEstadoDestacado(this.estadoDestacadooEditar.id).subscribe(()=>{
        this.service.getEstadoDestacado().subscribe((response:any) => this.estadoDestacados=response);
      });
    }
    else{
      this.service.deleteEstadoDestacado(this.estadoDestacadooEditar).subscribe(()=>{
        this.service.getEstadoDestacado().subscribe((response:any) => this.estadoDestacados=response);
      });
    }
    this.volver();
  }
}
