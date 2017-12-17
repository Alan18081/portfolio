const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Articles = new Schema({
  title : {
    type : String,
    required : [true,"Введите заголовок статьи"]
  },
  text : {
    type : String,
    required : [true,"Введите текст статьи"]
  },
  date : {
    type : String,
    required : [true,"Введите дату статьи"]
  }
});

mongoose.model("Articles",Articles);

