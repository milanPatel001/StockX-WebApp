const express = require("express");
const mongoose = require("mongoose");
const app = express();
const stocks = require("./routes/stocks");
const users = require("./routes/users");
const login = require("./routes/login");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use("/api/stocks", stocks);
app.use("/api/users", users);
app.use("/api/login", login);
app.use(cors(corsOptions));

/*
mongoose.connect(
  "mongodb+srv://milan_mp01:Sairam%401997@cluster1.kqk6u.mongodb.net/stockx?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
*/

app.listen(3000, () => console.log("Connected"));
