/**
 * @description MSAL Configuration file
 */

import { BrowserAuthOptions, BrowserSystemOptions, CacheOptions, Configuration, InteractionType, PublicClientApplication } from "@azure/msal-browser"
import { MsalCustomNavigationClient, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalModule } from '@azure/msal-angular';
import { isIE } from "./isIE";



/**
 * @description Client Configuration
 */

const auth: BrowserAuthOptions = {
	clientId: 'b1231f8d-4a9d-4676-aa6f-b57b9df06359',
	authority: 'https://login.microsoftonline.com/c88844d6-4740-480d-98fc-e50752240f05',
	redirectUri: '/',
}

const cache: CacheOptions = {
	cacheLocation: 'local',
	secureCookies: true,
	storeAuthStateInCookie: isIE()
}

const system: BrowserSystemOptions = {

}

// Create public client
const client  = new PublicClientApplication({auth, cache, system});

/**
 * @description MsalGuardConfiguration
 */


const guardConfig: MsalGuardConfiguration = {
	interactionType: InteractionType.Redirect
};

/**
 * @description MsalInterceptorConfiguration
 */

const interceptorConfig: MsalInterceptorConfiguration = {
	interactionType: InteractionType.Popup,
	protectedResourceMap: new Map<string ,any>()
}



export {client,guardConfig,interceptorConfig};
