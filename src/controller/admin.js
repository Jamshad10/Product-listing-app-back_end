const CategoryModel = require('../models/categorySchema');
const ProductModel = require('../models/productSchema');

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


module.exports = {
    addCategory,
    getCategory,
    addProduct
}