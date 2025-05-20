const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const Product = require("../models/MangoProduct");
router.post("/orderdata", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      OrderData: orderData,
      Order_Date: orderDate,
      email,
      fullName,
      phone,
      address,
      instructions = "",
    } = req.body;

    // Check stock availability
    for (const item of orderData) {
      const product = await Product.findById(item.id).session(session);
      if (!product) {
        throw new Error(`Product ${item.id} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }
    }

    // Deduct stock
    for (const item of orderData) {
      const product = await Product.findById(item.id).session(session);
      product.stock -= item.quantity;
      await product.save({ session });
    }

    const newOrder = {
      Order_Date: orderDate,
      items: orderData,
      status: "pending",
    };

    let existingUser = await Order.findOne({ email }).session(session);

    if (!existingUser) {
      await Order.create(
        [
          {
            email,
            fullName,
            phone,
            address,
            instructions,
            OrderData: [newOrder],
            Order_Date: orderDate,
          },
        ],
        { session }
      );
    } else {
      await Order.findOneAndUpdate(
        { email },
        {
          $push: { OrderData: newOrder },
          ...(fullName && { fullName }),
          ...(phone && { phone }),
          ...(address && { address }),
          instructions,
        },
        { new: true, session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in /orderdata route:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post("/myOrderData", async (req, res) => {
  try {
    const myOrderData = await Order.findOne({ email: req.body.email });
    if (!myOrderData) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }
    res.json({ order_data: myOrderData.OrderData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/processOrder", async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === "processed") {
      return res.status(400).json({ success: false, message: "Order already processed" });
    }

    // Combine items from all orders inside OrderData
    let allItems = [];
    for (const singleOrder of order.OrderData) {
      if (singleOrder.items && Array.isArray(singleOrder.items)) {
        allItems = allItems.concat(singleOrder.items);
      }
    }

    // Mark the whole order as processed
    order.status = "processed";
    await order.save();

    res.json({ success: true, message: "Order processed successfully" });

  } catch (error) {
    console.error("Error in processOrder:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/updateOrder", async (req, res) => {
  try {
    const { email, orderIndex, updatedOrder } = req.body;

    if (orderIndex === undefined || !email || !updatedOrder) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const userOrderDoc = await Order.findOne({ email });
    if (!userOrderDoc) {
      return res.status(404).json({ success: false, message: "User orders not found" });
    }

    // Validate orderIndex in range
    if (orderIndex < 0 || orderIndex >= userOrderDoc.OrderData.length) {
      return res.status(400).json({ success: false, message: "Invalid order index" });
    }

    // Optional: check if order is editable (within 1 hour)
    const orderDate = new Date(userOrderDoc.OrderData[orderIndex].Order_Date);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (orderDate < oneHourAgo) {
      return res.status(400).json({ success: false, message: "Order editing time expired" });
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
