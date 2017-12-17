const express = require("express");
const config = require('../config.json');
const mongoose = require("mongoose");
const sendGrid = require('@sendgrid/mail');
const router = express.Router();

router.get("/", function(req,res){
  var Works = mongoose.model('Works');
  Works.find({}).exec(function(err,docs){
    if(err) return console.log(err);
    res.render("works",{
      slider_info: docs
    });
  });
});

router.post("/mail", function(req,res){
  var message = req.body;

  sendGrid.setApiKey('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');

  sendGrid.send(
    {
      to: config.mail.smtp.auth.user,
      from: message.email,
      subject: config.mail.subject,
      text: message.text
    },
    function(err,json) {
      if(err) return console.log(err);
      console.log('Message was sent');
    }
  );
  res.end();
});

module.exports = router;