import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../animations/animations'
import { SidenavService } from '../../services/sidenav.service'
import $ from 'jquery';
import { Router } from '@angular/router';


interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {

  public sideNavState: boolean = false;
  public linkText: boolean = false;

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  public pages: Page[] = [
    {name: 'mytask', link:'some-link', icon: 'inbox'},
    {name: 'My Tasks', link:'some-link', icon: 'star'},
    {name: 'Work Queues', link:'some-link', icon: 'send'},
  ]

  constructor(private _sidenavService: SidenavService,private router: Router) { }

  ngOnInit() {}
    
  gotoProfile()
  {
    this.router.navigate(['./userprofile'])
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState
    
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

}