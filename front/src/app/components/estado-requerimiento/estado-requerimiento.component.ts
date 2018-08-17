import { Component, OnInit } from '@angular/core';
import { EstadoRequerimientoService } from '../../services/estado-requerimiento.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-estado-requerimiento',
  templateUrl: './estado-requerimiento.component.html',
  styles: []
})
export class EstadoRequerimientoComponent implements OnInit {

  estadosVigentes$: Object;

  constructor(private estadoRequerimientoService: EstadoRequerimientoService) { }

  ngOnInit() {
    this.estadoRequerimientoService.getEstadosVigentes().subscribe(
      estadosVigentes => this.estadosVigentes$ = estadosVigentes
    );
  }

}
