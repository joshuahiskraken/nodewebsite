
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/product'); //import Product object with the model in api/models/product.js
const multer = require('multer');// use multer to handle form requests and file uploadsnodemon


exports.get_all_products = (req, res, next) => { // /products is defined in App.js so this only needs to be root
    Product.find().select('name price _id productImage').exec().then(docs => { //products should return all products. where docs means all products. Select(Properties separated with spaces)
        const prodresponse = { //create an object to show number of products
            count: docs.length,
            products: docs.map(doc => { //return a mapped array with the below meta data, including the url to the individual object
                return {
                    name: doc.name,
                    productImage: doc.productImage,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: process.env.prodHOST + doc._id  //need to fix need to get dynamic server addr instead of hard coding
                    }
                }
            })
        }; //log all products
    if (docs.length >= 0) {   //If else statement is optional, otherwise it just returns an empty array if nothing is found 
        res.status(200).json(prodresponse); //produce all products in json format
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
};


exports.get_product_id = (req, res, next) => { 
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {  //use then method to get the document and log it to the console
        console.log('From Database', doc);
    if (doc) {    
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                description: 'View image',
                url: process.env.prodHOST + doc.productImage
            },
            request: {
                type: 'GET',
                description: 'Get all products',
                url: process.env.prodHOST
            }
        }); //if there was no error then res the doc in json
    } else {
        res.status(404).json({message: 'No valid entry found 404'}); // for invalid ID returns    
    }
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err}); //send json res with error property thats equal to the err being caught
    });
};

exports.products_post = (req, res, next) => { // pass as many handlers as you'd like separated by , they run IN ORDER
console.log(req.file); //req.file available by multer    
//create new product from mongoose import
const product = new Product({
_id: new mongoose.Types.ObjectId(), //mongoose automatically create new Id randomized
name: req.body.name,
price: req.body.price,
productImage: req.file.path //Storing the file 'path' in the database because it contains the file name
});

product.save().then(result => { //use mongoose .save method to store in database, chain with .then method with arrow function for the result
    console.log(result);
    res.status(201).json({
    message: 'Products.js Handling POST req to /products',
    createdProduct: {               //restructured the result when returning data of new product back
        name: result.name,
        price: result.price,
        _id: result._id,
        request: {          //produce a request for the product individual url
            type: 'GET',
            url: process.env.prodHOST + result._id
        }
    } //pass the product back with the message
}) 
.catch(err => {
        console.log(err);
        res.status(500).json({
         error: err
        });
    }); //chain .catch method to catch error and display in the log
});
};

exports.products_patch = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.findByIdAndUpdate(id, { $set: updateOps })  
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product created!',
            request: {
                type: 'GET',
                url: process.env.prodHOST + result._id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
/* send the new value of the property "name"
[
	{"propName": "name" , "value": "newname"}
	
	]
*/

exports.products_delete = (req, res, next) => { 
    const id = req.params.productId; //give id object the params in the url /:productId 
    Product.findByIdAndDelete(id) // Self explainatory 
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                description: 'Click the link to post again',
                url: process.env.prodHOST + result._id,
                body: {name: 'String', price: 'Number'}
            }
        }); // return as json
    })
    .catch(err => {       
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
 };