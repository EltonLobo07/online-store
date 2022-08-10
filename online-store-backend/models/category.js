const mongoose = require("mongoose");
const { getMissingFieldString } = require("../utils/helpers");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, getMissingFieldString("category")]
    }
});

categorySchema.set("toJSON", {
    transform: (doc, returnedObj) => {
        returnedObj.id = String(returnedObj._id);
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports = mongoose.model("Category", categorySchema); 
