const mongoose = require('mongoose');

const FoodCategorySchema = new mongoose.Schema({
    productCategory:{
        type: String,
        required: true
    }
});

const FoodCategory = mongoose.model('FoodCategory', FoodCategorySchema, 'food_category');

module.exports = FoodCategory;