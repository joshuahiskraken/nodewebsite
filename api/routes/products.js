const express = require('express');
const router = express.Router(); // import express router to manager routes
const mongoose = require('mongoose');

const Product = require('../models/product'); //import Product object with the model in api/models/



//Handle incoming GET req
router.get('/', (req, res, next) => { // /products is defined in App.js so this only needs to be root
    Product.find().exec().then(docs => { //products should return all products. where docs means all products. 
        console.log(docs); //log all products
    if (docs.length >= 0) {   //If else statement is optional, otherwise it just returns an empty array if nothing is found 
        res.status(200).json(docs); //produce all products in json format
    } else {
        res.status(404).json({
            message: 'No products found'
        });
    }
    })
    .catch(err => {            //catch any errors
        console.log(err);       // Log them
        res.status(500).json({  //Produce them using json
            error: err 
        });
    });
});

//Handle incoming GET req for individul id
router.get('/:productId', (req, res, next) => { 
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {  //use then method to get the document and log it to the console
        console.log('From Database', doc);
    if (doc) {    
        res.status(200).json(doc); //if there was no error then res the doc in json
    } else {
        res.status(404).json({message: 'No valid entry found 404'}); // for invalid ID returns    
    }
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err}); //send json res with error property thats equal to the err being caught
    });
});

//Handle incoming POST req
router.post('/', (req, res, next) => { // /products is defined in App.js so this only needs to be root instead of /products
    //create new product from mongoose import
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), //mongoose automatically create new Id randomized
        name: req.body.name,
        price: req.body.price
    });
    
    product
        .save()
        .then(result => { //use mongoose .save method to store in database, chain with .then method with arrow function for the result
            console.log(result);
            res.status(201).json({
        
            message: 'Products.js Handling POST req to /products',
            createdProduct: result   //pass the product back with the message
        }) 
            .catch(err => {
                console.log(err);
                res.status(500).json({
                 error: err
                });
            }); //chain .catch method to catch error and display in the log
    
    });
});

//Handle incoming PATCH req
router.patch('/:productId', (req, res, next) => { //works same as delete
    const id = req.params.productId; 
    Product.findByIdAndUpdate(id)
    .exec()
    .then(result => {
        res.status(201).json(result);
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Handle incoming DELETE req
router.delete('/:productId', (req, res, next) => { 
   const id = req.params.productId; //give id object the params in the url /:productId 
   Product.findByIdAndDelete(id) // Self explainatory 
   .exec()
   .then(result => {
       res.status(200).json(result); // return as json
   })
   .catch(err => {       
       console.log(err);
       res.status(500).json({
           error: err
       });
   });
});


module.exports = router;