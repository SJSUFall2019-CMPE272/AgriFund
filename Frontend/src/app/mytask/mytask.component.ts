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
import { DonateComponent } from '../donate/donate.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';

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

  userType:any
 animal: string;
  name: string;
 test="test"







  specificIssueResponceForUser:any=[
    { Key: 'issue1', Record:{description: 'borewell description',  status: 'open', issue_created_date: '11-12-2019'} }
  ]
  allIssueResponce=[
    { Key: 'issue1', Record:{description: 'borewell description',  status: 'open', issue_created_date: '11-12-2019'} },
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
  dataSource = new MatTableDataSource<any>(this.specificIssueResponceForUser);
  dataSource2=new MatTableDataSource<any>(this.allIssueResponce)
  
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

 


  refresh: Subject<any> = new Subject();



  activeDayIsOpen: boolean = true;
  specificIssueDetails: any;

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

  constructor(private _Mainservice: MainService, public dialog: MatDialog,private elemRef: ElementRef, private modal: NgbModal,private http : HttpClient) { }
  
  username:any
  async ngOnInit() {
    this.userType=sessionStorage.getItem('userType')
    this.username=sessionStorage.getItem('name')
    this.getAllIssues()
  //this.specificIssueResponceForUser=this._Mainservice.getAllIssueForUser(this.username)
  //console.log(this.specificIssueResponceForUser+"%%%%%%%%%%%%")

     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator=this.paginator
    this.dataSource2.sort=this.sort
    this.setValues()
  }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
  }


  specificIssueName:any
  specifcIssueAttachment:any
  specificIssueRaisedBY:any
  specificIssueInfo:any
  specificIssueProblemFaced:any
  specificIssueSolutionProposed:any
  specifcIssueOtherInformation:any

  specificIssueForSpecificUserResponse:any

setValues(){
  this.specificIssueName="Crops";
  this.specificIssueDetails="Need money for crops";
  this.specifcIssueAttachment="Issue attachments";
  this.specificIssueRaisedBY="Farmer1";
  this.specificIssueInfo="Farmer contact email";
  this.specificIssueProblemFaced="not able to plant crops";
  this.specificIssueSolutionProposed="need money to buy crops";
  this.specifcIssueOtherInformation="other info"


  this.specificIssueForSpecificUserResponse=[
    {
    "issueName" : this.specificIssueName,
    "issueDetails":this.specificIssueDetails,
    "issueAttachments":this.specifcIssueAttachment,
    "issueRaisedBy":this.specificIssueRaisedBY,
    "issueInfo":this.specificIssueInfo,
    "issueProblemFaced":this.specificIssueProblemFaced,
    "issueSolutionProposed":this.specificIssueSolutionProposed,
    "issueOtherInformation":this.specifcIssueOtherInformation
}
  ]
//console.log(this.specificIssueForSpecificUserResponse)
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


  openDialogDonate(): void {
    const dialogRef = this.dialog.open(DonateComponent, {
      width: '550px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  getissue(issueID:any, sidenav){

    sidenav.toggle();

    

    //window.alert(issueID)
//console.log(issueID)
  }


  getAllIssuesForAUser(){
this.specificIssueResponceForUser=this._Mainservice.getAllIssueForUser(this.username)
  }

  getSpecificIssueforSpecificUser(){
    this.specificIssueForSpecificUserResponse
  }





  getAllIssues():any{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("https://chain-agrifund.mybluemix.net/api/issues",{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
this.allIssueResponce=<any>res
            this.dataSource2=new MatTableDataSource<any>(this.allIssueResponce)
        });

        
  }
}