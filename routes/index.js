const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

router.get("/", function(req,res){
  res.render("index");
});

router.post('/auth', function(req,res){
  var authLogin = req.body.login;
  var authPassword = crypto.createHash('md5').update(String(req.body.password)).digest('hex');
  var Users = mongoose.model('Users');
  Users.findOne({ "login":  authLogin, "password": authPassword},function(err,user){
    console.log(authLogin,authPassword);
   if(!user) {
     res.send('Неверный логин или пароль');
   }
   else {
     res.send('true');
   }
  });
});

module.exports = router;