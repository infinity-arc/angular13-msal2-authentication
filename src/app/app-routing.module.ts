import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AuthModule } from './auth/auth.module';
import { AuthComponent } from './auth/auth/auth.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { isIframe } from './auth/_config';

const routes: Routes = [
	{
		path: '',redirectTo: '/auth',pathMatch: 'full'
	},
	{
		path: 'auth',
		component: AuthComponent,
		// loadChildren: ()=> import('src/app/modules/auth/auth.module').then(m=>m.AuthModule)
		// component: AuthComponent
		canActivate: [MsalGuard]
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [MsalGuard]
	}
];

const routerOptions = {
	initialNavigation: isIframe()
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
