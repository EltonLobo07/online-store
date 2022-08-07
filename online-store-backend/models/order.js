const { default: mongoose } = require("mongoose");

const orderedItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number
    } 
}, {_id: false});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    items: [orderedItemSchema],
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
