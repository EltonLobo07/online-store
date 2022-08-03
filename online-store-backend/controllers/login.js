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
        const exisitingUser = await User.find({email});
        
        if (exisitingUser.length == 0) 
            return res.status(401).json({error: "The provided email is not present in the database"});

        const isPasswordMatching = await bcrypt.compare(password, exisitingUser[0].passwordHash);

        if (!isPasswordMatching)
            return res.status(401).json({error: "Provided password is incorrect"});

        const token = jwt.sign({email}, SECRET_KEY);

        res.json({token});
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
