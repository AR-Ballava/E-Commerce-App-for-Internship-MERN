const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


const {
    register,
    verifyOTP,
    login
} = require("../controllers/authController");

router.post("/register", register);

router.post("/verify-otp", verifyOTP);

router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.post("/register", register);


router.get("/admin-test", protect, adminOnly, (req, res) => {
    res.json({
        message: "Welcome Admin"
    });
});

module.exports = router;