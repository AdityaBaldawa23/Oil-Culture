const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')
const Product = require('../models/MangoProduct');
const { data } = require('react-router-dom');

router.get("/all-orders", async(req, res) => {
    try{
        const orders = await Order.find();

        if(!orders)
        {
            res.status(404).json({success: false, message: `Orders not found`});
        }

        res.json({success: true, data: orders});
    }
    catch(error)
    {
        console.log(`Error in fetchinf orders`, error);
        res.status(500).json({success: false, error: error.message});
    }
});

module.exports = router;