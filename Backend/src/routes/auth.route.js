import express from "express";
import { signup, getProfile } from "../controllers/auth.controller.js"; // Adjusted the path
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// User signup route
router.post("/signup", signup);

// Admin signup route (protected by adminRoute middleware)
router.post("/admin-signup", protectRoute, adminRoute);

// Profile routes
router.get("/profile", protectRoute, getProfile); // Get user profile
// Update user profile

export default router;
