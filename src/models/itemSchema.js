const mongoose = require('mongoose');

const itemModel = new mongoose.Schema({
    category: {
        type:String,
        required:true
    },
    products: {
        type:String,
        required:true
    },
    productCategory : {
        type:String,
        required:true
    },
    item : {
        type:String,
        required:true
    }
})

const ItemModel = mongoose.model('items', itemModel);
module.exports = ItemModel;