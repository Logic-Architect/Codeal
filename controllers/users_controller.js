const User = require('../models/user')

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile',
    })
}


module.exports.sigup = function (req,res){

    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_up',{
        title : 'User | Sign Up'
    })
}


module.exports.sigin = function (req,res){

    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_in',{
        title : 'User | Sign In'
    })
}

module.exports.create = function(req, res){

    console.log(req.body);

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email})
    .then(data=>{
        if(!data){
            User.create(req.body)
            .then(user=>{
                console.log('***********');
                res.redirect('/user/sign-in');
            })
            .catch(err=>{
                console.log("error in finding user in signing up1",err);
                return;
            })
        }
        else{
            return res.redirect('back')
        }
    })
    .catch(err=>{
        console.log("error in finding user in signing up2",err);
        return res.redirect('back')
    })

}


module.exports.createSession = function(req,res){
    // MANUAL AUTHENTICATION
    // User.findOne({email:req.body.email})
    // .then(user=>{
    //     if(user){
    //         if(user.password != req.body.password){
    //             return res.redirect('back');
    //         }
    //         res.cookie('user_id',user.id);
    //         console.log('cookie created',user.id)
    //         return res.redirect('/user/profile');
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // })
    // .catch(err=>{
    //     console.log("error in finding user in signing up1",err);
    //     return;
    // })

    // AUTHENTICATION USING PASSPORT 
    return res.redirect('/');
}


module.exports.signout = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
}