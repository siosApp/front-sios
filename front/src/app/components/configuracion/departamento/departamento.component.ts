import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Rubro } from '../../../models/rubro';
import { RubroService } from '../../../services/rubro.service';
import { mensajeBaja, mensajeAlta } from '../../../utils/params';
import { TipoRubro } from '../../../models/tipo-rubro';
import { TipoRubroService } from '../../../services/tipo-rubro.service';
import { Departamento } from '../../../models/departamento';
import { Provincia } from '../../../models/provincia';
import { DepartamentoService } from '../../../services/departamento.service';
import { ProvinciaService } from '../../../services/provincia.service';

declare var $:any;
@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styles: []
})
export class DepartamentoComponent {


  habilitaDepartamento:boolean;
  mensaje:string;
  form:FormGroup;
  departamentos:Departamento[]=[];
  departamentoAEditar:Departamento;
  provinciaSeleccionada:Provincia;
  provincias:Provincia[]=[];

  constructor(private service:DepartamentoService,private provinciaService:ProvinciaService) {
    service.getDepartamentos().subscribe((response:any)=>{
      this.departamentos=response;
    })
    provinciaService.getProvincias().subscribe( (response:any) =>{
      this.provincias=response;
      console.log(this.provincias);
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'provincia': new FormControl('',Validators.required)
    });
  }
  editarDepartamento(id){
    console.log("formulario");
    
    console.log(this.form);
    
    this.service.getDepartamentoById(id).subscribe( (response:any) =>{
      this.departamentoAEditar=response;
      this.form.setValue({
        nombre: this.departamentoAEditar.nombreDepartamento,
        provincia: this.departamentoAEditar.nombreProvincia
      });
    })
    
  }
  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
  }
  guardarDepartamento(){
    let nuevoNombre=this.form.controls['nombre'].value;
    let provincia=this.form.controls['provincia'].value;
    if(this.departamentoAEditar!=null){
      let departamentoActualizado:Departamento = new Departamento(this.departamentoAEditar.id,nuevoNombre,this.departamentoAEditar.fechaBaja,provincia);
      this.service.updateDepartamento(departamentoActualizado).subscribe( response =>{
        this.departamentoAEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getDepartamentos().subscribe((response:any) => this.departamentos=response);
      });
    }
    else{
      let nuevoDepartamento:Departamento = new Departamento(null,nuevoNombre,null,provincia);
      this.service.crearDepartamento(nuevoDepartamento).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getDepartamentos().subscribe((response:any) => this.departamentos=response);
      })
    }
  }
  openAlert(provincia){
    if(provincia.fechaBaja == null){
      this.departamentoAEditar=provincia;
      this.mensaje=mensajeBaja;
      this.habilitaDepartamento=false;
    }
    else{
      this.departamentoAEditar=provincia;
      this.mensaje=mensajeAlta;
      this.habilitaDepartamento=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    $('#danger-alert').modal('hide');
  }
  cancelar(){
    this.departamentoAEditar=null;
  }
  confirmarOperacion(){
    if(this.habilitaDepartamento){
      this.service.habilitarDepartamento(this.departamentoAEditar.id).subscribe(()=>{
        this.service.getDepartamentos().subscribe((response:any) => this.departamentos=response);
      });
    }
    else{
      this.service.deleteDepartamento(this.departamentoAEditar).subscribe(()=>{
        this.service.getDepartamentos().subscribe((response:any) => this.departamentos=response);
      });
    }
    this.volver();
  }


}
