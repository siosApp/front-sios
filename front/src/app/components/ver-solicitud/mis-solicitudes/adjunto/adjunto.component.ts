import { Component, OnInit, Input } from '@angular/core';
import { ArchivoAdjunto } from '../../../home/solicitar-trabajo.component';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-adjunto',
  templateUrl: './adjunto.component.html',
  styles: []
})
export class AdjuntoComponent implements OnInit{

  @Input() solicitud:any;
  archivosCollection: AngularFirestoreCollection<ArchivoAdjunto>;
  tieneArchivo:boolean;
  constructor(private afs: AngularFirestore) {
    this.tieneArchivo=false;
  }

  ngOnInit(){
    if(this.solicitud.urlArchivos.length > 0){
      this.tieneArchivo=true;
    }    
  }
  visualizarArchivo(){
    let id=this.solicitud.urlArchivos[0];
    this.archivosCollection = this.afs.collection<ArchivoAdjunto>('archivos', ref => ref.where('id', '==', id));
    setTimeout(()=>{
      let files = this.archivosCollection.valueChanges();
      files.subscribe((res:any)=> {
        window.open(res[0].fileURL);
      })
    }, 2000);
  }
}
