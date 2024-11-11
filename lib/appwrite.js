import {
    Client,
    Account,
    OAuthProvider,
    Databases,
    ID,
    Avatars,
    Query,
} from "react-native-appwrite";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "672ba86b0003089304ff";
export const PLATFORM = "com.cortezz2001.active-citizen";
export const DATABASE_ID = "672bab250002ac298663";
export const STORAGE_ID = "6731daa70026e3cbfa8c";
export const USER_COLLECTION_ID = "672bb791003dbbf6dae3";
export const client = new Client();

client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID).setPlatform(PLATFORM);

export const account = new Account(client);
// const storage = new Storage(client);
const avatars = new Avatars(client);
export const databases = new Databases(client);

// Регистрация пользователя
export const createUser = async (email, password, name) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(name);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                name: name,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};

// Авторизация пользователя
export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

// Получение текущего пользователя
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            DATABASE_ID,
            USER_COLLECTION_ID,
            [Query.equal("accountId", currentAccount.$id)]
        );
        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Выход пользователя
export async function signOut() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const loginWithGoogle = async () => {
    redirectScheme = makeRedirectUri({ preferLocalhost: true, useProxy: true });

    if (!redirectScheme.includes("localhost")) {
        redirectScheme = `${redirectScheme}localhost`;
    }
    try {
        const url = account.createOAuth2Token(
            OAuthProvider.Google,
            redirectScheme
        );
        const browserResult = await WebBrowser.openAuthSessionAsync(
            url.href,
            redirectScheme
        );
        console.log(redirectScheme);
        if (browserResult.type === "success") {
            const urlObject = new URL(browserResult.url);
            const secret = urlObject.searchParams.get("secret");
            const userId = urlObject.searchParams.get("userId");

            const session = await account.createSession(userId, secret);
            console.log("Session created:", session);
        } else {
            console.error("Authentication failed:", browserResult);
        }
    } catch (error) {
        console.error("Error during Google login:", error);
    }
};
