import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";

//the new imports
import blogRouter from "./routes/blogRouter.js";
import connectDB from "./config/db.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import dotenv from "dotenv";

const app = express();

app.use(bodyparser.json());

app.use(cors());
//use this when deployed to vercel!!!
// app.use(cors({
//     origin:["vercel-link"],
//     methods:["GET","POST","DELETE","PUT"],
//     credentials:true
// }));
dotenv.config();

//connects to the DB
connectDB();

//routes

//tmp stuff
import BlogModel from "./models/blogModel.js";
import { protect } from "./middleware/authMiddleware.js";
app.get("/user/blogs/", protect, async (req, res) => {
  console.log("i tried to run 1");
  const blogs = await BlogModel.find({}, "title short imageLink");
  if (blogs) res.send(blogs);
  else res.send([]);
});

app.get("/user/blogs/myBlogs", protect, async (req, res) => {
  console.log("i tried to run 2");
  const blogs = await BlogModel.find({ _author: req.user._id });
  if (blogs) res.send(blogs);
  else res.send([]);
});

app.use("/user/blogs", blogRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

const { notFound, errorHandler } = errorMiddleware;
//handles errors, if any
app.use(notFound);
app.use(errorHandler);

//gets the port to start the server at
const PORT = process.env.PORT || 5000;

app.use(notFound);

const server = app.listen(PORT, console.log(`server started on port ${PORT}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join room", (room) => {
    socket.join(room);
    console.log("user joined room" + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    console.log("message aaya", newMessageRecieved.content);
    var chat = newMessageRecieved.chat;
    if (!chat.users) return;

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;

      console.log(user._id, newMessageRecieved.sender._id);
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    try {
      socket.leave(userData._id);
    } catch (error) {
      console.log("failed to leave room!");
    }
  });
});
