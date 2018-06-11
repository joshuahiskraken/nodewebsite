//5:41 https://www.youtube.com/watch?v=VKuY8QscZwY
const express = require('express');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const ordersController = require('../controllers/orderscontroller');
const checkAuth = require('../middleware/check-auth');
//handle incoming GET req,
router.get('/', checkAuth, ordersController.orders_get_all); //Pulling the function from the orderscontroller.js 

router.get('/:orderId',checkAuth, ordersController.order_get_id);

//handle POST req, Find product ID if it exists THEN return with order SAVE if not RERTURN error message and CATCH and log ERR
router.post("/", checkAuth, ordersController.order_post);


//handle DELETE req,
router.delete('/:orderId', checkAuth, ordersController.order_delete);

module.exports = router;
