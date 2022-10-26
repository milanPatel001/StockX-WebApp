const admin = require("firebase-admin");
const serviceAccount = require("./firebase_sdk");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db, auth };
