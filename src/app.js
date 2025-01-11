const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Now We Are Running By Using Path Req ");
});

app.use("/kavi", (req,res) => {
  res.send("kavi is great");
});

app.use("/", (req, res) => {
  res.send("Welcome To Node Js ");
});

app.listen(7777);
