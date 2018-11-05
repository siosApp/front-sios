import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileService } from '../../services/file.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SolicitarTrabajoService } from '../../services/solicitar-trabajo.service';
import { Archivo } from '../../models/archivo';
import { Imagen } from '../perfil/perfil.component';
import { NgxNotificationService } from 'ngx-notification';
import { RubroService } from '../../services/rubro.service';
import { TipoRubroService } from '../../services/tipo-rubro.service';

declare var $:any;
@Component({
  selector: 'app-solicitar-trabajo',
  templateUrl: './solicitar-trabajo.component.html',
  styles: []
})
export class SolicitarTrabajoComponent {


  oferente:Usuario;
  files:string[]=[];
  solicitudForm:FormGroup;
  archivosCollection: AngularFirestoreCollection<ArchivoAdjunto>;
  uploadPercent:Observable<number>;
  urlImagen:string;
  imagenesCollections: AngularFirestoreCollection<Imagen>;
  file:any;
  tiposRubros:any[]=[];
  rubros:any[]=[];
  showRubros=false;
  constructor(private usuarioService:UsuarioService,private afStorage: AngularFireStorage,private afs: AngularFirestore,
    private location:Location,private activatedRoute:ActivatedRoute,
    private fileService:FileService,private solicitudService:SolicitarTrabajoService, private ngxNotificationService: NgxNotificationService,
    private rubroService:RubroService,private tipoRubroService:TipoRubroService) {

    this.urlImagen="assets/images/noimage.png";
    activatedRoute.params.subscribe((parametros:any)=>{
      usuarioService.getUsuarioById(parametros['id']).subscribe((usuarioRes:any)=>{
        console.log("Oferente: ",usuarioRes);
        this.oferente=usuarioRes;
        if(this.oferente.imagen!=null){
          this.setFotoPerfil(this.oferente.imagen);
        }
      })
    })
    tipoRubroService.getTipoRubrosVigentes().subscribe((response:any)=>{
      this.tiposRubros=response;
    });
    rubroService.getRubrosVigentes().subscribe((res:any)=>{
      this.rubros=res;
    })
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('archivos');
    this.solicitudForm=new FormGroup({
      'descripcion': new FormControl('',Validators.required),
      'archivoUno' : new FormControl(''),
      'tipoRubro' : new FormControl('',Validators.required),
      'rubro' : new FormControl('',Validators.required)
    })
    this.setValueDefault();
  }
  setValueDefault(){
    this.solicitudForm.patchValue({
      rubro: 'Seleccione',
      tipoRubro: 'Seleccione'
    })
   
  }
  getRubrosByTipoRubro(){
    let tipoRubro=this.solicitudForm.controls['tipoRubro'].value;
    if(tipoRubro !='Seleccione'){
      this.rubroService.getRubrosByTipoRubro(tipoRubro).subscribe((response:any)=>{
        this.rubros=response;
        this.showRubros=true;
      })
    }
    else{
      this.showRubros=false;
      // this.rubroService.getRubrosVigentes().subscribe((res:any)=>{
      //   this.rubros=res;
      // })
    }
    
  }
  setFotoPerfil(idUsuario){
    let url='assets/images/download.png';
    this.imagenesCollections = this.afs.collection<Imagen>('perfil', ref => ref.where('id', '==', idUsuario));
    let images = this.imagenesCollections.valueChanges();
    images.subscribe((res:any)=> {
        this.urlImagen=res[0].imageURL;
    })  
  }

  volverAlHome(){
    this.location.back();
  }

  abrirModal(){
    $('#crearSolicitud').modal('show');
  }

  volver(){
    $('#crearSolicitud').modal('hide');
  }

  notificarArchivoNoPermitido() {
  	this.ngxNotificationService.sendMessage('Archivo excede los 5 mb o el formato es inválido.', 'danger', 'bottom');
  }

  addFile(event,index){
    let file=event.target.files[0];
    console.log("File: ",file);
    
    if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf" || file.size <= 5000000){
      this.file=file;
    }
    else{
      this.notificarArchivoNoPermitido();
      this.solicitudForm.controls['archivoUno'].setValue("");
    }
  }

  guardarSolicitud(){
    $('#spinerSolicitarTrabajo').modal('show');
    $('#crearSolicitud').modal('hide');
    let idLogueado= localStorage.getItem("auth");
    let descripcion= this.solicitudForm.controls['descripcion'].value;
    let rubro=this.solicitudForm.controls['rubro'].value;
    //Guardando archivos en Firebase..
    if(this.file!=null){
      let idArchivo=this.subirArchivo(this.file);
      this.files.push(idArchivo);
    }

   
    setTimeout(()=>{
      
      this.usuarioService.getUsuarioById(idLogueado).subscribe((usuarioRes:any)=>{
        let solicitud ={
          id:null,
          fechaSolicitud: Date.now(),
          descripcion: descripcion,
          nombreEstadoSolicitud: "Creada",
          urlArchivos: this.files,
          usuarioDemandante: usuarioRes.username, 
          usuarioOferente: this.oferente.username,
          nombreRubro: this.oferente.usuarioRubros[0].rubro.nombreRubro
        }
        this.solicitudService.crearSolicitud(solicitud).subscribe((res:any)=>{
          
          $('#spinerSolicitarTrabajo').modal('hide');

          
            $('#solicitud-completa').modal('show');
          
          

          //this.location.back();
        })
      })
    },4000);
    
  }
  terminar(){
    $('#solicitud-completa').modal('hide');
    this.location.back();
  }
  subirArchivo(archivo){
    //Tener en cuenta que las imagenes que sean de perfil conviene guardarlas en una carpeta 'perfil'
    //Y los demás doc que vengan adjuntos de una solicitud de trabajo o de publicar un requerimiento, que estén en una carpeta 'doc'
    let path = `doc/${new Date().getTime()}_${archivo.name}`;
    const fileRef = this.afStorage.ref(path);
    // main task
    let task = this.afStorage.upload(path, archivo);
    this.afStorage.upload(path, archivo);
    let id=this.afs.createId();
    
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

  
}



export interface ArchivoAdjunto { id:string;filePath:string;fileURL:string,fileName:string}