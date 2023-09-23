const express = require("express");
const router = express.Router();
const axios = require("axios");
const _ = require("lodash");
require("dotenv").config();

const options = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "1800",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
};

router.get("/market_movers", (req, res) => {
  var opt = {
    method: "GET",
    url: "https://ms-finance.p.rapidapi.com/market/v2/get-movers",
    headers: {
      "x-rapidapi-host": "ms-finance.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      //console.log("Market Movers: ");
      //  console.log(response.data);
      res.set(options);
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).send({ passed: false });
    });
});

router.get("/trending", async (req, res) => {
  var opt = {
    method: "GET",
    url: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v1/finance/trending/US",
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      //console.log(response.data.finance.result[0].quotes);
      res.set(options).send(response.data.finance.result[0].quotes);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).send({ passed: false });
    });
});

router.get("/marketNews", async (req, res) => {
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/ne/news",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      //console.log("NEWS: ");
      //console.log(response.data);
      res.set(options).send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).send({ passed: false });
    });
});

router.get("/popular", async (req, res) => {
  // var opt = {
  //   method: "GET",
  //   url: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/ws/screeners/v1/finance/screener/predefined/saved",
  //   params: { scrIds: "day_gainers" },
  //   headers: {
  //     "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
  //     "x-rapidapi-key": process.env.RAPID_API_KEY,
  //   },
  // };

  var opt = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/day_gainers",
    params: { start: "0" },
    headers: {
      "X-RapidAPI-Key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
      "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      //console.log("POPULAR");
      //console.log(response.data.finance.result[0].quotes);
      //res.set(options).send(response.data.finance.result[0].quotes);
      res.set(options).send(response.data.quotes);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).send({ passed: false });
    });
});

router.get("/growthTechStocks", async (req, res) => {
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/co/collections/growth_technology_stocks",
    params: { start: "0" },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      res.set(options).send(response.data.quotes);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).send({ passed: false });
    });
});

router.get("/bio/:symbol", (req, res) => {
  // console.log(req.params.symbol);
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/mo/module/",
    params: {
      symbol: req.params.symbol,
      module: "asset-profile,financial-data,earnings",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
    },
  };
  axios
    .request(opt)
    .then(function (response) {
      //console.log(response.data);
      res.set(options).send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).send({ passed: false });
    });
});

router.get("/:symbol", (req, res) => {
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/op/option",
    params: { expiration: "1705622400", symbol: req.params.symbol },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      console.log(response.data.optionChain.result[0]);
      res.set(options).send(response.data.optionChain.result[0]);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).send({ passed: false });
    });
});

router.get("/autocomplete/:symbol?", (req, res) => {
  let sym = req.params.symbol ? req.params.symbol : "a";
  var opt = {
    method: "GET",
    url: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/autocomplete",
    params: { query: sym, lang: "en" },
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      res.set(options).send(response.data.ResultSet);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).send({ passed: false });
    });
});

router.get("/stockGraph/:symbol/:period?", async (req, res) => {
  console.log(req.params.period);
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/hi/history",
    params: {
      symbol: req.params.symbol,
      interval: req.params.period || "1d",
      diffandsplits: "false",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      res.set(options).send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).send({ passed: false });
    });
});

module.exports = router;
