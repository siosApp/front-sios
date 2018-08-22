import { Component, OnInit } from '@angular/core';
import { MedioPagoService } from '../../../services/medio-pago.service';
import { MedioPago } from '../../../models/medio-pago';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeAlta,mensajeBaja } from '../../../utils/params';

declare var $:any;

@Component({
  selector: 'app-medio-pago',
  templateUrl: './medio-pago.component.html',
})
export class MedioPagoComponent {

  habilitaMedioPago:boolean;
  mensaje:string;
  form:FormGroup;
  medioPagos:MedioPago[]=[];
  medioPagoEditar:MedioPago;

  constructor(private service:MedioPagoService) {
    service.getMedioPagos().subscribe((response:any)=>{
      this.medioPagos=response;
      console.log(this.medioPagos);
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
  }
  editarMedioPago(id){
    this.service.getMedioPagoById(id).subscribe( (response:any) =>{
      this.medioPagoEditar=response;
      console.log(this.medioPagoEditar);
      this.form.setValue({
        nombre: this.medioPagoEditar.nombreMedioPago
      });
    })
  }
  
  guardarMedioPago(){
    
    let nuevoNombre=this.form.controls['nombre'].value;
    if(this.medioPagoEditar!=null){
      let medioPagoActualizado:MedioPago= new MedioPago(this.medioPagoEditar.id,nuevoNombre,this.medioPagoEditar.fechaBaja);
      this.service.updateMedioPago(medioPagoActualizado).subscribe( response =>{
        this.medioPagoEditar=null;
        $('#con-close-modal').modal('hide');
        this.service.getMedioPagos().subscribe((response:any) => this.medioPagos=response);
      });
    }
    else{
      let nuevoMedioPago:MedioPago= new MedioPago(null,nuevoNombre,null);
      this.service.crearMedioPago(nuevoMedioPago).subscribe(response=>{
        $('#con-close-modal').modal('hide');
        this.service.getMedioPagos().subscribe((response:any) => this.medioPagos=response);
      })
    }
  }
  openAlert(medioPago){
    if(medioPago.fechaBaja ==null){
      this.medioPagoEditar=medioPago;
      this.mensaje=mensajeBaja;
      this.habilitaMedioPago=false;
    }
    else{
      this.medioPagoEditar=medioPago;
      this.mensaje=mensajeAlta;
      this.habilitaMedioPago=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    $('#danger-alert').modal('hide');
  }
  confirmarOperacion(){
    if(this.habilitaMedioPago){
      this.service.habilitarMedioPago(this.medioPagoEditar.id).subscribe(()=>{
        this.service.getMedioPagos().subscribe((response:any) => this.medioPagos=response);
      });
    }
    else{
      this.service.deleteMedioPago(this.medioPagoEditar).subscribe(()=>{
        this.service.getMedioPagos().subscribe((response:any) => this.medioPagos=response);
      });
    }
    this.volver();
  }
}


