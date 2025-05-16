const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  options: [
    {
      half: String,
      full: String
    }
  ],
  description: {
    type: String,
    required: true
  }
});

const FoodItem = mongoose.model('FoodItem', FoodItemSchema, 'food_item');

module.exports = FoodItem;