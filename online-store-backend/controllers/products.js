const Product = require("../models/product");
const Category = require("../models/category");
const { getUserIfAuthorized, adminCheck, customValidator } = require("../utils/middlewares");
const { createProductCheckArr } = require("../utils/helpers");
const router = require("express").Router();

router.post("/", getUserIfAuthorized, adminCheck, customValidator(createProductCheckArr()), async (req, res, next) => {
    try {
        const productCategory = req.body.category.toLowerCase();
        const category = await Category.findOne({name: productCategory}); 

        if (category === null)
        {
            const newCategory = new Category({name: productCategory});
            const savedNewCategory = await newCategory.save();

            req.body.category = savedNewCategory._id;
        }
        else
            req.body.category = category._id;

        const newProduct = req.body;

        let newProductRatingRate = Number(newProduct.rating?.rate);
        // 0 <= newProductRatingRate <= 5
        newProductRatingRate = Math.max(Math.min(isNaN(newProductRatingRate) ? 0 : newProductRatingRate, 5), 0);

        let newProductRatingCount = Number(newProduct.rating?.count);
        // 0 <= newProductRatingCount
        newProductRatingCount = Math.max(isNaN(newProductRatingCount) ? 0 : newProductRatingCount, 0);

        if (newProductRatingRate > 0) {
            // If newProductRatingRate > 0, then newProductRatingCount >= 1
            newProductRatingCount = Math.max(newProductRatingCount, 1);
        }

        const product = new Product({
            title: newProduct.title,
            price: Math.max(newProduct.price, 0),
            description: newProduct.description,
            category: newProduct.category,
            image: newProduct.image,
            rating: {
                rate: newProductRatingRate,
                count: newProductRatingCount
            }
        });

        const addedProduct = await product.save();

        res.json(addedProduct);
    }
    catch(err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find().populate("category");
        res.json(products);
    }
    catch(err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await Product.findOne({_id: productId}).populate("category");

        if (product === null)
            return res.status(404).json({error: `Product with the ID - '${productId}' not found`});

        res.json(product);
    }
    catch(err) {
        next(err);
    }
})

module.exports = router;
