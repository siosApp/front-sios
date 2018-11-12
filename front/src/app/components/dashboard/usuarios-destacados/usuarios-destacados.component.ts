import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios-destacados',
  templateUrl: './usuarios-destacados.component.html',
  styleUrls: ['./usuarios-destacados.component.css']
})
export class UsuariosDestacadosComponent{

  form:FormGroup;
  usuarios:any[]=[];
  showReporte=false;
  constructor(private usuarioService:UsuarioService) { 
    this.form=new FormGroup({
      'fechaDesde': new FormControl('',Validators.required),
      'fechaHasta': new FormControl('',Validators.required)
    })
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
      console.log("Res: ",res);
      this.showReporte=true;
      this.usuarios=res;
    })
  }
}
