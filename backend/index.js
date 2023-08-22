const express = require("express");
const app = express();
const stocks = require("./routes/stocks");
const users = require("./routes/users");
const login = require("./routes/login");
const watchlist = require("./routes/watchlist");
const cors = require("cors");
const firebaseAuth = require("./middleware/firebaseToken");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/stocks", stocks);
app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/watchlist", watchlist);

app.use(firebaseAuth);

app.listen(process.env.PORT || 3000, () => console.log("Connected"));
