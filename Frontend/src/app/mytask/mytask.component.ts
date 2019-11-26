import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, TemplateRef, AfterViewInit, VERSION } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Create_taskComponent } from '../create_task/create_task.component';
import {EditIssueComponent} from '../edit-issue/edit-issue.component';
import {MainService} from '../services/main.service';


import { Subject } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MatStepper } from '@angular/material';
import { timingSafeEqual } from 'crypto';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

export interface PeriodicElement1 {
  name: string;
  position: number;
status: string;
  Due: string;
}

export interface DialogData {
  animal: string;
  name: string;
}




export interface PeriodicElement {
  name: string;
  position: number;
status: string;
  Due: string;

}


@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.css']
})
export class MytaskComponent implements OnInit {

 animal: string;
  name: string;

  specificIssueResponce:any=[
    { position: 1, name: 'Crops',  status: 'closed', Due: '29/10/2019' },
    { position: 2, name: 'Equipment',  status: 'open', Due: '29/10/2019' },
    { position: 3, name: 'Tools',  status: 'open', Due: '29/10/2019' },
    { position: 4, name: 'Fertilizers',  status: 'closed', Due: '29/10/2019' },
    { position: 5, name: 'Transport',  status: 'open', Due: '29/10/2019' },
    { position: 6, name: 'Water',  status: 'closed', Due: '29/10/2019' },
    { position: 7, name: 'Water',  status: 'open', Due: '29/10/2019' },
    { position: 8, name: 'Vehicle',  status: 'closed', Due: '29/10/2019' },
    { position: 9, name: 'Crops',  status: 'open', Due: '29/10/2019' },
    { position: 10, name: 'Land',  status: 'closed', Due: '29/10/2019' },
    { position: 11, name: 'Home',  status: 'closed', Due: '29/10/2019' },
  ]
  allIssueResponce=[
  { position: 1, name: 'Crops',  status: 'closed', Due: '29/10/2019' },
  { position: 2, name: 'Equipment',  status: 'open', Due: '29/10/2019' },
  { position: 3, name: 'Tools',  status: 'open', Due: '29/10/2019' },
  { position: 4, name: 'Fertilizers',  status: 'closed', Due: '29/10/2019' },
  { position: 5, name: 'Transport',  status: 'open', Due: '29/10/2019' },
  { position: 6, name: 'Water',  status: 'closed', Due: '29/10/2019' },
  { position: 7, name: 'Water',  status: 'open', Due: '29/10/2019' },
  { position: 8, name: 'Vehicle',  status: 'closed', Due: '29/10/2019' },
  { position: 9, name: 'Crops',  status: 'open', Due: '29/10/2019' },
  { position: 10, name: 'Land',  status: 'closed', Due: '29/10/2019' },
  { position: 11, name: 'Home',  status: 'closed', Due: '29/10/2019' },
  ]
  private ngVersion: string = VERSION.full;
    // Only required when not passing the id in methods
    @ViewChild('stepper',{static:true}) private myStepper: MatStepper;
    totalStepsCount: number;
    
  public sidenav: any;
  conditionFlag: boolean = true;
  mode = new FormControl('over');
  displayedColumns: string[] = ['select', 'position', 'name', 'Due', 'status', 'Actions'];
  displayedColumnsAllIssues: string[] = ['select', 'position', 'name', 'Due', 'status'];
  dataSource = new MatTableDataSource<any>(this.specificIssueResponce);
  dataSource2=new MatTableDataSource<any>(this.allIssueResponce)
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

 


  refresh: Subject<any> = new Subject();



  activeDayIsOpen: boolean = true;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  isAllSelected1() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected === numRows;
  }

  screenMode() {
    this.conditionFlag = !this.conditionFlag;
  }

  screenMode1(sidenav: any) {
    sidenav.toggle()
    this.conditionFlag = true;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  masterToggle1() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  constructor(private _Mainservice: MainService, public dialog: MatDialog,private elemRef: ElementRef, private modal: NgbModal) { }
  
  username:any
  ngOnInit() {

  this.specificIssueResponce=this._Mainservice.getSpecificIssue(this.username)
this.username=sessionStorage.getItem('name')
this.allIssueResponce=this._Mainservice.getAllIssues()
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator=this.paginator
    this.dataSource2.sort=this.sort
    

  }
  seletedissue:any
  openDialog(): void {
    const dialogRef = this.dialog.open(Create_taskComponent, {
      width: '1000px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(EditIssueComponent, {
      width: '1000px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}