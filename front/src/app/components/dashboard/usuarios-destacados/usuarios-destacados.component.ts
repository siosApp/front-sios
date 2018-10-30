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
    let fechaDesde = new Date(this.form.controls['fechaDesde'].value);
    let fechaHasta = new Date(this.form.controls['fechaHasta'].value);
    this.usuarioService.getUsuariosDestacadosPorFecha(fechaDesde,fechaHasta).subscribe((res:any)=>{
      this.usuarios=res.usuariosDestacados;
    })
  }
}
