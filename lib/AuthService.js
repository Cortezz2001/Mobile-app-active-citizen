import { account, OAuthProvider } from './appwrite';

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
    try {
      await account.createOAuth2Session(OAuthProvider.Google)
      console.log("OAuth Google session created");
    } catch (error) {
      console.error(error)
    }
  }