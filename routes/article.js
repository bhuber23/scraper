var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");
var app = express();



//Home page
module.exports = function(app){


app.get("/", function(req, res){
    db.Article.find({}).lean().then(function(dbArticle){
        res.render("index", {article: dbArticle});
    }).catch(function(err){
        res.json(err);
    });
});

//Saved Page
app.get("/saved", function(req, res){
    db.Article.find({"saved": true}).populate("comment").lean()
    .then(function(dbArticle){
        res.render("saved", {article: dbArticle});
    }).catch(function(err){
        console.log(err);
    });
});

app.get("/scrape", function(req, res){
    axios.get("https://www.nytimes.com/topic/subject/beauty").then(function(response){
        var $ = cheerio.load(response.data);

        $(".css-ye6x8s").each(function(i, element){
            var result = {};

            result.title = $(this).find("h2").text();
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

app.get("/articles", function(req, res){
    db.Article.find({}).lean().then(function(dbArticle){
        res.render("index", {article: dbArticle});
    }).catch(function(err){
        res.json(err);
    });
});

app.get("/articles/:id", function(req, res){
    db.Article.findOne({
        _id: req.params.id
    }).populate("comment").then(function(dbArticle){
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    });
});

//Save article
app.post("/articles/saved/:id", function(req, res){
    db.Article.findOneAndUpdate({_id: req.params.id}, {"saved": true})
    .then(function(dbArticle){
        res.send(dbArticle)
    }).catch(function(err){
        res.json(err);
    });
});

//Delete article
app.delete("/articles/saved/delete/:id", function(req, res){
    db.Article.findOneAndRemove({_id: req.params.id})
    .then(function(dbArticle){
        return db.Article.findOneAndUpdate({_id: req.params.id}, { $pull: { article: dbArticle._id}});
    }).then(function(dbArticle){
        res.send(dbArticle)
    }).catch(function(err){
        console.log(err);
    });
});

//Add Comment
app.post("/comments/saved/:id", function(req, res){
    console.log(req.body);

    db.Comment.create({...req.body, article: req.params.id})
    .then(function(dbComment){
        return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: { comment: dbComment._id }});
    }).then(function(dbComment){
        res.send(dbComment)
    }).catch(function(err){
        console.log(err);
    });
});

//Delete comment
app.delete("/comments/delete/:id", function(req, res){
    db.Comment.findOneAndRemove({_id: req.params.id})
    .then(function(dbComment){
        return db.Article.findOneAndUpdate({_id: req.params.id}, { $pull: { comment: dbComment._id}});
    }).then(function(dbComment){
        res.send(dbComment)
    }).catch(function(err){
        console.log(err);
    });
});

};
