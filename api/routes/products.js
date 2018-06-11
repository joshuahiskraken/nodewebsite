const express = require('express');
const router = express.Router(); // import express router to manager routes
const productsController = require('../controllers/productscontroller');
const checkAuth = require('../middleware/check-auth'); //middleware we use for token auth
const multer = require('multer');// use multer to handle form requests and file uploadsnodemon
const storage = multer.diskStorage({        // create our own storage parameters to apply to multer(); setting dest: and changing the filename and format 
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
//reject a file using mimetype(format) with cb(err, false) cb(null, true): False will reject and throw err True: will allow upload
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
    cb(null, true);
} else {
    cb(new Error('invalid File type'), false);    
    }
};
const upload = multer({storage: storage, fileFilter: fileFilter}); //create a new object initializing multer with config data limits: {fileSize: 1024 * 1024 * 5} for 5mb upload restriction 
//import server from index so we can use dynamic host and port in the link to individual products
//var server = require('../index');
//var host = server.address().address;
 //var port = server.address().port;


//Handle incoming GET req
router.get('/', productsController.get_all_products);
//Handle incoming GET req for individul id
router.get('/:productId', productsController.get_product_id); 

//Handle incoming POST req  single('name of the field that will contain upload')
router.post('/',checkAuth, upload.single('productImage'), productsController.products_post);

//Handle incoming PATCH req
router.patch("/:productId", checkAuth, productsController.products_post);
//Handle incoming DELETE req
router.delete('/:productId', checkAuth, productsController.products_delete);


module.exports = router;