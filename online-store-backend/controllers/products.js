const Product = require("../models/product");
const { getUserIfAuthorizedMiddleware } = require("../utils/middlewares");
const router = require("express").Router();

router.post("/", getUserIfAuthorizedMiddleware, async (req, res, next) => {
    try {
        if (req.decodedLoginObj.email !== "admin@company.com")
            return res.status(401).json({error: "This route is only for the admin"});

        const product = new Product(req.body); // Trust the admin
        const addedProduct = await product.save();

        res.json(addedProduct);
    }
    catch(err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch(err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const productArray = await Product.find({_id: req.params.id});

        if (productArray.length === 0)
            return res.status(404).json({error: "Product with the given ID not found"});

        res.json(productArray[0]);
    }
    catch(err) {}
})

module.exports = router;
