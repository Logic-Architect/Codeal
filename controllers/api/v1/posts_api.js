const Post = require('../../../models/post');
const Comment = require('../../../models/comment')

module.exports.index = async function (req, res) {


    let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment', populate: { path: 'user' }
        });


    return res.json(200, {
        message: 'Lists of Posts',
        Post: post
    })
}


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            await Post.deleteOne(post)
            console.log(req.params.id)
            await Comment.deleteMany({ post: req.params.id });
            // if (req.xhr) {
            //     console.log('entered');
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id,
            //         },
            //         message: "Post deleted"
            //     });
            // }
            // req.flash('success', 'Post and associated comments deleted!');
            // return res.redirect('back');
            return res.json(200,{
                message : "Post and asscaited comments deleted"
            })
        } else {
            // req.flash('error', 'You cannot delete this post!');
            // return res.redirect('back');
            return res.status(401).json({
                message : 'You cannot delete this post'
            })
        }
    } catch (err) {
        // req.flash('error', err);
        // return res.redirect('back');
        console.log('----------',err);
        return res.json(500,{
            message : 'Internal Server Error'
        })
    }

}