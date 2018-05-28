const express = require('express');
const router = express.Router(); // import express router to manager routes

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
    const product = { //create object with name property, name property should be coming from a req and located in body same with price
        name: req.body.name,
        price: req.body.price
    };
    
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