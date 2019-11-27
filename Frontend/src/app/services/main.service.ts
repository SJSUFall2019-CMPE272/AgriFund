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
  getAllIssueForUser(userId:AnalyserOptions):any{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("endpoint"+'/{'+userId+'}',{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
        
  }
  getIssueForSpecificUser(userId:any,issueId:any):any{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("endpoint"+'/{'+userId+'}'+'/{'+issueId+'}',{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
  }
  getAllIssues():any{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("endpoint",{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
        
  }

  deleteSpecificIssue(){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.delete("endpoint"+'/issues'/*+issueid */,{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
  }
  
  editSpecificIssue(issueName:any,category:any,description:any,problemsFaced:any,solutionProposed:any,otherInfo:any){
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
     this.http.put("endpoint"+'/issues'/*+issueid */,this.requestObject,{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
  }

  login(username:any,password:any):any{
    this.requestObject={
      "username":username,
      "password":password,
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.post("endpoint"+'/login',this.requestObject,{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
  }

}