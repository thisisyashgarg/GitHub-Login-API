import GitHubStrategy from 'passport-github'
import passport from 'passport'
import dotenv from 'dotenv'
dotenv.config();
import {app} from './app.js'



//client check by codes
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, profile);
  }
));


//getting id from user profile
function extractingID(){
    //initialising passport
    app.use(passport.initialize());
    
    //for persisting the session
    app.use(passport.session());

    //passing user profile into session
    passport.serializeUser(function (user,cb) {
      cb(null, user.id)
    });
    passport.deserializeUser(function(id,cb) {
      cb(null, id)
    });  
}

//authorisation
function authorisation(){
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),function(req, res){
        // Successful authentication, redirect home.
        res.redirect('/');
       }
    );
}



export {passport, extractingID, authorisation};