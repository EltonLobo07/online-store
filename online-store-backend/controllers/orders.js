const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const { getUserIfAuthorized, adminCheck } = require("../utils/middlewares");
const router = require("express").Router();
const { getErrorMsgObj, getMissingFieldString } = require("../utils/helpers");

router.post("/", getUserIfAuthorized, async (req, res, next) => {
    const user = await User.findOne({_id: req.decodedLoginObj.id});

    const checkoutProducts = [];

    for (const [productId, quantity] of user.shoppingCartProducts.entries()) {
        if (quantity === 0)
            return res.status(400).json(getErrorMsgObj("The order list has 0 items to order"));
            
        checkoutProducts.push({product: productId, quantity});
    };

    if (checkoutProducts.length === 0)
        return res.status(400).json(getErrorMsgObj("The order list is empty")); 

    const newOrder = new Order({
        user: req.decodedLoginObj.id,
        products: checkoutProducts,
        date: new Date()
    });

    const returnedObj = await newOrder.save();
    console.log(returnedObj);
    res.status(201).end();
});

router.get("/", getUserIfAuthorized, adminCheck, async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", {email: 1}).populate("products.product", {title: 1, price: 1, category: 1});
        res.json(orders);
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
