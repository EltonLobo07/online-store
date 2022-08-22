function getErrorMsgObj(msg) {
    return {error: msg};
};

function getMissingFieldString(missingField) {
    return `'${missingField}' field missing in the request body`;
};

function getSmallLengthString(fieldName, numChars) {
    return `'${fieldName}' should be at least ${numChars} characters long`;
}

function createProductCheckArr() {
    // arr = [[isRequired, dataType, fieldName]]
    const arr = [[true, "string", "title"], 
                 [true, "number", "price"],
                 [false, "string", "description"],
                 [true, "string", "category"],
                 [false, "string", "image"]];

    return arr;
};

function createUserCheckArr() {
    const arr = [[true, "string", "email"],
                 [true, "string", "password"],
                 [true, "string", "name"],
                 [false, "string", "address"]];

    return arr;
}

module.exports = {getErrorMsgObj, getMissingFieldString, createProductCheckArr, createUserCheckArr, getSmallLengthString};
