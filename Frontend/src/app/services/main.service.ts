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



  createIssue(issueName:any,category:any,description:any,problemsFaced:any,solutionProposed:any,amountRequired:any){
    this.requestObject={
      "issueName":issueName,
      "category":category,
      "description":description,
      "problemsFaced":problemsFaced,
      "solutionProposed":solutionProposed,
      "otherInfo":amountRequired
    }
    this.toastr.success()
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.post("endpoint",this.requestObject,{headers: header}).subscribe((res) => {
            this.router.navigate(['./mytask']);
            //tostr message
            console.log(res);
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
  

  login(username:any,password:any):any{
    this.requestObject={
      "fullName":username,
      "password":password,
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.post("https://backend-agrifund.mybluemix.net"+'/login',this.requestObject,{headers: header}).subscribe((res) => {
            this.toastr.success("Welcome")
            sessionStorage.setItem('userType',res['userType'])
            sessionStorage.setItem('lIn','true')
  sessionStorage.setItem('loggedIn','true')
  sessionStorage.setItem('flag','true')
    sessionStorage.setItem('name',username)
    if(res['userType']==='farmer')
    this.router.navigate(['./dashboard'])
    else
    this.router.navigate(['./donorDashboard'])
            console.log(res);
            
            location.reload()
        },
err => {this.toastr.error('Login Failed!')
console.log(err)});
  }
  signup(username:any,password:any,email:any,userType:any){

    this.requestObject={
      "fullName":username,
      "email":email,
      "password":password,
      "userType":userType
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.post("https://backend-agrifund.mybluemix.net"+'/signup',this.requestObject,{headers: header}).subscribe((res) => {
            //tostr message
            sessionStorage.setItem('loggedIn','true')
            sessionStorage.setItem('flag','true')
            sessionStorage.setItem('lIn','true')
              sessionStorage.setItem('name',username)
            sessionStorage.setItem('userType',res['userType'])
            if(res['userType']==='farmer')
    this.router.navigate(['./dashboard'])
    else
    this.router.navigate(['./donorDashboard'])
            console.log(res);
            this.toastr.success("Welcome")
            location.reload()
            return res
        },
err => {this.toastr.error('SignUp Failed!')
console.log(err)});
  }


  getDonors(id: string){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("endpoint"+'/:'+id,{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
  }
}