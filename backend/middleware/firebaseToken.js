const { db, auth } = require("../auth/firebaseConfig");

const firebaseAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const idToken = authHeader.split(" ")[1];

  if (authHeader) {
    auth
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.uid = decodedToken.uid;
        return next();
      })
      .catch((error) => {
        res.status(404).send({ passed: false });
      });
  } else {
    res.status(401).send({ passed: false });
  }
};

module.exports = firebaseAuth;
