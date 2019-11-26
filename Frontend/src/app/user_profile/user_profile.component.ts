import { Component, OnInit, ElementRef, Inject } from '@angular/core';


import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-user_profile',
  templateUrl: './user_profile.component.html',
  styleUrls: ['./user_profile.component.css']
})
export class User_profileComponent implements OnInit {

  constructor(private  elemRef: ElementRef) { }

  ngOnInit() { 

  }

}