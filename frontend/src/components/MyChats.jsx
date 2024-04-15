import React from "react";
import axios from "axios";
import SnackBar from "./Misc/SnackBar";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box, Typography, Stack } from "@mui/material";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./Misc/ChatLoading";
import { getSender } from "../config/ChatLogics";
import NewGroupDialog from "./Misc/NewGroupDialog";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = React.useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/chat`,
        config
      );
      console.log("setting chats to ------------>", data);
      setChats(data);
    } catch (error) {
      setOpenSnackbar(true);
    }
  };

  React.useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  //code related to new grp chat dialog
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Box
      style={{
        // display: selectedChat ? "none" : "flex",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3px",
        borderRadius: "0.2em",
        borderWidth: "1px",
        width: "45%",
      }}
    >
      <SnackBar
        text="Error: Failed to load the chats"
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <Box
        style={{
          padding: "3px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#302E2B",
        }}
      >
        <Typography variant="h4">MyChats</Typography>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          endIcon={<AddIcon />}
        >
          New Group
        </Button>
        <NewGroupDialog open={openModal} onClose={handleClose} />
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3px",
          background: "#302E2B",
          width: "100%",
          height: "90%",
          overflowY: "hidden",
          scrollbars: "none",
          marginTop: "0.5em",
        }}
      >
        {chats ? (
          <Stack
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
            style={{ overflowY: "scroll" }}
          >
            {console.log("chats is ", chats)}
            {Array.isArray(chats) &&
              chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  style={{
                    background: selectedChat === chat ? "#81B64C" : "#302E2B",
                    color: selectedChat === chat ? "white" : "black",
                    padding: "3px 2px",
                    borderRadius: "0.5em",
                    key: chat?._id,
                  }}
                >
                  <Typography>
                    {!chat?.isGroupChat
                      ? getSender(loggedUser, chat?.users)
                      : chat?.chatName}
                  </Typography>
                </Box>
              ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
