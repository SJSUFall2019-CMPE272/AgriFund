import { Component } from '@angular/core';

import { onMainContentChange } from './app-main/animations/animations';
import { SidenavService } from './services/sidenav.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent {
  public onSideNavChange: boolean;
  title = 'Widget';
  isHeaderLoaded = false;

  constructor(private _sidenavService: SidenavService,private router: Router) { 

  this._sidenavService.sideNavState$.subscribe( res => {
    console.log(res)
    this.onSideNavChange = res;
  })
  }
  loggedIn:any='false'
  ngOnInit() { 
    this.loggedIn='false'
    if(sessionStorage.getItem('loggedIn')!=null)
 this.loggedIn=sessionStorage.getItem('loggedIn')
 if(sessionStorage.getItem('flag')==='true'){
   this.router.navigate(['./dashboard'])
   sessionStorage.setItem('flag','false')
 }
  }
  updateHeaderFlag(value) {
  this.isHeaderLoaded = value;
  
  }  
}