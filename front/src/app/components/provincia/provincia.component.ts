import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../services/provincia.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styles: []
})
export class ProvinciaComponent implements OnInit {
  provincia:any;
provinciaForm:FormGroup;

  constructor(private serviceProvincia:ProvinciaService, private fb:FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

guardar(){
this.provincia = this.prepareProvincia();
this.serviceProvincia.crearProvincia(this.provincia).subscribe();
}
createForm (){
  this.provinciaForm = this.fb.group({
    id:"",
    fechaBaja:"",
    nombreProvincia:""
  });
}
prepareProvincia ():any{
  const formModel = this.provinciaForm.value;
  const saveProvincia:any = {
  id:null,
  fechaBaja:null,
  nombreProvincia: formModel.nombreProvincia as string
} 
return saveProvincia;
}

irAok(){
  this.provincia.navigate(['/components/pantallaOk']);
}


}
