const express = require('express');
const router = express.Router();
const {
    addCategory,
    getCategory,
    addProduct,
    getProducts,
    addItems,
    getItems
} = require('../controller/admin');

//routing
router.post('/addcategory', addCategory);
router.get('/categories', getCategory);
router.post('/addproduct', addProduct);
router.get('/products', getProducts);
router.post('/additems', addItems);
router.get('/items', getItems);

module.exports = router;