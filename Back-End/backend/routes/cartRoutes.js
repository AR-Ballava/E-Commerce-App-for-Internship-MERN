const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");


// ADD PRODUCT
router.post("/add", protect, addToCart);

// GET CART
router.get("/", protect, getCart);

// REMOVE PRODUCT
router.delete("/remove/:productId", protect, removeFromCart);

// UPDATE QUANTITY
router.put("/update", protect, updateCartQuantity);

module.exports = router;