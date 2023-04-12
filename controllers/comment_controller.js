const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(post => {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
                .then(comments => {
                    post.comment.push(comments);
                    post.save();

                    res.redirect('back')
                })
        })
}

    // CODE BY ARPAN GARG 
// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id)
//     .then(comment=>{
//         if(req.user.id==comment.user ){
//             let postid= comment.post;

//             Comment.deleteOne(comment)
//                 .then(data=>{
//                     console.log('Successfully deleted the comment',comment);
//                 })
//                 .catch(err=>{
//                     return res.redirect('back');
//                 })

//             Post.findByIdAndUpdate(postid,{$pull:{comment : req.params.id}})
//             .then(data=>{
//                 return res.redirect('back');
//             })
//             .catch(err=>{
//                 return res.redirect('back');
//             })
//         }
//         else{
//             return res.redirect('back');
//         }
//     })
// }

// CODE BY MASTER BLASTER AMAN TIWARI 
module.exports.destroy = function (req, res) {
    console.log('0')
    Comment.findById(req.params.id)
        .then(comment => {
            if (req.user.id == comment.user) {
                console.log('1')
                let postid = comment.post;

                Comment.deleteOne(comment)
                    .then(data => {
                        console.log('Successfully deleted the comment', comment);
                    })
                    .catch(err => {
                        return res.redirect('back');
                    })

                Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } })
                    .then(data => {
                        return res.redirect('back');
                    })
                    .catch(err => {
                        return res.redirect('back');
                    })
            }
            else {
                console.log('2')
                Comment.findById(req.params.id)
                    .then(comment => {
                        let postid = comment.post;
                        Post.findById(postid)
                            .then(post => {
                                if (post.user == req.user.id) {
                                    console.log('3')
                                    Comment.deleteOne(comment)
                                        .then(data => {
                                            console.log('Successfully deleted the comment', comment);
                                        })
                                        .catch(err => {
                                            return res.redirect('back');
                                        })

                                    Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } })
                                        .then(data => {
                                            return res.redirect('back');
                                        })
                                        .catch(err => {
                                            return res.redirect('back');
                                        })
                                }
                                else{
                                    return res.redirect('back')
                                }
                            })
                    })
            }
        })
    }