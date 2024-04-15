import * as React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { ChatState } from "../../Context/ChatProvider";
import SimpleSnackbar from "./SnackBar";
import UserListItem from "../UserAvatar/UserListItem";
import { UserBadgeItem } from "../UserAvatar/UserBadgeItem";
import { Box } from "@mui/material";
import axios from "axios";

export default function NewGroupDialog(props) {
  const { onClose, open } = props;
  const [groupChatName, setGroupChatName] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user, chats, setChats } = ChatState();

  const handleSearch = async (search) => {
    setSearch(search);
    if (!search) return;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      setLoading(true);
      console.log("here");
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/allusers?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      setLoading(false);
      setSnackbarMessage("Search Failed!");
      setOpenSnackbar(true);
    }
  };

  const addUser = (user) => {
    if (selectedUsers.includes(user)) return;

    setSelectedUsers([...selectedUsers, user]);
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((usr) => usr._id !== user._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName) {
      setSnackbarMessage("Please enter group chat name!");
      setOpenSnackbar(true);
      return;
    }

    if (selectedUsers.length < 2) {
      setSnackbarMessage("Select atleast 2 members!");
      setOpenSnackbar(true);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      console.log("Reaching here///");
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((usr) => usr._id)),
        },
        config
      );

      setChats([data, ...chats]);
      setSnackbarMessage("Group created successfully!");
      setOpenSnackbar(true);
      setTimeout(() => onClose(), 3000);
    } catch (error) {
      setSnackbarMessage("Error creating group!");
      setOpenSnackbar(true);
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
        Create Group Chat
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="GroupName"
          variant="outlined"
          style={{ paddingBottom: "1em" }}
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Add Group Members"
          placeholder="e.g:John,Jane,Don"
          variant="outlined"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Box style={{ display: "flex" }}>
          {selectedUsers.map((user) => (
            <UserBadgeItem
              user={user}
              key={user._id}
              handleFunction={() => handleDelete(user)}
            />
          ))}
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          searchResults
            .slice(0, 4)
            .map((user) => (
              <UserListItem user={user} handleFunction={() => addUser(user)} />
            ))
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          Create Group
        </Button>
      </DialogActions>
      <SimpleSnackbar
        text={snackbarMessage}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
    </Dialog>
  );
}

NewGroupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
