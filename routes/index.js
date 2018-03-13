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
var UserModel = mongoose.model('users', userSchema);
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
res.send('sign up done ! well done');
            })
}
})

});
// ************************** Login ********************************
router.get('/signin', function(req, res, next) {
  console.log("on est ici", req.query.email);
  UserModel.findOne({
    email: req.query.email,
    password: req.query.password
  }).then((user, error) => {
    console.log("on est au signin", UserModel)
    res.json(user);
  })
})

module.exports = router;
