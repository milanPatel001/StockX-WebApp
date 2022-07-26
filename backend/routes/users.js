const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");

const options = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "1800",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
};

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered");

  user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateAuthToken();

  await user.save();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );

  res.header("x-auth-token", token).send(user);
});

router.get("/myprofile", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  //if (!user) return res.status(400).send("User not found");
  res.send(user);
});

module.exports = router;
