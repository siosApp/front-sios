import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Imagen } from '../components/perfil/perfil.component';
import { finalize } from 'rxjs/operators';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  imagenesCollections: AngularFirestoreCollection<Imagen>;
  constructor(private afStorage: AngularFireStorage,private afs: AngularFirestore){
    this.imagenesCollections=this.afs.collection<Imagen>('perfil'); 
  }

  transform(usuarios): string {
  if(usuarios!==null && usuarios.length>0){ 
    let usuario=usuarios[0];
    console.log("Usuario Editar: ",usuario);
    if(usuario != undefined && usuario !== null && usuario.imagen !==null && usuario.imagen !==undefined && usuario.imagen !== ''){
      //Traer imagen de firebase
      console.log("Image id: ",usuario.imagen);
      this.buscar(usuario.imagen);
      return '';
    }
    else{
      return 'assets/images/noimage.png';
    }
  }
    else{
      return 'assets/images/noimage.png';
    }
  }
  buscar(usuario){
    let file= this.afs.collection('perfil', ref => ref.where('id', '==', usuario.imagen)).valueChanges();
    console.log("Ejecutando pipe: ",file);
    
  }
}
