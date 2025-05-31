const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  productDiscount: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
  },

  customerEmail: {
    type: String,
    match: /.+\@.+\..+/,
  },

  customerPhone: {
    type: String,
    required: true,
  },

  productsBought: {
    type: [productSchema],
    required: true,
  },

  orderTotal: {
    type: Number,
  },

  paymentType: {
    type: String,
    enum: ["Cash", "UPI", "Other"],
    required: true,
  },

  orderStatus: {
    type: String,
    enum: ["pending", "delivered", "cancelled"],
    default: "pending",
  },

  address: {
    type: String,
    required: true,
  },

  instructions: {
    type: String,
  },

  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
