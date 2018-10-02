import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { RegistrationValidator } from '../../utils/validacion-asincrona';
import { Provincia } from '../../models/provincia';
import { ProvinciaService } from '../../services/provincia.service';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../models/departamento';
import { LocalidadService } from '../../services/localidad.service';
import { Localidad } from '../../models/localidad';
import { mensajePerfil, mensajeGuardar } from '../../utils/params';
import { Domicilio } from '../../models/domicilio';

declare var $:any;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})


export class PerfilComponent {
  
  usuarioAEditar:Usuario;
  provincias:Provincia[];
  form:FormGroup;
  passwordFormGroup:FormGroup;
  domicilioForm:FormGroup;
  localidades:Localidad[];
  departamentos:Departamento[];
  showDepartamentos=false;
  showLocalidades=false;

  mensaje:string;

  idUsuario:string;
  fechaNacimiento:Date;
  mail:string;
  nombre:string;
  sexo:string;
  username:string;
  apellido:string;
  password: string;
  fechaUltimoIngreso: Date;
  oferente:boolean;

  constructor(private service:UsuarioService, private fb:FormBuilder,
              private provinciaService:ProvinciaService,
              private departamentoService:DepartamentoService,
              private localidadService:LocalidadService
    ) {
      this.passwordFormGroup=fb.group({
        password: ['',Validators.required],
        confirmacion: ['',Validators.required],
      },{
        validator: RegistrationValidator.validate.bind(this)
      });

      this.domicilioForm=fb.group({
        domicilioCalle: ['',Validators.required],
        domicilioNumero: ['',Validators.required],
        domicilioPiso: ['',Validators.required],
        codPostal: ['',Validators.required],

      });


      this.form= new FormGroup({
        'nombre': new FormControl('',Validators.required),
        'apellido': new FormControl('',Validators.required),
        'mail': new FormControl('',Validators.required),
        'username': new FormControl('',Validators.required),
        'fechaNacimiento': new FormControl('',Validators.required),
        'sexo': new FormControl('',Validators.required),
        'domicilioCalle': new FormControl('',Validators.required),
        'domicilioNumero': new FormControl('',Validators.required),
        'domicilioPiso': new FormControl('',Validators.required),
        'codPostal': new FormControl('',Validators.required),
        'provincia': new FormControl('',Validators.required),
        'departamento': new FormControl('',Validators.required),
        'localidad': new FormControl('',Validators.required),
        'passwordFormGroup': this.passwordFormGroup,
        'domicilioForm': this.domicilioForm
      });
    
     let idusuario = localStorage.getItem("auth");
    this.service.getUsuarioById(idusuario).subscribe( (response:any) =>{
      this.usuarioAEditar=response;
      const nacimiento= new Date(this.usuarioAEditar.fechaNacimiento);
      const nacimientoTransform = nacimiento.toISOString().substring(0, 10);
      
      this.passwordFormGroup.patchValue({
        password:response.password,
        confirmacion:response.password,
      })
      
      this.form.patchValue({
        nombre: response.nombre,
        mail: response.mail,
        sexo: response.sexo,
        apellido:response.apellido,
        username:response.username,
        fechaNacimiento:nacimientoTransform,

      })
      
      if (this.usuarioAEditar.domicilio!= null){
      

      this.domicilioForm.patchValue({
        domicilioCalle: this.usuarioAEditar.domicilio.calle === null ? '' : this.usuarioAEditar.domicilio.calle ,
        domicilioNumero: this.usuarioAEditar.domicilio.numero === null ? '' : this.usuarioAEditar.domicilio.numero,
        domicilioPiso: this.usuarioAEditar.domicilio.piso === null ? '' : this.usuarioAEditar.domicilio.piso,
        codPostal: this.usuarioAEditar.domicilio.codigoPostal === null ? '' : this.usuarioAEditar.domicilio.codigoPostal,
      })
    }

  });
  provinciaService.getProvinciasVigentes().subscribe((response:any)=>{
    this.provincias=response;
  });
 
  
  }

  getDepartamentosByProvincia(){
    this.showLocalidades=false;
    let provincia=this.form.controls['provincia'].value;
    if(provincia != 'Seleccione'){
    let submit; 
    this.showDepartamentos=true;
    this.provinciaService.getProvinciaByNombre(provincia).subscribe((provinciaResponse:Provincia)=>{
      this.departamentoService.getDepartamentosByProvincia(provinciaResponse.id).subscribe((res:any)=>{
        this.departamentos=res;
        this.getLocalidadesByDepartamento();
      })
    })
    }
    else {
      this.showDepartamentos=false;
      this.showLocalidades=false;
    }
    
  }

  getLocalidadesByDepartamento(){
    let provincia=this.form.controls['provincia'].value;
    let departamento=this.form.controls['departamento'].value;
    if(provincia != 'Seleccione' && departamento!='Seleccione' && departamento != ''){
      this.showLocalidades=true;
      this.localidadService.getLocalidadesByProvinciaAndDepartamento(provincia,departamento).subscribe((res:any)=>{
        
        if(res.length == 0){          
          this.showLocalidades=false;
        }
        else{
          this.localidades=res;
        }
      })
    }
    else{
      this.showLocalidades=false;
    }
  }


  guardarPerfil(){
    
    let nombre=this.form.controls['nombre'].value;
    let apellido=this.form.controls['apellido'].value;
    let mail=this.form.controls['mail'].value;
    let fechaNacimiento=this.form.controls['fechaNacimiento'].value;
    let sexo=this.form.controls['sexo'].value;
    let domicilioCalle=this.domicilioForm.controls['domicilioCalle'].value;
    let domicilioNumero=this.domicilioForm.controls['domicilioNumero'].value;
    let domicilioPiso=this.domicilioForm.controls['domicilioPiso'].value;
    let codPostal=this.domicilioForm.controls['codPostal'].value;
    let provincia=this.form.controls['provincia'].value;
    let departamento=this.form.controls['departamento'].value;
    let localidad=this.form.controls['localidad'].value;
    let username=this.form.controls['username'].value;
    let password = this.passwordFormGroup.controls['password'].value;
    let fechaBaja = this.usuarioAEditar.fechaBaja;
    let fechaUltimoIngreso = this.usuarioAEditar.fechaUltIngreso;
    let oferente = this.usuarioAEditar.oferente;
    let tipousuario = this.usuarioAEditar.tipoUsuario;
    let domicilio;
    

    if (this.usuarioAEditar.domicilio!=null){
      domicilio = new Domicilio(this.usuarioAEditar.domicilio.id, domicilioCalle, codPostal, domicilioNumero, domicilioPiso,null,null,null);
    }else{
      domicilio = new Domicilio(null, domicilioCalle, codPostal, domicilioNumero, domicilioPiso,null,null,null);
    }
   
    
    // this.domicilio.nombreLocalidad = localidad;

    let idusuario = localStorage.getItem("auth"); 

    let usuarioActualizado = new Usuario(idusuario,fechaBaja,fechaNacimiento ,
      fechaUltimoIngreso,mail,nombre,oferente,password,sexo, tipousuario, username ,null ,apellido, domicilio
                                  );      
      
   // console.log(usuarioActualizado);


      this.service.updateUsuario(usuarioActualizado).subscribe(response=>{
      // $('#sa-warningt').modal('hide');
        
      })
    
  }

  openAlert(){
    this.mensaje = mensajePerfil;
    $('#sa-warningt').modal('show');
  }
  openAlert01(){
    this.mensaje = mensajePerfil;
    $('#sa-warningt01').modal('show');
  }
  openAlert02(){
    this.mensaje = mensajeGuardar;
    $('#danger-alert').modal('show');
  }
  volver(){
    $('#sa-warningt').modal('hide');
  }
  volver01(){
    $('#sa-warningt01').modal('hide');
    $('#sa-warningt').modal('hide');
  }
  volver02(){
    $('#danger-alert').modal('hide');
  }
}