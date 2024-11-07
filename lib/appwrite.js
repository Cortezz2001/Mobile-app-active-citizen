import { Client, Account, OAuthProvider } from 'react-native-appwrite';

export const API_ENDPOINT = 'https://cloud.appwrite.io/v1'
export const PROJECT_ID = '672ba86b0003089304ff'
export const PLATFORM = 'com.cortezz2001.active-citizen'
export const client = new Client();

client
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID)
    .setPlatform(PLATFORM)

export const account = new Account(client);
export { ID } from 'appwrite';
export { OAuthProvider }
