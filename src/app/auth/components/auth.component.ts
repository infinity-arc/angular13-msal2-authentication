import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { EventMessage, EventType, RedirectRequest } from '@azure/msal-browser';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { isIE, isPopup } from '../_config';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

	/* PROPERTIES */
	public title: string;
	public isIframe: Boolean;
	public loginDisplay: boolean;
	private _isPopup: boolean;
	private _subscriptions: Subscription[];

	/* CONSTRUCTOR */
	constructor(
		private authService: AuthService
	) {
		this.title = 'title';
		this.isIframe = authService.isIframe;
		this.loginDisplay = authService.loginDisplay;
		this._isPopup = authService.isPopup;
		this._subscriptions = [];
	}

	/* LIFE HOOKS */
	ngOnInit(): void {
		this.isIframe = isIE();
		console.log('Auth Component Init')
	}
	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	/* METHODS */


	/**
	 * @description login popup method
	 */
	private _loginPopup = (): any => this.authService.loginPopup();

	/**
	 * @description login popup method
	 */
	private _loginRedirect = (): any => this.authService.loginRedirect();

	/**
	 * @description Login selector activation
	 */
	login = (): void => this._isPopup ? this._loginPopup() : this._loginRedirect();

	/**
	 * @description Login selector activation
	 */
	logout = () => this.authService.logout();

	/**
	 * @description set login display
	 */
	setLoginDisplay = () => this.authService.setLoginDisplay();
}
