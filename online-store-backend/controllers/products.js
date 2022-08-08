const Product = require("../models/product");
const Category = require("../models/category");
const { getUserIfAuthorizedMiddleware } = require("../utils/middlewares");
const router = require("express").Router();

router.post("/", getUserIfAuthorizedMiddleware, async (req, res, next) => {
    try {
        if (req.decodedLoginObj.email !== "admin@company.com")
            return res.status(401).json({error: "This route is only for the admin"});

        const category = await Category.findOne({name: req.body.category}); 

        if (category === null)
        {
            const newCategory = new Category({name: req.body.category});
            const savedNewCategory = await newCategory.save();
            req.body.category = savedNewCategory.id;
        }
        else
            req.body.category = category.id;

        const product = new Product(req.body);
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
        const product = await Product.findOne({_id: req.params.id}).populate("category");

        if (product === null)
            return res.status(404).json({error: "Product with the given ID not found"});

        res.json(product);
    }
    catch(err) {
        next(err);
    }
})

module.exports = router;
