import expressAsyncHandler from "express-async-handler";
import MessageModel from "../models/messageModel.js";
import UserModel from "../models/userModel.js";
import ChatModel from "../models/chatModel.js";

export const sendMessage = expressAsyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    res.status(400);
    throw new Error("Sender or body missing!");
  }

  var newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    var message = await MessageModel.create(newMessage);

    message = await message.populate("sender", "name picture");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name picture email",
      populate: {
        path: "picture",
        model: "Image",
      },
    });

    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const allMessage = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await MessageModel.find({ chat: req.params.chatId })
      .populate({
        path: "sender",
        select: "name picture email",
        populate: {
          path: "picture",
          model: "Image",
        },
      })
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
