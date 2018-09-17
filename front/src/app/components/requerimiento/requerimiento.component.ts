import { Component, OnInit } from '@angular/core';
import { mensajeRequerimiento, mensajeGuardadoRequerimiento } from '../../utils/params';
import { Usuario } from '../../models/usuario';
import { RequerimientoService } from '../../services/requerimiento.service';
import { Requerimiento } from '../../models/requerimiento';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';
import { FormGroup } from '@angular/forms';


declare var $:any;
@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styles: []
})

export class RequerimientoComponent implements OnInit {

  mensaje:string;
  form:FormGroup;
  usuarioLogueado:string;
  requerimiento:Requerimiento[]=[];
    
  constructor(private service:RequerimientoService,private autserv:AutenticacionService) {
      
    this.form= new FormGroup({
      'descripcion': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'precioApagar': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'tiempoEstimado': new FormControl('',[Validators.required,Validators.minLength(1)]),
      'titulo': new FormControl('',[Validators.required,Validators.minLength(1)]),
    });
  }
  
  guardarRequerimiento(){
    
    let descripcion=this.form.controls['descripcion'].value;
    let fechaPublicacion = new Date();
    let precioApagar = this.form.controls['precioApagar'].value;
    let tiempoEstimado = this.form.controls['tiempoEstimado'].value;
    let titulo =this.form.controls['titulo'].value;
    
    let idusuario = localStorage.getItem("auth"); 
    let nuevoRequerimiento = new Requerimiento(null,titulo,descripcion,fechaPublicacion,precioApagar,idusuario ,tiempoEstimado);      
      
      this.service.crearRequerimiento(nuevoRequerimiento).subscribe(response=>{
        $('#sa-warningt').modal('hide');
        console.log(nuevoRequerimiento);
      })
    
  }


  volver(){
    $('#sa-warningt').modal('hide');
  }
  volver01(){
    $('#sa-warningt02').modal('hide');
  }


  openAlert(){
    this.mensaje = mensajeRequerimiento;
    $('#sa-warningt').modal('show');
  }
  
  openAlert01(){
    this.mensaje = mensajeGuardadoRequerimiento;
    $('#sa-warningt02').modal('show');
  }
  
  
  confirmarOperacion(){
    
    this.volver();
  }
  
  
  
  ngOnInit() {
  }






}
