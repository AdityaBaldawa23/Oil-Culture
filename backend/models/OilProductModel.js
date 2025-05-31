const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
    unique: true,
  },

  productName: {
    type: String,
    required: true,
  },

  productCategory: {
    type: String,
    required: true,
  },

  productPrice: {
    type: Number,
    required: true,
  },

  productDiscount: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    required: true,
  },

  productImages: {
    type: [String],
    default: [],
  },

  productDescription: {
    type: String,
  },

  productSize: {
    type: Number,
    required: true,
  },

  productRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  reviewCount: {
    type: Number,
    default: 0,
  },
  
  tags: {
    type: [String],
    default: [],
  },
  
  isNew: {
    type: Boolean,
    default: false,
  },
  
  isBestseller: {
    type: Boolean,
    default: false,
  },
  
  originalPrice: {
    type: Number, // For showing crossed-out original price when there's a discount
  },
});

module.exports = mongoose.model("Products", productSchema);
