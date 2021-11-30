import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalModule } from '@azure/msal-angular';
import { client, guardConfig, interceptorConfig } from './_config/config';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthRouterModule } from './auth-router.module';
import { BrowserModule } from '@angular/platform-browser';

/**
 * @description Authentication Module
 */

@NgModule({
	declarations: [HomeComponent, ProfileComponent],
	imports: [
		CommonModule,
		AuthRouterModule,
		MsalModule.forRoot(client, guardConfig, interceptorConfig)
	],
	exports: [
		MsalModule,
		AuthRouterModule
	]
})
export class AuthModule { }
