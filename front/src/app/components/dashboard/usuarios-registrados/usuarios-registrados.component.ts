import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProvinciaService } from '../../../services/provincia.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { LocalidadService } from '../../../services/localidad.service';
import { Provincia } from '../../../models/provincia';
import { RubroService } from '../../../services/rubro.service';
import { TipoRubroService } from '../../../services/tipo-rubro.service';
import { UsuarioService } from '../../../services/usuario.service';

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
  rubros:any[];
  tipoRubros:any[];
  showDepartamentos:boolean;
  showLocalidades:boolean;
  showRubros:boolean;
  constructor(private provinciaService:ProvinciaService,private departamentoService:DepartamentoService,private localidadService:LocalidadService,
    private rubroService:RubroService,private tipoRubroService:TipoRubroService,private usuarioService:UsuarioService) {
    this.showTabla=false;
    this.showRubros=false;
    this.form= new FormGroup({
      'edad': new FormControl(''),
      'sexo': new FormControl(''),
      'rubro': new FormControl(''),
      'provincia': new FormControl(''),
      'departamento': new FormControl(''),
      'localidad': new FormControl(''),
      'tipoRubro': new FormControl('')
    })
    provinciaService.getProvinciasVigentes().subscribe((response:any)=>{
      this.provincias=response;
    })
    tipoRubroService.getTipoRubrosVigentes().subscribe((response:any)=>{
      this.tipoRubros=response;
    });
    this.setValueDefault();
  }

  setValueDefault(){
    this.form.patchValue({
      provincia: 'Seleccione',
      departamento: 'Seleccione',
      localidad: 'Seleccione',
      tipoRubro: 'Seleccione',
      rubro: 'Seleccione',
      edad:'18-25',
      sexo:'Sin definir'
    })
  }

  getRubrosByTipoRubro(){
    let tipoRubro=this.form.controls['tipoRubro'].value;
    if(tipoRubro !='Seleccione'){
      this.rubroService.getRubrosByTipoRubro(tipoRubro).subscribe((response:any)=>{
        this.showRubros=true;
        this.rubros=response;
      })
    }
    else{
      this.showRubros=false;
    }
    
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
    let edad:string=this.form.controls['edad'].value;
    let edadDesde;
    let edadHasta;
    if(edad != "Mas de 55"){
      let edadArray= edad.split("-");
      edadDesde=edadArray[0];
      edadHasta=edadArray[1];
    }
    else{
      edadDesde="55";
      edadHasta="99";
    }
    
    let sexo=this.form.controls['sexo'].value == "Sin definir"?null:this.form.controls['sexo'].value;
    console.log("Sexo: ",sexo);
    
    let tipoRubro=this.form.controls['tipoRubro'].value  === 'Seleccione'? "null":this.form.controls['tipoRubro'].value;
    let rubro=this.form.controls['rubro'].value  === 'Seleccione'? "null":this.form.controls['rubro'].value;
    //Capaz vaya el tipo rubro aparte del rubro.En ese caso faltarian esos valores.
    let provincia=this.form.controls['provincia'].value === 'Seleccione'? "null":this.form.controls['provincia'].value;
    let departamento=this.form.controls['departamento'].value === 'Seleccione'? "null":this.form.controls['departamento'].value;
    let localidad=this.form.controls['localidad'].value === 'Seleccione'? "null":this.form.controls['localidad'].value;
    this.usuarioService.getUsuariosRegistrados(sexo,edadDesde,edadHasta,provincia,departamento,localidad,tipoRubro,rubro).subscribe((res:any)=>{
      console.log("REsultado: ",res);
      
      this.usuarios=res;
      this.showTabla=true;
    })
  }
}
