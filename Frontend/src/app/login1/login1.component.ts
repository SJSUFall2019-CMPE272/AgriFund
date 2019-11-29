import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../services/main.service';
@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.sass']
})
export class Login1Component implements OnInit {

  constructor(private http : HttpClient, private router: Router,private mainService:MainService) { 

  }
  name:any
  email:any
  password:any
  selectedLevel:any
  ngOnInit() {
    if(sessionStorage.getItem('loggedIn')==='true')
    {
    sessionStorage.setItem('loggedIn','false')
    location.reload()
    }

const signupButton = document.getElementById('signup-button'),
loginButton = document.getElementById('login-button'),
userForms = document.getElementById('user_options-forms')

signupButton.addEventListener('click', () => {
userForms.classList.remove('bounceRight')
userForms.classList.add('bounceLeft')
}, false)

loginButton.addEventListener('click', () => {
userForms.classList.remove('bounceLeft')
userForms.classList.add('bounceRight')
}, false)
  }
  userType="farmer"
login(){
  sessionStorage.setItem('userType','farmer')
  sessionStorage.setItem('loggedIn','true')
  sessionStorage.setItem('flag','true')
  location.reload()
  //this.mainService.login(this.name,this.password)
  this.router.navigate(['./dashboard'])
}
signup(){
  sessionStorage.setItem('loggedIn','true')
  //this.mainService.signup(this.name,this.password,this.email)
  this.router.navigate(['./dashboard'])
}
}
