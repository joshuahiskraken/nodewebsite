// define how a product should look
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({ //create the product schema
    _id: mongoose.Schema.Types.ObjectId, // select the Type of ID for product
    name: {type: String, required: true }, // products show have names that must be a String and is required
    price: {type: Number, required: true} // and a price property that is a number type and is required 
});

module.exports = mongoose.model('Product', productSchema); //Model function takes 2 argruments name of the model to use internally, and what it should look like as a schema