import React from "react";
import { Typography, Box } from "@mui/material";
import NotificationsMenu from "./Misc/NotificationsMenu";
import ProfileMenu from "./Misc/ProfileMenu";
import SearchUserDrawer from "./Misc/SearchUserDrawer";
import { ChatState } from "../Context/ChatProvider";
import SimpleSnackbar from "./Misc/SnackBar";
import axios from "axios";

const SideDrawer = () => {
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const [loadingChat, setLoadingChat] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  //code for accessChat function
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/chat`,
        { userId },
        config
      );

      console.log(data);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (Err) {
      setOpenSnackbar(true);
      setLoadingChat(false);
    }
  };

  return (
    <>
      <SimpleSnackbar
        text="error fetching the chat"
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "5px 10px 5px 10px",
          borderWidth: "5px",
        }}
      >
        <SearchUserDrawer accessChat={accessChat} loadingChat={loadingChat} />
        <Typography variant="h3">Chats</Typography>
        <Box style={{ display: "flex" }}>
          <NotificationsMenu />
          <ProfileMenu />
        </Box>
      </Box>
    </>
  );
};

export default SideDrawer;
