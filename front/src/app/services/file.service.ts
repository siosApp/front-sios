import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  imagesCollection: AngularFirestoreCollection<Image>;

  constructor(private afStorage: AngularFireStorage,private afs: AngularFirestore) {
    this.imagesCollection = this.afs.collection<Image>('fotos');
  }
  getFoto(id){
    return this.afs.collection<Image>('fotos', ref => ref.where('id', '==', id)).valueChanges();
  }
  //recibe event-target.files[0]
  subirFoto(imagen,idFotoAEditar,imagePathFirebase){
    //Tener en cuenta que las imagenes que sean de perfil conviene guardarlas en una carpeta 'perfil'
    //Y los demás doc que vengan adjuntos de una solicitud de trabajo o de publicar un requerimiento, que estén en una carpeta 'doc'
    let path = `testing/${new Date().getTime()}_${imagen.name}`;
    const fileRef = this.afStorage.ref(path);
    // main task
    let task = this.afStorage.upload(path, imagen);
    this.afStorage.upload(path, imagen);
    let id;
          if(idFotoAEditar==null){
            const id = this.afs.createId();
          }
          else{
            id=idFotoAEditar;
            this.afStorage.ref(imagePathFirebase).delete();
          }
    task.snapshotChanges().pipe(
      finalize(() => {
        // The above step returns an observable which can be subscribed to fetch the data within it
        let downloadURL= fileRef.getDownloadURL();
        downloadURL.subscribe(data => {
          // to create an id for the document.
          
          // storing downloadURL as imageURL
          const imageURL = data;
          // storing image path in firestore
          const imagePath = path;
          // Image name fetched from ngModel on 'imageNm' field
          const imageName = imagen.name;
          // To store timestamp of the image before being inserted in firestore
          const maintTs = Date.now();
          const image: Image = { id, imagePath, imageURL, imageName, maintTs };
          //Creando coleccion..
          this.imagesCollection.doc(id).set(image);
        });
      })
   ).subscribe();
   return id;
  }
  deleteImage(foto:Image){
    this.imagesCollection.doc(foto.id).delete();
    this.afStorage.ref(foto.imagePath).delete();
  }
}

export interface Image { id: string; imagePath: string; imageURL: string; imageName: string; maintTs: number; }