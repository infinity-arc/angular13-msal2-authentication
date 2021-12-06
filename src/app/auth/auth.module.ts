import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { client, guardConfig, interceptorConfig } from './_config/config';

import { ProfileComponent } from './profile/profile.component';
// import { AuthRouterModule } from './auth-router.module';
import { AuthComponent } from './components/auth.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRouterModule } from './auth-router.module';
/**
 * @description Authentication Module
 */
@NgModule({
	declarations: [ ProfileComponent, AuthComponent],
	imports: [
		HttpClientModule,
		CommonModule,
		// RouterModule,
		AuthRouterModule,
		MsalModule.forRoot(client, guardConfig, interceptorConfig)
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MsalInterceptor,
			multi: true
		},
		MsalGuard
	],
	// providers: [MsalService],
	// exports:[MsalRedirectComponent]
})
export class AuthModule {
	constructor() {
		console.log((this.constructor as any).ɵinj)
	}
}
