const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    passwordHash: {
        type: String
    },
    shoppingCartItems: {
        type: [Number]
    }
});

userSchema.set("toJSON", {
    transform: function(doc, returnedObj) {
        returnedObj.id = String(returnedObj._id);

        delete returnedObj.passwordHash;
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports = mongoose.model("User", userSchema);
