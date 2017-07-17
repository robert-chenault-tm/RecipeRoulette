var express = require('express');
var path = require('path');
var recipes = require('./Controllers/recipesController.js');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect("mongodb://localhost:27017/local", function(err, db) {
  if(!err) {
    console.log("Connected to database");
  } else {
	  console.log("Error connecting to DB");
	  console.log(err);
  }
});

var rootPath = path.normalize(__dirname + '/../');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app'));


app.get('/data/recipe/:_id', recipes.get);
app.get('/data/recipe/:skip/count/:num', recipes.getX);
app.get('/data/recipe/:skip/count/:num/search/:search', recipes.getXThatMatch);
app.get('/data/randomRecipe', recipes.getRandom);
app.get('/data/shoppingList', recipes.getShoppingList);
app.post('/data/recipe/:_id', recipes.save);
app.delete('/data/recipe/:_id', recipes.remove);
app.get('*', function(req, res) {res.sendFile(rootPath + '/app/index.html'); });
app.listen(8000);
console.log('Listening on port 8000...');
