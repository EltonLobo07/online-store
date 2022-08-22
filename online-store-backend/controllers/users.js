const router = require("express").Router();
const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PASSWORD_LENGTH, NAME_LENGTH } = require("../utils/config");
const { getUserIfAuthorized, idMatchCheck, customValidator } = require("../utils/middlewares");
const axios = require("axios");
const { getErrorMsgObj, createUserCheckArr, getSmallLengthString } = require("../utils/helpers");

router.post("/", customValidator(createUserCheckArr()), async (req, res, next) => {
    const { email, password, name, address } = req.body;

    if (password.length < PASSWORD_LENGTH)
            return res.status(400).json(getErrorMsgObj(getSmallLengthString("password", PASSWORD_LENGTH)));

    if (name.length < NAME_LENGTH)
            return res.status(400).json(getErrorMsgObj(getSmallLengthString("name", NAME_LENGTH)));

    try {
        const existingUser = await User.findOne({email});

        if (existingUser !== null)
            return res.status(400).json(getErrorMsgObj("email should be unique. The provided email address is already present in the database"));

        const passwordHash = await bcrypt.hash(password, 10);

        const newUserObj = {email, passwordHash, name, shoppingCartProducts: {}};

        if (address)
            newUserObj.address = address;

        const newUser = new User(newUserObj);

        const savedNewUser = await newUser.save();
        res.status(201).json(savedNewUser);
    }
    catch(err) {
        next(err);
    }
});

router.post("/:userId/shoppingCartProducts/", getUserIfAuthorized, idMatchCheck, customValidator([[true, "string", "productId"]]), async (req, res, next) => {
    const { productId } = req.body;

    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});

        const product = await Product.findOne({_id: productId});

        if (product === null)
            return res.status(400).json(getErrorMsgObj("The provided productId is not present in the database"))

        if (user.shoppingCartProducts.get(productId) !== undefined)
            return res.status(200).end();

        user.shoppingCartProducts.set(productId, 1);
        
        await user.save();
        res.status(201).end();
    }
    catch(err) {
        next(err);
    }
});

router.get("/:userId/shoppingCartProducts/detailed", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});

        const shoppingCartProducts = user.shoppingCartProducts;

        const products = await Product.find();

        const result = [];

        for (let i = 0; i < products.length; i++)
        {
            const curProduct = products[i];

            const curProductIdString = String(curProduct._id);

            if (shoppingCartProducts.get(curProductIdString) !== undefined)
            {
                result.push({
                    product: {
                    id: curProductIdString, 
                    title: curProduct.title,
                    price: curProduct.price,
                    description: curProduct.description,
                    category: curProduct.category,
                    image: curProduct.image,
                    rating: curProduct.rating},
                    quantity: shoppingCartProducts.get(curProductIdString)
                });
            }
        }

        res.json(result);
    }
    catch(err) {
        next(err);
    }
});

router.get("/:userId/shoppingCartProducts", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});

        res.json(user.shoppingCartProducts);
    }
    catch(err) {
        next(err);
    }
});

router.delete("/:userId/shoppingCartProducts/:ProductId", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});
        user.shoppingCartProducts.delete(req.params.ProductId);

        await user.save();
        res.status(204).end();
    }
    catch(err) {
        next(err);
    }
});

router.delete("/:userId/shoppingCartProducts/", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});
        user.shoppingCartProducts = {};
        
        await user.save();
        res.status(204).end();
    }
    catch(err) {
        next(err);
    }
});

router.patch("/:userId/shoppingCartProducts/:productId", getUserIfAuthorized, idMatchCheck, customValidator([[true, "number", "quantity"]]), async (req, res, next) => {
    try {
        const quantityNum = Math.max(Math.floor(req.body.quantity), 0);

        const user = await User.findOne({_id: req.decodedLoginObj.id});

        const productId = req.params.productId;

        if (user.shoppingCartProducts.get(productId) === undefined)
            return res.status(400).json("The provided productId is not present in the database");
            
        user.shoppingCartProducts.set(productId, quantityNum);

        await user.save();
        res.json(quantityNum);
    }
    catch (err) {
        next(err);
    }
});

router.get("/:userId/shoppingCartProducts/:productId", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    const { productId } = req.params;

    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});

        if (user.shoppingCartProducts.get(productId) === undefined)
            return res.status(400).json(getErrorMsgObj("The provided productId is not present in the database"));

        res.json(user.shoppingCartProducts.get(productId));
    }
    catch (err) {
        next(err);
    }
});

router.get("/:userId/shoppingCartProducts/:productId/isProductPresent", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    const { productId } = req.params;

    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});

        return res.json(user.shoppingCartProducts.get(productId) !== undefined);
    }
    catch (err) {
        next(err);
    }
});

router.get("/:userId/address", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});

        return res.json(user.address);
    }
    catch(err) {
        next(err);
    }
});

router.put("/:userId/address", getUserIfAuthorized, idMatchCheck, customValidator([[true, "string", "address"]]), async (req, res, next) => {
    const { address } = req.body;

    try {
        const user = await User.findOne({_id: req.decodedLoginObj.id});

        user.address = address;
        await user.save();
        return res.status(204).end();
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
