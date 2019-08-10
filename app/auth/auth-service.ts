import * as appSettings from 'tns-core-modules/application-settings';
import { configureTnsOAuth, TnsOAuthClient, ITnsOAuthTokenResult } from 'nativescript-oauth2';
import { TnsOaProviderGoogle, TnsOaProviderOptionsGoogle } from 'nativescript-oauth2/providers';
import axios from 'axios';
import {
  ANDROID_CLIENT_ID,
  ANDROID_REDIRECT_URI,
  ANDROID_URL_SCHEME,
  SERVER_BASE_URL,
} from './config.js';

let client: TnsOAuthClient = null;

const strictlyServer = axios.create({
  baseURL: SERVER_BASE_URL,
});

const configureOAuthProviderGoogle = () => {
  const googleProviderOptions: TnsOaProviderOptionsGoogle = {
    openIdSupport: 'oid-full',
    clientId: ANDROID_CLIENT_ID,
    redirectUri: ANDROID_REDIRECT_URI,
    urlScheme: ANDROID_URL_SCHEME,
    scopes: ['profile', 'email'],
  };
  const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
  return googleProvider;
};

export const configureOAuthProviders = () => {
  const googleProvider = configureOAuthProviderGoogle();
  configureTnsOAuth([googleProvider]);
}

export const tnsOauthLogin = (providerType, routeCallback) => {
  client = new TnsOAuthClient(providerType);
  client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult, error) => {
    if (error) {
      console.error(`Back to main page: ${error}`);
    } else {
      console.log(`back to mainpage with access token: ${tokenResult}`);
      const { accessToken } = tokenResult;
      strictlyServer.defaults.headers.common['Authorization'] = accessToken;
      strictlyServer.post('/login')
        .then((response) => {
          const token = response.data;
          appSettings.setString("jwt", token);
          routeCallback();
        })
        .catch((err) => {
          console.error(`Failed to login: ${err}`);
        });
    }
  });
}

export const tnsOauthLogout =() => {
  if (client) {
    client.logout();
  }
}
