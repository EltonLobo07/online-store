const router = require("express").Router();
const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, PASSWORD_LENGTH } = require("../utils/config");
const { getUserIfAuthorized, idMatchCheck, emailAndPasswCheck } = require("../utils/middlewares");
const axios = require("axios");
const { getErrorMsgObj, getMissingFieldString } = require("../utils/helpers");

router.post("/", emailAndPasswCheck, async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (password.length < PASSWORD_LENGTH)
            return res.status(400).json(getErrorMsgObj(`Password should be at least ${PASSWORD_LENGTH} characters long`));

        const existingUser = await User.findOne({email});

        if (existingUser !== null)
            return res.status(400).json(getErrorMsgObj("email should be unique. The provided email address is already present in the database"));

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({email, passwordHash, shoppingCartProducts: {}});

        const savedNewUser = await newUser.save();
        res.status(201).json(savedNewUser);
    }
    catch(err) {
        next(err);
    }
});

router.post("/:userId/shoppingCartProducts/", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    const { productId } = req.body;

    if (productId === undefined)
        return res.status(400).json(getErrorMsgObj(getMissingFieldString("productId")));

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

            if (shoppingCartProducts.get(String(curProduct._id)) !== undefined)
                result.push(curProduct);
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

router.patch("/:userId/shoppingCartProducts/:productId", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    try {
        const quantityStr = req.body.quantity;

        if (quantityStr === undefined)
            return res.status(400).json(getErrorMsgObj(getMissingFieldString("quantity")));

        let quantityNum = Number(quantityStr);

        if (isNaN(quantityNum))
            return res.status(400).json(getErrorMsgObj("'quantity' field should contain an integer value"));

        quantityNum = Math.max(Math.floor(quantityNum), 0);

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

module.exports = router;
