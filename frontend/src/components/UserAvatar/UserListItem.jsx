import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      style={{
        background: "#302E2B",
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "black",
        padding: "3px 2px",
        marginBottom: "2px",
        borderRadius: "2px",
      }}
    >
      <Avatar src={user?.picture?.image}>{user.name.slice(0, 1)}</Avatar>
      <Box>
        <Typography>{user.name}</Typography>
        <Typography variant="body2">
          <b>Email:</b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
