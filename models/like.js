const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId
    },
    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        refPath : 'onModel'
    },
    onModel : {
        type : String,
        reuired : true,
        enum : ['Post','Comment']
    }
},{
    timestamps : true,
})

const like = mongoose.model('Like',likeSchema);

module.exports = like ; 