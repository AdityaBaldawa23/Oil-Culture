const express = require('express');
const router = express.Router();
const CreateUser = require('../models/user');
const verifyToken = require('../Middleware/authMiddleware');

// Get user profile route with token verification
router.get("/", verifyToken, async (req, res) => {
    try {
        // Find the user by ID (from the token) and exclude the password field
        const user = await CreateUser.findById(req.user.id).select("-password");

        if (!user) {
            // If no user is found, return a 404 error
            return res.status(404).json({ error: "User Not Found" });
        }

        // If user is found, return the user data
        res.json(user);
    } catch (error) {
        console.log("Error Fetching user profile", error);
        // Return a 500 error for server issues
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
