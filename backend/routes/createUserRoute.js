const express = require("express");
const router = express.Router();
const CreateUser = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const jwtsecret = "Mynameisaditya";
router.post(
  "/CreateUser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password, salt);

    try {
      const { name, location, email, password, phone } = req.body;

      await CreateUser.create({
        name,
        location,
        email,
        password: secpassword,
        phone,
      });

      return res.json({ success: true });
    } catch (error) {
      console.error("Error fetching UserDetails:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.post("/LoginUser", async (req, res) => {
  const { email, password } = req.body;

  try {
    let userData = await CreateUser.findOne({ email });

    if (!userData) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    const pwdCompare = await bcrypt.compare(password, userData.password);
    if (!pwdCompare) {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect password" });
    }

    const data = {
      user: {
        id: userData.id,
      },
    };
    const authToken = jwt.sign(data, jwtsecret);
    return res.json({
      success: true,
      authToken: authToken,
      user: {
        email: userData.email,
        name: userData.name,
        role: userData.role || "user",
      },
    });
  } catch (error) {
    console.error("Error during LoginUser:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
