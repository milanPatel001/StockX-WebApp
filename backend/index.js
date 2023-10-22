const express = require("express");
const app = express();
const stocks = require("./routes/stocks");
const users = require("./routes/users");
const login = require("./routes/login");
const watchlist = require("./routes/watchlist");
const cors = require("cors");
const firebaseAuth = require("./middleware/firebaseToken");
const requestCache = require("./middleware/requestCache");
const redisClient = require("./redisConfig");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/stocks", stocks);
app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/watchlist", watchlist);

app.use(firebaseAuth);
app.use(requestCache);

(async () => {
  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  redisClient.on("ready", () => console.log("Redis Ready"));

  await redisClient.connect();
})();

app.listen(process.env.PORT || 3000, () => console.log("Connected"));
