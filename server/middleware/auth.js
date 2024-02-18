const jwt=require('jsonwebtoken');
const admin_secretKey = "Hope";
const user_secretKey = "Faith";
const {Admin,User} = require('../db/index')

function authenticateAdminJWT(req, res, next) {
    console.log("hello admin");
    const token = req.get('Authorization');
    jwt.verify(token, admin_secretKey, async(err, value) => {
        if (err){
            res.status(401).send({ msg: "unauthorized" });
        }
        else {
            const admin= await Admin.findOne({username:value.username});
            if(admin){
                req.admin = admin;
                next();
            }
            else
                res.status(401).send({ msg: "admin not found!" }); 
        }
    })
}

function authenticateUserJWT(req, res, next) {
    const token = req.get('Authorization');
    jwt.verify(token, user_secretKey, async(err, value) => {
        if (err)
            res.status(401).send({ msg: "unauthorized" });
        else {
            const user=await User.findOne({username:value.username});
            if(user){
                req.user = await User.findOne({username:value.username});
                next();
            }
            else
                res.status(401).send({ msg: "user not found!" });
        }
    })
}

module.exports={authenticateAdminJWT,authenticateUserJWT,admin_secretKey,user_secretKey};