import express from 'express'
import path from 'path';
const __dirname = path.resolve();
import {isAuth} from './protection.js'
import { extractingID, authorisation } from './passport.js';
import { sessionPart } from './expressSession.js';

const app = express();

//session part
sessionPart();

//getting id from user profile
extractingID();

//authorisation
authorisation();

//Routes
app.get('/', isAuth, (req, res) =>{
    console.log(req.user); // id which is logged
    res.sendFile( __dirname + '/dashboard.html');
});

app.get('/login', (req, res) =>{
    if(req.user){
        return res.redirect('/')
    }
   res.sendFile(__dirname + '/login.html');
});

app.get('/logout', (req, res) =>{
   req.logOut(() => console.log('Logout complete'));
   res.redirect('/login');
});

app.listen(3000, () => console.log('server is running on port 3000'));




export {app};