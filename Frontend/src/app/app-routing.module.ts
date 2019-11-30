import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/* Component Import Starts */
import { MytaskComponent } from './mytask/mytask.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { User_profileComponent } from './user_profile/user_profile.component';


import { LandingComponent } from './landing/landing.component';
import { Login1Component } from './login1/login1.component';
import { DonateComponent } from './donate/donate.component';
import { ErrorComponent } from './error/error.component';
import { MyDonationsComponent } from './my-donations/my-donations.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
/* Component Import Ends */

const appRoutes: Routes = [
	
	/* Component Routes Starts */
	{ path: 'mytask', component: MytaskComponent },
	
	/* Component Routes Ends */


	{ path: 'mytask', component: MytaskComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'userprofile', component: User_profileComponent },

	{path:"",component:LandingComponent},
	{path:'login',component:Login1Component},
	{path:'donate',component:DonateComponent},
	{path:'mydonation',component:MyDonationsComponent},
	{path:'donorDashboard',component:DonorDashboardComponent},
	{path:'**',component:ErrorComponent}

];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
