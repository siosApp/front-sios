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
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  localidades:Localidad[]=[];
  departamentos:Departamento[]=[];
  showDepartamentos=false;
  showLocalidades=false;
  mensaje:string;
  imagenesCollections: AngularFirestoreCollection<Imagen>;
  uploadPercent:Observable<number>;
  idImagen:any;
  imagenUrl:string;
  eventImage:any;
  
  constructor(private service:UsuarioService, private fb:FormBuilder,private router:Router,
              private provinciaService:ProvinciaService,
              private departamentoService:DepartamentoService,
              private localidadService:LocalidadService,private afStorage: AngularFireStorage,
              private afs: AngularFirestore) {
      this.imagenesCollections=this.afs.collection<Imagen>('perfil'); 
      this.imagenUrl='assets/images/noimage.png';              
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
        'provincia': new FormControl('',Validators.required),
        'departamento': new FormControl('',Validators.required),
        'localidad': new FormControl('',Validators.required),
        'passwordFormGroup': this.passwordFormGroup,
        'domicilioForm': this.domicilioForm
      });
    //Traer todos los datos!
    this.setValuesSelectDefault();
    let idusuario = localStorage.getItem("auth");
    this.service.getUsuarioById(idusuario).subscribe( (response:any) =>{
      //Si tiene domicilio
      this.usuarioAEditar=response;
      if(response.domicilio !== null){
        this.setPerfilConDomicilio(response);
      }
      else{
        this.setPerfilSinDomicilio(response);
      }
      this.cargarImagen(response);
    });
    provinciaService.getProvinciasVigentes().subscribe((response:any)=>{
      this.provincias=response;
    });
  }
  cargarImagen(user){
    if(user.imagen !=null && user.imagen !== ""){
      //Buscar en Firebase
      this.imagenesCollections = this.afs.collection<Imagen>('perfil', ref => ref.where('id', '==', user.imagen));
      let images = this.imagenesCollections.valueChanges();
      images.subscribe((res:any)=> {
        console.log("Res: ",res);
        this.imagenUrl=res[0].imageURL;
      })
      
    }
  }
  setValuesSelectDefault(){
    this.form.patchValue({
      provincia: 'Seleccione',
      departamento: 'Seleccione',
      localidad: 'Seleccione'
    })
  }
  setPerfilConDomicilio(response){
    this.localidadService.getLocalidadByDomicilio(response.domicilio.id).subscribe((localidadRes:Localidad)=>{
      this.passwordFormGroup.patchValue({
        password:response.password,
        confirmacion:response.password
      })
      const nacimiento= new Date(response.fechaNacimiento);
      const nacimientoTransform = nacimiento.toISOString().substring(0, 10);
      this.departamentoService.getDepartamentosByProvincia(localidadRes.departamento.provincia.id).subscribe((res:any)=>{
        this.departamentos=res;
        this.showDepartamentos=true;
      })
      this.localidadService.getLocalidadesByProvinciaAndDepartamento(localidadRes.departamento.provincia.nombreProvincia,localidadRes.departamento.nombreDepartamento)
      .subscribe((res:any)=>{
        this.localidades=res;
        this.showLocalidades=true;
      })
      this.domicilioForm.patchValue({
        domicilioCalle: response.domicilio.calle ,
        domicilioNumero: response.domicilio.numero,
        codPostal: response.domicilio.codigoPostal,
        domicilioPiso: response.domicilio.piso
      })
      this.form.patchValue({
        nombre: response.nombre,
        mail: response.mail,
        sexo: response.sexo,
        apellido:response.apellido,
        username:response.username,
        fechaNacimiento:nacimientoTransform,
        provincia:localidadRes.departamento.provincia.nombreProvincia,
        departamento:localidadRes.departamento.nombreDepartamento,
        localidad:localidadRes.nombreLocalidad
      })
    });
  }
  setPerfilSinDomicilio(response){
    this.passwordFormGroup.patchValue({
      password:response.password,
      confirmacion:response.password
    })
    const nacimiento= new Date(response.fechaNacimiento);
    const nacimientoTransform = nacimiento.toISOString().substring(0, 10);
    this.form.patchValue({
      nombre: response.nombre,
      mail: response.mail,
      sexo: response.sexo,
      apellido:response.apellido,
      username:response.username,
      fechaNacimiento:nacimientoTransform
    })
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
  addFile(event,index){
    let file=event.target.files[0];
    console.log("file: ",file);
    if(file.type === "image/jpeg" || file.type === "image/png" ||file.size <= 2000000){
      //this.idImagen=this.subirArchivo(file);
      //this.usuarioAEditar.imagen=this.idImagen;
      //Insertando imagen en el HTML
      this.eventImage=file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        $('#fotoPerfil').attr('src', URL.createObjectURL(event.target.files[0]));
        $('#fotoPerfilModal').attr('src', URL.createObjectURL(event.target.files[0]));              
      };      
    }
    else{
      $.Notification.notify('error','top left', 'Error', 'Archivo excede los 5 mb o formato inválido.');
      this.form.controls['archivoUno'].setValue("");
    }
  }

  abrirModalImagen(){
    $("#imagen-modal").modal("show");
  }
  cerrarModalImagen(){
    if(this.eventImage!=null){
      this.idImagen=this.subirArchivo(this.eventImage);
      this.usuarioAEditar.imagen=this.idImagen;
    }
    $("#imagen-modal").modal("hide");
  }
  subirArchivo(imagen){
    //Tener en cuenta que las imagenes que sean de perfil conviene guardarlas en una carpeta 'perfil'
    //Y los demás doc que vengan adjuntos de una solicitud de trabajo o de publicar un requerimiento, que estén en una carpeta 'doc'
    let path = `perfil/${new Date().getTime()}_${imagen.name}`;
    const fileRef = this.afStorage.ref(path);
    // main task
    let task = this.afStorage.upload(path, imagen);
    this.afStorage.upload(path, imagen);
    let id;
    if(this.usuarioAEditar.imagen !=null && this.usuarioAEditar.imagen !=""){
      id=this.usuarioAEditar.imagen;
    }
    else{
      id= this.afs.createId();
    }
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        // The above step returns an observable which can be subscribed to fetch the data within it
        let downloadURL= fileRef.getDownloadURL();
        downloadURL.subscribe(data => {
          // storing downloadURL as imageURL
          const imageURL = data;
          // storing image path in firestore
          const imagePath = path;
          // Image name fetched from ngModel on 'imageNm' field
          const imageName = imagen.name;
          // To store timestamp of the image before being inserted in firestore
          //const maintTs = Date.now();
          const file: Imagen = { id, imagePath, imageURL, imageName};
          //Creando coleccion..
          this.imagenesCollections.doc(id).set(file);
        });
      })
   ).subscribe();
   return id;
  }

  guardarPerfil(){
    console.log(" usuario", this.usuarioAEditar);
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
    
    this.localidadService.getLocalidadesByNombreAndProvinciaAndDepartamento(localidad,provincia,departamento).subscribe((localidadRes:Localidad)=>{
      if (this.usuarioAEditar.domicilio!=null){
        domicilio = new Domicilio(this.usuarioAEditar.domicilio.id, domicilioCalle, codPostal, domicilioNumero, domicilioPiso,null,null,localidadRes.id);
      }else{
        domicilio = new Domicilio(null, domicilioCalle, codPostal, domicilioNumero, domicilioPiso,null,null,localidadRes.id);
      }
      console.log("Domicilio: ",domicilio);
      let idusuario = localStorage.getItem("auth"); 
      let usuarioActualizado = new Usuario(idusuario,fechaBaja,fechaNacimiento ,
      fechaUltimoIngreso,mail,nombre,oferente,password,sexo, tipousuario, username ,null ,apellido, domicilio,this.usuarioAEditar.imagen);  
      console.log("Usuario: ",usuarioActualizado);
      this.service.updateUsuario(usuarioActualizado).subscribe(response=>{
        $('#sa-warningt').modal('hide');
        this.router.navigate(['/sios/home']);
      })
    })
  }
  hayCambiosEnPerfil(){
    if (this.form.touched || this.eventImage != null){
      return true;
    }
    return false
  }
  confirmarGuardar(){
    this.mensaje = mensajePerfil;
    $('#sa-warningt').modal('show');
  }
  irAPantallaOferente(){
    if(this.hayCambiosEnPerfil()){
      this.mensaje = mensajeGuardar;
      $('#danger-alert').modal('show');
    }
    else{
      this.irAPageAgregarRubro();
    }
  }
  irAPageAgregarRubro(){
    $('#danger-alert').modal('hide');
    this.router.navigate(['/sios/agregarRubro']);
  }
  volver(){
    $('#sa-warningt').modal('hide');
  }
  // volver01(){
  //   $('#sa-warningt01').modal('hide');
  //   $('#sa-warningt').modal('hide');
  // }
  volverAlPerfil(){
    $('#danger-alert').modal('hide');
  }
}

export interface Imagen { id:string;imagePath:string;imageURL:string,imageName:string}