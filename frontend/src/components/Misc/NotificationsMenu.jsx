import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ChatState } from "../../Context/ChatProvider";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { notification, setNotification, setSelectedChat } = ChatState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <NotificationsIcon fontSize="large" />
        <span
          style={{
            display: notification.length > 0 ? "inline" : "none",
            backgroundColor: "red",
            color: "white",
            borderRadius: "6em",
            padding: "0.5em 1em",
          }}
        >
          {notification?.length}
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        {!notification.length ? (
          <MenuItem onClick={handleClose}>No New Messages</MenuItem>
        ) : (
          <>
            {notification.map((notif) => (
              <MenuItem
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                  handleClose();
                }}
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${notif.sender.name}`}
              </MenuItem>
            ))}
          </>
        )}
      </Menu>
    </div>
  );
}
