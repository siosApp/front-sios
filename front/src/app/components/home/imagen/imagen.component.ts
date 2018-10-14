import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Imagen } from '../../perfil/perfil.component';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styles: []
})
export class ImagenComponent implements OnInit{

  @Input() usuario:any;
  urlImagen:string;

  imagenesCollections: AngularFirestoreCollection<Imagen>;
  constructor(private afStorage: AngularFireStorage,private afs: AngularFirestore){
    this.imagenesCollections=this.afs.collection<Imagen>('perfil'); 
    this.urlImagen="assets/images/noimage.png";
  }
  
  ngOnInit(){
    if(this.usuario.imagen!=null){
      this.setURLImage(this.usuario.imagen);
    }
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
