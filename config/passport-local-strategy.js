const User = require('../models/user');


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 


// authenticate using passport 
passport.use(new LocalStrategy({
    usernameField : 'email'
    },
    function(email,password,done){
        User.findOne({email:email})
        .catch(err=>{
            console.log('Error in finding user');
            return done(err);
        })
        .then(user=>{
            if(!user || user.password!=password){
                console.log('Invalid username/password');
                return done(null, false);
            }
            return done(null,user)
        })
    }
));


// Serialize the user to decide whick key is to be kept in rh  
passport.serializeUser(function(user, done){
    done(null,user.id);
})

// Desrialize the user from the key in the cookies 
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then(user=>{
        done(null,user)
    })
    .catch(err=>{
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }
    })
});

// Check if user is authenticated 
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/user/sign-in');
}


// set authenticated user 
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;