"use strict";
import mongoose = require('mongoose');
import crypto = require('crypto');
import jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  email: { type: String, unique: true, lowercase: true},
  passwordHash: String,
  salt: String,
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],
  lastName: { type: String },
  joined: { type: Date, default: Date.now },
  avatar: { type: String },
})

UserSchema.method('setPassword', function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
})

UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.passwordHash);

});

UserSchema.method('generateJWT', function(){
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email,
    avatar: this.avatar,
    appointments: this.appointments,
    hairstyles: this.hairstyles
  }, process.env.JWT_SECRET);
});

export let User = mongoose.model("User", UserSchema);
