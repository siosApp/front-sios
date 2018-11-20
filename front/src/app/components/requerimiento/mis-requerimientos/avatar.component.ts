import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Imagen } from '../../perfil/perfil.component';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styles: []
})

export class AvatarComponent implements OnInit {

  @Input() id:any;
  urlImagen:string;

  imagenesCollections: AngularFirestoreCollection<Imagen>;
  constructor(private afs: AngularFirestore,private usuarioService:UsuarioService){
    this.imagenesCollections=this.afs.collection<Imagen>('perfil'); 
    this.urlImagen="assets/images/noimage.png";
  }
  
  ngOnInit(){
    this.usuarioService.getUsuarioById(this.id).subscribe((usuarioRes:any)=>{
      if(usuarioRes.imagen!=null){
        this.setURLImage(usuarioRes.imagen);
      }
    })
    
  }
  setURLImage(usuarioid):any{
    let url='assets/images/download.png';
    this.imagenesCollections = this.afs.collection<Imagen>('perfil', ref => ref.where('id', '==', usuarioid));
    let images = this.imagenesCollections.valueChanges();
    images.subscribe((res:any)=> {
        this.urlImagen=res[0].imageURL;
    })  
  }
}
