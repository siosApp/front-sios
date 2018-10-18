import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeOferta } from '../../../utils/params';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { ArchivoAdjunto } from '../../home/solicitar-trabajo.component';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';




declare var $:any;
@Component({
  selector: 'app-ofertar-requerimiento',
  templateUrl: './ofertar-requerimiento.component.html',
  styles: []
})



export class OfertarRequerimientoComponent implements OnInit{

  requerimientoForm:FormGroup;
  mensaje:string;
  requerimiento:any;
  nombreDemandante:string;
  mostrarAdjunto:boolean;
  idRequerimiento:string;
  archivosCollection: AngularFirestoreCollection<ArchivoAdjunto>;
  constructor(private router:Router,private activatedRouter:ActivatedRoute,
    private reqService:RequerimientoService,private userService:UsuarioService,
    private afStorage: AngularFireStorage,private afs: AngularFirestore) {
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('archivos');
    this.mostrarAdjunto=true;
    
    this.requerimientoForm=new FormGroup({
      'descripcion': new FormControl('',Validators.required),
      'tiempoEstimado': new FormControl('',Validators.required),
      'precio': new FormControl('',Validators.required)
    })
  }
  ngOnInit(){
    this.activatedRouter.params.subscribe(parametros=>{
      this.idRequerimiento=parametros['id'];
      this.reqService.getRequerimientoById(parametros['id']).subscribe((reqRes:any)=>{
        this.requerimiento=reqRes;
        this.userService.getUsuarioById(reqRes.idUsuario).subscribe((usuarioRes:any)=>{
          if(reqRes.urlArchivos == null || reqRes.urlArchivos.length === 0){
            this.mostrarAdjunto=false;
          }
          if(usuarioRes.nombre != null && usuarioRes.apellido !=null){
            this.nombreDemandante= usuarioRes.nombre+' '+usuarioRes.apellido;
          }
          else{
            this.nombreDemandante=usuarioRes.username;
          }
        })
      })
    })
  }
  visualizarArchivo(idArchivo){
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('archivos', ref => ref.where('id', '==', idArchivo));
    setTimeout(()=>{
      let files = this.archivosCollection.valueChanges();
      files.subscribe((res:any)=> {
        console.log(res[0].fileURL);
        window.open(res[0].fileURL);
      })
    }, 2000);
  }
  ofertarRequerimiento(){
    let descripcion=this.requerimientoForm.controls['descripcion'].value;
    let tiempoEstimado=this.requerimientoForm.controls['tiempoEstimado'].value;
    let precioApagar=this.requerimientoForm.controls['precio'].value;
    let idOferente= localStorage.getItem("auth");
    let ofertaRequerimiento ={
      id:null,
      asignado: false,
      precioOfertado: precioApagar,
      respuesta: descripcion,
      idRequerimiento: this.idRequerimiento,
      idUsuario: idOferente,
    }
    this.reqService.ofertarRequerimiento(ofertaRequerimiento).subscribe((response:any)=>{
      console.log("respuesta: ",response);
      
      $('#sa-warningt').modal('hide');
      this.requerimientoForm.reset();
      this.router.navigate(['/sios/home']);
    })
  }
  openAlert(){
    this.mensaje = mensajeOferta;
    $('#sa-warningt').modal('show');
  }
  volver(){
    $('#sa-warningt').modal('hide');
  }

}
