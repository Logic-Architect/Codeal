const express = require('express');
const { urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const { clearScreenDown } = require('readline');
const app = express();
const port = 8000;

// SETTING LAYOUTS 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// REASD DATA THROUGH POST REQUEST 
app.use(express.urlencoded());

// MANIPULATING COOKIES 
app.use(cookieParser());

// MANAGING STYLES AND SCRIPTS FROM VARIOUS VIEWS FOLLOWING LAYOUTS 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// CONNECTING TO THE DATABASE 
const db = require('./config/mongoose');

// SETTING  PATH TO STATIC FILES 
app.use(express.static('./assets'));

// CONFIGURING VIEWS AND VIEW ENGINE 
app.set('view engine', 'ejs');
app.set('views', './views');

// RECIEVING REQUEST 
app.use('/', require('./routes/index'));

// LISTENING TO THE REQUEST AT GIVEN PORT 
app.listen(port, err => {
    if (err) {
        console.log(`Error in running the server ${err}`);
        return;
    }
    console.log(`Server started successfully at port ${port}`);
})