const express = require("express");
const router = express.Router();

const Products = require("../../models/OilProductModel");
const Orders = require("../../models/Orders");

router.post("/addbill", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      instructions,
      paymentType,
      productsBought,
      orderTotal,
      orderStatus,
    } = req.body;

    if (
      !customerPhone ||
      !productsBought ||
      !orderTotal ||
      !paymentType ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new Orders({
      customerName,
      customerEmail,
      customerPhone,
      address,
      instructions,
      paymentType,
      productsBought,
      orderTotal,
      orderStatus,
    });

    await newOrder.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Bill created successfully",
        orderId: newOrder._id,
      });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const all = await Products.find(
      {},
      "_id productID productName productPrice productDiscount"
    );
    res.json(all);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error Fetching Products" });
  }
});


router.post('/addpro', async (req, res) => {
  try {
    const {
      productID,
      productName,
      productCategory,
      productPrice,
      originalPrice,        // Add this
      productDiscount,
      stock,
      productImages,
      productDescription,
      productSize,
      productRating,        // Add this
      reviewCount,          // Add this
      tags,                 // Add this
      isNew,                // Add this
      isBestseller          // Add this
    } = req.body;

    const newProduct = new Products({
      productID,
      productName,
      productCategory,
      productPrice,
      originalPrice,       // Add here
      productDiscount: productDiscount || 0,
      stock,
      productImages: productImages || [],
      productDescription,
      productSize,
      productRating: productRating || 0,    // Default if missing
      reviewCount: reviewCount || 0,        // Default if missing
      tags: tags || [],
      isNew: isNew || false,
      isBestseller: isBestseller || false
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ success: false, message: 'Failed to add product' });
  }
});

module.exports = router;
