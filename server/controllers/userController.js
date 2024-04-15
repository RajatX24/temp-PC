import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import ImageModel from "../models/imageModel.js";
import generateToken from "../config/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password || !pic) {
    res.status(400);
    throw new Error("Please enter all fields!");
  }

  const UserExists = await UserModel.findOne({ email });
  if (UserExists) {
    res.status(400);
    throw new Error("User already Exists!");
  }

  const profileImage = await ImageModel.create({
    image: pic,
  });

  if (!profileImage) {
    res.status(400);
    throw new Error("Failed to Store Image in DB!");
  }

  const user = await UserModel.create({
    name,
    email,
    password,
    picture: profileImage._id,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create User!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect username or password!");
  }
});

const allUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await UserModel.find(keyword)
    .find({
      _id: { $ne: req.user._id },
    })
    .populate("picture");
  res.send(users);
});

const getCurrentUserId = asyncHandler(async (req, res) => {
  res.send(req.user._id);
});

export default { registerUser, authUser, allUser, getCurrentUserId };
