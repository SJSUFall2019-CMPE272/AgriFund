import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  constructor(public toastr: ToastrService, private http : HttpClient, private router: Router) {
  }
  requestObject={}
  createIssue(issueName:any,category:any,description:any,problemsFaced:any,solutionProposed:any,otherInfo:any){
    this.requestObject={
      "issueName":issueName,
      "category":category,
      "description":description,
      "problemsFaced":problemsFaced,
      "solutionProposed":solutionProposed,
      "otherInfo":otherInfo
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.post("endpoint",this.requestObject,{headers: header}).subscribe((res) => {
            this.router.navigate(['./mytask']);
            //tostr message
            console.log(res);
        });
  }
  getSpecificIssue(userId:AnalyserOptions){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("endpoint"+'/{'+userId+'}',{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
        });
  }
}