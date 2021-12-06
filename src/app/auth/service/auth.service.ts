import { Inject, Injectable } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, RedirectRequest } from '@azure/msal-browser';
import { filter, Observable, ReplaySubject, Subscribable, Subscription } from 'rxjs';
import { isPopup } from '../_config';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	/* PROPERTIES */
	private _isIframe: boolean;
	private _loginDisplay: boolean;
	private _isPopup: boolean;
	private _subscriptions: Subscription[];
	private _broadCastObserver: ReplaySubject<EventMessage>;
	private _broadCastOn: boolean;
	/* CONSTRUCTOR */
	constructor(
		@Inject(MSAL_GUARD_CONFIG) private _msalGuardConfig: MsalGuardConfiguration,
		private _authService: MsalService,
		private _msalBroadCaster: MsalBroadcastService
	) {
		this._broadCastOn = false;
		this._broadCastObserver = new ReplaySubject<EventMessage>();
		this._isIframe = false;
		this._loginDisplay = false;
		this._isPopup = isPopup
		this._subscriptions = [];
		this._turnOnMsalBroadCaster();
	}

	/* METHODS */

	private _turnOnMsalBroadCaster() {
		if(this._broadCastOn){
			return;
		}
		this._broadCastOn = true;
		const subscription = this._msalBroadCaster.msalSubject$
			.pipe(filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS))
			.subscribe((result: EventMessage) => {
				console.log(result);
				this._broadCastObserver.next(result);
			});
		this._subscriptions.push(subscription);
	}

	/* GETTER/SETTER */

	get loginDisplay() : boolean{
		return this._loginDisplay;
	}
	set loginDisplay(value: boolean) {
		this._loginDisplay = value;
	}
	get isIframe() : boolean{
		return this._isIframe;
	}
	set isIframe(value: boolean) {
		this._isIframe = value;
	}
	get isPopup() : boolean{
		return this._isIframe;
	}
	set isPopup(value: boolean) {
		this._isPopup = value;
	}
	get successBroadCast(): Subscribable<EventMessage> {
		return this._broadCastObserver;
	}

	/**
	 * @description login popup method
	 */
	loginPopup(): Observable<AuthenticationResult> {
		return new Observable<AuthenticationResult>(observer=>{
			const subscription = this._authService.loginPopup()
			.subscribe({
				next: (result) => {
					console.log(result);
					this.setLoginDisplay();
					observer.next(result);
					observer.complete();
				},
				error: (error) => {
					observer.error(error);
					observer.complete();
				}
			});
			this._subscriptions.push(subscription);
		})

	}

	/**
	 * @description login popup method
	 */
	loginRedirect = (): any => this._msalGuardConfig.authRequest
		? this._authService.loginRedirect({ ...this._msalGuardConfig.authRequest } as RedirectRequest)
		: this._authService.loginRedirect();

	/**
	 * @description Login selector activation uses the isPopup to determine auth
	 */
	login = (): void => this._isPopup ? this.loginPopup() : this.loginRedirect();

	/**
	 * @description Login selector activation
	 */
	logout = () => this._authService.logout();

	/**
	 * @description set login display
	 */
	setLoginDisplay = () => this._loginDisplay = this._authService.instance.getAllAccounts().length > 0;
}
