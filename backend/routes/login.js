const express = require("express");
const router = express.Router();

const firebase = require("firebase-admin");
const { db, auth } = require("../auth/firebaseConfig");

router.post("/:uid", async (req, res) => {
  //const { user } = await auth.getUser(req.params.uid);

  try {
    await db.collection("users").doc(req.params.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    res.status(200).send("Updated lastseen");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  auth
    .getUserByEmail(req.body.email)
    .then((user) => {
      /*
      if (user. !== req.body.password) {
        return res.status(400).send("Wrong login or psk");
      }
      */

      res.status(200).send("Successfully logged in");
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
