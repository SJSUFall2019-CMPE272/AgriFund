import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';


import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit {
 description:any;problemsFaced:any;solutionProposed:any;amtReq:any
 selectedIssue:any
 category:any
 placeHolder:any
  constructor( private  elemRef: ElementRef,public toastr: ToastrService,
    public dialogRef: MatDialogRef<EditIssueComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private mainService:MainService,private http : HttpClient,private router:Router) { }
    username:any
    ngOnInit() { 
      this.selectedIssue=sessionStorage.getItem('selectedIssue')
      window.alert(this.selectedIssue)
      this.username=sessionStorage.getItem('name')
      let header = new HttpHeaders();
      // header.append('Content-Type', 'application/json');
      //  this.http.get("https://chain-agrifund.mybluemix.net/api/issues/"+this.selectedIssue,{headers: header}).subscribe((res) => {
      //         //tostr message
      //         this.placeHolder=res

      //         console.log(res);
      //     });
    //get
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

requestObject:any

  editIssue(){
    this.requestObject={
      "farmer_name": this.username,
	"description": this.description, 
    "problem_faced": this.problemsFaced,
    "requested_amount": this.amtReq,
    "solution_proposed": this.solutionProposed    
   }
      
     let header = new HttpHeaders();
      header.append('Content-Type', 'application/json');
       this.http.put("https://chain-agrifund.mybluemix.net/api/issues/"+this.selectedIssue,this.requestObject,{headers: header}).subscribe((res) => {
             this.router.navigate(['./mytask']);
              this.toastr.success('Issue edited')
             console.log(res);
          });
  
}
}
