const mongoose = require('mongoose');
const readline = require('readline');
const config = require('./config.json');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.http.host}/portfolio`, {useMongoClient: true});

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var login, password;

function getInfo() {
  read.question('Логин: ', function(answer){
    login = answer;
    read.question('Пароль: ', function(answer){
      password = answer;
      read.close();
    });
  });
}
read.on('close', function () {
  require('./models/Users.model');
  var User = mongoose.model('Users');
  User.findOne({login: login}).then(function (user) {
    if (user) {
      console.log('Пользователь с таким логином уже существует');
      getInfo();
    }
    else {
      var newUser = new User({
        login: login,
        password: password
      });
      newUser.save().then(
        function () {
          console.log('Пользователь сохранен. Спасибо');
        },
        function (err) {
          console.log(err);
        }
      ).then(function () {
        return process.exit(0);
      });
    }
  });
});

getInfo();
