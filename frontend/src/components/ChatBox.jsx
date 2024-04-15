import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@mui/material";
import SingleChat from "./SingleChat";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      style={{
        display: "flex",
        width: "45%",
        alignItems: "center",
        flexDirection: "column",
        padding: "3px",
        borderRadius: "0.5em",
        borderWidth: "2px",
        background: "#302E2B",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
