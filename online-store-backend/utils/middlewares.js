const logger = require("./logger");

function unknownEndpointMiddleware(req, res) {
    res.status(404).json({error: "unknown endpoint"});
};

function errorHandlingMiddleware(err, req, res, next) {
    logger.error(err);

    next(err);
};

module.exports = {unknownEndpointMiddleware, errorHandlingMiddleware};
