import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegistrationValidator } from '../../../utils/validacion-asincrona';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../../../services/autenticacion.service';

declare var $:any;
@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styles: []
})
export class RecoverPasswordComponent  {

  form:FormGroup;
  passwordFormGroup:FormGroup;
  codigo:string
  constructor(private router:Router,private fb:FormBuilder,private activatedRouter:ActivatedRoute,private authService:AutenticacionService) {
    this.passwordFormGroup=fb.group({
      password: ['',Validators.required],
      confirmacion: ['',Validators.required],
    },{
      validator: RegistrationValidator.validate.bind(this)
    });
    this.form=new FormGroup({
      'email' : new FormControl('',[Validators.required,Validators.email]),
      'codigo': new FormControl('',Validators.required),
      'passwordFormGroup': this.passwordFormGroup
    })
    activatedRouter.params.subscribe((parametros:any)=>{
      this.form.patchValue({
        codigo: parametros['codigo']
      })
    })
    
   }
   cambiarContrasena(){
    let email= this.form.controls['email'].value;
    let codigo=this.form.controls['codigo'].value;
    let pass=this.passwordFormGroup.controls['password'].value;
    this.authService.cambiarContrasena(email,pass,codigo).subscribe((response:any)=>{
      if(response!=null){
        $.Notification.notify('success','top left', 'Info', 'Se ha cambiado satisfactoriamente su contraseña.');
        this.router.navigate(['login']);
      }
      else{
        $.Notification.notify('error','top left', 'Error', 'Ha surgido un inconveniente. Revise sus datos ingresados.');
        this.router.navigate(['login']);
      }     
    })
   }

}
