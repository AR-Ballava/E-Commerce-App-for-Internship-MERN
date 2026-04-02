const express = require("express");
const router = express.Router();

const { createPayment, verifyPayment } = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createPayment);

router.post("/verify", verifyPayment);

module.exports = router;