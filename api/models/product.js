// define how a product should look
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({ //create the product schema
    _id: mongoose.Types.ObjectId, // select the Type of ID for product
    name: String, // products show have names that are strings
    price: Number // and a price property that is a number
});

module.exports = mongoose.model('Product', productSchema); //Model function takes 2 argruments name of the model to use internally, and what it should look like as a schema
