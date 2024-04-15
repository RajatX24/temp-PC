import React from "react";
import { Skeleton, Stack } from "@mui/material";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton variant="rectangular" height={50} style={{ margin: "1px" }} />
      <Skeleton variant="rectangular" height={50} style={{ margin: "1px" }} />
      <Skeleton variant="rectangular" height={50} style={{ margin: "1px" }} />
      <Skeleton variant="rectangular" height={50} style={{ margin: "1px" }} />
      <Skeleton variant="rectangular" height={50} style={{ margin: "1px" }} />
      <Skeleton variant="rectangular" height={50} style={{ margin: "1px" }} />
      <Skeleton variant="rectangular" height={50} style={{ margin: "1px" }} />
    </Stack>
  );
};

export default ChatLoading;
