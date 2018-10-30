import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RubroService } from '../../../services/rubro.service';

@Component({
  selector: 'app-rubros-mas-demandados',
  templateUrl: './rubros-mas-demandados.component.html',
  styleUrls: ['./rubros-mas-demandados.component.css']
})
export class RubrosMasDemandadosComponent   {

  reporteForm:FormGroup;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] =[];//  ['Resultado'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[]=[];
  // public barChartData:any[] = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Sistemas'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Albañileria'},
  //   {data: [20, 67, 87, 54, 86, 34, 78], label: 'Plomeria'},
  //   {data: [20, 67, 87, 54, 86, 34, 78], label: 'Carpinteria'}
  // ];
  showGrafico=false;
  constructor(private rubroService:RubroService){
    this.reporteForm= new FormGroup({
      'fechaDesde': new FormControl('',Validators.required),
      'fechaHasta': new FormControl('',Validators.required)
    })
  }

  generarReporte(){
    //obtener fechas y generar reporte.
    let fechaDesde=this.reporteForm.controls['fechaDesde'].value;
    let fechaHasta=this.reporteForm.controls['fechaHasta'].value;
    this.rubroService.getRubrosMasDemandados(fechaDesde,fechaHasta).subscribe((reporteResponse:any)=>{
      if(reporteResponse.length > 0){
        let data = new Array();
        let indice=0;
        let arrayAux= new Array();
        for(let reporte of reporteResponse){
          data.push(reporte.cantidadSolicitudes);
          this.barChartLabels.push(reporte.nombreRubro);
          arrayAux.push(0);
        }
        //Inicializar arreglo.
        let initData={data: arrayAux,label: 'Datos iniciando desde 0'};
        this.barChartData.push(initData);
        for(let reporte of reporteResponse){
          let datito=new Array();
          datito.push(arrayAux);
          datito[indice]=reporte.cantidadSolicitudes;
          // datito.push(data[indice]);
          let datos= {data: datito,label: reporte.nombreRubro};
          this.barChartData.push(datos);        
          indice++;
        }
        this.showGrafico=true;
      }
      else{

      }
      
    })
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
   
  }
}