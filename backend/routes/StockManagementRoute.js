const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Product = require("../models/OilProductModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure 'uploads/' exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/add", upload.array("productImages", 5), async (req, res) => {
  try {
    const {
      productCategory,
      productName,
      productPrice,
      productSize,
      stock,
      productDescription,
      productDiscount,
      originalPrice,
      tags,
      isNew,
      isBestseller,
    } = req.body;

    const productData = {
      productCategory,
      productName,
      productPrice,
      productSize,
      stock,
      productDescription,
      productDiscount: productDiscount || 0,
      originalPrice,
      tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [],
      isNew: isNew === "true",
      isBestseller: isBestseller === "true",
      productImages: req.files ? req.files.map((file) => file.filename) : [],
    };

    // Auto-generate a unique productID (you can change this logic)
    productData.productID = "PID" + Date.now();

    const product = new Product(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully", product });
  } catch (error) {
    console.error("Error in adding product: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/display", async (req, res) => {
  try {
    const products = await Product.find({});

    const host = req.get("host"); 
    const protocol = req.protocol; 

    const productsWithFullImgURL = products.map((product) => {
      const prodObj = product.toObject();
      if (prodObj.img) {
        prodObj.img = `${protocol}://${host}/uploads/${prodObj.img}`;
      }
      return prodObj;
    });

    res.json(productsWithFullImgURL);
  } catch (error) {
    console.log("Error in displaying products: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.put(
  "/update/:id",
  upload.array("productImages", 5),
  async (req, res) => {
    try {
      const {
        productCategory,
        productName,
        productPrice,
        productSize,
        productRating,
        reviewCount,
        stock,
        productDescription,
        productDiscount,
        originalPrice,
        tags,
        isNew,
        isBestseller,
        existingImages, // Add this field from frontend
      } = req.body;

      const updateData = {
        productCategory,
        productName,
        productPrice,
        productSize,
        productRating,
        reviewCount,
        stock,
        productDescription,
        productDiscount: productDiscount || 0,
        originalPrice,
        tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [],
        isNew: isNew === "true" || isNew === true,
        isBestseller: isBestseller === "true" || isBestseller === true,
      };

      // ✅ Handle image logic
      if (req.files && req.files.length > 0) {
        updateData.productImages = req.files.map((file) => file.filename);
      } else if (existingImages) {
        updateData.productImages = JSON.parse(existingImages);
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: false, error: "Product not found" });
      }

      res.json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error in Updating product: ", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Product Deleted Succesfullyy",
    });
  } catch (error) {
    console.log("Error in Updating product: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/displayByID/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });
    res.json(product);
  } catch (error) {
    console.log("Error in displaying products: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
