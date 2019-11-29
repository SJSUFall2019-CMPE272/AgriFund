import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';


import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from '../services/main.service';
@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit {
 description:any;problemsFaced:any;solutionProposed:any;amtReq:any
 selectedIssue:any
  constructor( private  elemRef: ElementRef,
    public dialogRef: MatDialogRef<EditIssueComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private mainService:MainService) { }
    ngOnInit() { 
      this.selectedIssue=sessionStorage.getItem('selectedIssure')
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



  editIssue(){
    this.mainService.editSpecificIssue(this.selectedIssue,this.description,this.problemsFaced,this.solutionProposed,this.amtReq)
  }
}
