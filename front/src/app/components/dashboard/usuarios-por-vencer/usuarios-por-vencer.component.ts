import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-usuarios-por-vencer',
  templateUrl: './usuarios-por-vencer.component.html',
  styleUrls: ['./usuarios-por-vencer.component.css']
})
export class UsuariosPorVencerComponent{

  usuariosDestacados:any[]=[];
  constructor(private usuarioService:UsuarioService,private pdfService:PdfService) {

    usuarioService.getUsuariosDestacadosPorVencer().subscribe((res:any)=>{
      
      this.usuariosDestacados=res;
    })
  }

  exportarPDF(){
    let params = document.getElementById("reporteDestacado");
    let reportName= "reporte-usuarios-en-linea";
    this.pdfService.export(params,reportName);
  }
}
