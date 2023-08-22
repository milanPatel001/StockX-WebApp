const express = require("express");
const router = express.Router();
const { db, auth } = require("../auth/firebaseConfig");

router.post("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  auth
    .createUser({
      email: req.body.email,
      displayName: req.body.fullname,
      password: req.body.password,
    })
    .then((userRecord) => res.status(200).send(userRecord))
    .catch((err) => {
      console.log(err);
      res.status(400).send({ passed: false });
    });
  /*
   //const result = await auth.getUserByEmail(req.body.email);

  //if (result.exists) return res.status(400).send("Already registered");
  
    await db.collection("accounts").doc(req.body.email).set({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    */
});

router.get("/myprofile", async (req, res) => {});

module.exports = router;
