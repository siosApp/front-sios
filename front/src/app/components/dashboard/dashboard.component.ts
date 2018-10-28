import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';



declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent   {
 

  constructor(private router:Router) {

   }

   
//ACA EMPIEZA EL GRAFICO DE DESTACADOS Y REGISTRADOS POR FECHA
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
    
  };
  public barChartLabels:string[] = ['Resultado'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Usuarios Registrados'},
    {data: [28, 48, 40, 19, 26, 27, 20], label: 'Destacados'}
  ];
 
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
   //ACA TERMINA EL GRAFICO DE DESTACADOS Y REGISTRADOS POR FECHA


  }
  public lineChartData:Array<any> = [
    {data: [5, 12, 14], label: 'Registrados'},
    {data: [2, 6, 7], label: 'Destacados'}
  ];
  public lineChartLabels:Array<any> = ['Septiembre', 'Octubre', 'Noviembre'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize1():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  spinerUsuariosDestacados (){
    $('#spinerDash').modal('show');
    setTimeout(()=>{ 
      this.router.navigate(['/sios/usuarios-destacados']);
      $('#spinerDash').modal('hide');
    },1000);
  }

  spinerUsuariosRegistrados (){
    $('#spinerDash').modal('show');
    setTimeout(()=>{ 
      this.router.navigate(['/sios/usuarios-registrados']);
      $('#spinerDash').modal('hide');
    },1000);
  }

  spinerUsuariosEnLinea (){
    $('#spinerDash').modal('show');
    setTimeout(()=>{ 
      this.router.navigate(['/sios/usuarios-en-linea']);
      $('#spinerDash').modal('hide');
    },1000);
  }
  spinerUsuariosPorVencer (){
    $('#spinerDash').modal('show');
    setTimeout(()=>{ 
      this.router.navigate(['/sios/usuarios-por-vencer']);
      $('#spinerDash').modal('hide');
    },1000);
  }






 
}














