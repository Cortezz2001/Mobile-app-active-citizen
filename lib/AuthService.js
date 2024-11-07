import { account, OAuthProvider } from './appwrite';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
// Регистрация пользователя
export const registerUser = async (email, password, name) => {
  try {
    await account.create('unique()', email, password, name);
  } catch (error) {
    throw error;
  }
};

// Авторизация пользователя
export const loginUser = async (email, password) => {
  try {
    await account.createEmailSession(email, password);
  } catch (error) {
    console.error(error);
  }
};

// Получение текущего пользователя
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error(error);
  }
};

// Выход пользователя
export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error(error);
  }
};

export const loginWithGoogle = async () => {
  redirectScheme = makeRedirectUri({ preferLocalhost: true, useProxy: true});

  if (!redirectScheme.includes('localhost')) {
    redirectScheme = `${redirectScheme}localhost`;
  }
  try {
    const url = account.createOAuth2Token(OAuthProvider.Google, redirectScheme);
    const browserResult = await WebBrowser.openAuthSessionAsync(url.href, redirectScheme);
    console.log(redirectScheme);
    if (browserResult.type === 'success') {
        const urlObject = new URL(browserResult.url);
        const secret = urlObject.searchParams.get('secret');
        const userId = urlObject.searchParams.get('userId');

        const session = await appwrite.account.createSession(userId, secret);
        console.log('Session created:', session);

    } else {
        console.error('Authentication failed:', browserResult);
    }
  } catch (error) {
      console.error('Error during Google login:', error);
  }
}