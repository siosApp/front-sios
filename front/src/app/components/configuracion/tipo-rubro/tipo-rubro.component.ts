import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoRubro } from '../../../models/tipo-rubro';
import { TipoRubroService } from '../../../services/tipo-rubro.service';
import { mensajeBaja, mensajeAlta } from '../../../utils/params';

declare var $:any;

@Component({
  selector: 'app-tipo-rubro',
  templateUrl: './tipo-rubro.component.html',
  styles: []
})
export class TipoRubroComponent {

  habilitaTipoRubro:boolean;
  mensaje:string;
  form:FormGroup;
  tiposRubros:TipoRubro[]=[];
  tipoRubroAEditar:TipoRubro;

  constructor(private service:TipoRubroService) {
    service.getTipoRubros().subscribe((response:any)=>{
      this.tiposRubros=response;
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
  }
  editarTipoRubro(id){
    this.service.getTipoRubroById(id).subscribe( (response:any) =>{
      this.tipoRubroAEditar=response;
      console.log(this.tipoRubroAEditar);
      this.form.setValue({
        nombre: this.tipoRubroAEditar.nombreTipoRubro
      });
    })
  }
  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
  }
  guardarTipoRubro(){
    let nuevoNombre=this.form.controls['nombre'].value;
    console.log("Tipo rubro: ",this.tipoRubroAEditar);
    
    if(this.tipoRubroAEditar!=null){
      let tipoRubroActualizado:TipoRubro= new TipoRubro(this.tipoRubroAEditar.id,nuevoNombre,this.tipoRubroAEditar.fechaBaja);
      this.service.updateTipoRubro(tipoRubroActualizado).subscribe( response =>{
        this.tipoRubroAEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getTipoRubros().subscribe((response:any) => this.tiposRubros=response);
      });
    }
    else{
      console.log("1111");
      
      let nuevoTipoRubro:TipoRubro= new TipoRubro(null,nuevoNombre,null);
      this.service.crearTipoRubro(nuevoTipoRubro).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getTipoRubros().subscribe((response:any) => this.tiposRubros=response);
      })
    }
  }
  openAlert(tipoRubro){
    if(tipoRubro.fechaBaja ==null){
      this.tipoRubroAEditar=tipoRubro;
      this.mensaje=mensajeBaja;
      this.habilitaTipoRubro=false;
    }
    else{
      this.tipoRubroAEditar=tipoRubro;
      this.mensaje=mensajeAlta;
      this.habilitaTipoRubro=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    this.tipoRubroAEditar=null;
    $('#danger-alert').modal('hide');
  }
  cancelar(){
    this.tipoRubroAEditar=null;
  }
  confirmarOperacion(){
    if(this.habilitaTipoRubro){
      this.service.habilitarTipoRubro(this.tipoRubroAEditar.id).subscribe(()=>{
        this.service.getTipoRubros().subscribe((response:any) => this.tiposRubros=response);
      });
    }
    else{
      this.service.deleteTipoRubro(this.tipoRubroAEditar).subscribe(()=>{
        this.service.getTipoRubros().subscribe((response:any) => this.tiposRubros=response);
      });
    }
    this.volver();
  }

}
