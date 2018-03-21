var express = require('express');
var router = express.Router();
var session = require("express-session");
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
var phoneNumber = req.body.phone
function formatPhone(phoneNumber) {
  phoneNumber = phoneNumber.replace(/\([0-9]+?\)/, "");
  phoneNumber = phoneNumber.replace(/[^0-9]/, "");
  phoneNumber = phoneNumber.replace(/\s+/i, "")
  phoneNumber = phoneNumber.replace(/^0+/, '');
  var pfx = "33";
  if ( !phoneNumber.match(/^33/)  ) {
    phoneNumber = pfx+phoneNumber;
  }
}
console.log(phoneNumber);
UserModel.find(
 {phone: phoneNumber},
 function(err, users) {
   if (users.length == 0) {

     var newUser = new UserModel({
       userName: req.body.userName,
       phone: phoneNumber,
       password: req.body.password,
       jourN: req.body.day,
       MoisN: req.body.month,
       anneN: req.body.year
     });
        newUser.save(
       function(error, user) {
         res.send(user);
     })
    }
  })
});

var UserModel = mongoose.model('users', userSchema);

// ************************** Login ********************************

router.post('/signIn', function(req, res, next) {
  console.log("on est ici", req.body.userName);
  UserModel.find({
    userName: req.body.userName,
    password: req.body.password},
    function (error, users) {
    console.log(users);
    res.json(users);
  })
})


// **************************** Save Profile Changes ****************************


router.post('/update', function(req, res, next) {
  if(req.body.userName.length > 0 &&
     req.body.phone.length > 0 &&
      req.body.password.length > 0 &&
      req.body.jourN.length > 0 &&
      req.body.MoisN.length > 0 &&
      req.body.anneN.length > 0 &&
){
  UserModel.update({_id: req.session.user._id},
    {userName: req.body.userName,
    phone: req.body.phone,
    password: req.body.password,
    jourN: req.body.jourN,
    MoisN: req.body.MoisN,
    anneN:req.body.anneN
    },
      function(err, user){
        var userIdTmp = req.session.user._id;
        req.session.user = req.body;
         req.session.user._id = userIdTmp;
          res.json(user);  }
  );
 } else{
   res.send('update cant be done !');
 }

router.post('/friends', function(req, res, next) {
  console.log(req.body.contacts);
  var listContact = [];
  for (var i = 0; i < req.body.contacts.length; i++) {
    var phoneNumber = req.body.contacts[i]
    function formatPhone(phoneNumber) {
      phoneNumber = phoneNumber.replace(/\([0-9]+?\)/, "");
      phoneNumber = phoneNumber.replace(/[^0-9]/, "");
      phoneNumber = phoneNumber.replace(/\s+/i, "")
      phoneNumber = phoneNumber.replace(/^0+/, '');
      var pfx = "33";
      if ( !phoneNumber.match(/^33/)  ) {
        phoneNumber = pfx+phoneNumber;
      }
      listContact.push(phoneNumber)
      console.log(phoneNumber)
    }
    UserModel.find({phone: phoneNumber},
      function (error, users) {
      console.log(users);
      res.json(users);
    })
  }
})

router.get('/', function(req, res){
  res.send("ok1");

});

module.exports = router;
