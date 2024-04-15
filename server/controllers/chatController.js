import asynchandler from "express-async-handler";
import ChatModel from "../models/chatModel.js";
import UserModel from "../models/userModel.js";

const accessChat = asynchandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400);
    throw new Error("UserId param not sent with the request");
  }

  let isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  // isChat = await UserModel.populate(isChat, {
  //   path: "latestMessage.sender",
  //   select: "name picture email",
  // });
  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name picture email",
    populate: {
      path: "picture",
      model: "Image",
    },
  });

  if (isChat.length > 0) {
    res.send(isChat);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createChat = await ChatModel.create(chatData);
      const fullChat = await ChatModel.findOne({
        _id: createChat._id,
      }).populate("users", "-password");
      res.status(200).send(fullChat);
    } catch (err) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asynchandler(async (req, res) => {
  try {
    ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await UserModel.populate(results, {
          path: "latestMessage.sender",
          select: "name picture email",
          populate: {
            path: "picture",
            model: "Image",
          },
        });

        results = await UserModel.populate(results, {
          path: "users",
          select: "-password",
          populate: {
            path: "picture",
            model: "Image",
          },
        });

        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const createGroupChat = asynchandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please fill all fields!" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    // const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
    //   .populate("users", "-password")
    //   .populate("groupAdmin", "-password");
    const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate({
        path: "users",
        select: "-password",
        populate: {
          path: "picture",
          model: "Image",
        },
      })
      // .populate("groupAdmin", "-password");
      .populate({
        path: "groupAdmin",
        select: "-password",
        populate: {
          path: "picture",
          model: "Image",
        },
      });

    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const renameGroup = asynchandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate({
      path: "users",
      select: "-password",
      populate: {
        path: "picture",
        model: "Image",
      },
    })
    .populate({
      path: "groupAdmin",
      select: "-password",
      populate: {
        path: "picture",
        model: "Image",
      },
    });

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not found!");
  } else {
    res.json(updatedChat);
  }
});

const addToGroup = asynchandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // const added = await ChatModel.findByIdAndUpdate(
  //   chatId,
  //   {
  //     $push: { users: userId },
  //   },
  //   { new: true }
  // )
  //   .populate("users", "-password")
  //   .populate("groupAdmin", "-password");

  const added = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate({
      path: "users",
      select: "-password",
      populate: {
        path: "picture",
        model: "Image",
      },
    })
    .populate({
      path: "groupAdmin",
      select: "-password",
      populate: {
        path: "picture",
        model: "Image",
      },
    });

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

const removeFromGroup = asynchandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // const removed = await ChatModel.findByIdAndUpdate(
  //   chatId,
  //   {
  //     $pull: { users: userId },
  //   },
  //   { new: true }
  // )
  //   .populate("users", "-password")
  //   .populate("groupAdmin", "-password");

  const removed = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate({
      path: "users",
      select: "-password",
      populate: {
        path: "picture",
        model: "Image",
      },
    })
    .populate({
      path: "groupAdmin",
      select: "-password",
      populate: {
        path: "picture",
        model: "Image",
      },
    });

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

export default {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
