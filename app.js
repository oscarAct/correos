const express = require("express");
const bodyParser = require("body-parser");

//requiring express
const app = express();

//Loading routes
const userRoutes = require("./src/routes/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Config headers and Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// re-writing routes
app.use("/api", userRoutes);
module.exports = app;
