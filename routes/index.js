var express = require('express');
var router = express.Router();
var  fileUpload = require('express-fileupload');

var http = require('http').Server(router);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;

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
         res.send(user);
     })
    }
  })
});

var UserModel = mongoose.model('users', userSchema);

// ************************** Login ********************************

router.get('/signin', function(req, res, next) {
  console.log("on est ici", req.query.phone);
  UserModel.findOne({
    phone: req.query.phone,
    password: req.query.password
  }).then((user, error) => {
    console.log("on est au signin", UserModel)
    res.json(user);
  })
})

router.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('connection');
  socket.on('chat message', function(msg){
    console.log("Iron fist")
    io.emit('chat message');
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});


module.exports = router;
