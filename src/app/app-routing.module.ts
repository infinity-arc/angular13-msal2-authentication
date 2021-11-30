import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth/auth.component';
import { isIframe } from './modules/auth/_config';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule),
		pathMatch: 'full'
	}
];

const routerOptions = {
	initialNavigation: isIframe()
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
