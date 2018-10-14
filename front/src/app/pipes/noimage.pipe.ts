import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Imagen } from '../components/perfil/perfil.component';
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  imagenesCollections: AngularFirestoreCollection<Imagen>;
  constructor(private domSanitizer:DomSanitizer,private afStorage: AngularFireStorage,private afs: AngularFirestore){
    this.imagenesCollections=this.afs.collection<Imagen>('perfil'); 
  }

  transform(usuario,params:string):string {
    // console.log("params:",params);
    
    // console.log("Entrando en pipe: ",usuario);
    //   if(usuario!=='' && params!= null){
    //     let url='assets/images/download.png'; 
    //     this.imagenesCollections = this.afs.collection<Imagen>('perfil', ref => ref.where('id', '==', params));
    //     let images = this.imagenesCollections.valueChanges();
    //     images.subscribe((res:any)=> {
    //       console.log(res[0].imageURL);
    //       console.log("Firebase: ",res);
    //       url=res[0].imageURL;
    //       //return res[0].imageURL;
    //       //return 'assets/images/download.png';
    //       //return this.domSanitizer.bypassSecurityTrustResourceUrl(""+res[0].imageURL);
    //       //return this.domSanitizer.bypassSecurityTrustResourceUrl(res[0].imageURL);
    //     })
    //     console.log("returb");
    //     return url;
    //   }
    return this.getURLImage(params);
  }
  getURLImage(usuarioid):string{
      let url='assets/images/download.png';
      this.imagenesCollections = this.afs.collection<Imagen>('perfil', ref => ref.where('id', '==', usuarioid));
      let images = this.imagenesCollections.valueChanges();
      images.toPromise().then(value => {console.log("Values ", value)}).catch(error => {
        console.log("sdsds");
      });
      
      // images.subscribe((res:any)=> {
      //   console.log(res[0].imageURL);
      //   //console.log("Firebase: ",res);
      //   url=res[0].imageURL;
      // })  
      return url;
  }
 
}
