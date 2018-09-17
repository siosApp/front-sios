import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  
  estaLogueado:boolean=false;
  constructor(private tokenService:AutenticacionService,private router:Router) {
    
    
    if(tokenService.isUsuarioLogueado()){
      this.estaLogueado=true;
    }
  }

  cerrarSesion(){
    this.estaLogueado=false;
    this.tokenService.cerrarSesion();
  }
}
