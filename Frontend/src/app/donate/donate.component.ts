import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Create_taskComponent } from '../create_task/create_task.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.sass']
})
export class DonateComponent implements OnInit {
  constructor( private router:Router,private  elemRef: ElementRef,public dialogRef: MatDialogRef<Create_taskComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _Mainservice: MainService) {
  }
  username:any
  issueSelected:any
donateAmount:any=0
onNoClick(): void {
  this.dialogRef.close();
}
  ngOnInit() {
    this.username=sessionStorage.getItem('username')
    this.issueSelected=sessionStorage.getItem('issueSelected')
  }
  
  setAmount(amt: any){
    this.donateAmount=amt;
  }
  donate(){
    sessionStorage.setItem('donation',this.donateAmount)
    this._Mainservice.donate(this.username,this.donateAmount,this.issueSelected)
    this.router.navigate(['./dashboard'])
  }
  
}
