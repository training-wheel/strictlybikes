import { configureTnsOAuth, TnsOAuthClient } from 'nativescript-oauth2';
import { TnsOaProviderGoogle } from 'nativescript-oauth2/providers';
import {
  WEB_CLIENT_ID,
  WEB_REDIRECT_URI,
  WEB_URL_SCHEME,
} from './config.js';
let client = null;

const configureOAuthProviderGoogle = () => {
  const googleProviderOptions = {
    openIdSupport: 'oid-full',
    clientId: WEB_CLIENT_ID,
    redirectUri: WEB_REDIRECT_URI,
    urlScheme: WEB_URL_SCHEME,
    scopes: ['profile'],
  };
  const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
  return googleProvider;
};

export const configureOAuthProviders = () => {
  const googleProvider = configureOAuthProviderGoogle();
  configureTnsOAuth([googleProvider]);
}

export const tnsOauthLogin = (providerType) => {
  client = new TnsOAuthClient(providerType);
  client.loginWithCompletion((tokenResult, error) => {
    if (error) {
      console.error(`Back to main page: ${error}`);
    } else {
      console.log(`back to mainpage with access token: ${tokenResult}`);
    }
  });
}

export const tnsOauthLogout =() => {
  if (client) {
    client.logout();
  }
}
