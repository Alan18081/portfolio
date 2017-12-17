const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", function(req,res){
  var Skills = mongoose.model('Skills');
  Skills.find({}).exec(function(err,docs){
    if(err) return console.log(err);
    res.render('about',{
      skills: docs
    });
  });
});

module.exports = router;