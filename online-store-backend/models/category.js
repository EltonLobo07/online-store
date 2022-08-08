const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String
});

categorySchema.set("toJSON", {
    transform: (doc, returnedObj) => {
        returnedObj.id = String(returnedObj._id);
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports = mongoose.model("Category", categorySchema); 
