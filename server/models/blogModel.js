import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    short: String,
    imageLink: String,
    _author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BlogModel = new mongoose.model("Blog", blogSchema);

export default BlogModel;
