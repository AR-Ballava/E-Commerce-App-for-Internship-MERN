const cron = require("node-cron");
const Order = require("../models/Order");

const cleanupFailedOrders = () => {

  cron.schedule("*/10 * * * *", async () => {

    try {

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      const result = await Order.deleteMany({
        paymentStatus: "failed",
        createdAt: { $lt: oneHourAgo }
      });

      console.log(`Deleted ${result.deletedCount} failed orders`);

    } catch (error) {
      console.error("Cleanup job error:", error);
    }

  });

};

module.exports = cleanupFailedOrders;