import express from "express";
import userController from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const { registerUser, authUser, allUser, getCurrentUserId } = userController;
router.post("/signup", registerUser);
router.post("/login", authUser);
router.get("/allusers", protect, allUser);
router.get("/me", protect, getCurrentUserId);

export default router;
