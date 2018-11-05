import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProvinciaService } from '../../../services/provincia.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { LocalidadService } from '../../../services/localidad.service';
import { Provincia } from '../../../models/provincia';

@Component({
  selector: 'app-usuarios-registrados',
  templateUrl: './usuarios-registrados.component.html',
  styleUrls: ['./usuarios-registrados.component.css']
})
export class UsuariosRegistradosComponent {

  form:FormGroup;
  usuarios:any[]=[];
  showTabla:boolean;
  provincias:any[];
  localidades:any[];
  departamentos:any[];
  showDepartamentos:boolean;
  showLocalidades:boolean;

  constructor(private provinciaService:ProvinciaService,private departamentoService:DepartamentoService,private localidadService:LocalidadService) {
    this.showTabla=false;
    this.form= new FormGroup({
      'edad': new FormControl(''),
      'sexo': new FormControl(''),
      'rubro': new FormControl(''),
      'provincia': new FormControl(''),
      'departamento': new FormControl(''),
      'localidad': new FormControl(''),
    })
    provinciaService.getProvinciasVigentes().subscribe((response:any)=>{
      this.provincias=response;
    })
    this.setValueDefault();
  }

  setValueDefault(){
    this.form.patchValue({
      provincia: 'Seleccione',
      departamento: 'Seleccione',
      localidad: 'Seleccione'
    })
  }

  getDepartamentosByProvincia(){
    this.showLocalidades=false;
    let provincia=this.form.controls['provincia'].value;
    if(provincia != 'Seleccione'){
    let submit; 
    this.showDepartamentos=true;
    this.provinciaService.getProvinciaByNombre(provincia).subscribe((provinciaResponse:Provincia)=>{
      this.departamentoService.getDepartamentosByProvincia(provinciaResponse.id).subscribe((res:any)=>{
        this.departamentos=res;
        this.getLocalidadesByDepartamento();
      })
    })
    }
    else {
      this.showDepartamentos=false;
      this.showLocalidades=false;
    }
    
  }

  getLocalidadesByDepartamento(){
    let provincia=this.form.controls['provincia'].value;
    let departamento=this.form.controls['departamento'].value;
    if(provincia != 'Seleccione' && departamento!='Seleccione' && departamento != ''){
      this.showLocalidades=true;
      this.localidadService.getLocalidadesByProvinciaAndDepartamento(provincia,departamento).subscribe((res:any)=>{        
        if(res.length == 0){          
          this.showLocalidades=false;
        }
        else{
          this.localidades=res;
        }
      })
    }
    else{
      this.showLocalidades=false;
    }
  }

  filtrarUsuarios(){
    let edad=this.form.controls['edad'].value;
    let sexo=this.form.controls['sexo'].value;
    //Capaz vaya el tipo rubro aparte del rubro.En ese caso faltarian esos valores.
    let provincia=this.form.controls['provincia'].value === 'Seleccione'? "null":this.form.controls['provincia'].value;
    let departamento=this.form.controls['departamento'].value === 'Seleccione'? "null":this.form.controls['departamento'].value;
    let localidad=this.form.controls['localidad'].value === 'Seleccione'? "null":this.form.controls['localidad'].value;

  }
}
