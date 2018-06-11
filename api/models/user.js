const mongoose = require('mongoose');
const userSchema = mongoose.Schema({ //create the product schema
    _id: mongoose.Schema.Types.ObjectId, // select the Type of ID for product
    email: {type: String, required: true, unique: true, match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);