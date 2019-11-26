import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.sass']
})
export class Login1Component implements OnInit {

  constructor(private http : HttpClient, private router: Router) { 
  }
  name:any
  email:any
  password:any
  selectedLevel:any;
  data:Array<Object> = [
      {id: 0, name: "Farmer"},
      {id: 1, name: "Donor"}
  ];
  ngOnInit() {

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
login(){
  sessionStorage.setItem('name',this.name)
  console.log(this.email,this.name,this.password,this.selectedLevel)
  this.router.navigate(['./dashboard'])
}
}
