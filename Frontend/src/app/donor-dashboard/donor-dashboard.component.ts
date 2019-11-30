import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

export interface PeriodicElement1 {
  name: string;
  position: number;
  startDate: any;
  status:any;
}

const ELEMENT_DATA: PeriodicElement1[] = [
  {position: 1, name: 'Crops',startDate: "08/07/2019", status:'Open'},
  {
    position: 2, name: 'Tools',startDate: "08/07/2019", status:'Closed'
  }
 
 
];
@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.css']
})
export class DonorDashboardComponent implements OnInit {



  username:any
  displayedColumns: string[] = ['Id', 'Task Name','Due At','Status'];
  dataSource = ELEMENT_DATA;
 issuesforSPecificUser:any
  constructor(private _Mainservice: MainService) { }
getAllIssuesForSpecificUsersResponce:any
  ngOnInit() {
    if(sessionStorage.getItem('flag')==='true'){
      sessionStorage.setItem('flag','false')
      location.reload()
    }
  }
  getMyissues(){
    //this.issuesforSPecificUser=this._Mainservice.getAllIssueForUser(this.username)
  }

}
