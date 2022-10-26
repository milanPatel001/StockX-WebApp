const express = require("express");
const router = express.Router();
const { db, auth } = require("../auth/firebaseConfig");

router.post("/:uid/add", async (req, res) => {
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

    res.status(200).send("Successfull added");
  } catch (err) {
    res.status(404).send("Error occ while adding " + err);
  }
});

router.post("/:uid/remove/:symbol", async (req, res) => {
  try {
    await db
      .collection("users")
      .doc(req.params.uid)
      .collection("watchlist")
      .doc(req.params.symbol)
      .delete();

    res.status(200).send("Successfull removed");
  } catch (err) {
    res.status(404).send("Error occ while adding " + err);
  }
});

router.get("/:uid", async (req, res) => {
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
    res.status(404).send(err);
    console.log(err);
  }
});

module.exports = router;
