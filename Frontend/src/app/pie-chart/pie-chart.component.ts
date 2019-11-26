import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit{

  @ViewChild('pieChart',{static:true}) pieChart: ElementRef

  drawChart = () => {

  const data = google.visualization.arrayToDataTable([
    ['Issue', 'Hours per Day'],
    ['Total Issues', 13],
    ['Completed Issues', 8]
    
  ]);

  const options = {
    title: 'My Issues',
    legend: {position: 'top'},
    slices: {
      0: { color: 'lightgray' },
      1: { color: 'green' }
    },
    pieHole:0.4
  };

  const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

  chart.draw(data, options);
}

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
