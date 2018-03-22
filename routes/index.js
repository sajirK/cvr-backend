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
// var phoneNumber = req.body.phone
// function formatPhone(phoneNumber) {
//   phoneNumber = phoneNumber.replace(/\([0-9]+?\)/, "");
//   phoneNumber = phoneNumber.replace(/[^0-9]/, "");
//   phoneNumber = phoneNumber.replace(/\s+/i, "")
//   phoneNumber = phoneNumber.replace(/^0+/, '');
//   var pfx = "33";
//   if ( !phoneNumber.match(/^33/)  ) {
//     phoneNumber = pfx+phoneNumber;
//   }
// }
// console.log(phoneNumber);
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
         res.json(user);
     })
    }
  })
})

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


// router.post('/friends', function(req, res, next) {
//   // console.log(req.body.contacts);
//   var listContact = [];
//   for (var i = 0; i < req.body.contacts.length; i++) {
//     var phoneNumber = req.body.contacts[i]
//     function formatPhone(phoneNumber) {
//       phoneNumber = phoneNumber.replace(/\([0-9]+?\)/, "");
//       phoneNumber = phoneNumber.replace(/[^0-9]/, "");
//       phoneNumber = phoneNumber.replace(/\s+/i, "")
//       phoneNumber = phoneNumber.replace(/^0+/, '');
//       var pfx = "33";
//       if ( !phoneNumber.match(/^33/)  ) {
//         phoneNumber = pfx+phoneNumber;
//       }
//       listContact.push(phoneNumber)
//       console.log("la listContact", listContact)
//     }
//     UserModel.find({phone: phoneNumber},
//       function (error, users) {
//       console.log("les users", users);
//       res.json(users);
//     })
//   }
// })

router.get('/', function(req, res){
  res.send("ok1");

})

module.exports = router;
