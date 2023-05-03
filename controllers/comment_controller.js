const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const commentMailer = require('../mailers/comment_mailer');

module.exports.create = async function (req, res) {
    // Post.findById(req.body.post)
    //     .then(post => {
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         })
    //             .then(comments => {
    //                 post.comment.push(comments);
    //                 post.save();

    //                 res.redirect('back')
    //             })
    //     })

    console.log(req.body);
    try {
        let post = await Post.findById(req.body.post);

        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        let user = await User.findById(req.user._id);

        post.comment.push(comment);
        post.save();

        comment = await comment.populate('user', 'name email')
            .then(comment => {
                // console.log('info',comment);
                commentMailer.newComment(comment);
            });

        if (req.xhr) {
            console.log('entered comments');


            return res.status(200).json({
                data: {
                    comment: comment,
                    post: req.body.post,
                    username: user.name
                },
                message: 'Commented'
            })
        }

        console.log('not using xhr')
        res.redirect('back');

    }

    catch (error) {
        console.log(error);
    }
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
// module.exports.destroy = function (req, res) {
//     console.log('0')
//     Comment.findById(req.params.id)
//         .then(comment => {
//             if (req.user.id == comment.user) {
//                 console.log('1',comment)
//                 let postid = comment.post;

//                 Comment.deleteOne(comment)
//                     .then(data => {
//                         console.log('Successfully deleted the comment', comment);
//                     })
//                     .catch(err => {
//                         return res.redirect('back');
//                     })

//                 Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } })
//                     .then(data => {

//                     })
//                     .catch(err => {
//                         return res.redirect('back');
//                     })
//             }
//             else {
//                 console.log('2')
//                 Comment.findById(req.params.id)
//                     .then(comment => {
//                         let postid = comment.post;
//                         Post.findById(postid)
//                             .then(post => {
//                                 if (post.user == req.user.id) {
//                                     console.log('3')
//                                     Comment.deleteOne(comment)
//                                         .then(data => {
//                                             console.log('Successfully deleted the comment', comment);
//                                         })
//                                         .catch(err => {
//                                             return res.redirect('back');
//                                         })

//                                     Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } })
//                                         .then(data => {

//                                         })
//                                         .catch(err => {
//                                             return res.redirect('back');
//                                         })
//                                 }
//                                 else {
//                                     return res.redirect('back')
//                                 }
//                             })
//                     })
//             }
//         })

//         if(req.xhr){
//             console.log("XHR request");
//             return res.status(200).json({
//                 data : {
//                     data : "this id data",
//                 },message : "Comment Deleted"
//             })
//         }

//         return res.redirect('back');
// }

module.exports.destroy = async function (req, res) {
    console.log('0')
    let comment = await Comment.findById(req.params.id)
    console.log(comment)
    let postid = await comment.post;
    console.log(postid)

    if (req.user.id == comment.user) {
        console.log('1')

        let deletedComment = await Comment.deleteOne(comment)
        console.log('Successfully deleted the comment', deletedComment);



        let updatedPost = await Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } });
        console.log('Updated Post is', updatedPost)


        if (req.xhr) {
            console.log('ready to delete comment')
        }

        return res.redirect('back');

    }
    else {
        console.log('2')


        let post = await Post.findById(postid)

        if (post.user == req.user.id) {
            console.log('3')
            let deletedComment = await Comment.deleteOne(comment);
            console.log('Successfully deleted the comment', deletedComment);



            let updatedPost = await Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } })
            console.log('Updated Post is', updatedPost)

            if (req.xhr) {
                console.log('ready to delete comment');
            }

            return res.redirect('back');


        }
        else {
            req.flash('error', 'Unauthorized')
            return res.redirect('back')
        }

    }
}