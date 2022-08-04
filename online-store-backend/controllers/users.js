const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");
const { getUserIfAuthorizedMiddleware } = require("../utils/middlewares");
const axios = require("axios");

router.post("/", async (req, res, next) => {
    const { email, password } = req.body;
    
    if (email === undefined || password === undefined)
        return res.status(400).json({error: "'email' or 'password' field missing in the request body."});
        // 400 status code - Bad request 

    try {
        const existingUser = await User.find({email});

        if (existingUser.length)
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

router.put("/shoppingCartItems", getUserIfAuthorizedMiddleware, async (req, res, next) => {
    const { productId } = req.body;

    if (productId === undefined)
        return res.status(400).json({error: "'productId' field missing"});

    try {
        const userArray = await User.find({email: req.decodedLoginObj.email});

        if (userArray.length == 0)
            return res.status(400).json({error: "The provided email is not present in the database"});

        const user = userArray[0];

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

router.get("/shoppingCartItems", getUserIfAuthorizedMiddleware, async (req, res, next) => {
    try {
        const userArray = await User.find({email: req.decodedLoginObj.email});

        if (userArray.length === 0)
            return res.status(401).json({error: "The provided email didn't match any user from the database"});
        
        const user = userArray[0];

        const shoppingCartItems = [];

        for (let i = 0; i < user.shoppingCartItems.length; i++)
        {
            const response = await axios.get(`https://fakestoreapi.com/products/${user.shoppingCartItems[i]}`);
            const item = response.data;
            shoppingCartItems.push(item);
        }

        res.json(shoppingCartItems);
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
