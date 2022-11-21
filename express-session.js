import session from 'express-session'
import {app} from './app.js'

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

