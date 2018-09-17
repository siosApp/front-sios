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
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

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
  showLocalidades=false;
  showDepartamentos=false;
  oferentes:Usuario[];
  constructor(private fb:FormBuilder,private tipoRubroService:TipoRubroService,
    private provinciaService:ProvinciaService,private rubroService:RubroService,
    private departamentoService:DepartamentoService,private localidadService:LocalidadService,
    private usuarioService:UsuarioService,private router:Router,private authService:AutenticacionService) {
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
    rubroService.getRubrosVigentes().subscribe((res:any)=>{
      this.rubros=res;
    })
    this.setValueDefault();
    let recordarme=authService.isRecordarSesion();
    console.log("Recordarme: ",recordarme);
    
    if(recordarme==false){
      setTimeout(()=>{
      authService.cerrarSesion();
      this.router.navigate(['login']);
    },1000*3)
    }
  }
  setValueDefault(){
    this.form.setValue({
      rubro: 'Seleccione',
      tipoRubro: 'Seleccione',
      provincia: 'Seleccione',
      departamento: 'Seleccione',
      localidad: 'Seleccione'
    })
   
  }
  getRubrosByTipoRubro(){
    let tipoRubro=this.form.controls['tipoRubro'].value;
    if(tipoRubro !='Seleccione'){
      this.rubroService.getRubrosByTipoRubro(tipoRubro).subscribe((response:any)=>{
        this.rubros=response;
      })
    }
    else{
      this.rubroService.getRubrosVigentes().subscribe((res:any)=>{
        this.rubros=res;
      })
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
        console.log(res);
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
  buscarOferentes(){
    let rubro=this.form.controls['rubro'].value;
    let tipoRubro=this.form.controls['tipoRubro'].value;
    let provincia=this.form.controls['provincia'].value;
    let departamento=this.form.controls['departamento'].value;
    let localidad=this.form.controls['localidad'].value;
    this.usuarioService.getOferentes(tipoRubro,rubro,provincia,departamento,localidad).subscribe((res:any)=>{
      this.oferentes=res;
    })
  }
}
