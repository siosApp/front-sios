import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../../services/provincia.service';
import { Provincia } from '../../../models/Provincia';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeAlta,mensajeBaja } from '../../../utils/params';

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
      console.log(this.provincias);
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
  }
  editarProvincia(id){
    this.service.getProvinciaById(id).subscribe( (response:any) =>{
      this.provinciaEditar=response;
      console.log(this.provinciaEditar);
      this.form.setValue({
        nombre: this.provinciaEditar.nombreProvincia
      });
    })
  }
  // crearEstado(){

  // }
  guardarProvincia(){
    
    let nuevoNombre=this.form.controls['nombre'].value;
    if(this.provinciaEditar!=null){
      let estadoActualizado:Provincia= new Provincia(this.provinciaEditar.id,nuevoNombre,this.provinciaEditar.fechaBaja);
      this.service.updateProvincia(estadoActualizado).subscribe( response =>{
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
    $('#danger-alert').modal('hide');
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
