const Order = require("../models/order");
const Product = require("../models/product");
const { getUserIfAuthorized, adminCheck } = require("../utils/middlewares");
const router = require("express").Router();
const { getErrorMsgObj, getMissingFieldString } = require("../utils/helpers");

router.post("/", getUserIfAuthorized, async (req, res, next) => {
    const orderLst = req.body.order;

    if (orderLst === undefined)
        return res.status(400).json(getErrorMsgObj(getMissingFieldString("order")));
        
    if (!Array.isArray(orderLst))
        return res.status(400).json(getErrorMsgObj(`'order' field should be a list, received type: ${typeof orderLst}`));

    if (orderLst.length === 0)
        return res.status(400).json(getErrorMsgObj("The order list has 0 items to order")); 

    try {
        const itemsToOrder = [];

        for (let itemNumber = 0; itemNumber < orderLst.length; itemNumber++)
        {
            const curItem = orderLst[itemNumber];

            if (!curItem.item)
                return res.status(400).json(getErrorMsgObj(getMissingFieldString("item")));
            
            if (curItem.quantity === undefined)
                return res.status(400).json(getErrorMsgObj(getMissingFieldString("quantity")));

            const item = await Product.findOne({_id: curItem.item});

            if (item === null)
                return res.status(400).json(getErrorMsgObj(`Item Id: ${curItem.item} was not found in the database`));

            itemsToOrder.push({item: curItem.item, quantity: curItem.quantity});
        }

        const newOrder = new Order({
            user: req.decodedLoginObj.id,
            items: itemsToOrder,
            date: new Date()
        });

        await newOrder.save();
        res.status(201).end();
    }
    catch(err) {
        next(err);
    }
});

router.get("/", getUserIfAuthorized, adminCheck, async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", {email: 1}).populate("items.item", {title: 1, price: 1, category: 1});
        res.json(orders);
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
