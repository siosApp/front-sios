
import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mensajeBaja, mensajeAlta } from '../../../utils/params';
import { Departamento } from '../../../models/departamento';
import { DepartamentoService } from '../../../services/departamento.service';
import { Localidad } from '../../../models/localidad';
import { LocalidadService } from '../../../services/localidad.service';
import { Provincia } from '../../../models/provincia';
import { ProvinciaService } from '../../../services/provincia.service';
import { log } from 'util';


declare var $ : any;
@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styles: []
})
export class LocalidadComponent {

  habilitaLocalidad:boolean;
  mensaje:string;
  form:FormGroup;
  localidades:Localidad[]=[];
  localidadAEditar:Localidad;
  departamentoSeleccionado:Departamento;
  departamentos:Departamento[]=[];
  provincias:Provincia[];
  showLocalidades=false;

  constructor(private service:LocalidadService,private departamentoService:DepartamentoService,private provinciaService:ProvinciaService) {
    service.getLocalidades().subscribe((response:any)=>{
      this.localidades=response;
    })
    provinciaService.getProvinciasVigentes().subscribe((res:any)=>{
      this.provincias=res;
    })
    departamentoService.getDepartamentos().subscribe((res:any)=>{
      this.departamentos=res;
    })
    this.form= new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'departamento': new FormControl('',Validators.required),
      'provincia': new FormControl('',Validators.required)
    });
  }

  editarLocalidad(id){
    this.showLocalidades=true;
    this.service.getLocalidadById(id).subscribe( (response:Localidad) =>{
      this.localidadAEditar = response;
      console.log("Localidad: ",this.localidadAEditar);
      
      this.form.setValue({
        nombre: this.localidadAEditar.nombreLocalidad,
        departamento: this.localidadAEditar.departamento.nombreDepartamento,
        provincia: this.localidadAEditar.departamento.provincia.nombreProvincia
      });
      
    }) 
  }
  abrirModal(){
    this.form.reset();
    $('#con-close-modal').modal('show');
  }

  guardarLocalidad(){
    this.showLocalidades=false;
    let nuevoNombre = this.form.controls['nombre'].value;
    let provincia = this.form.controls['provincia'].value;
    let departamento = this.form.controls['departamento'].value;
    this.departamentoService.getDepartamentoByNombreAndProvincia(departamento,provincia).subscribe((depto:Departamento)=>{
      if(this.localidadAEditar != null){
        let localidadActualizada : Localidad = new Localidad(this.localidadAEditar.id,nuevoNombre,this.localidadAEditar.fechaBaja,depto);
        this.service.updateLocalidad(localidadActualizada).subscribe( response =>{
          this.localidadAEditar=null;
          $('#con-close-modal').modal('hide');
          this.service.getLocalidades().subscribe((response : any) => this.localidades = response);
        });
      }
      else{
        let nuevaLocalidad : Localidad = new Localidad(null,nuevoNombre,null,depto);
        this.service.crearLocalidad(nuevaLocalidad).subscribe(response=>{
          $('#con-close-modal').modal('hide');
          this.service.getLocalidades().subscribe((response:any) => this.localidades=response);
        })
      }
    })
    this.departamentoService.getDepartamentos().subscribe((res:any)=>{
      this.departamentos=res;
    })
  }
  getDepartamentosByProvincia(){
    if(this.form.updateOn == "submit"){
      console.log("Te cagué jajaja");
      
    }
    let submit; 
      this.showLocalidades=true;
      let provincia=this.form.controls['provincia'].value;
      console.log("Provincia: ",provincia);
      this.provinciaService.getProvinciaByNombre(provincia).subscribe((provinciaResponse:Provincia)=>{
        this.departamentoService.getDepartamentosByProvincia(provinciaResponse.id).subscribe((res:any)=>{
          this.departamentos=res;
        })
      })
  }
  openAlert(departamento){
    if(departamento.fechaBaja == null){
      this.localidadAEditar=departamento;
      this.mensaje=mensajeBaja;
      this.habilitaLocalidad=false;
    }
    else{
      this.localidadAEditar=departamento;
      this.mensaje=mensajeAlta;
      this.habilitaLocalidad=true;
    }
    $('#danger-alert').modal('show');
  }
  volver(){
    this.localidadAEditar=null;
    $('#danger-alert').modal('hide');
  }
  cancelar(){
    this.departamentoService.getDepartamentos().subscribe((res:any)=>{
      this.departamentos=res;
    })
    this.showLocalidades=false;
    this.localidadAEditar=null;
  }
  confirmarOperacion(){
    if(this.habilitaLocalidad){
      this.service.habilitarLocalidad(this.localidadAEditar.id).subscribe(()=>{
        this.service.getLocalidades().subscribe((response:any) => this.localidades = response);
      });
    }
    else{
      this.service.deleteLocalidad(this.localidadAEditar).subscribe(()=>{
        this.service.getLocalidades().subscribe((response:any) => this.localidades = response);
      });
    }
    this.volver();
  }
}
