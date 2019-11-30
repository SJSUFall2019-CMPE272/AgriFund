


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
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  Id: string;
  IssueName: string;
  Date: string;
  status: string;
}


@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.css']
})
export class MyDonationsComponent implements OnInit {

  userType:any
 animal: string;
  name: string;


  specificDonoResponceForUser:any=[
    
  ]
  allIssueResponce:PeriodicElement[]=[
  ]
  private ngVersion: string = VERSION.full;
    // Only required when not passing the id in methods
    @ViewChild('stepper',{static:true}) private myStepper: MatStepper;
    totalStepsCount: number;
    
  public sidenav: any;
  conditionFlag: boolean = true;
  mode = new FormControl('over');
  displayedColumns: string[] = ['select', 'position', 'name', 'Due', 'Actions'];
  displayedColumnsAllIssues: string[] = ['select', 'Id', 'IssueName', 'Date', 'status','Actions'];
  dataSource = new MatTableDataSource<any>(this.specificDonoResponceForUser);
  dataSource2=new MatTableDataSource<PeriodicElement>(this.allIssueResponce)
  
  selection = new SelectionModel<any>(true, []);
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort,{ static: true }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {

    this.dataSource2.paginator=this.paginator
    this.dataSource2.sort=this.sort
    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

 


  refresh: Subject<any> = new Subject();



  activeDayIsOpen: boolean = true;
  //specificIssueDetails: any;

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  constructor(public toastr: ToastrService,private _Mainservice: MainService, public dialog: MatDialog,private elemRef: ElementRef, private modal: NgbModal,private http : HttpClient,private router:Router) { }
  
  username:any
  async ngOnInit() {
    if(sessionStorage.getItem('lIn')===null){
      this.toastr.error('Please Login First')
      this.router.navigate(['./login'])
      return 
    }
    this.userType=sessionStorage.getItem('userType')
    this.username=sessionStorage.getItem('name')
    this.getAllIssues()
  
  this.getAllDonationsForUser()
     
    
  }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource2.filter = filterValue;
  }

  

  specificIssueForSpecificUserResponse:any=[
    {
        "key": "ISSUE8",
        "Record": {
            "description": "need more money to buy more land",
            "docType": "farmer_issue",
            "donators": [
                {
                    "donated_amount": 300,
                    "donated_date": "11-27-2019",
                    "donator_name": "Doremon"
                },
                {
                    "donated_amount": 300,
                    "donated_date": "11-27-2019",
                    "donator_name": "ramya"
                }
            ],
            "farmer_name": "Kowshhal",
            "issue": "buy more land",
            "issue_created_date": "11-12-2019",
            "problem_faced": "problem faced to be updated",
            "raised_amount": 600,
            "requested_amount": "40000",
            "solution_proposed": "solution to be updated",
            "status": "closed"
        }
    }
]

  
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

  openDialog1(selectedIssue:any) {
    console.log(selectedIssue)
sessionStorage.setItem('selectedIssue',selectedIssue)
//console.log(selectedIssue)
    const dialogRef = this.dialog.open(EditIssueComponent, {
      width: '1000px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  openDialogDonate(selectedIssue): void {
    sessionStorage.setItem('selectedIssue',selectedIssue)
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

    //sessionStorage.setItem('issueId',issueID)
      let header = new HttpHeaders();
      header.append('Content-Type', 'application/json');
       this.http.get("https://chain-agrifund.mybluemix.net/api/issues/"+issueID,{headers: header}).subscribe((res) => {
              //tostr message
              console.log(res);
              this.specificIssueForSpecificUserResponse=res
              sidenav.toggle();
          });

  }






  getAllIssues():any{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("https://chain-agrifund.mybluemix.net/api/issues",{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
this.allIssueResponce=<PeriodicElement[]>res
            this.dataSource2=new MatTableDataSource<PeriodicElement>(this.allIssueResponce)
            this.dataSource2.paginator=this.paginator
    this.dataSource2.sort=this.sort
        });

        
  }


  getAllDonationsForUser(){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("https://backend-agrifund.mybluemix.net/donors/"+this.username,{headers: header}).subscribe((res) => {
            this.specificDonoResponceForUser=<any>res
            this.dataSource=new MatTableDataSource<any>(this.specificDonoResponceForUser)
            console.log(res);
            return res
        });
        
  }
}