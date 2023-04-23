const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .then(user=>{
        return res.render('user_profile', {
            title: 'User Profile',
            user_profile : user
        })
    })
}


module.exports.update = async function(req,res){
    if(req.user.id==req.params.id){
        // User.findByIdAndUpdate(req.params.id,req.body)
        // .then(user=>{
        //     console.log('Updated',user)
        //     return res.redirect('back');
        // })
        // .catch(err=>{
        //     console.log('Error Updating');
        //     return res.redirect('back');
        // })

       try {
         let user = await User.findById(req.params.id);

         User.uploadAvatar(req,res, function(err){
            if(err){console.log('******Multer Error *****',err)}
            console.log(req.file);    


            user.name = req.body.name;
            user.email = req.body.email;
         

            if(req.file){

                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
         
                user.avatar = User.avatarPath+'/'+req.file.filename;
            }
            user.save();

            return res.redirect('back');
         })
         
       } catch (error) {
        console.log(error);
       }

    }
    else{
        return res.status(401).send('Unauthorized'); 
    }
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
    //     else{m
    //         return res.redirect('back');
    //     }
    // })
    // .catch(err=>{
    //     console.log("error in finding user in signing up1",err);
    //     return;
    // })

    // AUTHENTICATION USING PASSPORT 
    req.flash('success','Logged In Successfully')
    return res.redirect('/');
}


module.exports.signout = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('success','You have been Logged Out!!')

        return res.redirect('/');
      });
}