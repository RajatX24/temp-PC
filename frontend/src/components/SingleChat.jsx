import React from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UpdateGroupChatDialog from "./Misc/UpdateGroupChatDialog";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./Misc/ProfileModal";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import SimpleSnackbar from "./Misc/SnackBar";
import ScrollableMessages from "./Misc/ScrollableMessages";
import io from "socket.io-client";
import Lottie from "react-lottie";
import LoadingAnimation from "../animations/LoadingAnimation.json";

import "./SingleChat.css";

const ENDPOINT = import.meta.env.VITE_SERVER_URL;

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [socketConnected, setSocketConnected] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    // typing indicator logic here
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timenow = new Date().getTime();
      var timediff = timenow - lastTypingTime;
      if (timediff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const handleSendMessage = async () => {
    socket.emit("stop typing", selectedChat._id);
    if (!newMessage) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setNewMessage("");

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/message`,
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      socket.emit("new message", data);
      console.log("got message!", data);
      setMessages([...messages, data]);
    } catch (error) {
      setSnackbarMessage("Error occured while sending message");
      setSnackbarOpen(true);
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/message/${selectedChat._id}`,
        config
      );

      console.log(data);
      setMessages(data);
      socket.emit("join room", selectedChat._id);
      setLoading(false);
    } catch (error) {
      setSnackbarMessage("Error occured while fetching messages");
      setSnackbarOpen(true);
    }
  };

  React.useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  React.useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  React.useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log("naya msg aaya:", newMessageRecieved);
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification

        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        if (!messages.includes(newMessageRecieved))
          setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <>
      {!selectedChat ? (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#302E2B",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography variant="h6">Select a user to start chatting</Typography>
        </Box>
      ) : (
        <>
          <Typography
            variant="h6"
            style={{
              padding: "2px 3px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            ></Button>
            {!selectedChat.isGroupChat ? (
              <>
                <Typography variant="h6">
                  {getSender(user, selectedChat.users)}
                </Typography>
                <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                ></ProfileModal>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatDialog
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                ></UpdateGroupChatDialog>
              </>
            )}
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: loading ? "center" : "flex-end",
              alignItems: loading ? "center" : "none",
              padding: "3px",
              background: "#373634",
              width: "95%",
              height: "80%",
              borderRadius: "0.5em",
              overflowY: "hidden",
              margin: "1em",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Box
                style={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
              >
                <ScrollableMessages messages={messages} />
              </Box>
            )}
            {isTyping ? (
              <div>
                <Lottie width={70} options={defaultOptions} />
              </div>
            ) : (
              <></>
            )}
            <Box
              style={{
                display: "flex",
              }}
            >
              <TextField
                id="outlined-basic"
                placeholder="Enter message to send"
                variant="outlined"
                onChange={typingHandler}
                value={newMessage}
                style={{
                  width: "90%",
                  color: "black",
                }}
              />
              <Button
                style={{ backgroundColor: "#80b54c" }}
                onClick={handleSendMessage}
                variant="contained"
              >
                Send
                <SendIcon />
              </Button>
            </Box>
            <SimpleSnackbar
              text={snackbarMessage}
              open={snackbarOpen}
              setOpen={setSnackbarOpen}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;
