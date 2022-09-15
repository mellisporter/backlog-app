// set up user model and profile model
// profile contains the users' games
// user would have data (email, id, etc)

// in profile model, reference ids of games to attach to profile
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const gameSchema = require("../models/games");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String // 👈 Let's add this
  }, {
    timestamps: true
  });

  const User = mongoose.model('User', userSchema)

  module.exports= User;