import { configureTnsOAuth, TnsOAuthClient } from 'nativescript-oauth2';
import { TnsOaProviderGoogle } from 'nativescript-oauth2/providers';
import {
  ANDROID_CLIENT_ID,
  REDIRECT_URI,
  URL_SCHEME
} from './config.js';
const client = null;

function configureOAuthProviderGoogle () {
  const googleProviderOptions = {
    openIdSupport: 'oid-full',
    clientId: ANDROID_CLIENT_ID,
    redirectUri: REDIRECT_URI,
    urlScheme: URL_SCHEME,
    scopes: ["email"],
  };
  const googleProvider = TnsOaProviderGoogle(googleProviderOptions);
  return googleProvider;
};

function configureOAuthProviders() {
  const googleProvider = configureOAuthProviderGoogle();
  configureTnsOAuth([googleProvider]);
}

function tnsOauthLogin(providerType) {
  client = new new TnsOAuthClient(providerType);
  client.loginWithCompletion(function (tokenResult, error) {
    if (error) {
      console.error(`Back to main page: ${error}`);
    } else {
      console.log(`back to mainpage with access token: ${tokenResult}`);
    }
  });
}

function tnsOauthLogout() {
  if (client) {
    client.logout();
  }
}

exports.configureOAuthProviders = configureOAuthProviders;
exports.tnsOauthLogin = tnsOauthLogin;
exports.tnsOauthLogout = tnsOauthLogout;