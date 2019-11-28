import { Component } from '@angular/core';

import { onMainContentChange } from './app-main/animations/animations';
import { SidenavService } from './services/sidenav.service';



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

  constructor(private _sidenavService: SidenavService) { 

  this._sidenavService.sideNavState$.subscribe( res => {
    console.log(res)
    this.onSideNavChange = res;
  })
  }
  loggedIn:any='false'
  ngOnInit() { 
 this.loggedIn=sessionStorage.getItem('loggedIn')
  }
  updateHeaderFlag(value) {
  this.isHeaderLoaded = value;
  
  }  
}