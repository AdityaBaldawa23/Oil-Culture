const express = require("express");
const router = express.Router();
const FoodItem = require("../models/foodItem");

router.get("/fooditems", async (req, res) => {
  try {
    const data = await FoodItem.find({});
    console.log("Fetched food items:", data); // 👈 ADD THIS
    res.json(data);
  } catch (error) {
    console.log("Error fetching foodItems:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;