/**
 * @description MSAL Configuration file
 */

import { BrowserAuthOptions, BrowserSystemOptions, CacheOptions, InteractionType, PublicClientApplication } from "@azure/msal-browser"
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { isIE } from "./isIE";

export const isPopup = false;

export const GRAPH_API_ENDPOINT = 'https://graph.microsoft.com';

/**
 * @description Client Configuration
 */

const auth: BrowserAuthOptions = {
	clientId: '*',
	authority: '*',
	redirectUri: '/',
	postLogoutRedirectUri: '/'
}

const cache: CacheOptions = {
	cacheLocation: 'localStorage',
	secureCookies: true,
	storeAuthStateInCookie: isIE()

}

const system: BrowserSystemOptions = {
}

// Create public client
export const client  = new PublicClientApplication({auth, cache, system});

/**
 * @description MsalGuardConfiguration
 */


export const guardConfig: MsalGuardConfiguration = {
	interactionType: InteractionType.Redirect,
	authRequest: {scopes:['User.Read']}
};

/**
 * @description MsalInterceptorConfiguration
 */

export const interceptorConfig: MsalInterceptorConfiguration = {
	interactionType: InteractionType.Redirect,
	protectedResourceMap: new Map<string ,any>([
		[GRAPH_API_ENDPOINT + '/v1.0/me', ['User.Read']]
	])
}
