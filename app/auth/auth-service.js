import { configureTnsOAuth, TnsOAuthClient } from 'nativescript-oauth2';
import { TnsOaProviderGoogle } from 'nativescript-oauth2/providers';
import {
  WEB_CLIENT_ID,
  WEB_REDIRECT_URI,
  WEB_URL_SCHEME,
} from './config.js';
let client = null;

function configureOAuthProviderGoogle () {
  const googleProviderOptions = {
    openIdSupport: 'oid-full',
    clientId: WEB_CLIENT_ID,
    redirectUri: WEB_REDIRECT_URI,
    urlScheme: WEB_URL_SCHEME,
    scopes: ["email"],
  };
  const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
  return googleProvider;
};

export function configureOAuthProviders() {
  const googleProvider = configureOAuthProviderGoogle();
  configureTnsOAuth([googleProvider]);
}

export function tnsOauthLogin(providerType) {
  client = new TnsOAuthClient(providerType);
  client.loginWithCompletion(function (tokenResult, error) {
    if (error) {
      console.error(`Back to main page: ${error}`);
    } else {
      console.log(`back to mainpage with access token: ${tokenResult}`);
    }
  });
}

export function tnsOauthLogout() {
  if (client) {
    client.logout();
  }
}
