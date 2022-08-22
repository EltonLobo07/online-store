const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");
const { customValidator } = require("../utils/middlewares");
const { getErrorMsgObj } = require("../utils/helpers"); 

router.post("/", customValidator([[true, "string", "email"], [true, "string", "password"]]), async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userFromDB = await User.findOne({email});
        
        if (userFromDB === null) 
            return res.status(401).json(getErrorMsgObj("The provided email is not present in the database"));

        const isPasswordMatching = await bcrypt.compare(password, userFromDB.passwordHash);

        if (!isPasswordMatching)
            return res.status(401).json(getErrorMsgObj("The provided password is incorrect"));

        const userIdString = String(userFromDB._id);

        const token = jwt.sign({email, id: userIdString}, SECRET_KEY);

        res.json({token, id: userIdString, name: userFromDB.name});
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;
