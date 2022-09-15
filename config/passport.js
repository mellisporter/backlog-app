const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("../models/games")

// passport.use <---- we use this to plugin login options
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.absoluteURI + "/auth/google/oauth2callback",
    proxy: true ,
}, function(accessToken, refreshToken, profile, cb){
    // a user has attempted a login
    // does this user already exist in our own database
    // if they don't we create them
    // let's check to see if the user exists
    User.findOne({googleId: profile.id }, function(err, user){
        // if they don't we create them
        if(err) return cb(err);
        // if user exits in our db, log them in
        if (user) {
            return cb(null, user)
        } else {
            // user doesn't exist, create them instead
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
            });

            newUser.save(function(err) {
                if (err) return cb(err);
                // user saved successfully
                return cb(null, newUser);
            });
        }
    })
}))

// passport.serializeUser <-- gets called one time when the user logs in
passport.serializeUser(function(user, done){
    done(null, user._id);
})
// passport.deserializeUser <-- get called with each request - decodes the cookies and looks up the user in session torage
// then decodes the cookie and looks up the user in session store creates req.user for us
passport.deserializeUser(function(id, done){
    User.findById(id, function (err, user){
        done(err, user); // create new.user
    });
})