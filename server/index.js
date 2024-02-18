const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const bodyparser = require('body-parser');
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');

const app = express();

app.use(bodyparser.json());

app.use(cors());
//use this when deployed to vercel!!!
// app.use(cors({
//     origin:["vercel-link"],
//     methods:["GET","POST","DELETE","PUT"],
//     credentials:true
// }));

app.use('/admin',adminRouter);
app.use('/user',userRouter);

//connecting to MongoDb
mongoose.connect("mongodb+srv://rajatshukla1000:WkAuCmEEfQPnlsZa@cluster0.jbnhbaa.mongodb.net/blog-website");

app.listen(3000, () => console.log('server listening at 3000'))