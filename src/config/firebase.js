import admin from "firebase-admin";
import { config } from "dotenv";

config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    ),
  });
}

const dbAdmin = admin.firestore();

export { dbAdmin };
