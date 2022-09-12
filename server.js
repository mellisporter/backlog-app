// DECLARE REQUIREMENTS
const express = require("express"); 
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// DOTENV VARIABLES
let port = process.env.port;
let DATABASE_URI= process.env.DATABASE_URI;

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


// CONTROLLERS

// GAME SEED
// CONSOLE SEED

// Index

app.get("/games" , function(req, res){
    res.render("index.ejs")
})

// New

app.get("/games/new" , function(req, res){
    res.render("new.ejs")
})

// Delete

// Update

// Create

// Edit

// Show

app.get("")

// Listener

app.listen(port, function(){
    console.log("Ready to game on Port " + port)
})
