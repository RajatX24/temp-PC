import jwt from "jsonwebtoken";
export const admin_secretKey = "Hope";
export const user_secretKey = "Faith";
import AdminModel from "../models/adminModel.js";
import UserModel from "../models/userModel.js";

export function authenticateAdminJWT(req, res, next) {
  console.log("hello admin");
  const token = req.get("Authorization");
  jwt.verify(token, admin_secretKey, async (err, value) => {
    if (err) {
      res.status(401).send({ msg: "unauthorized" });
    } else {
      const admin = await AdminModel.findOne({ username: value.username });
      if (admin) {
        req.admin = admin;
        next();
      } else res.status(401).send({ msg: "admin not found!" });
    }
  });
}

export function authenticateUserJWT(req, res, next) {
  const token = req.get("Authorization");
  jwt.verify(token, user_secretKey, async (err, value) => {
    if (err) res.status(401).send({ msg: "unauthorized" });
    else {
      const user = await UserModel.findOne({ username: value.username });
      if (user) {
        req.user = await UserModel.findOne({ username: value.username });
        next();
      } else res.status(401).send({ msg: "user not found!" });
    }
  });
}
