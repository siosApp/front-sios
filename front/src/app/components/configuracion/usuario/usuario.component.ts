import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { TipoUsuario } from '../../../models/tipo-usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { mensajeBaja, mensajeAlta } from '../../../utils/params';
import { TipoUsuarioService } from '../../../services/tipo-usuario.service';
import { RegistrationValidator } from '../../../utils/validacion-asincrona';
import { log } from 'util';
import { Domicilio } from '../../../models/domicilio';

declare var $:any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent{

  habilitaUsuario:boolean;
  mensaje:string;
  form:FormGroup;
  usuarios:Usuario[]=[];
  usuarioAEditar:Usuario;
  tiposUsuarios:TipoUsuario[]=[];
  passwordFormGroup: FormGroup;
  generos:string[];
  domicilioFormGroup: FormGroup;

  constructor(private service:UsuarioService,private tipoRubroService:TipoUsuarioService,private formBuilder:FormBuilder) {
    service.getUsuarios().subscribe((response:any)=>{
      this.usuarios=response;
    })
    tipoRubroService.getTipoUsuariosVigentes().subscribe((response:any)=>{
      this.tiposUsuarios=response;
    })
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      confirmacion: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
    this.domicilioFormGroup = this.formBuilder.group({
      calle: [''],
      codigoPostal:  [''],
      numero: [''],
      piso:  ['']//,
      // nombreLocalidad:  ['', Validators.required]
    });
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'tipoUsuario': new FormControl('',Validators.required),
      'apellido':new FormControl('',Validators.required),
      'username':new FormControl('',Validators.required),
      'oferente':new FormControl(''),
      'sexo':new FormControl('',Validators.required),
      'fechaNacimiento':new FormControl('',Validators.required),
      'mail':new FormControl('',[Validators.required,Validators.email]),
      'passwordFormGroup': this.passwordFormGroup,
      'domicilioFormGroup': this.domicilioFormGroup
    });
  }
  editarUsuario(id){
    this.service.getUsuarioById(id).subscribe( (response:any) =>{
      this.usuarioAEditar=response;
      const nacimiento= new Date(this.usuarioAEditar.fechaNacimiento);
      const nacimientoTransform = nacimiento.toISOString().substring(0, 10);
      this.form.patchValue({
        nombre: this.usuarioAEditar.nombre,
        tipoUsuario:this.usuarioAEditar.tipoUsuario,
        apellido: this.usuarioAEditar.apellido,
        username:this.usuarioAEditar.username,
        oferente:this.usuarioAEditar.oferente,
        sexo:this.usuarioAEditar.sexo,
        mail:this.usuarioAEditar.mail,
        fechaNacimiento:nacimientoTransform
      });
      this.passwordFormGroup.setValue({
        password: this.usuarioAEditar.password,
        confirmacion: this.usuarioAEditar.password
      })
    })
    
  }
  abrirModal(){
    this.form.reset();
    $('#custom-width-modal').modal('show');

    //Estableciendo valores por defecto.
    this.form.patchValue({'sexo':'Sin definir'});
  }
  guardarUsuario(){
    let nuevoNombre=this.form.controls['nombre'].value;
    let tipoUsuario=this.form.controls['tipoUsuario'].value;
    let mail=this.form.controls['mail'].value;
    let fechaNacimientoForm=new Date(this.form.controls['fechaNacimiento'].value);
    //Por una causa que desconozco, Angular le quita un día a la fecha. Por ahora está hardcodeado. Pero
    //se debería fixear esto cuanto antes porque me da la impresión de que se puede romper muy facilmente.
    const nacimiento= new Date(fechaNacimientoForm.setDate(fechaNacimientoForm.getDate() + 1));
    let oferente=this.form.controls['oferente'].value == null?false:true;
    let password=this.passwordFormGroup.controls['password'].value;
    let username=this.form.controls['username'].value;
    let apellido=this.form.controls['apellido'].value;
    let sexo=this.form.controls['sexo'].value;
    let dom:Domicilio= { //Cuando se termine la parte de ABM Localidad, hay que llamar a éste objeto dentro de los constructores de Usuario.
      id: null,
      calle: this.domicilioFormGroup.controls['calle'].value,
      codigoPostal: this.domicilioFormGroup.controls['codigoPostal'].value,
      numero: this.domicilioFormGroup.controls['numero'].value,
      piso: this.domicilioFormGroup.controls['piso'].value,
      latitud: null,//this.domicilioFormGroup.controls['latitud'].value,
      longitud: null,//this.domicilioFormGroup.controls['longitud'].value,
      nombreLocalidad: null//this.domicilioFormGroup.controls['nombre'].value,
    }
    // let domicilio= new Domicilio(null,calle,codigoPostal,numero,piso,latitud,longitud,nombre);    
    if(this.usuarioAEditar!=null){
      let usuarioActualizado= new Usuario(this.usuarioAEditar.id,this.usuarioAEditar.fechaBaja,nacimiento,this.usuarioAEditar.fechaUltIngreso,mail,nuevoNombre,oferente,password,sexo,tipoUsuario,username,null,apellido,null);
      this.service.updateUsuario(usuarioActualizado).subscribe( response =>{
        this.usuarioAEditar=null;
        $('#custom-width-modal').modal('hide');
        this.service.getUsuarios().subscribe((response:any) => this.usuarios=response);
      });
    }
    else{
      let nuevoUsuario= new Usuario(null,null,nacimiento,null,mail,nuevoNombre,oferente,password,sexo,tipoUsuario,username,null,apellido,null);
      this.service.crearUsuario(nuevoUsuario).subscribe(response=>{
        $('#custom-width-modal').modal('hide');
        this.service.getUsuarios().subscribe((response:any) => this.usuarios=response);
      })
   }
  }
  openAlert(tipoUsuario){
    if(tipoUsuario.fechaBaja ==null){
      this.usuarioAEditar=tipoUsuario;
      this.mensaje=mensajeBaja;
      this.habilitaUsuario=false;
    }
    else{
      this.usuarioAEditar=tipoUsuario;
      this.mensaje=mensajeAlta;
      this.habilitaUsuario=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    this.usuarioAEditar=null;
    $('#danger-alert').modal('hide');
  }
  cancelar(){
    this.usuarioAEditar=null;
  }
  confirmarOperacion(){
    if(this.habilitaUsuario){
      this.service.habilitarUsuario(this.usuarioAEditar.id).subscribe(()=>{
        this.service.getUsuarios().subscribe((response:any) => this.usuarios=response);
      });
    }
    else{
      this.service.deleteUsuario(this.usuarioAEditar).subscribe(()=>{
        this.service.getUsuarios().subscribe((response:any) => this.usuarios=response);
      });
    }
    this.volver();
  }  

}
