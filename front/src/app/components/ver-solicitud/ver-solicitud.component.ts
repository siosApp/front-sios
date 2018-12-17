import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SolicitarTrabajoService } from '../../services/solicitar-trabajo.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ArchivoAdjunto } from '../home/solicitar-trabajo.component';

declare var $:any;
@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styles: []
})
export class VerSolicitudComponent implements OnInit {

  finalizarSolicitudForm:FormGroup;
  solicitudes:any[]=[];
  cantidadSolicitudesPendientes:number;
  solicitudSeleccionada:any;
  tieneArchivo:boolean;
  archivosCollection: AngularFirestoreCollection<ArchivoAdjunto>;
  constructor(private solicitudService:SolicitarTrabajoService,private afs: AngularFirestore) {
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('archivos'); 
    this.cantidadSolicitudesPendientes=0;
    this.tieneArchivo=false;
  }

  ngOnInit() {
    this.finalizarSolicitudForm=new FormGroup({
      'calificacion': new FormControl('',[Validators.required,Validators.pattern('[1-5]')]),
      'comentario': new FormControl('',Validators.required)
    })
    this.recargarDatos();
  }
  aceptarSolicitud(solicitud){
    $('#aceptarSolicitud').modal('show');
    this.solicitudSeleccionada=solicitud;
  }
  confirmarAceptarSolicitud(){
    this.solicitudService.aceptarSolicitud(this.solicitudSeleccionada.id).subscribe((res:any)=>{
      this.volver();
      this.solicitudSeleccionada=null;
      this.recargarDatos();
    })    
  }
  abrirDetalleSolicitud(solicitud){
    $('#detalleSolicitudModal').modal('show');
    this.solicitudSeleccionada=solicitud;
    if(solicitud.urlArchivos !=null && solicitud.urlArchivos.length > 0){
      this.tieneArchivo=true;
    }
    else{
      this.tieneArchivo=false;
    }
  }

  rechazarSolicitud(solicitud){
    $('#rechazarSolicitud').modal('show');
    this.solicitudSeleccionada=solicitud;
  }
  confirmarRechazarSolicitud(){
    this.solicitudService.rechazarSolicitud(this.solicitudSeleccionada.id).subscribe((res:any)=>{
      this.volver01();
      this.solicitudSeleccionada=null;
      this.recargarDatos();
    })
  }

  finalizarSolicitud(solicitud){
    $('#finalizarSolicitud').modal('show');
    this.solicitudSeleccionada=solicitud;
  }

  confirmarFinalizarSolicitud(){
    if(this.finalizarSolicitudForm.valid){
      let calificacion= this.finalizarSolicitudForm.controls['calificacion'].value;
      let comentario=this.finalizarSolicitudForm.controls['comentario'].value;
      this.solicitudService.finalizarSolicitud(this.solicitudSeleccionada.id,calificacion,comentario).subscribe((res:any)=>{
        this.solicitudSeleccionada=null;
        this.finalizarSolicitudForm.reset();
        this.volver03(); 
        this.recargarDatos();
      })
    }
  }

  visualizarArchivo(){
    let id=this.solicitudSeleccionada.urlArchivos[0];
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('archivos', ref => ref.where('id', '==', id));
    setTimeout(()=>{
      let files = this.archivosCollection.valueChanges();
      files.subscribe((res:any)=> {
        window.open(res[0].fileURL);
      })
    }, 2000);
  }
  recargarDatos(){
    let id=localStorage.getItem("auth");
    this.solicitudService.getSolicitudesPorUsuario(id).subscribe((solicitudRes:any)=>{
        this.solicitudes=solicitudRes;
    })
    this.solicitudService.getCantidadSolicitudesPendientesPorUsuario(id).subscribe((cantidad:any)=>{
      this.cantidadSolicitudesPendientes=cantidad;
    })
  }
  volver(){
    $('#aceptarSolicitud').modal('hide');
  }
  volver01(){
    $('#rechazarSolicitud').modal('hide');
  }
  volver02(){
    $('#detalleSolicitudModal').modal('hide');
  }

  volver03(){
    this.finalizarSolicitudForm.reset();
    $('#finalizarSolicitud').modal('hide');
  }

  

}
