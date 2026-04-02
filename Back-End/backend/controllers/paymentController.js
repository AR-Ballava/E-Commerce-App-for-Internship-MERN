const razorpay = require("../config/razorpay");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

//Creaate Payment
exports.createPayment = async (req, res) => {
    try {

        const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let total = 0;

        const orderProducts = cart.products.map(item => {
            total += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            };
        });

        const order = await Order.create({
            user: req.user._id,
            products: orderProducts,
            totalAmount: total,
            paymentStatus: "pending",
            orderStatus: "processing"
        });

        const razorpayOrder = await razorpay.orders.create({
            amount: total * 100,
            currency: "INR",
            receipt: order._id.toString()
        });

        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        res.json({
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: total,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//Verify Payment
const crypto = require("crypto");

exports.verifyPayment = async (req, res) => {

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {

        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        order.paymentStatus = "paid";
        order.razorpayPaymentId = razorpay_payment_id;

        await order.save();

        await Cart.findOneAndDelete({ user: order.user });

        res.json({ message: "Payment successful" });

    } else {

        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (order) {
            order.paymentStatus = "failed";
            await order.save();
        }

        res.status(400).json({ message: "Payment verification failed" });
    }
};