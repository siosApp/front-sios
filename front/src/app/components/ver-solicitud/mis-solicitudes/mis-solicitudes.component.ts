import { Component, OnInit } from '@angular/core';
import { SolicitarTrabajoService } from '../../../services/solicitar-trabajo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalificacionService } from '../../../services/calificacion.service';
declare var $:any;

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './solicitudes.component.html',
  styles: []
})
export class MisSolicitudesComponent {

  solicitudes:any[]=[];
  calificarForm:FormGroup;
  solicitudElegida:any;

  constructor(private solicitudService:SolicitarTrabajoService,private calificacionService:CalificacionService) { 
    let id=localStorage.getItem("auth");
    this.calificarForm=new FormGroup({
      'comentario': new FormControl('',[Validators.required]),
      'calificacion': new FormControl('',[Validators.required,Validators.pattern('[1-5]')])
    })
    solicitudService.getSolicitudesEfectuadasPorUsuario(id).subscribe((res:any)=>{
      this.solicitudes=res;
      console.log("Solicitud: ",res[0]);
    })
  }

  abrirModalCalificacion(solicitud){
    $("#calificarModal").modal("show");
    this.solicitudElegida=solicitud;
    console.log("Solicitud: ", this.solicitudElegida);
    
  }
  cerrarModal(){
    this.solicitudElegida=null;
    this.calificarForm.reset();
    $("#calificarModal").modal("hide");
  }

  calificar(){
    let comentario= this.calificarForm.controls['comentario'].value;
    let nroCalificacion= this.calificarForm.controls['calificacion'].value;
    let calificacion= {
      id:null,
      username: this.solicitudElegida.usuarioDemandante,
      fechaCalificacion: null,
      idSolicitud: this.solicitudElegida.id,
      calificacion: nroCalificacion,
      comentario: comentario
    };
    this.calificacionService.calificar(calificacion).subscribe((res:any)=>{
      console.log("Calificacion: ",res);
      this.cerrarModal();
      this.solicitudService.getSolicitudesEfectuadasPorUsuario(localStorage.getItem("auth")).subscribe((res:any)=>{
        this.solicitudes=res;
      })
    });
  }

}
