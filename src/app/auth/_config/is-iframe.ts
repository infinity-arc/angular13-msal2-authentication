
type IsInitNavigation = 'enabled' | 'disabled';

const isIframe = (): IsInitNavigation => window !== window.parent && !window.opener ? 'enabled' : 'disabled';

export {isIframe,IsInitNavigation};
