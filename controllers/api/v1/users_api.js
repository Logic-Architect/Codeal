const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try {
        let user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message : 'Invalid email or password'
            });
        }
        return res.status(200).json({
            message : 'Sign In successful here is your token keep it safe',
            data :{
                token : jwt.sign(user.toJSON(),'aman',{expiresIn:'100000'})
            }
        })

    } catch (err) {
        
    }
}