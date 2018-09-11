import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TipoRubro } from '../../models/tipo-rubro';
import { TipoRubroService } from '../../services/tipo-rubro.service';
import { Provincia } from '../../models/provincia';
import { ProvinciaService } from '../../services/provincia.service';
import { Rubro } from '../../models/rubro';
import { RubroService } from '../../services/rubro.service';
import { Departamento } from '../../models/departamento';
import { Localidad } from '../../models/localidad';
import { DepartamentoService } from '../../services/departamento.service';
import { LocalidadService } from '../../services/localidad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent{


  form:FormGroup;
  tiposRubros:TipoRubro[];
  provincias:Provincia[];
  departamentos:Departamento[];
  localidades:Localidad[];
  rubros:Rubro[];
  constructor(private fb:FormBuilder,private tipoRubroService:TipoRubroService,
    private provinciaService:ProvinciaService,private rubroService:RubroService,
    private departamentoService:DepartamentoService,private localidadService:LocalidadService) {
    this.form= new FormGroup({
      'rubro': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'tipoRubro': new FormControl('',Validators.required),
      'provincia': new FormControl('',Validators.required),
      'localidad': new FormControl('',Validators.required),
      'departamento': new FormControl('',Validators.required)
    });
    tipoRubroService.getTipoRubrosVigentes().subscribe((response:any)=>{
      this.tiposRubros=response;
    });
    provinciaService.getProvinciasVigentes().subscribe((response:any)=>{
      this.provincias=response;
    })
  }
  getRubrosByTipoRubro(){
    let tipoRubro=this.form.controls['tipoRubro'].value;
    this.rubroService.getRubrosByTipoRubro(tipoRubro).subscribe((response:any)=>{
      this.rubros=response;
    })
    
  }
  getDepartamentosByProvincia(){
    let provincia=this.form.controls['provincia'].value;
    this.departamentoService.getDepartamentosByProvincia(provincia).subscribe((response:any)=>{
      this.departamentos=response;
    })
  }
  getLocalidadesByDepartamento(){
    let departamento=this.form.controls['departamento']
    this.localidadService.getLocalidadesByDepartamento(departamento).subscribe((response:any)=>{
      this.localidades=response;
    })
  }
}
