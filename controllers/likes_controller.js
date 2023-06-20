const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){
    try {


        console.log('toggleLike',req.query);

        let likeable ;
        let deleted = false;

        if(req.query.type === 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            if(req.query.type === 'Comment'){
                likeable = await Comment.findById(req.query.id).populate('likes');
            }else{
                return res.status(400).json({
                    message : 'You Can Only like Post or Comment'
                })
            }
        }

        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        })

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();

            deleted =  true
        }else{

            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type
            })
        }

        likeable.likes.push(newLike._id);
        likeable.save();

        return res.status(200).json({
            message : 'Request Successfull',
            data : {
                deleted : deleted
            }
        })

    } catch (error) {
        console.log('Error in Toggle Like',error);
        return res.status(500).json({
            message :'Internal Server Error'
        })
    }
}