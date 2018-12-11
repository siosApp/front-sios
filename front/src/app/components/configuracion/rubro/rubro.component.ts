import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Rubro } from '../../../models/rubro';
import { RubroService } from '../../../services/rubro.service';
import { mensajeBaja, mensajeAlta } from '../../../utils/params';
import { TipoRubro } from '../../../models/tipo-rubro';
import { TipoRubroService } from '../../../services/tipo-rubro.service';

declare var $:any;
@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styles: []
})
export class RubroComponent {

  habilitaRubro:boolean;
  mensaje:string;
  form:FormGroup;
  rubros:Rubro[]=[];
  rubroAEditar:Rubro;
  tipoRubroSeleccionado:TipoRubro;
  tiposRubros:TipoRubro[]=[];

  constructor(private service:RubroService,private tipoRubroService:TipoRubroService) {
    service.getRubros().subscribe((response:any)=>{
      this.rubros=response;
    })
    tipoRubroService.getTipoRubros().subscribe( (response:any) =>{
      this.tiposRubros=response;
      console.log(this.tiposRubros);
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'tipoRubro': new FormControl('',Validators.required)
    });
  }
  editarRubro(id){
    console.log("formulario");
    
    console.log(this.form);
    
    this.service.getRubroById(id).subscribe( (response:any) =>{
      this.rubroAEditar=response;
      //this.tipoRubroService.getTipoRubroByNombre(this.rubroAEditar.tipoRubro).subscribe( (response:any) => this.tipoRubroSeleccionado=response)
      //$("#selectpicker").val(this.rubroAEditar.tipoRubro);
      this.form.setValue({
        nombre: this.rubroAEditar.nombreRubro,
        tipoRubro: this.rubroAEditar.nombreTipoRubro
      });
    })
    
  }
  
  guardarRubro(){
    let nuevoNombre=this.form.controls['nombre'].value;
    let tipoRubro=this.form.controls['tipoRubro'].value;
    if(this.rubroAEditar!=null){
      let rubroActualizado:Rubro= new Rubro(this.rubroAEditar.id,nuevoNombre,this.rubroAEditar.fechaBaja,tipoRubro);
      this.service.updateRubro(rubroActualizado).subscribe( response =>{
        this.rubroAEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getRubros().subscribe((response:any) => this.rubros=response);
      });
    }
    else{
      let nuevoRubro:Rubro= new Rubro(null,nuevoNombre,null,tipoRubro);
      this.service.crearRubro(nuevoRubro).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getRubros().subscribe((response:any) => this.rubros=response);
      })
    }
  }
  openAlert(tipoRubro){
    if(tipoRubro.fechaBaja ==null){
      this.rubroAEditar=tipoRubro;
      this.mensaje=mensajeBaja;
      this.habilitaRubro=false;
    }
    else{
      this.rubroAEditar=tipoRubro;
      this.mensaje=mensajeAlta;
      this.habilitaRubro=true;
    }
    $('#rubroModal').modal('show');
  }

  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
  }
  volver(){
    this.rubroAEditar=null;
    $('#rubroModal').modal('hide');
  }
  cancelar(){
    this.rubroAEditar=null;
  }
  confirmarOperacion(){
    if(this.habilitaRubro){
      this.service.habilitarRubro(this.rubroAEditar.id).subscribe(()=>{
        this.service.getRubros().subscribe((response:any) => this.rubros=response);
      });
    }
    else{
      this.service.deleteRubro(this.rubroAEditar).subscribe(()=>{
        this.service.getRubros().subscribe((response:any) => this.rubros=response);
      });
    }
    this.volver();
  }

}
