const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID : "386544197264-lgpbf0u7s2htuv885cn8mu0bo55r3dfe.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL : "http://localhost:8000/user/auth/google/callback"
    },
    function(accessToken , refreshToken , profile , done){
        User.findOne({
            email : profile.emails[0].value
        })
        .then(user=>{
            console.log(profile);

            if(user){
                return done(null,user)
            }else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                })
                .then(user=>{
                    return done(null,user);
                })
                .catch(err=>{
                    console.log('Error Creating User in Google Strategy',err);
                })
            }
        })
        .catch(err=>{
            console.log('Error in Passport Google Strategy',err);
            return ;
        })
    })
)