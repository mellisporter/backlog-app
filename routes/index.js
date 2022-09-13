const router = require("express").Router();
const passport = require('passport');

router.get("/" , function (req, res){
    res.render('index');
});

// Log In Route
router.get("/auth/google" , passport.authenticate('google' , {
    scope: ['profile' , 'email']
}));

// Callback Route
router.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: "/games",
    failureRedirect: "/"
}))
// LogOut Route
router.get("/logout" , function(req,res){
    req.logOut(); // destroy the login session from the session storage
    res.redirect("/") // send the user back to the homepage
});

module.exports = router;