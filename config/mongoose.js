const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codeal_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Erroe connecting MOngoDB'));

db.once('open',function(){
    console.log("connected to the database"); 
})