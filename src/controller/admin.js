const CategoryModel = require('../models/categorySchema');
const ProductModel = require('../models/productSchema');
const ItemModel = require('../models/itemSchema');

const addCategory = async (req, res) => {
    try {
        console.log('req-body', req.body);
        const categories = new CategoryModel({
            category: req.body.category
        })
        categories.save().then(result => {
            console.log('category', result);
            res.send('category added')
        })
    } catch (error) {
        console.log('catogory-add-error', error);
    }
};

const getCategory = async (req, res) => {
    CategoryModel.find()
        .then(categories => res.json(categories))
        .catch(err => res.json(err))
};

const addProduct = async (req, res) => {
    try {
        const { category, product } = req.body

        // Ensure the category exists before adding the product
        const existingCategory = await CategoryModel.findOne({ category });
        if (!existingCategory) {
            return req.status(400).json({ error: 'Category not found' })
        };

        // If the category exists, create a new product and associate it with the category
        const newProduct = new ProductModel({ category, products: product })
        const saveProduct = await newProduct.save();
        console.log('product added', saveProduct);
        return res.json(saveProduct)

    } catch (error) {
        console.log('product add error', error);
        return res.status(500).json({ error: 'Could not add the product' })
    }
};

const getProducts = async (req, res) => {
    ProductModel.find()
        .then(product => res.json(product))
        .catch(err => res.json(err))
}

const addItems = async (req, res) => {
    try {
        const { category, products, productCategory, item } = req.body;

        //ensure the product exists
        const existingProduct = await ProductModel.findOne({ category, products });
        if (!existingProduct) {
            return res.status(400).json({ error: 'Product not found' })
        }

        //if product is exists, create a new item under the product category
        const newItem = new ItemModel({ category, products, productCategory: productCategory, item: item });
        const saveItem = await newItem.save();
        console.log('item added', saveItem);
        return res.json(saveItem);
    } catch (error) {
        console.log('Item add error', error);
        return res.status(500).json({ error: 'Could not add the Item' })
    }
};

const getItems = async (req, res) => {
    ItemModel.find()
        .then(items => res.json(items))
        .catch(err => res.json(err))
};


module.exports = {
    addCategory,
    getCategory,
    addProduct,
    getProducts,
    addItems,
    getItems
}