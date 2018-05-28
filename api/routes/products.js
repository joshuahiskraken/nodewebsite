const express = require('express');
const router = express.Router(); // import express router to manager routes
const mongoose = require('mongoose');

const Product = require('../models/product'); //import Product object with the model in api/models/



//Handle incoming GET req
router.get('/', (req, res, next) => { // /products is defined in App.js so this only needs to be root
    res.status(200).json({
        message: 'Products.js Handling GET req to /products'
    });
});

//Handle incoming GET req for individul id
router.get('/:productId', (req, res, next) => { 
    const id = req.params.productId;
if (id === 'special') {
    res.status(200).json({
        message: 'GET for !id: This is not a product id',
        id: id
    });
}  else {
    res.status(200).json({
        message: 'GET for id: You request this product ID'
    });
}
});

//Handle incoming POST req
router.post('/', (req, res, next) => { // /products is defined in App.js so this only needs to be root instead of /products
    //create new product from mongoose import
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), //mongoose automatically create new Id randomized
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => { //use mongoose .save method to store in database, chain with .then method with arrow function for the result
        console.log(result);
    }) 
    .catch(err => console.log(err)); //chain .catch method to catch error and display in the log
    res.status(201).json({
        message: 'Products.js Handling POST req to /products',
        createdProduct: product   //pass the product back with the message
    });
});

//Handle incoming PATCH req
router.patch('/:productId', (req, res, next) => { 
    res.status(200).json({
        message: 'updated product PATCH '
    });
});

//Handle incoming DELETE req
router.delete('/:productId', (req, res, next) => { 
    res.status(200).json({
        message: 'deleted product DELETE '
    });
});


module.exports = router;