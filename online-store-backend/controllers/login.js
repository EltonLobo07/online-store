const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");

router.post("/", async (req, res, next) => {
    const { email, password } = req.body;

    if (email === undefined || password === undefined)
        return res.status(400).json({error: "'email' or 'password' field missing in the request body."});

    try {
        const userArray = await User.find({email});
        
        if (userArray.length == 0) 
            return res.status(401).json({error: "The provided email is not present in the database"});

        const user = userArray[0];

        const isPasswordMatching = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordMatching)
            return res.status(401).json({error: "Provided password is incorrect"});

        const token = jwt.sign({email}, SECRET_KEY);

        res.json({token, email, shoppingCartItems: user.shoppingCartItems});
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
