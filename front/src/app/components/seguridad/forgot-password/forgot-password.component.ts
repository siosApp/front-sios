import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: []
})
export class ForgotPasswordComponent {

  form:FormGroup;

  constructor(private authService:AutenticacionService,private router:Router) { 
    this.form= new FormGroup({
      'email': new FormControl('',[Validators.required,Validators.email])
    })
    console.log(this.form);
  }
  enviarCorreo(){
    let email=this.form.controls['email'].value;
    this.authService.enviarMail(email).subscribe((res:any)=>{
      $.Notification.notify('success','top left', 'Info', 'Te hemos enviado un correo al mail. Revisa tu bandeja de entrada');
      this.router.navigate(['login']);
    });
  }
}
