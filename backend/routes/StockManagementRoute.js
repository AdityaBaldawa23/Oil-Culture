const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Product = require("../models/MangoProduct");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // ensure 'uploads/' exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({storage})


router.post("/add", upload.single("img"), async (req, res) => {
  try {
    const productData = {
      CategoryName: req.body.CategoryName,
      name: req.body.name,
      price: req.body.price,
      piecesPerBox: req.body.piecesPerBox,
      stock: req.body.stock,
      description: req.body.description,
      img: req.file ? req.file.filename : null, // image filename
    };

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

    // Add full URL to img field
    const host = req.get('host'); // e.g., localhost:5000
    const protocol = req.protocol; // http or https

    const productsWithFullImgURL = products.map(product => {
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


router.put("/update/:id", upload.single("img"), async (req, res) => {
  try {
    const updateData = {
      CategoryName: req.body.CategoryName,
      name: req.body.name,
      price: req.body.price,
      piecesPerBox: req.body.piecesPerBox,
      stock: req.body.stock,
      description: req.body.description,
    };

    // Only update image if a new file was uploaded
    if (req.file) {
      updateData.img = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "Product updated successfully",
      updated,
    });
  } catch (error) {
    console.log("Error in Updating product: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


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
    if(!product) return res.status(400).json({success: false, message: "Product Not Found"});
    res.json(product);
  } catch (error) {
    console.log("Error in displaying products: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;