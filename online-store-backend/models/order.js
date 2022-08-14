const { default: mongoose } = require("mongoose");
const { getMissingFieldString } = require("../utils/helpers");

const orderedProductSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: [true, getMissingFieldString("quantity")],
        min: [1, "'quantity' field should be >= 1"]
    } 
}, {_id: false});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    products: [orderedProductSchema],
    date: {
        type: Date
    } 
});

orderSchema.set("toJSON", {
    transform: (doc, returnedObj) => {
        returnedObj.id = String(returnedObj._id);
        delete returnedObj._id;
        delete returnedObj.__v;
    }
})

module.exports = mongoose.model("Order", orderSchema);
