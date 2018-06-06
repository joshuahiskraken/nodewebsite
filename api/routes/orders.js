//5:41 https://www.youtube.com/watch?v=VKuY8QscZwY
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
require('dotenv').config();
const Product = require('../models/product');

//handle incoming GET req,
router.get('/', (req, res, next) => {
    Order.find().select('product quantity _id').exec()
    .then (docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: process.env.ordrHOST + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
    
        res.status(200).json({
            order: order,
        request: {
            type: 'GET',
            description: 'Returnt to orders page',
            url: process.env.ordrHOST 
        }    
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err,
           message: 'Order not found' 
        })
    })
});

//handle POST req, Find product ID if it exists THEN return with order SAVE if not RERTURN error message and CATCH and log ERR
router.post("/", (req, res, next) => {
    Product.findById(req.body.productId)
      .then(product => {       
        if (!product) {                  
          return res.status(404).json({
            message: "Product not found"
          });
        }
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId
        });
        return order.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            product: result.product,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: process.env.ordrHOST + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
          message: 'Product ID invalid'
        });
      });
  }); 



//handle DELETE req,
router.delete('/:orderId', (req, res, next) => {
    Order.findByIdAndDelete({_id: req.params.orderId})
    .exec()
    .then(result => {
       res.status(200).json({
        message: 'Order Deleted',
        request: {
            type: 'POST',
            description: 'Return to POST orders',
            url: process.env.ordrHOST,
            body: {product: String, quantity: Number}
        }
       });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
          message: 'Product ID invalid'
        });
      });
});

module.exports = router;
