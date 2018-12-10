import { Component, OnInit } from '@angular/core';
import { Imagen } from '../perfil.component';
import { ArchivoAdjunto } from '../../home/solicitar-trabajo.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-perfil-demandante',
  templateUrl: './perfil-demandante.component.html',
  styleUrls: ['./perfil-demandante.component.css']
})
export class PerfilDemandanteComponent{

  usuario:any;
  showTablaCertificados:boolean;
  showTablaExperiencias:boolean;
  archivosCollection: AngularFirestoreCollection<ArchivoAdjunto>;
  imagenesCollections: AngularFirestoreCollection<Imagen>;
  imagen:any;
  cantidadEstrellasNegativas:number;
  comentarios: any[];
  constructor(private activatedRoute:ActivatedRoute,private usuarioService:UsuarioService,private afs: AngularFirestore) {
    this.cantidadEstrellasNegativas = 0;

    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('certificados');
    this.imagenesCollections=this.afs.collection<Imagen>('perfil'); 
    this.imagen='assets/images/noimage.png';              
    this.showTablaCertificados=false;
    this.showTablaExperiencias=false;
    activatedRoute.params.subscribe((parametrosRuta:any)=>{
      usuarioService.getUsuarioById(parametrosRuta["id"]).subscribe((usuarioRes:any)=>{
        console.log("Usuario: ",usuarioRes);
        this.usuario=usuarioRes;
        // Set Foto Perfil
        this.cargarImagen(usuarioRes);
        this.cantidadEstrellasNegativas = 5 - usuarioRes.promedioCalificacion;
      })
      usuarioService.getComentariosOferentes(parametrosRuta["id"]).subscribe( (comRes:any)=>{
        console.log("comentario",comRes[0]);
        
        this.comentarios=comRes;
      })
    })
  }

  toArray(n: number): any[] {
    return Array(n);
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

}
