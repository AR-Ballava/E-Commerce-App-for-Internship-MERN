const Order = require("../models/Order");
const Cart = require("../models/Cart");


// CREATE ORDER FROM CART
const createOrder = async (req, res) => {

  try {

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    let totalAmount = 0;

    const orderProducts = cart.products.map(item => {

      totalAmount += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      };

    });

    const order = new Order({

      user: req.user._id,
      products: orderProducts,
      totalAmount

    });

    await order.save();

    // Clear cart after order
    cart.products = [];
    await cart.save();

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// GET USER ORDERS
const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({ user: req.user._id })
      .populate("products.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// ADMIN GET ALL ORDERS
const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "name email");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// ADMIN UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.orderStatus = status;

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};


module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};