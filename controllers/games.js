const express = require("express");
const router = express.Router();
const Games = require("../models/games")

const gameSeed = require("../models/gameSeed");

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
        res.render("games/index.ejs" , {
            games: allGames,
            user: req.user
        })
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
    if (req.body.hasBeaten === "checked") {
        req.body.hasBeaten = true;
    } else {
        req.body.hasBeaten = false;
    }
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