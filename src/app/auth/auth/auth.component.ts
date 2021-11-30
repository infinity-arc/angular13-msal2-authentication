import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { EventMessage, EventType, RedirectRequest } from '@azure/msal-browser';
import { filter, Subscription } from 'rxjs';
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
		@Inject(MSAL_GUARD_CONFIG) private _msalGuardConfig: MsalGuardConfiguration,
		private _authService: MsalService,
		private _msalBroadCaster: MsalBroadcastService
	) {
		this.title = 'title';
		this.isIframe = false;
		this.loginDisplay = false;
		this._isPopup = isPopup
		this._subscriptions = [];
	}

	/* LIFE HOOKS */
	ngOnInit(): void {
		this.isIframe = isIE();
		console.log('Auth Component Init')
		this._turnOnMsalBroadCaster()
	}
	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	/* METHODS */

	private _turnOnMsalBroadCaster() {
		const subscription = this._msalBroadCaster.msalSubject$
			.pipe(
				filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
			)
			.subscribe((result: EventMessage) => {
				console.log(result);
			});
		this._subscriptions.push(subscription);
	}

	/**
	 * @description login popup method
	 */
	private _loginPopup(): void {
		const subscription = this._authService.loginPopup()
			.subscribe({
				next: (result) => {
					console.log(result);
					this.setLoginDisplay();
				},
				error: (error) => console.log(error)
			});
		this._subscriptions.push(subscription);
	}

	/**
	 * @description login popup method
	 */
	private _loginRedirect = (): any => this._msalGuardConfig.authRequest
			? this._authService.loginRedirect({ ...this._msalGuardConfig.authRequest } as RedirectRequest)
			: this._authService.loginRedirect();

	/**
	 * @description Login selector activation
	 */
	login =(): void => this._isPopup? this._loginPopup(): this._loginRedirect();

	/**
	 * @description Login selector activation
	 */
	logout = () => this._authService.logout();

	/**
	 * @description set login display
	 */
	setLoginDisplay = () => this.loginDisplay = this._authService.instance.getAllAccounts().length > 0;
}
