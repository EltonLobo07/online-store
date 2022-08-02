const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

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
        const newUser = new User({email, passwordHash});

        const savedNewUser = await newUser.save();
        res.status(201).send(savedNewUser);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
