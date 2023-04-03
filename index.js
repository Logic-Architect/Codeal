const express = require('express');
const { clearScreenDown } = require('readline');
const app = express();
const port = 8000;

app.use('/',require('./routes/index'));


app.listen(port, err=>{
    if(err){
        console.log(`Error in running the server ${err}`);
        return;
    }
    console.log(`Server started successfully at port ${port}`);
})