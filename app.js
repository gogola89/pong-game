const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/server", (req, res) => {
  res.send("Your server is up!");
});

module.exports = app;
