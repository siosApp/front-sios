import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegistrationValidator } from '../../../utils/validacion-asincrona';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styles: []
})
export class RegistracionComponent{

  form:FormGroup;
  passwordFormGroup:FormGroup;
  existe=false;
  email:string;
  username:string;
  mailExistente=false;
  constructor(private router:Router,private fb:FormBuilder,private service:UsuarioService,private activated:ActivatedRoute) {
    activated.params.subscribe(parametros=>{
      this.email= parametros['email'];
      this.username=parametros['user'];
    })

    this.passwordFormGroup=fb.group({
      password: ['',Validators.required],
      confirmacion: ['',Validators.required],
    },{
      validator: RegistrationValidator.validate.bind(this)
    });
    this.form=fb.group({
      username: ['',[Validators.required,Validators.minLength(4)]],
      mail: ['',[Validators.required,Validators.email]],
      passwordFormGroup: this.passwordFormGroup
    });
    if(this.email!=null){
      this.existeUsuarioHelper(this.username);
      this.form.patchValue({
        mail: this.email,
        username: this.username
      })
    }
  }
  existeUsuario(){
    let username:string=this.form.controls['username'].value;
    if(username.length>3){
      this.existeUsuarioHelper(username);
    }
    else{
      this.existe=false;  
    }    
  }
  
  existeUsuarioHelper(username){
    this.service.existeUsuario(username).subscribe((response:any)=>{
      let usuarioValidar=response;
      if(usuarioValidar.id!=null){
        this.existe=true;
      }
      else{
        this.existe=false;  
      }
    })
  }
  existeMail(){
    if(this.form.get('mail').errors == null){
      let mail:string=this.form.controls['mail'].value;
        this.existeMailHelper(mail);
    }
    else{
      this.existe=false;  
    }    
  }
  existeMailHelper(mail){
    this.service.existeMail(mail).subscribe((response:any)=>{
      let usuarioValidar=response;
      if(usuarioValidar.id!=null){
        this.mailExistente=true;
      }
      else{
        this.mailExistente=false;  
      }
    })
  }
  esValido():boolean{
    if( this.form.valid && this.existe===false && this.mailExistente ===false){
      return true;
    }
    return false;
  }
  crearUsuario(){
    let username=this.form.controls['username'].value;
    let mail=this.form.controls['mail'].value;
    let pass=this.passwordFormGroup.controls['password'].value;
    let nuevoUsuario= new Usuario(null,null,null,null,mail,null,false,pass,null,null,username,null,null,null,null,null);
    this.service.crearUsuario(nuevoUsuario).subscribe((response:any)=>{
      $('#registracion-completa').modal('show');
    });
  }

  terminar() {
    $('#registracion-completa').modal('hide');
    this.router.navigate(['login']);
  }

}
