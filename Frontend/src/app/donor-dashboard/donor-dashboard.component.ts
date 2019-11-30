import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.css']
})
export class DonorDashboardComponent implements OnInit {


  ELEMENT_DATA:any[]=[
    {
        Key: "ISSUE2",
        Record: {
            "description": "crops description updated again",
            "docType": "farmer_issue",
            "donators": [],
            "farmer_name": "ramya",
            "issue": "crops",
            "issue_created_date": "11-27-2019",
            "problem_faced": "problem faced updated again",
            "raised_amount": "0",
            "requested_amount": "30000",
            "solution_proposed": "solution updated again",
            "status": "closed"
        }
    },
    {
        Key: "ISSUE9",
        Record: {
            "description": "need money to get a borewell",
            "docType": "farmer_issue",
            "donators": [],
            "farmer_name": "ramya",
            "issue": "water problem",
            "issue_created_date": "11-28-2019",
            "problem_faced": "problem faced to be updated",
            "raised_amount": 0,
            "requested_amount": 5000,
            "solution_proposed": "solution to be updated",
            "status": "open"
        }
    }
  ]
  username:any
  displayedColumns: string[] = ['Id', 'Task Name','Due At'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
 issuesforSPecificUser:any
  constructor(private _Mainservice: MainService,private http : HttpClient,private router:Router,public toastr: ToastrService) { }

  ngOnInit() {
    if(sessionStorage.getItem('lIn')===null){
      this.toastr.error('Please Login First')
      this.router.navigate(['./login'])
      return 
    }
    this.username=sessionStorage.getItem('name')
   this.getAllDonationsForUser()
    if(sessionStorage.getItem('flag')==='true'){
      sessionStorage.setItem('flag','false')
      location.reload()
    }
  }
  getAllDonationsForUser(){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("https://backend-agrifund.mybluemix.net/donors/"+this.username,{headers: header}).subscribe((res) => {
      this.ELEMENT_DATA=<any>res
      this.dataSource=new MatTableDataSource<any>(this.ELEMENT_DATA)
            console.log(res);
            return res
        });
        
  }

}
