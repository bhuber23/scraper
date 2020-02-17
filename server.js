var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");



var PORT = 3000;

// Initialize Express
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/article")(app);
app.use(logger("dev"));



app.use(express.static("public"));
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

  module.exports = app;