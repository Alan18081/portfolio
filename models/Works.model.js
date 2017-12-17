const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Works = new Schema({
  title : String,
  tech : String,
  image : String
});

mongoose.model('Works',Works);