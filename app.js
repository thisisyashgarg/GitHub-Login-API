import express from 'express'
import session from 'express-session'
import GitHubStrategy from 'passport-github'
import passport from 'passport'
import path from 'path';
const __dirname = path.resolve();
import dotenv from 'dotenv'
import exp from 'constants';
dotenv.config();



const app = express();

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

//session aprt
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly : true,
        secure: false,
        maxAge: 24 * 60 *  60 * 1000,
    }
  }))


//getting id from user profile
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user,cb) {
  cb(null, user.id)
});
passport.deserializeUser(function(id,cb) {
  cb(null, id)
});  





//protection
function isAuth (req, res, next){
    if(req.user){
        next();
    }else{
        res.redirect('/login');
    }
}



//working fine
app.get('/', isAuth, (req, res) =>{
    console.log(req.user); // id which is logged
    res.sendFile( __dirname + "" + '/dashboard.html');
});

app.get('/login', (req, res) =>{
    if(req.user){
        return res.redirect('/')
    }
   res.sendFile(__dirname + "" + '/login.html');
});

app.get('/logout', (req, res) =>{
   req.logOut(() => console.log('logout complete'));
   res.redirect('/login');
});

app.listen(3000, () => console.log('server is running on port 3000'));


//authorisation
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

export {app} ;





 