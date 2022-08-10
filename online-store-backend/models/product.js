const mongoose = require("mongoose");
const { getMissingFieldString } = require("../utils/helpers");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, getMissingFieldString("title")]
    },
    price: {
        type: Number,
        required: [true, getMissingFieldString("price")]
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    image: {
        type: String,
        default: ""
    },
    rating: {
        rate: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
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
