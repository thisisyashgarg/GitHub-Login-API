// import express from 'express'
import session from 'express-session'
// import GitHubStrategy from 'passport-github'
// import passport from 'passport'
// import path from 'path';
// const __dirname = path.resolve();
// import dotenv from 'dotenv'
// dotenv.config();
import {app} from './app.js'
// import {isAuth} from './protection.js'
// import { passport } from './passport.js';


//session part
function sessionPart(){
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
}

export {sessionPart};

