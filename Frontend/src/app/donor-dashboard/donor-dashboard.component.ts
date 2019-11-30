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
