//dependencies
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

//initialize Express app
var express = require('express');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(process.cwd() + '/public'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//connecting to MongoDB
//mongoose.connect('mongodb://heroku_9md6j5nh:kkl5lbiu7s5aaj5psag8b10e85@ds113853.mlab.com:13853/heroku_9md6j5nh');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraped_news";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


var routes = require('./controller/controller.js');
app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});
