import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeAlta,mensajeBaja } from '../../../utils/params';
import { TipoUsuario } from '../../../models/tipo-usuario';
import { TipoUsuarioService } from '../../../services/tipo-usuario.service';

declare var $:any;

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styles: []
})
export class TipoUsuarioComponent{

  habilitaTipoUsuario:boolean;
  mensaje:string;
  form:FormGroup;
  tiposUsuarios:TipoUsuario[]=[];
  tipoUsuarioAEditar:TipoUsuario;

  constructor(private service:TipoUsuarioService) {
    service.getTipoUsuarios().subscribe((response:any)=>{
      this.tiposUsuarios=response;
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
  }
  editarTipoUsuario(id){
    this.service.getTipoUsuarioById(id).subscribe( (response:any) =>{
      this.tipoUsuarioAEditar=response;
      this.form.setValue({
        nombre: this.tipoUsuarioAEditar.nombreTipoUsuario
      });
    })
  }
  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
  }
  guardarTipoUsuario(){
    let nuevoNombre=this.form.controls['nombre'].value;
    if(this.tipoUsuarioAEditar!=null){
      let tipoUsuarioActualizado:TipoUsuario= new TipoUsuario(this.tipoUsuarioAEditar.id,nuevoNombre,this.tipoUsuarioAEditar.fechaBaja);
      this.service.updateTipoUsuario(tipoUsuarioActualizado).subscribe( response =>{
        this.tipoUsuarioAEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getTipoUsuarios().subscribe((response:any) => this.tiposUsuarios=response);
      });
    }
    else{
      let nuevoTipoUsuario:TipoUsuario= new TipoUsuario(null,nuevoNombre,null);
      this.service.crearTipoUsuario(nuevoTipoUsuario).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getTipoUsuarios().subscribe((response:any) => this.tiposUsuarios=response);
      })
    }
  }
  openAlert(tipoUsuario){
    if(tipoUsuario.fechaBaja ==null){
      this.tipoUsuarioAEditar=tipoUsuario;
      this.mensaje=mensajeBaja;
      this.habilitaTipoUsuario=false;
    }
    else{
      this.tipoUsuarioAEditar=tipoUsuario;
      this.mensaje=mensajeAlta;
      this.habilitaTipoUsuario=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    $('#danger-alert').modal('hide');
  }
  cancelar(){
    this.tipoUsuarioAEditar=null;
  }
  confirmarOperacion(){
    if(this.habilitaTipoUsuario){
      this.service.habilitarTipoUsuario(this.tipoUsuarioAEditar.id).subscribe(()=>{
        this.service.getTipoUsuarios().subscribe((response:any) => this.tiposUsuarios=response);
      });
    }
    else{
      this.service.deleteTipoUsuario(this.tipoUsuarioAEditar).subscribe(()=>{
        this.service.getTipoUsuarios().subscribe((response:any) => this.tiposUsuarios=response);
      });
    }
    this.volver();
  }

}
