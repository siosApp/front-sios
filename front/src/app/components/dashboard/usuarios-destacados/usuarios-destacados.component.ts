import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import * as moment from 'moment';
import { PdfService } from '../../../services/pdf.service';

declare var $:any;
@Component({
  selector: 'app-usuarios-destacados',
  templateUrl: './usuarios-destacados.component.html',
  styleUrls: ['./usuarios-destacados.component.css']
})
export class UsuariosDestacadosComponent{

  form:FormGroup;
  usuarios:any[]=[];
  showReporte=false;
  constructor(private usuarioService:UsuarioService,private pdfService:PdfService) { 
    this.form=new FormGroup({
      'fechaDesde': new FormControl('',Validators.required),
      'fechaHasta': new FormControl('',Validators.required)
    })
  }

  volver(){
    $('#modalFecha').modal('hide');
  }
  abrirModal(){
    $('#modalFecha').modal('show');
  }
  
  exportarPDF(){
    let params = document.getElementById("reporteDestacado");
    let reportName= "reporte-usuarios-destacados";
    this.pdfService.export(params,reportName);
  }

  generarReporte(){

    let fechaDesde:Date = new Date(this.form.controls['fechaDesde'].value);
    let fechaHasta:Date = new Date(this.form.controls['fechaHasta'].value);
    // console.log("Fecha desde: ",fechaDesde.toLocaleDateString());
    // console.log("Fecha hasta: ",fechaHasta);
    //Casteo de fechas
    const fechaDesdeCast= new Date(fechaDesde.setDate(fechaDesde.getDate() + 1));
    const fechaHastaCast= new Date(fechaHasta.setDate(fechaHasta.getDate() + 1));
    this.usuarioService.getUsuariosDestacadosPorFecha(fechaDesdeCast.toLocaleDateString(),fechaHastaCast.toLocaleDateString()).subscribe((res:any)=>{
      function compare(a, b) {
        var momentA = moment(a);
        var momentB = moment(b);
        if (momentA > momentB) return 1;
        else if (momentA <= momentB) 
        return 0;
    }
    if (compare(fechaDesde, fechaHasta) == 0){
      
      
      console.log("Res: ",res);
      this.showReporte=true;
      this.usuarios=res;
    }else{
      this.abrirModal();
    }
    })
  }
}
