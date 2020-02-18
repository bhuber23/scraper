# Mongo Scraper
This app uses Mongoose and Cheerio to scrape articles from New York Times' beauty page. Users can save articles and leave comments on the articles, as well as delete comments or remove the articles from favorites. 

## Overview 
* Scrape articles by clicking the "Scrape Articles" button
* Once those articles populate on the page, users can read the full article on the New York Times website by clicking View Article or they can click Save Article and save it in their favorites. 
* Saved articles can be viewed by selecting Saved Articles from the navbar. 
* Saved articles can then be deleted from this page, or users can click Add/View Comments and then add comments or view what has been already added. 
* Those comments can then be deleted, as well.

## Link to the Deployed App on Heroku
https://arcane-fjord-07599.herokuapp.com/

## Demo
![Example comment](public/images/add-comment.gif)

## Technologies Used
* Node.js
* Express.js
* MongoDB
* Mongoose
* Handlebars.js
* NPM Packages: 
    - express
    - express-handlebars
    - mongoose
    - cheerio
    - axios
    