const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


// USER ROUTES
router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);


// ADMIN ROUTES
router.put("/status/:id", protect, adminOnly, updateOrderStatus);  // MOVE THIS UP
router.get("/", protect, adminOnly, getAllOrders);

module.exports = router;