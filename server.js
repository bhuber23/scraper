var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();


// Parse request body as JSON
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

//Routes

app.get("/scrape", function(req, res){
    axios.get("https://www.beautylish.com/articles").then(function(response){
        var $ = cheerio.load(response.data);

        $(".body").each(function(i, element){
            var result = {};

            result.title = $(this).find("a").text();
            result.summary = $(this).find("p").text();
            result.link = $(this).find("a").attr("href");

            db.Article.create(result).then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(err){
                console.log(err);
            });
        });
        res.send("Scrape complete");
    });
});














app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });