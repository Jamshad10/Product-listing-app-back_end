const express = require('express');
const router = express.Router();
const {
    addCategory,
    getCategory,
    addProduct
} = require('../controller/admin');

//routing
router.post('/addcategory', addCategory);
router.get('/categories', getCategory);
router.post('/addproduct', addProduct);

module.exports = router;