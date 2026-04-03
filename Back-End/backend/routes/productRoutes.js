const express = require("express");
const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { searchProducts } = require("../controllers/productController");

const upload = require("../middleware/uploadMiddleware");


// PUBLIC ROUTES
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);


// ADMIN ROUTES
router.post("/", protect, adminOnly, upload.single("image"), createProduct);
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);


module.exports = router;