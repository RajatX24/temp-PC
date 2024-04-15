import BlogModel from "../models/blogModel.js";

export const getAllBlogs = async (req, res) => {
  // const blogs = await BlogModel.find({}, "title short imageLink");
  // res.send(blogs);
  res.send([]);
};

export const createBlog = async (req, res) => {
  try {
    const blog = new BlogModel({ _author: req.user._id, ...req.body });
    await blog.save();
    res.send({ msg: `Blog created successfully!`, id: blog.id });
  } catch (error) {
    console.log("error while creating blog");
    console.log(error.message);
  }
};

export const getBlogById = async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  console.log(blog);
  res.send(blog);
};

export const updateBlog = async (req, res) => {
  const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body);
  if (blog) {
    res.send(`Blog updated successfully`);
  } else res.status(404).send({ msg: "Blog not found!" });
};

export const deleteBlogById = async (req, res) => {
  const deleted = await BlogModel.deleteOne({ _id: req.params.id });
  if (deleted) {
    res.send(`Blog deleted successfully`);
  } else res.status(404).send({ msg: "Blog deletion unsuccessful!" });
};

export const getBlogsByUserId = async (req, res) => {
  // const blogs = await BlogModel.find({ _author: req.user._id });
  // if (blogs) res.send(blogs);
  // else res.send([]);
  res.send([]);
};
