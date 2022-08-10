const router = require("express").Router();
const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, PASSWORD_LENGTH } = require("../utils/config");
const { getUserIfAuthorized, idMatchCheck, emailAndPasswCheck, getUser } = require("../utils/middlewares");
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
        const newUser = new User({email, passwordHash, shoppingCartItems: []});

        const savedNewUser = await newUser.save();
        res.status(201).json(savedNewUser);
    }
    catch(err) {
        next(err);
    }
});

router.post("/:userId/shoppingCartItems/", getUserIfAuthorized, idMatchCheck, getUser, async (req, res, next) => {
    const { productId } = req.body;

    if (productId === undefined)
        return res.status(400).json(getErrorMsgObj(getMissingFieldString("productId")));

    try {
        const user = req.user;

        const product = await Product.findOne({_id: productId});

        if (product === null)
            return res.status(400).json(getErrorMsgObj("The provided productId is not present in the database"))

        if (user.shoppingCartItems.includes(productId))
            return res.status(200).end();
        
        user.shoppingCartItems.push(productId);
        await user.save();
        res.status(201).end();
    }
    catch(err) {
        next(err);
    }
});

router.get("/:userId/shoppingCartItems", getUserIfAuthorized, idMatchCheck, async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.decodedLoginObj.email}).populate("shoppingCartItems", {title: 1, price: 1});

        if (user === null)
            return res.status(401).json(getErrorMsgObj("The provided email is not present in the database"));

        res.json(user.shoppingCartItems);
    }
    catch(err) {
        next(err);
    }
});

router.delete("/:userId/shoppingCartItems/:itemId", getUserIfAuthorized, idMatchCheck, getUser, async (req, res, next) => {
    try {
        const user = req.user;
        const itemId = req.params.itemId;
        user.shoppingCartItems = user.shoppingCartItems.filter(item => String(item._id) !== itemId);
        await user.save();
        res.status(204).end();
    }
    catch(err) {
        next(err);
    }
});

router.delete("/:userId/shoppingCartItems/", getUserIfAuthorized, idMatchCheck, getUser, async (req, res, next) => {
    try {
        const user = req.user;
        user.shoppingCartItems = [];
        await user.save();
        res.status(204).end();
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
