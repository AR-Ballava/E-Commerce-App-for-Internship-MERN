const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};


// GET SINGLE PRODUCT
const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};


// CREATE PRODUCT (ADMIN)
const createProduct = async (req, res) => {
    try {

        const { name, description, price, category, stock } = req.body;

        let imageUrl = "";

        // upload image to cloudinary
        if (req.file) {

            const result = await cloudinary.uploader.upload_stream(
                { folder: "ecommerce_products" },
                async (error, result) => {

                    if (error) {
                        return res.status(500).json({
                            message: "Image upload failed"
                        });
                    }

                    imageUrl = result.secure_url;

                    const product = new Product({
                        name,
                        description,
                        price,
                        image: imageUrl,
                        category,
                        stock
                    });

                    const createdProduct = await product.save();

                    res.status(201).json(createdProduct);

                }
            );

            result.end(req.file.buffer);

        } else {

            return res.status(400).json({
                message: "Product image is required"
            });

        }

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};


// UPDATE PRODUCT (ADMIN)
const updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    // If new image uploaded
    if (req.file) {

      const result = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          { folder: "ecommerce_products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);

      });

      product.image = result.secure_url;

    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {

    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });

  }

};


// DELETE PRODUCT (ADMIN)
const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await product.deleteOne();

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};



//Search Product
const searchProducts = async (req, res) => {

  try {

    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const products = await Product.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json(products);

  } catch (error) {

    console.error("Search Error:", error);

    res.status(500).json({
        message: "Search failed"
    });

    }

};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};