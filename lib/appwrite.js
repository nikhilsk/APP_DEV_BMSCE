import { Client, Databases, ID } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform('dev.bmsce.main'); // must match the bundle ID you added in Appwrite console

const databases = new Databases(client);

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

export const createSubmission = async (data) => {
  return await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
};

export const getSubmissions = async () => {
  const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
  return res.documents;
};
