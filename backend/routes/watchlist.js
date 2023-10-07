const express = require("express");
const router = express.Router();
const { db, auth } = require("../auth/firebaseConfig");
const firebaseAuth = require("../middleware/firebaseToken");

router.post("/:uid/add", firebaseAuth, async (req, res) => {
  console.log(req.body);
  try {
    await db
      .collection("users")
      .doc(req.params.uid)
      .collection("watchlist")
      .doc(req.body.stockSymbol)
      .set({
        stockName: req.body.stockName,
        stockPrice: req.body.stockPrice,
        stockSymbol: req.body.stockSymbol,
        stockPercentChange: req.body.stockPercentChange,
      });

    res.status(200).send({ passed: true });
  } catch (err) {
    res.status(404).send({ passed: false });
  }
});

router.post("/:uid/remove/:symbol", firebaseAuth, async (req, res) => {
  try {
    await db
      .collection("users")
      .doc(req.params.uid)
      .collection("watchlist")
      .doc(req.params.symbol)
      .delete();

    res.status(200).send({ passed: true });
  } catch (err) {
    res.status(404).send({ passed: false });
  }
});

router.get("/:uid", firebaseAuth, async (req, res) => {
  const stocks = [];
  try {
    const snapshot = await db
      .collection("users")
      .doc(req.params.uid)
      .collection("watchlist")
      .get();

    snapshot.forEach((doc) => stocks.push(doc.data()));

    res.status(200).send(stocks);
  } catch (err) {
    res.status(404).send({ passed: false });
    console.log(err);
  }
});

router.get("/:uid/:symbol", firebaseAuth, async (req, res) => {
  try {
    const doc = await db
      .collection("users")
      .doc(req.params.uid)
      .collection("watchlist")
      .doc(req.params.symbol)
      .get();

    res.status(200).send(doc.exists);
  } catch (err) {
    res.status(404).send({ passed: false });
  }
});

module.exports = router;
