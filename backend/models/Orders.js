const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    instructions: {
        type: String
    },
    OrderData: {
        type: Array,
        required: true
    },
    Order_Date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema);
