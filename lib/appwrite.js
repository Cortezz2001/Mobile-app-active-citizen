import { Client, Account, OAuthProvider } from 'react-native-appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('672ba86b0003089304ff')
    .setPlatform('com.cortezz2001.active-citizen')

export const account = new Account(client);
export { ID } from 'appwrite';
export { OAuthProvider }
