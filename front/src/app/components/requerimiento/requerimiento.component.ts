import { Component, OnInit } from '@angular/core';
import { mensajeRequerimiento, mensajeGuardadoRequerimiento } from '../../utils/params';
import { Usuario } from '../../models/usuario';
import { RequerimientoService } from '../../services/requerimiento.service';
import { Requerimiento } from '../../models/requerimiento';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { ArchivoAdjunto } from '../home/solicitar-trabajo.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, map } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { NgxNotificationService } from 'ngx-notification';
import { RubroService } from '../../services/rubro.service';
import { TipoRubroService } from '../../services/tipo-rubro.service';


declare var $:any;
@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styles: []
})

export class RequerimientoComponent{

  files:string[]=[];
  mensaje:string;
  form:FormGroup;
  usuarioLogueado:string;
  requerimiento:Requerimiento[]=[];
  archivosCollection: AngularFirestoreCollection<ArchivoAdjunto>;
  uploadPercent:Observable<number>;
  idArchivo:any;
  showRubros=false;
  rubros:any[]=[];
  tiposRubros:any[]=[];

  //Hay que hacer un refactor sobre esto de Firebase. Tiene que estar en un servicio.
  constructor(private service:RequerimientoService,private autserv:AutenticacionService,private afStorage: AngularFireStorage,
    private afs: AngularFirestore,private usuarioService:UsuarioService,private router:Router, private ngxNotificationService: NgxNotificationService,
    private rubroService:RubroService,private tipoRubroService:TipoRubroService) {
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('archivos'); 
    this.form= new FormGroup({
      'descripcion': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'precioApagar': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'tiempoEstimado': new FormControl('',[Validators.required,Validators.minLength(1)]),
      'titulo': new FormControl('',[Validators.required,Validators.minLength(1)]),
      'archivoUno': new FormControl(''),
      'tipoRubro': new FormControl(''),
      'rubro': new FormControl('')
    });
    tipoRubroService.getTipoRubrosVigentes().subscribe((response:any)=>{
      this.tiposRubros=response;
    });
    rubroService.getRubrosVigentes().subscribe((res:any)=>{
      this.rubros=res;
    });
    this.setValueDefault();
  }
  setValueDefault(){
    this.form.patchValue({
      rubro: 'Seleccione',
      tipoRubro: 'Seleccione'
    })
   
  }
  getRubrosByTipoRubro(){
    let tipoRubro=this.form.controls['tipoRubro'].value;
    if(tipoRubro !='Seleccione'){
      this.rubroService.getRubrosByTipoRubro(tipoRubro).subscribe((response:any)=>{
        this.rubros=response;
        this.showRubros=true;
      })
    }
    else{
      this.showRubros=false;
    }
    
  }
  addFile(event,index){
    let file=event.target.files[0];
    console.log("file: ",file);
    if((file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf") && file.size <= 5000000){
      this.idArchivo=this.subirArchivo(file);
      this.files[0]=this.idArchivo;      
    }
    else{
      this.mostrarMensajeArchivoIncorrecto();
      this.form.controls['archivoUno'].setValue("");
    }
  }

  mostrarMensajeArchivoIncorrecto() {
  	this.ngxNotificationService.sendMessage('Archivo excede los 5 mb o posee un formato inválido.', 'danger', 'bottom');
  }

  subirArchivo(archivo){
    //Tener en cuenta que las imagenes que sean de perfil conviene guardarlas en una carpeta 'perfil'
    //Y los demás doc que vengan adjuntos de una solicitud de trabajo o de publicar un requerimiento, que estén en una carpeta 'doc'
    let path = `doc/${new Date().getTime()}_${archivo.name}`;
    const fileRef = this.afStorage.ref(path);
    // main task
    let task = this.afStorage.upload(path, archivo);
    this.afStorage.upload(path, archivo);
    let id;
    if(this.idArchivo!=null){
      id=this.idArchivo;
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
          const fileURL = data;
          // storing image path in firestore
          const filePath = path;
          // Image name fetched from ngModel on 'imageNm' field
          const fileName = archivo.name;
          // To store timestamp of the image before being inserted in firestore
          //const maintTs = Date.now();
          const file: ArchivoAdjunto = { id, filePath, fileURL, fileName};
          //Creando coleccion..
          this.archivosCollection.doc(id).set(file);
        });
      })
   ).subscribe();
   return id;
  }



  abrirModal(){
    $('#sa-warningt').modal('show');
  }
  volver(){
    $('#sa-warningt01').modal('hide');
    this.router.navigate(['/sios/home']);
  }

  cerrarTipoRubroModal(){
    this.volverPerfil();
    $('.tipoRubroModal').modal('hide');
  }

  volverPerfil(){
    $('#sa-warningt ').modal('hide');
  }

  cerrarErrorModal(){
    this.volverPerfil();
    $('.errorModal').modal('hide');
  }

  guardarRequerimiento(){
    
    if(!this.form.valid){
      $('.errorModal').modal('show');
      return;
    }

    let idUsuario = localStorage.getItem("auth");
    let tipoRubro = this.form.controls['tipoRubro'].value;
    let rubro = this.form.controls['rubro'].value;
    if (tipoRubro == "Seleccione" || rubro == "Seleccione" ){
      $('.tipoRubroModal').modal('show');
      return;
    }
    //Refactor sobre esto. Los componentes no tienen que acceder al localStorage. Solamente debería hacerlo servicio.
    this.usuarioService.getUsuarioById(idUsuario).subscribe((usuarioRes:any)=>{
      let requerimiento ={
        id:null,
        fechaPublicacion: Date.now(),
        descripcion: this.form.controls['descripcion'].value,
        idUsuario: idUsuario,
        nombreEstadoRequerimiento: 'Activo',
        precioApagar: this.form.controls['precioApagar'].value,
        tiempoEstimado: this.form.controls['tiempoEstimado'].value,
        titulo: this.form.controls['titulo'].value, 
        urlArchivos: this.files,
        nombreRubro: this.form.controls['rubro'].value
      }        
      this.service.crearRequerimiento(requerimiento).subscribe(response=>{
        this.form.reset();
        
        $('#sa-warningt').modal('hide');
        $('#sa-warningt01').modal('show');

      })
  })    
  }

  spinerIrPerfil(){
    $('#spinerRequerimiento').modal('show');
    setTimeout(()=>{ 
      this.router.navigate(['/sios/perfil']);
      $('#spinerRequerimiento').modal('hide');
    },1000);
  }

  spinerDestacarme(){
    $('#spinerRequerimiento').modal('show');
    setTimeout(()=>{ 
      this.router.navigate(['/sios/destacar-perfil']);
      $('#spinerRequerimiento').modal('hide');
    },1000);
  }

}
