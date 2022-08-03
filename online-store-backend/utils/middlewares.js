const logger = require("./logger");

function requestLoggerMiddleware(req, res, next) {
    logger.info(`method: ${req.method}, url: ${req.url}, body: ${JSON.stringify(req.body)}`);

    next();
};

function unknownEndpointMiddleware(req, res) {
    res.status(404).json({error: "unknown endpoint"});
};

function errorHandlingMiddleware(err, req, res, next) {
    logger.error(err);

    next(err);
};

module.exports = {unknownEndpointMiddleware, errorHandlingMiddleware, requestLoggerMiddleware};
