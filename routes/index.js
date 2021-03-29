var express = require('express');
var router = express.Router();
var md5 = require('md5');
var passport = require('passport');

const UserModel = require('../models/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/signup', async (req, res, next) => {
  try {
    let newuser = new UserModel({
      Name: req.body.Name,
      Email: req.body.Email,
      password: md5(req.body.Password)
    });
    await newuser.save()
    res.redirect('/');
  }
  catch (err) {
    res.render('index');
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/list/task',
  failureRedirect: '/',
}));


module.exports = router;
