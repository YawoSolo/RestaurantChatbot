import admin from "firebase-admin";
import { readFileSync } from "fs";
import 'dotenv/config'; // or: require('dotenv').config(); for CommonJS

// Replace with the path to your service account key
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Replace with your admin user's UID
const adminUid = process.env.ADMIN_USER_UID;
if (!adminUid) {
  console.error("ADMIN_UID not set in environment!");
  process.exit(1);
}

admin
  .auth()
  .setCustomUserClaims(adminUid, { admin: true })
  .then(() => {
    console.log(`Custom claim 'admin: true' set for user ${adminUid}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error setting custom claim:", error);
    process.exit(1);
  });
