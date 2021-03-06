const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const config = require("./config.json");
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const favicon = require('serve-favicon');

const app = express();

app.use(session({
  secret: 'My dear girl',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(express.static(path.resolve(`./${config.http.public}`)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(path.join(__dirname,'public','static','assets','favicon','favicon.ico')));

// Our schemas
require('./models/Articles.model');
require('./models/Skills.model');
require('./models/Works.model');
require('./models/Users.model');

app.set("views",path.resolve("./views"));
app.set("view engine", "pug");

app.use("/", require("./routes/index"));
app.use("/about", require("./routes/about"));
app.use("/admin", require("./routes/admin"));
app.use("/works", require("./routes/works"));
app.use("/blog", require("./routes/blog"));

app.use(function (req,res,next) {
  res.render('404');
});

app.use(function(err,req,res,next){
  res.render('500');
});

mongoose.connect(`mongodb://${config.http.host}/portfolio`, {useMongoClient: true});
mongoose.Promise = global.Promise;
app.listen(config.http.port,function(){
  console.log(`Server is run at ${config.http.host}:${config.http.port}`);
});