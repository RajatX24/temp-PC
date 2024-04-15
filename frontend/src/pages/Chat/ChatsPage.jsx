import React from "react";
import { Box } from "@mui/material";
import MyChats from "../../components/MyChats.jsx";
import ChatBox from "../../components/ChatBox.jsx";
import { ChatState } from "../../Context/ChatProvider.jsx";
import SideDrawer from "../../components/ChatSideDrawer.jsx";

const ChatsPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = React.useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "90vh",
          padding: "10px",
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatsPage;
