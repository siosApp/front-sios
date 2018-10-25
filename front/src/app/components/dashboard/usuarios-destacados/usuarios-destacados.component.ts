import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuarios-destacados',
  templateUrl: './usuarios-destacados.component.html',
  styleUrls: ['./usuarios-destacados.component.css']
})
export class UsuariosDestacadosComponent implements OnInit {

  form:FormGroup;


  constructor() { }

  ngOnInit() {
  }

}
