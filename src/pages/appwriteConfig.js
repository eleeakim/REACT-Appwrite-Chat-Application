import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = '6499a6bd5530bc4b53d1'
export const DATABASE_ID = '6499a6bd5530bc4b53d1'
export const COLLECTION_ID_MESSAGES= '6499a6d08f4279eb73a6'

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6499a17e7554892c1558');

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
