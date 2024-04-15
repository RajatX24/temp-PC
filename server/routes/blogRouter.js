import express from "express";
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlogById,
  getBlogsByUserId,
} from "../controllers/blogController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllBlogs);
router.post("/newBlog", protect, createBlog);
router.get("/:id", protect, getBlogById);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlogById);
router.get("/myBlogs", protect, getBlogsByUserId);

export default router;
