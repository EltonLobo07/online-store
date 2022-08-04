const logger = require("./logger");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");

function requestLoggerMiddleware(req, res, next) {
    logger.info(`method: ${req.method}, url: ${req.url}, body: ${JSON.stringify(req.body)}, authorization: ${req.get("Authorization")}`);

    next();
};

function unknownEndpointMiddleware(req, res) {
    res.status(404).json({error: "unknown endpoint"});
};

function errorHandlingMiddleware(err, req, res, next) {
    logger.error(err);

    next(err);
};

function getUserIfAuthorizedMiddleware(req, res, next) {
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


module.exports = {unknownEndpointMiddleware, errorHandlingMiddleware,
                  requestLoggerMiddleware, getUserIfAuthorizedMiddleware};
