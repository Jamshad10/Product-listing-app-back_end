const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    category: {
        type:String,
        required:true
    },
    products: {
        type:String,
        required:true
    }
});

const ProductModel = mongoose.model('products',productModel);
module.exports = ProductModel;