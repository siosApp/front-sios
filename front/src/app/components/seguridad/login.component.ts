import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  form:FormGroup;
  usuario:Usuario;
  constructor(private router:Router,private service:UsuarioService,private fb:FormBuilder) { 
    this.form=fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  loguearUsuario(){
    let username=this.form.controls['username'].value;
    let pass=this.form.controls['password'].value;
    this.service.validarUsuario(username,pass).subscribe( (response:any) =>{
      this.usuario=response;
      if(this.usuario.id !=null){
        this.router.navigate(['inicio']);
      }
      else{
        $.Notification.notify('error','top left', 'Error', 'Usuario y/o contraseña inválidos.');
      }
    })
  }

}
