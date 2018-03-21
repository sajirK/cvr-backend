var express = require('express');
var router = express.Router();
var  fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
var options = {
  server: {
    socketOptions: {
      connectTimeoutMS: 5000
    }
  }
};
mongoose.connect('mongodb://choisieversaire:aaa@ds211289.mlab.com:11289/cvr',
  options,
  function(err) {
    console.log(err);
  }
);

   // user base de donnée

var userSchema = mongoose.Schema({
  userName: String,
  phone: Number,
  password: String,
  jourN: Number,
  MoisN: String,
  anneN: Number
});
var UserModel = mongoose.model('users', userSchema);

   // **************** Signup ****************$

router.post('/signUp', function(req, res, next) {
console.log("ok signUp");
UserModel.find(
 {phone: req.body.phone},
 function(err, users) {
   if (users.length == 0) {

     var newUser = new UserModel({
       userName: req.body.userName,
       phone: req.body.phone,
       password: req.body.password,
       jourN: req.body.day,
       MoisN: req.body.month,
       anneN: req.body.year
     });
        newUser.save(
       function(error, user) {
         res.send("ok");
     })
    }
  })
});

var UserModel = mongoose.model('users', userSchema);

// ************************** Login ********************************

router.post('/signIn', function(req, res, next) {
  console.log("on est ici", req.query.phone);
  UserModel.findOne({
    userName: req.query.userName,
    password: req.query.password
  }).then((error, user) => {
    console.log("on est au signin", UserModel)
    res.json(user);
  })
})

router.get('/friends', function(req, res, next) {
  console.log(req.body);
  // UserModel.find({
  //   userName: req.query.userName,
  //   password: req.query.password
  // }).then((user, error) => {
  //   console.log("on est au signin", UserModel)
  //   res.json(user);
  // })
})

router.get('/', function(req, res){
  res.send("ok1");
});

module.exports = router;
