import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../../services/provincia.service';
import { Provincia } from '../../../models/provincia';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeAlta,mensajeBaja } from '../../../utils/params';
import { log } from 'util';

declare var $:any;

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styles: []
})
export class ProvinciaComponent {

  habilitaEstado:boolean;
  mensaje:string;
  form:FormGroup;
  provincias:Provincia[]=[];
  provinciaEditar:Provincia;

  constructor(private service:ProvinciaService) {
    service.getProvincias().subscribe((response:any)=>{
      this.provincias=response;
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
  }
  editarProvincia(id){
    this.service.getProvinciaById(id).subscribe( (response:any) =>{
      this.provinciaEditar=response;
      this.form.setValue({
        nombre: this.provinciaEditar.nombreProvincia
      });
    })
  }


  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
  }
  guardarProvincia(){
    let nuevoNombre=this.form.controls['nombre'].value;
    console.log("Provincia Editar: ",this.provinciaEditar);
    if(this.provinciaEditar!=null){
      let provinciaActualizado:Provincia= new Provincia(this.provinciaEditar.id,nuevoNombre,this.provinciaEditar.fechaBaja);
      this.service.updateProvincia(provinciaActualizado).subscribe( response =>{
        this.provinciaEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getProvincias().subscribe((response:any) => this.provincias=response);
      });
    }
    else{
      let nuevaProvinca:Provincia= new Provincia(null,nuevoNombre,null);
      this.service.crearProvincia(nuevaProvinca).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getProvincias().subscribe((response:any) => this.provincias=response);
      })
    }
  }
  openAlert(estado){
    if(estado.fechaBaja ==null){
      this.provinciaEditar=estado;
      this.mensaje=mensajeBaja;
      this.habilitaEstado=false;
    }
    else{
      this.provinciaEditar=estado;
      this.mensaje=mensajeAlta;
      this.habilitaEstado=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    this.provinciaEditar=null;
    $('#danger-alert').modal('hide');
  }
  abrirModal(){
    this.form.reset();
    this.provinciaEditar=null;
    $('#con-close-modal').modal('show');
  }
  confirmarOperacion(){
    if(this.habilitaEstado){
      this.service.habilitarProvincia(this.provinciaEditar.id).subscribe(()=>{
        this.service.getProvincias().subscribe((response:any) => this.provincias=response);
      });
    }
    else{
      this.service.deleteProvincia(this.provinciaEditar).subscribe(()=>{
        this.service.getProvincias().subscribe((response:any) => this.provincias=response);
      });
    }
    this.volver();
  }
}
