const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const Product = require("../models/OilProductModel");

router.post("/orderdata", async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      address,
      instructions,
      orderTotal,
      customerEmail,
      productsBought,
      paymentType = "Cash",
      orderDate
    } = req.body;

    // Validate and deduct stock
    for (const item of productsBought) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`,
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }
    }

    for (const item of productsBought) {
      const product = await Product.findById(item.productId);
      product.stock -= item.quantity;
      await product.save();
    }

    // Save new order as separate document
    await Order.create({
      customerName,
      customerPhone,
      address,
      instructions,
      customerEmail,
      productsBought,
      paymentType,
      orderTotal,
      orderStatus: "pending",
      orderDate
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error in /orderdata route:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});



router.post("/myOrderData", async (req, res) => {
  try {
    const { customerEmail } = req.body;

    if (!customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer email is required"
      });
    }

    const myOrderData = await Order.find({ customerEmail }).sort({ orderDate: -1 });

    if (!myOrderData || myOrderData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found"
      });
    }

    res.status(200).json({
      success: true,
      order_data: myOrderData
    });
  } catch (error) {
    console.error("Error in /myOrderData route:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


router.post("/update-order-status", async (req, res) => {
  const { orderId, orderStatus } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.post("/updateOrder", async (req, res) => {
  try {
    const { customerEmail, orderIndex, updatedOrder } = req.body;

    if (orderIndex === undefined || !customerEmail || !updatedOrder) {
      return res
        .status(400)
        .json({ success: false, message: "Missing parameters" });
    }

    const userOrderDoc = await Order.findOne({ customerEmail });
    if (!userOrderDoc) {
      return res
        .status(404)
        .json({ success: false, message: "User orders not found" });
    }

    // Validate orderIndex in range
    if (orderIndex < 0 || orderIndex >= userOrderDoc.productsBought.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order index" });
    }

    // Optional: check if order is editable (within 1 hour)
    const orderDate = new Date(userOrderDoc.productsBought[orderIndex].Order_Date);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (orderDate < oneHourAgo) {
      return res
        .status(400)
        .json({ success: false, message: "Order editing time expired" });
    }

    // Update the specific order in OrderData array
    userOrderDoc.OrderData[orderIndex] = updatedOrder;

    await userOrderDoc.save();

    res.json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
