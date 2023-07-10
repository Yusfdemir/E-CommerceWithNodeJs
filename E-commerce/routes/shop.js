const express = require('express');
const router = express.Router();
const isAuthenticated=require('../middleware/authentication');
const shopController = require('../controllers/shop');
const locals=require('../middleware/locals');

router.get('/', locals,shopController.getIndex);

router.get('/products', locals,shopController.getProducts);

router.get('/products/:productid',locals, shopController.getProduct);

router.get('/categories/:categoryid',locals, shopController.getProductsByCategoryId);

router.get('/cart',locals,isAuthenticated, shopController.getCart);

router.post('/cart',locals,isAuthenticated, shopController.postCart);

router.post('/delete-cartitem',locals,isAuthenticated, shopController.postCartItemDelete);

router.get('/orders',locals,isAuthenticated, shopController.getOrders);

router.post('/create-order',locals,isAuthenticated, shopController.postOrder);

module.exports = router;