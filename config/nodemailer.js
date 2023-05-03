const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')

let transport = nodemailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth : {
        user : 'er.amantiwari.nodeMailer@gmail.com',
        pass : 'gzdblgruttmikgqq'
    },
    tls :{
        rejectUnauthorized :true
    }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template',err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transport:transport,
    renderTemplate : renderTemplate
    
}