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

  ngOnInit() {
  }

  gotoLogin()
  {
this.router.navigate(['./login'])
  }
}
