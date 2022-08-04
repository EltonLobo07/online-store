const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");

function getToken(req) {
    const authorization = req.get("Authorization"); // Case insensitive match

    if (authorization && authorization.toLowerCase().startsWith("bearer"))
    {
        const token = authorization.slice(7);
        return token;
    }

    return null;
};

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

router.put("/addItem", async (req, res, next) => {
    const token = getToken(req);

    if (token === null)
        return res.status(401).json({error: "Missing token which should be passed through 'Authorization' header field of the request object"});
    
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, SECRET_KEY);    
    }
    catch(err) {
        next(err);
    } 

    const { productId } = req.body;

    if (productId === undefined)
        return res.status(400).json({error: "'productId' field missing"});

    try {
        const userArray = await User.find({email: decodedToken.email});

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

module.exports = router;
