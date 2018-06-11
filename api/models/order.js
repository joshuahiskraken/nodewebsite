//orders are connected to products
const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({ //create the product schema
    _id: mongoose.Schema.Types.ObjectId, // select the Type of ID for product
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // ref is how we connect the order to the Product in mongo
    quantity: {type: Number, default: 1} //doesn't have to be required: true. Default is set if no quantity specified
});

module.exports = mongoose.model('Order', orderSchema);