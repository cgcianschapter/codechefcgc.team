const Code = require('../models/code');
const Event = require('../models/event');

const middleware = {};

middleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = middleware;
