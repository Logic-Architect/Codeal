const User = require('../models/user')

module.exports.profile = function (req, res) {

    console.log(req.cookies);

    if(req.cookies){
        User.findById(req.cookies.user_id)
        .then(user=>{
            if(user){
                return res.render('user',{
                    title : "User | Profile"
                })
            }
        })
        .catch(err=>{
            console.log('Cookie has been manipulated');
        })
    }
    else{
        return res.redirect('/user/sign-in');
    }
}


module.exports.sigup = function (req,res){
    return res.render('user_sign_up',{
        title : 'User | Sign Up'
    })
}


module.exports.sigin = function (req,res){
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
    // TODO
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            console.log('cookie created',user.id)
            return res.redirect('/user/profile');
        }
        else{
            return res.redirect('back');
        }
    })
    .catch(err=>{
        console.log("error in finding user in signing up1",err);
        return;
    })
}