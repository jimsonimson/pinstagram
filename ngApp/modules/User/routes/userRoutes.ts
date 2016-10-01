"use strict";
import express = require('express');
import passport = require('passport');
import jwt = require('jsonwebtoken');
import expjwt = require('express-jwt');
let mongoose = require('mongoose');
let User = mongoose.model('User')
let router = express.Router();
let auth = expjwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

router.post('/register', (req, res, next):any => {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function(err, user) {
    if(err) return next(err);
    res.send({token: user.generateJWT()});
  });
});

router.post('/login', (req, res, next) {
  if(!req.body.username || !req.body.password) return res.status(400).send("Please fill out every field");
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(user) return res.json({ token : user.generateJWT() });
    return res.status(400).send(info);
  })(req, res, next);
});

//Get specific user
router.get('/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id }, { passwordHash: 0, salt: 0})
  .populate('hairstyles', 'img style description price')
  .exec((err, user) => {
    if (err) return next(err);
    if (!user) return next({message: 'no users.'});
    res.send(user);
  })
})

//Get all users
router.get('/', (req, res, next) => {
  User.find({}, { passwordHash: 0, salt: 0})
    .exec((err, users) =>{
      if (err) return next(err);
      if (!users) return next({ message: 'no users'});
      res.json(users);
    })
});

router.put('/', auth, (req,res,next) => {
  console.log(req.body);
  User.findOne({ _id: req['payload']._id})
  .exec((err,user)=>{
    if (err) return next(err);
    user.username = req.body.username;
    user.email = req.body.email;
    user.profession = req.body.profession;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.avatar = req.body.avatar;
    user.about = req.body.about;
    user.pics = req.body.pics;
    user.availability = req.body.availability;
    user.tags = req.body.tags;
    user.barbershop = req.body.barbershop;
    user.barbershopAddress = req.body.barbershopAddress;
    user.socialMedia = req.body.socialMedia;
    user.phone = req.body.phone;
    user.token = user.generateJWT();
    user.save((error,user, token): any =>{
      if (err) return next (err);
      res.json({token: user.generateJWT()});
    });
  })
})

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/#/account' }),
  function(req, res) {
    if(req.isAuthenticated()) {
    let token = { token : req.user.generateJWT() };
    console.log(token.token);
    res.redirect('/#/Token/' + token.token);
    } else {
    	res.send("You are not authenticated.")
    }
  }); // end of facebook cb

export = router;
