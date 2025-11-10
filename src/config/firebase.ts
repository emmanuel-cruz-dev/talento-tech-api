import admin from "firebase-admin";
import { config } from "dotenv";

config();

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable not defined");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),
  });
}

const dbAdmin = admin.firestore();

export { dbAdmin };
