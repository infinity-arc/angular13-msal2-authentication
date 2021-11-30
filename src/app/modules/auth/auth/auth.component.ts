import { Component, OnInit } from '@angular/core';
import { InitialNavigation } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { isIE, isIframe } from '../_config';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
	/* PROPERTIES */
	public title: string;
	public isIframe: Boolean
	public loginDisplay: boolean
	/* CONSTRUCTOR */
	constructor(private _authService: MsalService) {
		this.title = 'title';
		this.isIframe = false;
		this.loginDisplay = false;
	}

	/* LIFE HOOKS */
	ngOnInit(): void {
		this.isIframe = isIE();
		console.log('Auth Component Init')
	}

	/* METHODS */
	/**
	 * @description Login activate
	 */
	login() {
		this._authService.loginPopup()
		  .subscribe({
			next: (result) => {
			  console.log(result);
			  this.setLoginDisplay();
			},
			error: (error) => console.log(error)
		  });
	  }

	  setLoginDisplay() {
		this.loginDisplay = this._authService.instance.getAllAccounts().length > 0;
	  }

}
