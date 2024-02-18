const express = require('express');
const { Blog, Admin } = require('../db');
const jwt = require('jsonwebtoken');
const { authenticateAdminJWT,admin_secretKey } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
    let { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });
    if (admin)
        res.status(403).send("Admin already exists");
    else {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        const token = jwt.sign({ username: username, role: 'admin' }, admin_secretKey);
        res.send({ 'msg': 'Admin created successfully!', token });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, admin_secretKey);
        res.send({ 'msg': 'Admin Logged in successfully!', token });
    }
    else
        res.status(403).send({ 'msg': 'Incorrect username or password!' });
});

router.get('/blogs', authenticateAdminJWT, async (req, res) => {
    const blogs = await Blog.find({},'title short imageLink');
    res.send(blogs);
});

router.post('/blogs/newBlog', authenticateAdminJWT, async (req, res) => {
    const blog = new Blog({_author:req.admin._id,...req.body});
    await blog.save();
    res.send({ 'msg': `Blog created successfully!`, id: blog.id });
});

router.get('/blogs/:id', authenticateAdminJWT, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    console.log(blog);
    res.send(blog);
})

router.put('/blogs/:id', authenticateAdminJWT, async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    if (blog) {
        res.send(`Blog updated successfully`);
    }
    else
        res.status(404).send({ 'msg': 'Blog not found!' });
});

router.delete('/blogs/:id', authenticateAdminJWT, async (req, res) => {
    const deleted =  await Blog.deleteOne({ _id: req.params.id })
    if (deleted) {
        res.send(`Blog deleted successfully`);
    }
    else
        res.status(404).send({ 'msg': 'Blog deletion unsuccessful!' });
});

router.get('/myBlogs', authenticateAdminJWT, async (req, res) => {
    const blogs = await Blog.find({ _author: req.admin._id });
    if(blogs)
        res.send(blogs);
    else
        res.send([])
});

module.exports=router;