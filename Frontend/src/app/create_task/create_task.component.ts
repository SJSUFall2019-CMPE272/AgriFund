import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';


import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create_task',
  templateUrl: './create_task.component.html',
  styleUrls: ['./create_task.component.css']
})
export class Create_taskComponent implements OnInit {
  issueName:any;
  category:any;
  description:any;
  problemsFaced:any;
  solutionProposed:any;
  amtReq:any
  d = new Date();
  dateString:any
  constructor( private  elemRef: ElementRef,private http : HttpClient,private router: Router,
  public dialogRef: MatDialogRef<Create_taskComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  username:any
  requestObject:any
  ngOnInit() { 
  this.username=sessionStorage.getItem('name')
  
    
  }
  
   onNoClick(): void {
    this.dialogRef.close();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  createIssue()
  {
    this.dateString = this.d.getDate()  + "-" + (this.d.getMonth()+1) + "-" + this.d.getFullYear()
    this.requestObject={
      "issue": this.issueName,
      "farmer_name": this.username,
      "description": this.description,
        "issue_created_date": this.dateString,
        "requested_amount": this.amtReq,
        "raised_amount": "0",
        "problem_faced": this.problemsFaced,
        "solution_proposed": this.solutionProposed
   }
    let header = new HttpHeaders();
     header.append('Content-Type', 'application/json');
      this.http.post("https://chain-agrifund.mybluemix.net/api/issues",this.requestObject,{headers: header}).subscribe((res) => {
             this.router.navigate(['./mytask']);
             //tostr message
            console.log(res);
         });
  }
}