const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderdata', async (req, res) => {
  try {
    let orderData = req.body.OrderData; // array of items per order
    let orderDate = req.body.Order_Date; // string or date
    let email = req.body.email;
    let fullName = req.body.fullName;
    let phone = req.body.phone;
    let address = req.body.address;
    let instructions = req.body.instructions || "";

    // Add the Order_Date inside the order array itself (each order has date & items)
    // Assuming req.body.OrderData is an array of items for this order
    const newOrder = {
      Order_Date: orderDate,
      items: orderData
    };

    let existingUser = await Order.findOne({ email });

    if (!existingUser) {
      // Create new user order document with details and first order
      await Order.create({
        email,
        fullName,
        phone,
        address,
        instructions,
        OrderData: [newOrder],
        Order_Date: orderDate  // Can keep date of first order here
      });
    } else {
      // Update existing document - push new order in OrderData
      // Also update fullName, phone, address, instructions if provided (optional)
      await Order.findOneAndUpdate(
        { email },
        {
          $push: { OrderData: newOrder },
          ...(fullName && { fullName }),
          ...(phone && { phone }),
          ...(address && { address }),
          instructions // update even if empty string
        },
        { new: true }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error in /orderdata route:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/myOrderData', async (req, res) => {
    try {
        const myOrderData = await Order.findOne({ email: req.body.email });
        if (!myOrderData) {
            return res.status(404).json({ success: false, message: 'No orders found' });
        }
        res.json({ order_data: myOrderData.OrderData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;