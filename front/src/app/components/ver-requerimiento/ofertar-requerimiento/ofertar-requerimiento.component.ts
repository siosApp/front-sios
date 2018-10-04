import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ofertar-requerimiento',
  templateUrl: './ofertar-requerimiento.component.html',
  styles: []
})
export class OfertarRequerimientoComponent implements OnInit {

  form:FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
