const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//requiring express
const app = express();

//Loading routes
const contactRoutes = require("./src/routes/contact");
const userRoutes = require("./src/routes/user");
const blogRoutes = require("./src/routes/blog");
const token = require("./src/routes/token");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// re-writing routes
app.use("/api", contactRoutes);
app.use("/api", blogRoutes);
app.use("/api", userRoutes);
app.use("/api", token);
module.exports = app;
