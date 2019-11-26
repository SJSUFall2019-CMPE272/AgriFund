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
	
  this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

   onNoClick(): void {
    this.dialogRef.close();
  }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}