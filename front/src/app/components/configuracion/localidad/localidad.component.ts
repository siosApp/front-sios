
import { Component} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeBaja, mensajeAlta } from '../../../utils/params';
import { Departamento } from '../../../models/departamento';
import { DepartamentoService } from '../../../services/departamento.service';
import { Localidad } from '../../../models/localidad';
import { LocalidadService } from '../../../services/localidad.service';


declare var $ : any;
@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styles: []
})
export class LocalidadComponent {

  habilitaLocalidad:boolean;
  mensaje:string;
  form:FormGroup;
  localidades:Localidad[]=[];
  localidadAEditar:Localidad;
  departamentoSeleccionado:Departamento;
  departamentos:Departamento[]=[];

  constructor(private service:LocalidadService,private departamentoService:DepartamentoService) {
    service.getLocalidades().subscribe((response:any)=>{
      this.localidades=response;
    })
    departamentoService.getDepartamentos().subscribe( (response:any) =>{
      this.departamentos=response;
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'departamento': new FormControl('',Validators.required)
    });
  }
  editarLocalidad(id){
    
    this.service.getLocalidadById(id).subscribe( (response:any) =>{
      this.localidadAEditar = response;
      this.form.setValue({
        nombre: this.localidadAEditar.nombreLocalidad,
        departamento: this.localidadAEditar.nombreDepartamento
      });
    })
    
  }
  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
  }
  guardarLocalidad(){
    let nuevoNombre = this.form.controls['nombre'].value;
    let departamento = this.form.controls['departamento'].value;
    if(this.localidadAEditar != null){
      let localidadActualizada : Localidad = new Localidad(this.localidadAEditar.id,nuevoNombre,this.localidadAEditar.fechaBaja,departamento);
      this.service.updateLocalidad(localidadActualizada).subscribe( response =>{
        this.localidadAEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getLocalidades().subscribe((response : any) => this.localidades = response);
      });
    }
    else{
      let nuevaLocalidad : Localidad = new Localidad(null,nuevoNombre,null,departamento);
      this.service.crearLocalidad(nuevaLocalidad).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getLocalidades().subscribe((response:any) => this.localidades=response);
      })
    }
  }
  openAlert(departamento){
    if(departamento.fechaBaja == null){
      this.localidadAEditar=departamento;
      this.mensaje=mensajeBaja;
      this.habilitaLocalidad=false;
    }
    else{
      this.localidadAEditar=departamento;
      this.mensaje=mensajeAlta;
      this.habilitaLocalidad=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    $('#danger-alert').modal('hide');
  }
  cancelar(){
    this.localidadAEditar=null;
  }
  confirmarOperacion(){
    if(this.habilitaLocalidad){
      this.service.habilitarLocalidad(this.localidadAEditar.id).subscribe(()=>{
        this.service.getLocalidades().subscribe((response:any) => this.localidades = response);
      });
    }
    else{
      this.service.deleteLocalidad(this.localidadAEditar).subscribe(()=>{
        this.service.getLocalidades().subscribe((response:any) => this.localidades = response);
      });
    }
    this.volver();
  }
}
