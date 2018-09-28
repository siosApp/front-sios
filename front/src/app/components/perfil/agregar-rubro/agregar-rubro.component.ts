import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TipoRubroService } from '../../../services/tipo-rubro.service';
import { TipoRubro } from '../../../models/tipo-rubro';
import { RubroService } from '../../../services/rubro.service';
import { Rubro } from '../../../models/rubro';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioRubro } from '../../../models/usuario-rubro';

@Component({
  selector: 'app-agregar-rubro',
  templateUrl: './agregar-rubro.component.html',
  styles: []
})
export class AgregarRubroComponent implements OnInit {
 
 
  form:FormGroup;
  tiposRubros:TipoRubro[];
  rubros:Rubro[];
  showRubros=false;
  usuarioAEditar:Usuario;
  rubrosDeUsuario:UsuarioRubro[];


  constructor(private tipoRubroService:TipoRubroService,private rubroService:RubroService, private fb:FormBuilder, private service:UsuarioService) { 

    tipoRubroService.getTipoRubrosVigentes().subscribe((response:any)=>{
      this.tiposRubros=response;
    });
    rubroService.getRubrosVigentes().subscribe((res:any)=>{
      this.rubros=res;
    })
    this.form=fb.group({
      'rubro': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'tipoRubro': new FormControl('',Validators.required),

    });

    let idusuario = localStorage.getItem("auth");
    this.service.getUsuarioById(idusuario).subscribe( (response:any) =>{
      this.usuarioAEditar=response;
      this.rubrosDeUsuario = this.usuarioAEditar.usuarioRubros;


    });

    this.setValueDefault(); 
  }

  setValueDefault(){
    this.form.setValue({
      rubro: 'Seleccione',
      tipoRubro: 'Seleccione'
    })
   
  }

  getRubrosByTipoRubro(){
    let tipoRubro=this.form.controls['tipoRubro'].value;
    if(tipoRubro !='Seleccione'){
      this.showRubros=true;
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

guardarTipoRubro(){

  
  let rubro=this.form.controls['rubro'].value;


  



  
}





  ngOnInit() {
  }

}
