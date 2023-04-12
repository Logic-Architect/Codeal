const Post = require('../models/post');

module.exports.home = function (req, res) {

    // res.cookie

    // Post.findById()
    // .then(post=>{
    //     res.render('home', {
    //         title: "Home",
    //         posts : post 
    //     })
    // })

    Post.find({}).populate('user').populate({path: 'comment', populate: {path: 'user'}})
    .then(post=>{
         return res.render('home', {
            title: "Home",
            posts : post 
        })

    })
}

