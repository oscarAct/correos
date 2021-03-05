const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//requiring express
const app = express();

//Loading routes
const userRoutes = require("./src/routes/user");
const blogRoutes = require("./src/routes/blog");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// re-writing routes
app.use("/api", userRoutes);
app.use("/api", blogRoutes);
module.exports = app;
