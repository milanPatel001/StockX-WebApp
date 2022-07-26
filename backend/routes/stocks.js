const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Stock } = require("../models/stock");
const _ = require("lodash");

const apikey = "4Z88NTHGNYI503NF";
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
      "x-rapidapi-key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      // console.log(response.data);
      res.set(options);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/trending", async (req, res) => {
  var opt = {
    method: "GET",
    url: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v1/finance/trending/US",
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
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
    });
});

router.get("/marketNews", async (req, res) => {
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/ne/news",
    headers: {
      "X-RapidAPI-Key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
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
    });
});

router.get("/popular", async (req, res) => {
  var opt = {
    method: "GET",
    url: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/ws/screeners/v1/finance/screener/predefined/saved",
    params: { scrIds: "day_gainers" },
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      // console.log(response.data.finance.result[0].quotes);
      res.set(options).send(response.data.finance.result[0].quotes);
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/growthTechStocks", async (req, res) => {
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/co/collections/growth_technology_stocks",
    params: { start: "0" },
    headers: {
      "X-RapidAPI-Key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
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
    });
});

router.get("/bio/:symbol", (req, res) => {
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/mo/module/",
    params: {
      symbol: req.params.symbol,
      module: "asset-profile,financial-data,earnings",
    },
    headers: {
      "X-RapidAPI-Key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
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
    });
});

router.get("/:symbol", (req, res) => {
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/op/option",
    params: { expiration: "1705622400", symbol: req.params.symbol },
    headers: {
      "X-RapidAPI-Key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
      "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      res.set(options).send(response.data.optionChain.result[0]);
    })
    .catch(function (error) {
      console.error(error);
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
      "x-rapidapi-key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      res.set(options).send(response.data.ResultSet);
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/stockGraph/:symbol/:period?", async (req, res) => {
  const opt = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/hi/history",
    params: {
      symbol: req.params.symbol,
      interval: req.params.period || "1d",
      diffandsplits: "false",
    },
    headers: {
      "X-RapidAPI-Key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
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
    });
});

module.exports = router;

/*
router.get("/similar/:symbol", async (req, res) => {
  var opt = {
    method: "GET",
    url:
      "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/recommendationsbysymbol/" +
      req.params.symbol,
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": "f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528",
    },
  };

  axios
    .request(opt)
    .then(function (response) {
      // console.log(response.data.finance.result[0]);
      res.set(options).send(response.data.finance.result[0]);
    })
    .catch(function (error) {
      console.error(error);
    });
});


*/

/*
router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find().limit(10);
    res.set(options);
    res.send(stocks);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/random", async (req, res) => {
  const max = 12148;
  const min = 1;
  const randomStockArray = [];

  try {
    for (let i = 1; i <= 5; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min) + min);
      const stock = await Stock.findOne().skip(randomNumber);
      randomStockArray.push(stock);
    }
    res.set(options);
    res.send(randomStockArray);
  } catch (err) {
    res.status(400).send(err);
  }
});

/* 
    /:symbol/:period?
    
    if (!req.params.period) {
         const { data } = await axios.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
             req.params.symbol.toUpperCase() +
             "&apikey=" + apikey);
 
         console.log(data);
         return res.set(options).send(data);
 
     } else {
         */
/*    
    const { data } = await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_"
        + ((req.params.period) ? req.params.period.toUpperCase() : "DAILY") + "&symbol="
        + req.params.symbol.toUpperCase() + "&apikey=" + apikey);

    const result = {
        symbol: _.get(data, ["Meta Data", "2. Symbol"]),
        closingPrice: _.get(data, ["Time Series (Daily)", today, "4. close"])
    }
    console.log(result);
    return res.set(options).send(result);
*/
/*
    var opt = {
        method: 'GET',
        url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v11/finance/quoteSummary/' + req.params.symbol,
        params: { modules: 'summaryDetail,price' },
        headers: {
            'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
            'x-rapidapi-key': 'f951e8b5e5msh944320931f0191ap18a2ecjsn0f4c375d7528'
        }
    };

    axios.request(opt).then(function (response) {
        console.log(response.data.quoteSummary.result[0]);
        res.send(response.data.quoteSummary.result[0]);

    }).catch(function (error) {
        res.status(400).send(error);
    });
*/
