const Post = require('../models/post');
const Comment = require('../models/comment')
const User = require('../models/user')

 module.exports.create = async function (req, res) {
//         Post.create({
//             content: req.body.content,
//             user: req.user._id
//         })
//             .then(post => {
//                 console.log('Posted', post);
//                 req.flash('success','Successfullly created Your Post')
//                 return res.redirect('back');
//             })
//             .catch(err => {
//                 req.log('error','Cannot Post <br> Try After Sometime')
//                 console.log('Error Posting', err);
//                 return res.direct('back')
//             });
//     }

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        console.log('Posted');

        let user = await User.findById(post.user);

        if(req.xhr){

            console.log('yes');
            req.flash('success', 'Successfullly created Your Post');
            return res.status(200).json({
                data : {
                    post : post,
                    name : user.name
                },
                message : 'Post Created'
            })
        }

        req.flash('success', 'Successfullly created Your Post');
        return res.redirect('back');
    }
    catch (err) {
        req.flash('error', 'Cannot Post <br> Try After Sometime')
        console.log('Error Posting', err);
        return res.redirect('back')
    }

}



// module.exports.destroy = function (req, res) {
//     Post.findById(req.params.id)
//         .then(post => {
//             console.log(' selected to delete is ', post);
//             // ,ID MEANS AUTOMATIC CONVERSION TO STRING 
//             if (post.user == req.user.id) {
//                 // post.remove();
//                 console.log('post deleted is ', post);
//                 Post.deleteOne(post)
//                 .then(data => {
//                         req.flash('error','Post deleted')
//                         console.log('deleted');
//                     })

//                 Comment.deleteMany({ post: req.params.id })
//                     .then(data => {

//                         if(req.xhr){
//                             console.log('okk');
//                             return res.redirect('/');
//                         }

//                         console.log('deleted successfully');
//                         return res.redirect('back');
//                     })
//                     .catch(err => {
//                         if (err) {
//                             console.log('Unable to delete the post');
//                             return res.redirect('back');
//                         }
//                     })
//             }
//             else {
//                 res.redirect('back')
//             }
//         })
// }


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
             
            await Post.deleteOne(post)

            console.log(req.params.id)

            await Comment.deleteMany({post: req.params.id});


           if (req.xhr){
                console.log('entered');
                return res.status(200).json({
                    data: {
                        post_id: req.params.id,
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}