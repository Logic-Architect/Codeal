const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function (req, res) {

//     // res.cookie

//     // Post.findById()
//     // .then(post=>{
//     //     res.render('home', {
//     //         title: "Home",
//     //         posts : post 
//     //     })
//     // })

//     Post.find({}).populate('user').populate({ path: 'comment', populate: { path: 'user' } })
//         .then(post => {
//             User.find({})
//                 .then(user => {
//                     return res.render('home', {
//                         title: "Home",
//                         posts: post,
//                         all_users: user
//                     })
//                 })
//         })
// }

module.exports.home = async function (req, res) {
    try {
        let post = await Post.find({})
            .populate('user')
            .populate({
                path: 'comment', populate: { path: 'user' }
            });

        let user = await User.find({});

        return res.render('home', {
            title: "Home",
            posts: post,
            all_users: user
        })

    }
    catch (err) {
        console.log('Error rendering home page', err);

    }
}


