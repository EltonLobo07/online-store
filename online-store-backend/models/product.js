const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        rate: {
            type: Number
        },
        count: {
            type: Number
        }
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
