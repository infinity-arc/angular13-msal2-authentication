import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { isIframe } from './auth/_config';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{
		path: '',redirectTo: '/home',pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'login/:logintype',
		loadChildren: ()=>import('src/app/auth/auth.module').then(m=>m.AuthModule),
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
