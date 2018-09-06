import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent{


  form:FormGroup;
  constructor(private fb:FormBuilder) {
    this.form= new FormGroup({
      'rubro': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'tipoRubro': new FormControl('',Validators.required),
      'provincia': new FormControl('',Validators.required),
      'localidad': new FormControl('',Validators.required),
      'departamento': new FormControl('',Validators.required)
    });
  }

}
