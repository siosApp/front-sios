import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { ArchivoAdjunto } from '../../home/solicitar-trabajo.component';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Imagen } from '../../perfil/perfil.component';

@Component({
  selector: 'app-perfil-oferente',
  templateUrl: './perfil-oferente.component.html',
  styleUrls: ['./perfil-oferente.component.css']
})
export class PerfilOferenteComponent {

  usuario:any;
  showTablaCertificados:boolean;
  showTablaExperiencias:boolean;
  certificados:any[]=[];
  experiencias:any[]=[];
  archivosCollection: AngularFirestoreCollection<ArchivoAdjunto>;
  imagenesCollections: AngularFirestoreCollection<Imagen>;
  imagen:any;
  constructor(private activatedRoute:ActivatedRoute,private usuarioService:UsuarioService,private afs: AngularFirestore) {
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('certificados');
    this.imagenesCollections=this.afs.collection<Imagen>('perfil'); 
    this.imagen='assets/images/noimage.png';              
    this.showTablaCertificados=false;
    this.showTablaExperiencias=false;
    activatedRoute.params.subscribe((parametrosRuta:any)=>{
      usuarioService.getUsuarioById(parametrosRuta["id"]).subscribe((usuarioRes:any)=>{
        console.log("Usuario: ",usuarioRes);
        this.usuario=usuarioRes;
        if(usuarioRes.usuarioRubros.length > 0 && usuarioRes.usuarioRubros[0].certificados.length > 0){
          //Mostrar Certificados
          console.log("Experiencias: ",usuarioRes.usuarioRubros[0].certificados);   
          this.showTablaCertificados=true;
          this.certificados=usuarioRes.usuarioRubros[0].certificados;
        }
          //Mostrar experiencias
        if(usuarioRes.usuarioRubros.length > 0 && usuarioRes.usuarioRubros[0].experiencias.length > 0){
          this.showTablaExperiencias=true;
          this.experiencias=usuarioRes.usuarioRubros[0].experiencias;
        }
        // Set Foto Perfil
        this.cargarImagen(usuarioRes);
      })
    })
  }
  cargarImagen(user){
    if(user.imagen !=null && user.imagen !== ""){
      //Buscar en Firebase
      this.imagenesCollections = this.afs.collection<Imagen>('perfil', ref => ref.where('id', '==', user.imagen));
      let images = this.imagenesCollections.valueChanges();
      images.subscribe((res:any)=> {
        this.imagen=res[0].imageURL;
      })
      
    }
  }
  visualizarArchivo(id){
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('doc', ref => ref.where('id', '==', id));
      setTimeout(()=>{
        let files = this.archivosCollection.valueChanges();
        files.subscribe((res:any)=> {
          console.log(res[0].fileURL);
          window.open(res[0].fileURL);
        })
      }, 4000);
  }
}
