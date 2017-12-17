const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", function(req,res){
  var Articles = mongoose.model('Articles');
  Articles.find().exec(function(err,docs){
    if(err) return console.log(err);
    res.render('blog',{
      articles : docs
    });
  });
});

module.exports = router;