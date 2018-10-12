import { Component } from '@angular/core';


//declare var $: any; 
@Component({
  selector: 'app-rubros-mas-ofrecidos',
  templateUrl: './rubros-mas-ofrecidos.component.html',
  // styleUrls: ['./rubros-mas-ofrecidos.component.css']
})
export class RubrosMasOfrecidosComponent {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Abril 2018', 'Mayo 2018', 'Junio 2018', 'Julio 2018', 'Agosto 2018', 'Setiembre 2018', 'Octubre 2018'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Sistemas'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Albañileria'},
    {data: [20, 67, 87, 54, 86, 34, 78], label: 'Plomeria'}
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
   
  }
}