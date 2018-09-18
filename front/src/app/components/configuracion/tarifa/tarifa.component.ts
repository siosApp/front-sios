import { Component, OnInit } from '@angular/core';
import { TarifaService } from '../../../services/tarifa.service';
import { Tarifa } from '../../../models/tarifa';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeAlta,mensajeBaja } from '../../../utils/params';

declare var $:any;

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styles: []
})
export class TarifaComponent  {
  habilitaTarifa:boolean;
  mensaje:string;
  form:FormGroup;
  tarifas:Tarifa[]=[];
  tarifaEditar:Tarifa;

  constructor(private service:TarifaService) {
    service.getTarifas().subscribe((response:any)=>{
      this.tarifas=response;
      console.log(this.tarifas);
    })
    this.form= new FormGroup({
      'monto': new FormControl('',[Validators.required,Validators.minLength(2)]),
    });
  }

  editarTarifa(id){
    this.service.getTarifaById(id).subscribe( (response:any) =>{
      this.tarifaEditar=response;
      this.form.setValue({
        monto: this.tarifaEditar.montoTarifa
      });
    })
  }

  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
  }

  guardarTarifa(){
    let nuevoMonto=this.form.controls['monto'].value;
    console.log("Monto: ",nuevoMonto);
    
    if(this.tarifaEditar!=null){
      let tarifaActualizada:Tarifa= new Tarifa(this.tarifaEditar.id,nuevoMonto,this.tarifaEditar.fechaBaja);
      this.service.updateTarifa(tarifaActualizada).subscribe( response =>{
        this.tarifaEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getTarifas().subscribe((response:any) => this.tarifas=response);
      });
    }
    else{
      let nuevaTarifa:Tarifa= new Tarifa(null,nuevoMonto,null);
      this.service.crearTarifa(nuevaTarifa).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getTarifas().subscribe((response:any) => this.tarifas=response);
      })
    }
  }
  openAlert(tarifa){
    if(tarifa.fechaBaja ==null){
      this.tarifaEditar=tarifa;
      this.mensaje=mensajeBaja;
      this.habilitaTarifa=false;
    }
    else{
      this.tarifaEditar=tarifa;
      this.mensaje=mensajeAlta;
      this.habilitaTarifa=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    this.tarifaEditar=null;
    $('#danger-alert').modal('hide');
  }
  cancelar(){
    this.tarifaEditar=null;
  }
  confirmarOperacion(){
    if(this.habilitaTarifa){
      this.service.habilitarTarifa(this.tarifaEditar.id).subscribe(()=>{
        this.service.getTarifas().subscribe((response:any) => this.tarifas=response);
      });
    }
    else{
      this.service.deleteTarifa(this.tarifaEditar).subscribe(()=>{
        this.service.getTarifas().subscribe((response:any) => this.tarifas=response);
      });
    }
    this.volver();
  }
}
