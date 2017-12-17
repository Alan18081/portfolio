const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Skills = new Schema({
  section : String,
  items : [
    {
      name : String,
      value : String
    }
  ]
});

mongoose.model("Skills",Skills);