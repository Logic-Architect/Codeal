const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'aman'
}

passport.use(new JWTStrategy(opts, async function (jwtPayload, done) {
    // try 
    //     {
    //         let user= await User.findById(jwtPayload._id);

    //         if(user){
    //             return done(null,user)
    //         }else{
    //             return done(null,false);
    //         }
    //     } 
    // catch (error) 
    //     {
    //         console.log('Error in JWT Strategy',error)
    //     }
    User.findById(jwtPayload._id)
        .then(user => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            console.log('Error finding user through JWT._id', err);
        })

}))


module.exports = passport;