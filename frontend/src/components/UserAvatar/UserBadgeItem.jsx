import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";

export const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      style={{
        padding: "2px 1px",
        borderRadius: "0.5em",
        margin: "1px",
        backgroundColor: "#81B64C",
      }}
      onClick={handleFunction}
    >
      <Typography variant="body">
        <b>{user.name}</b>
      </Typography>
      <CloseIcon style={{ paddingLeft: "2px" }} />
    </Box>
  );
};
