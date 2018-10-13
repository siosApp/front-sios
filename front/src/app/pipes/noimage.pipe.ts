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

  transform(usuario): string {
    if(usuario!==null && usuario.imagen){ 
      this.imagenesCollections = this.afs.collection<Imagen>('perfil', ref => ref.where('id', '==', usuario.imagen));
      let images = this.imagenesCollections.valueChanges();
      images.subscribe((res:any)=> {
        console.log(res[0].imageURL);
        return res[0].imageURL;
      })
      
    }
    else{
      return 'assets/images/noimage.png';
    }
  }
 
}
