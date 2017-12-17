const express = require("express");
const path = require("path");
const config = require('../config.json');
const mongoose = require("mongoose");
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');

router.use('/',function(req,res,next){
  if(!req.session.isAdmin) {
    res.redirect('/');
  }
  else {
    next();
  }
});

router.get('/',function(req,res){
  var Skills = mongoose.model('Skills');
  Skills.find({}).exec(function(err,docs){
    if(err) return console.log(err);
    res.render('admin',{
      stacks: docs
    });
  });
});

router.post('/setSkills', function(req,res){
  var skills = req.body;
  var Skills = mongoose.model('Skills');
  Skills.find({}).remove().exec(function(err){
    if(err) return console.log(err);
    for(let i in skills) {
      var skillSection = new Skills({
        section : skills[i].section,
        items : skills[i].items
      });
      skillSection.save(function(err){
        if(err) return console.log(err);
      });
    }
  });
  res.send('Done');
});

router.post('/addArticle', function(req,res){
  const Article = mongoose.model('Articles');
  var newArticle = new Article({
    title : req.body.title,
    date : req.body.date,
    text : req.body.text
  });
  newArticle.save(function(err){
    if(err) return console.log(err);
    console.log('Saved');
  });
  res.send('Saved');
});

router.post('/addWork', function(req,res){
  var form = new formidable.IncomingForm();
  if(!fs.existsSync(path.join(config.http.public,'upload'))) {
    fs.mkdirSync(path.join(config.http.public,'upload'));
  }
  form.uploadDir = path.join(process.cwd(),config.http.public,'upload');
  form.parse(req, function(err, fields, files) {
    if(err) return console.log(err);
    var imgName = path.join('public','upload',files.image.name);
    var imgPath = path.join('upload',files.image.name);
    fs.rename(files.image.path, imgName,function(err){
      if(err) return console.log(err);
      var Work = mongoose.model('Works');
      var workItem = new Work({
        title : fields.title,
        tech : fields.tech,
        image : imgPath
      });
      workItem.save(function(err){
        if(err) return console.log(err);
        console.log('Work is added');
        res.send('Work is added');
      });
    });
  });
});

module.exports = router;