const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String
    },

    category: {
        type: String
    },

    stock: {
        type: Number,
        default: 0
    }

},{ timestamps: true });

// TEXT INDEX FOR SEARCH
productSchema.index({
  name: "text",
  description: "text",
  category: "text"
});

module.exports = mongoose.model("Product", productSchema);