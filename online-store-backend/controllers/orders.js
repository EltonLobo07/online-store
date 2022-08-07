const Order = require("../models/order");
const { find } = require("../models/user");
const { getUserIfAuthorizedMiddleware } = require("../utils/middlewares");

const router = require("express").Router();

router.post("/", getUserIfAuthorizedMiddleware, async (req, res, next) => {
    if (req.body.order === undefined)
        return res.status(400).json({error: "'order' field missing in the request object"});
        
    if (req.body.order.length === 0)
        return res.status(400).json({error: "No item to order"});

    const items = req.body.order; 

    const newOrder = new Order({
        user: req.decodedLoginObj.id,
        items,
        date: new Date()
    });

    await newOrder.save();
    res.status(201).end();
});

router.get("/", async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", {email: 1}).populate("items.item", {title: 1, price: 1, category: 1});
        res.json(orders);
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
