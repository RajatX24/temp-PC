const express = require('express');
const { User, Blog } = require('../db');
const jwt = require('jsonwebtoken');
const { authenticateUserJWT, user_secretKey } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user)
        res.status(403).send("User already exists");
    else {
        const newUser = User({ username, password });
        await newUser.save();
        const token = jwt.sign({ username, role: 'User' }, user_secretKey);
        res.send({ 'msg': 'user created successfully', token });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, user_secretKey);
        res.send({ msg: "user logged in successfully", token });
    }
    else
        res.status(403).send({ msg: "Invalid username or password" });
});

router.get('/me', authenticateUserJWT, (req, res) => {
    res.send({ 'username': req.user.username });
});

// router.get('/myBlogs', authenticateUserJWT, async (req, res) => {
//     const blogs = await Blog.find({ _author: req.user._id });
//     if(blogs)
//         res.send(blogs);
//     else
//         res.send([])
// });

// router.get('/blogsall', authenticateUserJWT, async (req, res) => {
//     console.log("reaching 1");
//     const blogs = await Blog.find();
//     console.log("reaching 2");
//     console.log(blogs)
//     res.send(blogs);
// })

router.get('/blogs', authenticateUserJWT, async (req, res) => {
    const blogs = await Blog.find({},'title short imageLink');
    res.send(blogs);
});

router.post('/blogs/newBlog', authenticateUserJWT, async (req, res) => {
    const blog = new Blog({_author:req.user._id,...req.body});
    await blog.save();
    res.send({ 'msg': `Blog created successfully!`, id: blog.id });
});

router.get('/blogs/:id', authenticateUserJWT, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    console.log(blog);
    res.send(blog);
})

router.put('/blogs/:id', authenticateUserJWT, async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    if (blog) {
        res.send(`Blog updated successfully`);
    }
    else
        res.status(404).send({ 'msg': 'Blog not found!' });
});

router.delete('/blogs/:id', authenticateUserJWT, async (req, res) => {
    const deleted =  await Blog.deleteOne({ _id: req.params.id })
    if (deleted) {
        res.send(`Blog deleted successfully`);
    }
    else
        res.status(404).send({ 'msg': 'Blog deletion unsuccessful!' });
});

router.get('/myBlogs', authenticateUserJWT, async (req, res) => {
    const blogs = await Blog.find({ _author: req.admin._id });
    if(blogs)
        res.send(blogs);
    else
        res.send([])
});

module.exports = router