const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
require('dotenv').config();

//handle incoming GET req,
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET orders were fetched'
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'GET order details',
        orderId: req.params.orderId
    });
});

//handle POST req,
router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId,
        quantity: req.body.quantity,
        productKey: req.body.productId
    });
    //chain save to save in the database  then to send result and status code to log and catch for errs only use exec with things like find
    order.save().then(result => {
        console.log(result);
        res.status(201).json(result).catch(err => {
        console.log(err);
        error: err
       }); 
    });  
});


//handle DELETE req,
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'DELETE Order has been deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;
