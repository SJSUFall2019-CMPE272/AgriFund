import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

/* Widget External plug-in Import Starts */
/* Widget External plug-in Import Ends */

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


import { SharedModule } from "./shared/shared.module";
import { LeftMenuComponent } from './app-main/left-menu/left-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavService } from './services/sidenav.service';
import { HeaderNewComponent } from './app-main/header-new/header-new.component';

/* Component Import Starts */

import { MytaskComponent } from './mytask/mytask.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { Create_taskComponent } from './create_task/create_task.component';

import { User_profileComponent } from './user_profile/user_profile.component';


/* Component Import Ends */

/* Widget Import Starts */
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ColorPickerModule } from 'ngx-color-picker';

import { PieChartComponent } from './pie-chart/pie-chart.component';

import { Interceptor } from "./Interceptor/interceptor";

import {MainService} from './services/main.service';
import { LandingComponent } from './landing/landing.component';
import { Login1Component } from './login1/login1.component';
import { EditIssueComponent } from './edit-issue/edit-issue.component';
import { DonateComponent } from './donate/donate.component';
import { ErrorComponent } from './error/error.component';
import { MyDonationsComponent } from './my-donations/my-donations.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
/* Widget Import Ends */

@NgModule({
  declarations: [
  	AppComponent,
   
  
	/* Component NgModule Declarations Starts */
	/* Component NgModule Declarations Ends */
	
	/* Widget NgModule Declarations Starts */
	/* Widget NgModule Declarations Ends */
	


    MytaskComponent,

    LeftMenuComponent,
   
    HeaderNewComponent,
    DashboardComponent,
    Create_taskComponent,


    User_profileComponent,
    PieChartComponent,

    LandingComponent,
    Login1Component,
    EditIssueComponent,
    DonateComponent,
    ErrorComponent,
    MyDonationsComponent,
    DonorDashboardComponent,

  ],
  entryComponents: [
		Create_taskComponent,
    User_profileComponent,
    EditIssueComponent
	],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    
    
	/* Widget NgModule Imports Starts */
	/* Widget NgModule Imports Ends */
	
    HttpClientModule,
    ToastrModule.forRoot({closeButton: true}),
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    NgbModalModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ColorPickerModule
  ],
  providers: [
    SidenavService,
    MainService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  	/* Widget NgModule Providers Starts */
  	/* Widget NgModule Providers Ends */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
