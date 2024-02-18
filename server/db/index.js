const mongoose = require('mongoose');

//create mongoose schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    myblogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    short:String,
    imageLink: String,
    _author:{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

//creating mongoose models

const User = new mongoose.model('User', userSchema);
const Admin = new mongoose.model('Admin', adminSchema);
const Blog = new mongoose.model('Blog', blogSchema);

module.exports = {User,Admin,Blog};