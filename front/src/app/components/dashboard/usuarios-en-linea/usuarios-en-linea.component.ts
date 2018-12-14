import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-usuarios-en-linea',
  templateUrl: './usuarios-en-linea.component.html',
  styleUrls: ['./usuarios-en-linea.component.css']
})
export class UsuariosEnLineaComponent implements OnInit {


  usuarios:any[]=[];
  showLista:boolean;

  constructor(private usuarioService:UsuarioService,private pdfService:PdfService) {
    this.showLista=false;
    usuarioService.getUsuariosEnLinea().subscribe((usuariosRes:any)=>{
      if(usuariosRes.length > 0){
        this.showLista=true;
        this.usuarios=usuariosRes;
      }
    })
  }

  exportarPDF(){
    let params = document.getElementById("reporteEnLinea");
    let reportName= "reporte-usuarios-en-linea";
    this.pdfService.export(params,reportName);
  }

  ngOnInit() {
  }
  
  calcularHaceCuantoEstaConectado(fecha:Date):number{
    let date1: string =new Date().toDateString();
    let date2: string = new Date(fecha).toDateString();
    let diffInMs: number = Date.parse(date2) - Date.parse(date1);
    return diffInMs / 1000 / 60 / 60;

  }
}
