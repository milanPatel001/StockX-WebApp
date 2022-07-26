const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied. No token provided");

  try {
    const validUser = jwt.verify(token, "privateKey");

    req.user = validUser;

    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
    console.log(ex);
  }
}

module.exports = auth;
