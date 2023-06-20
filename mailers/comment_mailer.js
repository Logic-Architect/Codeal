const nodemailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log('inside newComment mailer',comment);

    let htmlString = nodemailer.renderTemplate({comment : comment},'/comments/new_comment.ejs')

    nodemailer.transport.sendMail({
        from : 'er.amantiwari.nodemailer@gmail.com',
        to : comment.user.email,
        subject : 'New Comment Published',
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err)
            return;
        }
        // console.log('message sent',info);
    })
}
