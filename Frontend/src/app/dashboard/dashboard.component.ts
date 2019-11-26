import { Component, OnInit } from '@angular/core';

export interface PeriodicElement1 {
  name: string;
  position: number;
  startDate: any;
  status:any;
}

const ELEMENT_DATA: PeriodicElement1[] = [
  {position: 1, name: 'Crops',startDate: "08/07/2019", status:'On going'  }
 
 
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  username:any
  displayedColumns: string[] = ['Id', 'Task Name','Due At','Status'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
    this.username=sessionStorage.getItem('name')
  }

  

}
