const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// passport.use <---- we use this to plugin login options
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
}, function(accessToken, refreshToken, profile, cb){
    // a user has attempted a login
    // does this user already exist in our own database
    // if they don't we create them
    
}))

// passport.serializeUser <-- gets called one time when the user logs in

// passport.deserializeUser <-- get called with each request - decodes the cookies and looks up the user in session torage
// then decodes the cookie and looks up the user in session store creates req.user for us