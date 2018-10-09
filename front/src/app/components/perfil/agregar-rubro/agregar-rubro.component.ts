import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TipoRubroService } from '../../../services/tipo-rubro.service';
import { TipoRubro } from '../../../models/tipo-rubro';
import { RubroService } from '../../../services/rubro.service';
import { Rubro } from '../../../models/rubro';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioRubro } from '../../../models/usuario-rubro';
import { mensajeRubro} from '../../../utils/params';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { ArchivoAdjunto } from '../../home/solicitar-trabajo.component';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
declare var $:any;

@Component({
  selector: 'app-agregar-rubro',
  templateUrl: './agregar-rubro.component.html',
  styles: []
})
export class AgregarRubroComponent{
 
 
  form:FormGroup;
  certificadoForm:FormGroup;
  experienciaForm:FormGroup;
  tiposRubros:TipoRubro[];
  rubros:Rubro[];
  showRubros=false;
  usuarioAEditar:Usuario;
  rubrosDeUsuario:UsuarioRubro[];
  mensaje:string;
  certificados:any[];
  experiencias:any[];
  archivosCollection: AngularFirestoreCollection<ArchivoAdjunto>;
  files:string[]=[];
  usuarioRubro:UsuarioRubro;
  constructor(private tipoRubroService:TipoRubroService,private rubroService:RubroService, private fb:FormBuilder, private service:UsuarioService,
    private afStorage: AngularFireStorage,private afs: AngularFirestore) { 

    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('certificados'); 
    tipoRubroService.getTipoRubrosVigentes().subscribe((response:any)=>{
      this.tiposRubros=response;
    });
    rubroService.getRubrosVigentes().subscribe((res:any)=>{
      this.rubros=res;
    })
    this.certificadoForm= new FormGroup({
      'nombreCertificado': new FormControl('',[Validators.required,Validators.minLength(8)]),
      'archivo': new FormControl('',Validators.required)
    })
    this.form=fb.group({
      'rubro': new FormControl(''),
      'tipoRubro': new FormControl('')
    });

    let idusuario = localStorage.getItem("auth");
    this.service.getUsuarioById(idusuario).subscribe( (response:any) =>{
      this.usuarioAEditar=response;
      console.log("Usuario: ",response);
      this.rubrosDeUsuario = this.usuarioAEditar.usuarioRubros;
      this.setValueDefault(); 
    });
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
      this.showRubros=true;
      this.rubroService.getRubrosByTipoRubro(tipoRubro).subscribe((response:any)=>{
        this.rubros=response;
      })
    }
    else{
      this.rubroService.getRubrosVigentes().subscribe((res:any)=>{
        this.rubros=res;
      })
    }
  }

  confirmarAgregarRubro(){
    this.mensaje = mensajeRubro;
    $('#sa-warningt').modal('show');
  }
  abrirModalCertificado(rubro){
    $('#custom-width-modal').modal('show');
    this.certificados=rubro.certificados;
    this.usuarioRubro=rubro;
  }
  abrirExperiencia(rubros){
    $('#custom-width-modal01').modal('show');
    this.experiencias=rubros.experiencias;
  }

  volver(){
    $('#sa-warningt').modal('hide');
  }

  guardarTipoRubro(){  
    let rubro=this.form.controls['rubro'].value;
    let tipoRubro=this.form.controls['tipoRubro'].value;
    let idUsuario = localStorage.getItem("auth");
    this.service.agregarRubro(idUsuario,rubro,tipoRubro).subscribe((res:Usuario)=>{
      this.form.reset();
      $('#sa-warningt').modal('hide');
      this.rubrosDeUsuario=res.usuarioRubros;
      this.setValueDefault();
      this.showRubros=false;
    });
  }
  eliminarRubro(id){
    let idUsuario= localStorage.getItem("auth");//Esta muy asqueroso esto, deberia algun dia poder hacer andar ese servicio de autenticacion
    this.service.eliminarRubro(idUsuario,id).subscribe((res:Usuario)=>{
      this.rubrosDeUsuario=res.usuarioRubros;
      $.Notification.notify('success','top left', 'Exito', 'Se ha eliminado el rubro.');
    })
  }

  guardarCertificado(){
    if(this.certificadoForm.valid){
      let nombre=this.certificadoForm.controls['nombreCertificado'].value;
      console.log("file: ",this.files[0]);
      let idArchivo=this.subirArchivo(this.files[0]);
      let certificado={
        id:null,
        nombreCertificado: nombre,
        fechaCertificado: Date.now(),
        idAdjunto: idArchivo
      }
      console.log("rubro seleccionado: ",this.usuarioRubro);
      this.rubroService.addOrEliminarCertificado(this.usuarioRubro.id,certificado).subscribe((usuarioRubro:UsuarioRubro)=>{
        this.certificados=usuarioRubro.certificados;
        this.certificadoForm.reset();
      })
    }
  }
  eliminarCertificado(certificado){
    this.rubroService.addOrEliminarCertificado(this.usuarioRubro.id,certificado).subscribe((usuarioRubro:UsuarioRubro)=>{
      this.certificados=usuarioRubro.certificados;
    })
  }
  descargarArchivo(id){
    let imageURL: Observable<string | null>;
    let file= this.afs.collection('certificados', ref => ref.where('id', '==', id)).valueChanges();
    file.subscribe((doc:any)=>{
      console.log("File: ",doc);
      
      let file:any= this.afStorage.ref('certificados/'+doc[0].filePath).getDownloadURL();
      file.then(downloadURL => {
          const imageUrl = downloadURL;
          console.log('URL:' + imageUrl);
      });
      // let task:any=ref.put(file);
      // ref.snapshot.ref.getDownloadURL().then(downloadURL => {
      //   const imageUrl = downloadURL;
      //   console.log('URL:' + imageUrl);
      // });
      //imageURL = ref.getDownloadURL();
    })
    //const uploadTask=file.
    
  }
  //Firebase
  addFile(event,index){
    let file=event.target.files[0];
    if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf" || file.size <= 5000000){
      //this.idArchivo=this.subirArchivo(file);
      this.files[0]=file;     
    }
    else{
      $.Notification.notify('error','top left', 'Error', 'Archivo excede los 5 mb o posee un formato inválido.');
      this.form.controls['archivo'].setValue("");
    }
  }

  subirArchivo(archivo){
    //Tener en cuenta que las imagenes que sean de perfil conviene guardarlas en una carpeta 'perfil'
    //Y los demás doc que vengan adjuntos de una solicitud de trabajo o de publicar un requerimiento, que estén en una carpeta 'doc'
    let path = `${new Date().getTime()}_${archivo.name}`;
    const fileRef = this.afStorage.ref(path);
    // main task
    let task = this.afStorage.upload(path, archivo);
    this.afStorage.upload(path, archivo);
    let id= this.afs.createId();
    // this.uploadPercent = task.percentageChanges();
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
