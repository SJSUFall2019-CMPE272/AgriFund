import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { User_profileComponent } from '../../user_profile/user_profile.component';

// export interface DialogData {
//   animal: string;
//   name: string;
// }
@Component({
  selector: 'app-header-new',
  templateUrl: './header-new.component.html',
  styleUrls: ['./header-new.component.css']
})
export class HeaderNewComponent implements OnInit {

// animal: string;
//   name: string;

  @Input() sidenav: MatSidenav

  constructor() { }
username:any
  ngOnInit() {
    this.username=sessionStorage.getItem('name')
  }
}
