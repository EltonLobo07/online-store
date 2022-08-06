const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");
const { getUserIfAuthorizedMiddleware, idMatchMiddleware } = require("../utils/middlewares");
const axios = require("axios");

router.post("/", async (req, res, next) => {
    const { email, password } = req.body;
    
    if (email === undefined || password === undefined)
        return res.status(400).json({error: "'email' or 'password' field missing in the request body."});
        // 400 status code - Bad request 

    try {
        const existingUser = await User.findOne({email});

        if (existingUser !== null)
            return res.status(400).json({error: "email should be unique. The provided email address is already present in the database."});

        const passwordHash = await bcrypt.hash(password, saltRounds = 10);
        const newUser = new User({email, passwordHash, shoppingCartItems: []});

        const savedNewUser = await newUser.save();
        res.status(201).send(savedNewUser);
    }
    catch(err) {
        next(err);
    }
});

router.post("/:userId/shoppingCartItems/", getUserIfAuthorizedMiddleware, idMatchMiddleware, async (req, res, next) => {
    const { productId } = req.body;

    if (productId === undefined)
        return res.status(400).json({error: "'productId' field missing"});

    try {
        const user = await User.findOne({email: req.decodedLoginObj.email});

        if (user === null)
            return res.status(400).json({error: "The provided email is not present in the database"});

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

router.get("/:userId/shoppingCartItems", getUserIfAuthorizedMiddleware, idMatchMiddleware, async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.decodedLoginObj.email}).populate("shoppingCartItems");

        if (user === null)
            return res.status(401).json({error: "The provided email didn't match any user from the database"});

        res.json(user.shoppingCartItems);
    }
    catch(err) {
        next(err);
    }
});

router.delete("/:userId/shoppingCartItems/:itemId", getUserIfAuthorizedMiddleware, idMatchMiddleware, async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.decodedLoginObj.email});

        if (user === null)
            return res.status(401).json({error: "The provided email didn't match any user from the database"});
        
        user.shoppingCartItems = user.shoppingCartItems.filter(item => String(item._id) !== req.params.itemId);
        await user.save();
        res.status(204).end();
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
