const express = require("express");
const router = express.Router();
const Games = require("../models/games")

const gameSeed = require("../models/gameSeed");

const session = require("express-session");
const passport = require("passport")
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// MIDDLEWARE

router.use(express.urlencoded({ extended: false })); // gives access to req.body
router.use(methodOverride('_method')); // allows us to use methods other than get and post
router.use(express.static('public')); // can use public folder for CSS
router.use(express.json());


// SESSION MIDDLEWARE

router.use(session({
    secret: "process.env.SESSION_SECRET",
    resave: false, 
    saveUninitialized: true,
}));

// PASSPORT MIDDLWARE

router.use(passport.initialize());
router.use(passport.session());

// SEED ROUTE

router.get("/seed" , function (req, res){
    Games.deleteMany({} , (error, allGames) => {
    })

    Games.create(gameSeed, (error, data) => {
        res.redirect("/games")
    })
})

// Index

router.get("/" , function(req, res){
    Games.find({}, (error, allGames) => {
        if (req.user) {
        res.render("games/index.ejs" , {
            games: allGames,
            user: req.user,

        })
    } else {
        res.redirect("/")
    }
    })
})

// New

router.get("/new" , function(req, res){
    res.render("games/new.ejs" , {
        user: req.user
    })
})

// Delete

router.delete("/:id", function (req, res){
    Games.findByIdAndRemove(req.params.id, function (err, data) {
        res.redirect("/games")
    })
})

// Update

router.put("/:id" , function (req, res){
    Games.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }, (error, updatedGame) => {
        res.redirect(`/games/${req.params.id}`)
    })
})

// Create

router.post("/" , function(req, res){
    // if (req.body.hasCompleted === "Yes") {
    //     req.body.hasCompleted = "Yes"
    // } else {
    //     req.body.hasCompleted = "No";
    // }
    //    // res.send('received')
    //    if (req.body.shipIsBroken === 'on') {
	// 	//if checked, req.body.completed is set to 'on'
	// 	req.body.shipIsBroken = true;
	// } else {
	// 	//if not checked, req.body.completed is undefined
	// 	req.body.shipIsBroken = false;
	// }
    Games.create(req.body, function(error, createdGame){
        res.redirect("/games")
    })
})

// Edit

router.get("/:id/edit", function (req, res){
    Games.findById(req.params.id, function (err, foundGame){
        res.render("games/edit.ejs" , {
            game: foundGame,
            user: req.user
        })
    })
})

// Show

router.get("/:id", function (req, res){
    Games.findById(req.params.id, function (err, foundGame){
        res.render("games/show.ejs", {
            game: foundGame,
            user: req.user
        })
    })
})

module.exports = router;