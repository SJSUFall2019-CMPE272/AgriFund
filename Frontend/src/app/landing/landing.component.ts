import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private http : HttpClient, private router: Router) { }

  flag=1
  d = new Date();
  dateString:any
  ngOnInit() {
    if(sessionStorage.getItem('loggedIn')==='true')
    {
    sessionStorage.setItem('loggedIn','false')
    location.reload()
    }
   this.dateString = this.d.getDate()  + "-" + (this.d.getMonth()+1) + "-" + this.d.getFullYear() + " " +
this.d.getHours() + ":" + this.d.getMinutes();
    
  }

  gotoLogin()
  {
    this.flag=1 
this.router.navigate(['./login'])
  }
}
