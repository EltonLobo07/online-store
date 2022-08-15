const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String,
        minLength: [3, "name should be at least 3 characters long"]
    },
    passwordHash: {
        type: String
    },
    shoppingCartProducts: {
        type: Map, 
        of: Number 
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
