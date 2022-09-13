// DECLARE REQUIREMENTS
const express = require("express"); 
// const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport")
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Games = require("./models/games");
// const Users = require("./models/games");
const gamesController = require('./controllers/games.js');

// DOTENV VARIABLES
let port = process.env.port;
let DATABASE_URI= process.env.DATABASE_URI;

// connect to mongodb with mongoose by running the code inside these files
// require("./config/database");

// initialize oauth process for login requests by running the code
require('./config/passport');

// DATABASE CONFIGURATION

mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// MIDDLEWARE

app.use(express.urlencoded({ extended: false })); // gives access to req.body
app.use(methodOverride('_method')); // allows us to use methods other than get and post
app.use(express.static('public')); // can use public folder for CSS


// SESSION MIDDLEWARE

app.use(session({
    secret: "process.env.SESSION_SECRET",
    resave: false, 
    saveUninitialized: true,
}));

// PASSPORT MIDDLWARE

app.use(passport.initialize());
app.use(passport.session());

// CONTROLLERS

app.use('/games', gamesController);


app.get("/" , function (req, res){
    res.render('index.ejs' , {
        user: req.user

    })
})

// Log In Route
app.get("/auth/google" , passport.authenticate('google' , {
    scope: ['profile' , 'email']
}));

// Callback Route
app.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: "/games",
    failureRedirect: "/"
}))
// LogOut Route
app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
      res.redirect('/');
    });
  });

// GAME SEED
// CONSOLE SEED

// // Index

// app.get("/games" , function(req, res){
//     Games.find({}, (error, allGames) => {
//         res.render("index.ejs" , {
//             games: allGames
//         })
//     })
// })

// // New

// app.get("/games/new" , function(req, res){
//     res.render("new.ejs")
// })

// // Delete

// app.delete("/games/:id", function (req, res){
//     Games.findByIdAndRemove(req.params.id, function (err, data) {
//         res.redirect("/games")
//     })
// })

// // Update

// app.put("/games/:id" , function (req, res){
//     Games.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     }, (error, updatedGame) => {
//         res.redirect(`/games/${req.params.id}`)
//     })
// })

// // Create

// app.post("/games" , function(req, res){
//     if (req.body.hasBeaten === "on") {
//         req.body.hasBeaten = true;
//     } else {
//         req.body.hasBeaten = false;
//     }
//     Games.create(req.body, function(error, createdGame){
//         res.redirect("/games")
//     })
// })

// // Edit

// app.get("/games/:id/edit", function (req, res){
//     Games.findById(req.params.id, function (err, foundGame){
//         res.render("edit.ejs" , {
//             game: foundGame,
//         })
//     })
// })

// // Show

// app.get("/games/:id", function (req, res){
//     Games.findById(req.params.id, function (err, foundGame){
//         res.render("show.ejs", {
//             game: foundGame,
//         })
//     })
// })
// Listener

app.listen(port, function(){
    console.log("Ready to game on Port " + port)
})
