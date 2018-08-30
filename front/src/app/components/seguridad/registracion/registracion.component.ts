import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegistrationValidator } from '../../../utils/validacion-asincrona';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private router:Router,private fb:FormBuilder,private service:UsuarioService) {
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
    
  }
  existeUsuario(){
    let username:string=this.form.controls['username'].value;
    if(username.length>3){
      this.service.existeUsuario(username).subscribe((response:any)=>{
        let usuarioValidar=response;
        console.log(usuarioValidar);
        if(usuarioValidar.id!=null){
          this.existe=true;
        }
        else{
          this.existe=false;  
        }
      })
    }
    else{
      this.existe=false;  
    }
    console.log("Existe: ",this.existe);
    
  }
  esValido():boolean{
    if( this.form.valid && this.existe===false){
      return true;
    }
    return false;
  }
  crearUsuario(){
    let username=this.form.controls['username'].value;
    let mail=this.form.controls['mail'].value;
    let pass=this.passwordFormGroup.controls['password'].value;
    let nuevoUsuario= new Usuario(null,null,null,null,mail,null,false,pass,null,null,username,null,null,null);
    this.service.crearUsuario(nuevoUsuario).subscribe((response:any)=>{
      this.router.navigate(['login']);
    });
    console.log(this.form);
    
  }

}
