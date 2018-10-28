import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { SolicitarTrabajoService } from '../../../services/solicitar-trabajo.service';

@Component({
  selector: 'app-notificacion-calificacion',
  templateUrl: './notificacion-calificacion.component.html',
  styles: []
})
export class NotificacionCalificacionComponent implements OnInit {

  @Input() id:string;
  mostrar:boolean;
  pendientesComoOferente:number;
  pendientesComoDemandante:number;
  constructor(private solicitarService:SolicitarTrabajoService) { }

  ngOnInit() {
    this.mostrar=false;
    this.buscarCalificacionesPendientes();
  }

  buscarCalificacionesPendientes(){
    this.solicitarService.getCalificacionesPendientesComoDemandante(this.id).subscribe((calificacion:any)=>{
      this.pendientesComoDemandante=calificacion;
    })
    this.solicitarService.getCalificacionesPendientesComoOferente(this.id).subscribe((calificacion:any)=>{
      this.pendientesComoOferente=calificacion;
    })
  }

}
