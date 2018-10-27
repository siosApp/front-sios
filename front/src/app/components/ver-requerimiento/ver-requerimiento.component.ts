import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequerimientoService } from '../../services/requerimiento.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router, Route } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-ver-requerimiento',
  templateUrl: './ver-requerimiento.component.html',
  styles: []
})
export class VerRequerimientoComponent{


  form:FormControl;
  requerimientos:any[]=[];
  nombreUsuario;
  constructor(private requerimientoService:RequerimientoService,private usuarioService:UsuarioService, private router:Router) {
    requerimientoService.getRequerimientosActivos().subscribe((requerimientosRes:any)=>{
      this.requerimientos=requerimientosRes;
      console.log("req: ",this.requerimientos[0]);
      
    })
    
  }
  

  spinerOfertarRequemiento(id){
    $('#spinerVerRequerimiento').modal('show');
    setTimeout(()=>{ 
      this.router.navigate(['/sios/ofertarRequerimiento',id]);
      $('#spinerVerRequerimiento').modal('hide');
    },1000);
  }

}
