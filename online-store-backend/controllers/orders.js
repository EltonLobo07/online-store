const Order = require("../models/order");
const User = require("../models/user");
const { getUserIfAuthorized, adminCheck } = require("../utils/middlewares");
const router = require("express").Router();
const { getErrorMsgObj } = require("../utils/helpers");

router.post("/", getUserIfAuthorized, async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});

        if (!user.address)
            return res.status(400).json(getErrorMsgObj("Set an address before ordering"));

        const shoppingCart = user.shoppingCartProducts;

        if (shoppingCart.size === 0)
            return res.status(400).json(getErrorMsgObj("The shopping cart is empty"));

        const checkoutProducts = [];

        for (const [productId, quantity] of shoppingCart.entries()) {
            if (quantity === 0)
                return res.status(400).json(getErrorMsgObj("One of the product in the shopping cart has quantity set to 0"));
                
            checkoutProducts.push({product: productId, quantity});
        }; 

        const newOrder = new Order({
            user: req.decodedLoginObj.id,
            products: checkoutProducts,
            date: new Date(),
            address: user.address
        });

        await newOrder.save();
        res.status(201).end();
    }
    catch(err) {
        next(err);
    }
});

router.get("/admin", getUserIfAuthorized, adminCheck, async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", {email: 1}).populate("products.product", {title: 1, price: 1, category: 1});
        res.json(orders);
    }
    catch(err) {
        next(err);
    }
});

router.get("/user", getUserIfAuthorized, async (req, res, next) => {
    try {
        const orders = await Order.find({user: req.decodedLoginObj.id}).populate("products.product", {title: 1, price: 1});
        res.json(orders);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
