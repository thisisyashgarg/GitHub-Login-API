//Protection
function isAuth (req, res, next){
    if(req.user){
        next();
    }else{
        res.redirect('/login');
    }
}

export {isAuth};