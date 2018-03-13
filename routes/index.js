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
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  jourN: Number,
  MoisN: Number,
  anneN: Number


});
   // **************** Signup ****************$
router.post('/signUp', function(req, res, next) {

UserModel.find(
 {email: req.body.email},
 function(err, users) {
   if (users.length == 0) {

     var newUser = new UserModel({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       password: req.body.password,
       jourN: req.body.jourN,
       MoisN: req.body.MoisN,
       anneN: req.body.anneN
     });

     newUser.save(
       function(error, user) {

         // req.session.IsLog = true;

res.send('sign up done ! well done');
                     }
                   )
                     }
               }
             )


           }
           );






var UserModel = mongoose.model('users', userSchema);


module.exports = router;
