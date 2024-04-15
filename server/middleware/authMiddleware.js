import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    //decodes the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, value) => {
      // console.log("decoded value -", value);

      if (err) {
        res.status(401);
        throw new Error(" Not authorized, token failed!");
      }
      req.user = await UserModel.findById(value.id).select("-password");
      // console.log("this user is-", req.user);
      next();
    });
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
