const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto');

const Users = new Schema({
  login : {
    type: String,
    required: [true,'Укажите логин']
  },
  password : {
    type: String,
    required: [true,'Укажите пароль'],
    set(v) {
      if(v == '') {
        return v;
      }
      else {
        return crypto.createHash('md5').update(v).digest('hex')
      }
    }
  }
});

mongoose.model('Users',Users);