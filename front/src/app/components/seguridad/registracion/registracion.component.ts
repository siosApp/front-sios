import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegistrationValidator } from '../../../utils/validacion-asincrona';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

declare var $:any;
@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styles: []
})
export class RegistracionComponent{

  form:FormGroup;
  passwordFormGroup:FormGroup;
  usuario:Usuario;
  constructor(private fb:FormBuilder,private service:UsuarioService) {
    this.passwordFormGroup=fb.group({
      password: ['',Validators.required],
      confirmacion: ['',Validators.required],
    },{
      validator: RegistrationValidator.validate.bind(this)
    });
    this.form=fb.group({
      username: ['',Validators.required],
      mail: ['',[Validators.required,Validators.email]],
      passwordFormGroup: this.passwordFormGroup
    });
    
  }
  
  crearUsuario(){
    let username=this.form.controls['username'].value;
    let mail=this.form.controls['mail'].value;
    let pass=this.form.controls['password'].value;
    let nuevoUsuario= new Usuario(null,null,null,null,mail,null,false,pass,null,null,username,null,null,null);
    this.service.crearUsuario(nuevoUsuario).subscribe((response:any) =>{
      this.usuario=response;
      if(response ==null){

      }
      else{
        
      }
    });
  }

}
