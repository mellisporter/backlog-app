// DECLARE REQUIREMENTS
const express = require("express"); 
const app = express();
require('dotenv').config();

let port = process.env.port

// DATABASE

// MIDDLEWARE

// CONTROLLERS

// SEED

// Index

app.get("/games" , function(req, res){
    res.render("index.ejs")
})

// New

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
