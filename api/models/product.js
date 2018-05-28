// define how a product should look
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({ //create the product schema
    _id: mongoose.Schema.Types.ObjectId, // select the Type of ID for product
    name: String, // products show have names that are strings
    price: Number // and a price property that is a number
});

module.exports = mongoose.model('Product', productSchema); //Model function takes 2 argruments name of the model to use internally, and what it should look like as a schema

//currently getting validation error when posting
/*{
    "name": "Shiney Object",
    "price": "$10,000"
    } 
    
Returns in postman

 {
    "message": "Products.js Handling POST req to /products",
    "createdProduct": {
        "_id": "5b0bdc61a512dd01294cff5a",
        "name": "Shiney Object"
    }
}   

console.log

POST /products 201 38.776 ms - 131
{ ValidationError: Product validation failed: price: Cast to Number failed for value "$10,000" at path "price"
    at ValidationError.inspect (/mnt/c/Users/never/node/node_modules/mongoose/lib/error/validation.js:56:24)
    at ValidationError.deprecated (internal/util.js:70:15)
    at formatValue (util.js:475:31)
    at inspect (util.js:336:10)
    at Object.formatWithOptions (util.js:190:12)
    at Console.(anonymous function) (console.js:186:15)
    at Console.log (console.js:197:31)
    at product.save.then.catch.err (/mnt/c/Users/never/node/api/routes/products.js:42:27)
    at process._tickCallback (internal/process/next_tick.js:68:7)
  errors:
   { price:
      { CastError: Cast to Number failed for value "$10,000" at path "price"
    at new CastError (/mnt/c/Users/never/node/node_modules/mongoose/lib/error/cast.js:27:11)
    at model.$set (/mnt/c/Users/never/node/node_modules/mongoose/lib/document.js:853:7)
    at model._handleIndex (/mnt/c/Users/never/node/node_modules/mongoose/lib/document.js:674:14)
    at model.$set (/mnt/c/Users/never/node/node_modules/mongoose/lib/document.js:635:22)
    at model.Document (/mnt/c/Users/never/node/node_modules/mongoose/lib/document.js:111:12)
    at model.Model (/mnt/c/Users/never/node/node_modules/mongoose/lib/model.js:63:12)
    at new model (/mnt/c/Users/never/node/node_modules/mongoose/lib/model.js:4009:13)
    at router.post (/mnt/c/Users/never/node/api/routes/products.js:34:21)
    at Layer.handle [as handle_request] (/mnt/c/Users/never/node/node_modules/express/lib/router/layer.js:95:5)
    at next (/mnt/c/Users/never/node/node_modules/express/lib/router/route.js:137:13)uter/route.js:137:13)                                           ess/lib/router/route.js:112:3)
    at Route.dispatch (/mnt/c/Users/never/node/node_modules/expr/node_modules/express/lib/router/layer.js:95:5)ess/lib/router/route.js:112:3)                                  ndex.js:281:22
    at Layer.handle [as handle_request] (/mnt/c/Users/never/nodeules/express/lib/router/index.js:335:12)/node_modules/express/lib/router/layer.js:95:5)                 uter/index.js:275:10)
    at /mnt/c/Users/never/node/node_modules/express/lib/router/iress/lib/router/index.js:174:3)ndex.js:281:22                                                  ath "price"',
    at Function.process_params (/mnt/c/Users/never/node/node_modules/express/lib/router/index.js:335:12)
    at next (/mnt/c/Users/never/node/node_modules/express/lib/router/index.js:275:10)    at Function.handle (/mnt/c/Users/never/node/node_modules/express/lib/router/index.js:174:3)
        message: 'Cast to Number failed for value "$10,000" at path "price"',        name: 'CastError',
        stringValue: '"$10,000"',        kind: 'Number',
        value: '$10,000',
        path: 'price',
        reason: [MongooseError] } },
  _message: 'Product validation failed',
  name: 'ValidationError' }
(node:297) [DEP0079] DeprecationWarning: Custom inspection function on Objects via .inspect() is deprecated
*/