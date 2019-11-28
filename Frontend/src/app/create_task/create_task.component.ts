import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';


import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-create_task',
  templateUrl: './create_task.component.html',
  styleUrls: ['./create_task.component.css']
})
export class Create_taskComponent implements OnInit {

  constructor( private  elemRef: ElementRef,
  public dialogRef: MatDialogRef<Create_taskComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { 
	
  }
  issueName:any;category:any;description:any;problemsFaced:any;solutionProposed:any;amtReq:any
   onNoClick(): void {
    this.dialogRef.close();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}