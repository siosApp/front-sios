import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'angular-6-social-login';
import { AutenticacionService } from '../../services/autenticacion.service';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['./login.component.css']
})
export class LoginComponent {

  form:FormGroup;
  usuario:Usuario;
  constructor(private router:Router,private service:UsuarioService,private fb:FormBuilder,private socialAuthService: AuthService,
    private tokenService:AutenticacionService ) { 
    this.form=fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      recordarme: ['']
    })
  }

  loguearUsuario(){
    let username=this.form.controls['username'].value;
    let pass=this.form.controls['password'].value;
    let recordarme=this.form.controls['recordarme'].value == ''?false:true;    
    this.service.validarUsuario(username,pass).subscribe( (response:any) =>{
      this.usuario=response;
      if(this.usuario.id !=null){
        this.tokenService.guardarSesion(recordarme,this.usuario.id);
        this.router.navigate(['inicio']);
      }
      else{
        $.Notification.notify('error','top left', 'Error', 'Usuario y/o contraseña inválidos.');
      }
    })
  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      //socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // Now sign-in with userData
        // ...
        let email=userData.email;
        let username=email.split("@")[0];
        this.router.navigate(['registracion',username,email]);
      }
    );
  }
  cerrarSesion(){
    this.tokenService.cerrarSesion();
    this.router.navigate(['login']);
  }
}
