const express = require('express');
const app = express(); //app can execute express as a function
const productRoutes = require('./api/routes/products'); // import the products.js route from directory
const ordersRoutes = require('./api/routes/orders');    // import the orders.js route
const morgan = require('morgan'); //Error handler and network monitor
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(morgan('dev')); //use morgan as a function and pass 'dev'

app.use(bodyParser.urlencoded({extended: false})); //which kind of bodies you want to parse? URL body, extended: true or false simple complex
app.use(bodyParser.json()); //parses json to make it readable 

//Prevent CORS Errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //Response header origin, origin URL set to any *
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorizations'); //Response header type, listed or any with *

    if (req.method === 'OPTIONS') { // if incoming req method is equal to OPTIONS(browsers always send options req when POST,GET,PUT, etc) Also add additional header to sell browser what it CAN send.
        res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH, DELETE, GET"); //http word requests you want to allow
        return res.status(200).json({}); //status of 200 with an empty json payload. 
    }
    next(); // return next so that way the other routes can take over if about doesn't return
});

app.use(express.static('uploads')); // Create a static public folder for the upoloads so we can go to HOST:PORT/file.path


    //first is the filter   //
app.use('/products', productRoutes); //Tell the app.use to handle anything with /products by using productRoutes
//app.use sends req to product.js that handles '/' so we can split route handling among many modules 
app.use('/orders', ordersRoutes);
//Error handler for routes
app.use((req, res, next) => {
    const error = new Error('page not found');
    error.status = 404; 
    next(error); //pass next method pass the error along with the req to send error
});
//Error handler for internal
app.use((error, req, res, next) => { //handles all kinds of errors, like above and from databases because they throw an err by themselves
    res.status(error.status || 500); //return 500 error
    res.json({
        error: {
            message: error.message
        }
    });
});

//Connect to the Mongo Atlas database using mongoose database driver for nodejs, Create and env for the PW to the database store in nodemon.json
mongoose.connect('mongodb+srv://Gh0xst:'+process.env.USR_PW+'@cluster0-q0al3.mongodb.net/test?retryWrites=true');
require('mongoose').Promise = global.Promise;

module.exports = app;

