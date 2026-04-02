const Cart = require("../models/Cart");
const Product = require("../models/Product");


// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {

      cart = new Cart({
        user: req.user._id,
        products: []
      });

    }

    const productIndex = cart.products.findIndex(
      p => p.product.toString() === productId
    );

    if (productIndex > -1) {

      cart.products[productIndex].quantity += quantity;

    } else {

      cart.products.push({
        product: productId,
        quantity
      });

    }

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};



// GET USER CART
const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("products.product");

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};



// REMOVE PRODUCT FROM CART
const removeFromCart = async (req, res) => {

  try {

    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.products = cart.products.filter(
      p => p.product.toString() !== productId
    );

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};



// UPDATE QUANTITY
const updateCartQuantity = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const productIndex = cart.products.findIndex(
      p => p.product.toString() === productId
    );

    if (productIndex > -1) {

      cart.products[productIndex].quantity = quantity;

    }

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};


module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity
};