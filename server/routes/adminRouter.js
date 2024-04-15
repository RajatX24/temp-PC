import express from "express";
// const { Blog, Admin } = require("../db");
import BlogModel from "../models/blogModel.js";
import AdminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import {
  authenticateAdminJWT,
  admin_secretKey,
} from "../middleware/Deprecated-auth.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  const admin = await Admin.findOne({ username: username });
  if (admin) res.status(403).send("Admin already exists");
  else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign(
      { username: username, role: "admin" },
      admin_secretKey
    );
    res.send({ msg: "Admin created successfully!", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, admin_secretKey);
    res.send({ msg: "Admin Logged in successfully!", token });
  } else res.status(403).send({ msg: "Incorrect username or password!" });
});

router.get("/blogs", authenticateAdminJWT, async (req, res) => {
  const blogs = await BlogModel.find({}, "title short imageLink");
  res.send(blogs);
});

router.post("/blogs/newBlog", authenticateAdminJWT, async (req, res) => {
  const blog = new BlogModel({ _author: req.admin._id, ...req.body });
  await blog.save();
  res.send({ msg: `BlogModel created successfully!`, id: blog.id });
});

router.get("/blogs/:id", authenticateAdminJWT, async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  console.log(blog);
  res.send(blog);
});

router.put("/blogs/:id", authenticateAdminJWT, async (req, res) => {
  const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body);
  if (blog) {
    res.send(`Blog updated successfully`);
  } else res.status(404).send({ msg: "Blog not found!" });
});

router.delete("/blogs/:id", authenticateAdminJWT, async (req, res) => {
  const deleted = await BlogModel.deleteOne({ _id: req.params.id });
  if (deleted) {
    res.send(`Blog deleted successfully`);
  } else res.status(404).send({ msg: "Blog deletion unsuccessful!" });
});

router.get("/myBlogs", authenticateAdminJWT, async (req, res) => {
  const blogs = await BlogModel.find({ _author: req.admin._id });
  if (blogs) res.send(blogs);
  else res.send([]);
});

export default router;
