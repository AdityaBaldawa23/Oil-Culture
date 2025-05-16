const express = require('express');
const router = express.Router();
const FoodCategory = require('../models/foodCategory');

router.get("/food-category", async(req,res) =>{
    try{
        const data = await FoodCategory.find({});
        console.log("Fetched Category is:",data);
        res.json(data);
    }catch(error){
        console.log("Error Fetching foodCategories:", error);
        res.status(500).json({error: "Internal server error"});
    }
})

module.exports = router;