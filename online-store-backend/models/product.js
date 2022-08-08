const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    image: String,
    rating: {
        rate: Number,
        count: Number
    }
});

productSchema.set("toJSON", {
    transform: (doc, returnedObj) => {
        returnedObj.id = String(returnedObj._id);

        delete returnedObj._id;
        delete returnedObj.__v;
    }
})

module.exports = mongoose.model("Product", productSchema);
