import { Component, OnInit, Input } from '@angular/core';
import { ArchivoAdjunto } from '../../home/solicitar-trabajo.component';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styles: []
})
export class ArchivoComponent implements OnInit {

  @Input() idsImagen:any;
  archivosCollection: AngularFirestoreCollection<ArchivoAdjunto>;
  tieneArchivo:boolean;
  constructor(private afs: AngularFirestore) {
    this.tieneArchivo=false;
  }

  ngOnInit(){
    if(this.idsImagen.length > 0){
      this.tieneArchivo=true;
    }    
  }
  visualizarArchivo(){
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('archivos', ref => ref.where('id', '==', this.idsImagen[0]));
    setTimeout(()=>{
      let files = this.archivosCollection.valueChanges();
      files.subscribe((res:any)=> {
        window.open(res[0].fileURL);
      })
    }, 2000);
  }

}
