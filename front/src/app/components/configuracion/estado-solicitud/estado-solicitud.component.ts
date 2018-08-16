import { Component, OnInit } from '@angular/core';
import { EstadoSolicitudService } from '../../../services/estado-solicitud.service';
import { EstadoSolicitud } from '../../../models/estado-solicitud';

@Component({
  selector: 'app-estado-solicitud',
  templateUrl: './estado-solicitud.component.html',
  styles: []
})
export class EstadoSolicitudComponent {

  estados:EstadoSolicitud[]=[];
  
  constructor(private service:EstadoSolicitudService) {
    service.getEstados().subscribe((response:any)=>{
      this.estados=response;
    })
  }


}
