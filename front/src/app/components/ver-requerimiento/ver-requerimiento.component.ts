import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ver-requerimiento',
  templateUrl: './ver-requerimiento.component.html',
  styles: []
})
export class VerRequerimientoComponent implements OnInit {


  form:FormControl;
  constructor() { }

  ngOnInit() {
  }

}
