const logger = require("./logger");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");
const User = require("../models/user");
const { getErrorMsgObj, getMissingFieldString } = require("./helpers");

function requestLogger(req, res, next) {
    logger.info(`method: ${req.method}, url: ${req.url}, body: ${JSON.stringify(req.body)}, isAuthHeaderPresent: ${Boolean(req.get("Authorization"))}`);

    next();
};

function unknownEndpointHandler(req, res) {
    res.status(404).json(getErrorMsgObj("Unknown endpoint"));
};

function errorHandler(err, req, res, next) {
    logger.error(err);

    if (err.name === "ValidationError")
        return res.status(400).json(getErrorMsgObj(err.message));

    if (err.name === "CastError")
        return res.status(400).json(getErrorMsgObj(err.message));

    next(err);
};

function getUserIfAuthorized(req, res, next) {
    const authorization = req.get("Authorization"); // Case insensitive match

    let token;

    if (authorization && authorization.toLowerCase().startsWith("bearer"))
        token = authorization.slice(7);

    if (token === undefined)
        return res.status(401).json({error: "Missing token which should be passed through 'Authorization' header field of the request object"});

    try {
        req.decodedLoginObj = jwt.verify(token, SECRET_KEY);  
        next();  
    }
    catch(err) {
        next(err);
    }
};

function adminCheck(req, res, next) {
    if (req.decodedLoginObj.email !== "admin@company.com")
        return res.status(401).json({error: "This route is only for the admin"});

    next();
};

function idMatchCheck(req, res, next) {
    if (req.params.userId && req.params.userId !== req.decodedLoginObj.id)
        return res.status(402).json({error: "Users can only access their own shopping cart"});

    next();
};

function emailAndPasswCheck(req, res, next) {
    const { email, password } = req.body;

    if (email === undefined)
        return res.status(400).json(getErrorMsgObj(getMissingFieldString("email")));
    
    if (password === undefined)
        return res.status(400).json(getErrorMsgObj(getMissingFieldString("password")));

    next();
};

async function getUser(req, res, next) {
    try {
        const user = await User.findOne({email: req.decodedLoginObj.email});

        if (user === null)
            return res.status(401).json(getErrorMsgObj("The provided email is not present in the database"));

        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
};

module.exports = {unknownEndpointHandler, errorHandler,
                  requestLogger, getUserIfAuthorized,
                  idMatchCheck, adminCheck, emailAndPasswCheck,
                  getUser};
