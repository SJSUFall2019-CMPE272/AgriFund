import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
ELEMENT_DATA:any[]=[
]
  username:any
  displayedColumns: string[] = ['Id', 'Task Name','Due At','Status'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
 issuesforSPecificUser:any
  constructor(private _Mainservice: MainService,public toastr: ToastrService,private http : HttpClient, private router: Router) { }
getAllIssuesForSpecificUsersResponce:any
  ngOnInit() {
    if(sessionStorage.getItem('lIn')===null){
      this.toastr.error('Please Login First')
      this.router.navigate(['./login'])
      return 
    }
    this.username=sessionStorage.getItem('name')
    this.getAllIssueForUser()
  }


  getAllIssueForUser(){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("https://chain-agrifund.mybluemix.net/api/farmers"+'/'+this.username,{headers: header}).subscribe((res) => {
            //tostr message
            this.ELEMENT_DATA=<any>res
            this.dataSource=new MatTableDataSource<any>(this.ELEMENT_DATA)
            console.log(res);
            return res
        });
        
  }
}

