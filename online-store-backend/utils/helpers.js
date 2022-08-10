function getErrorMsgObj(msg) {
    return {error: msg};
};

function getMissingFieldString(missingField) {
    return `'${missingField}' field missing in the request body`;
};

module.exports = {getErrorMsgObj, getMissingFieldString};
