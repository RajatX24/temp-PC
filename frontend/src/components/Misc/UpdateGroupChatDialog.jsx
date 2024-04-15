import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import {
  Box,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { ChatState } from "../../Context/ChatProvider";
import { UserBadgeItem } from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import LoadingButton from "@mui/lab/LoadingButton";
import SimpleSnackbar from "./SnackBar";
import axios from "axios";

function SimpleDialog(props) {
  const { onClose, open, fetchAgain, setFetchAgain } = props;
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [grpChatNm, setGrpChatNm] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [renameLoading, setRenameLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleClose = () => {
    onClose();
  };

  const addUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      setSnackbarMessage("User Already in the group!");
      setSnackbarOpen(true);
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      setSnackbarMessage("Only Admin can add someone!");
      setSnackbarOpen(true);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      setSnackbarMessage("User added to group successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error adding user to group");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };
  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      setSnackbarMessage("Only Admin can remove someone!");
      setSnackbarOpen(true);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
      setSnackbarMessage("User removed from group successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error removing user to group");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };
  const handleRename = async () => {
    if (!grpChatNm) return;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    setRenameLoading(true);

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: grpChatNm,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      setSnackbarMessage("Failed to Rename the Group");
      setSnackbarOpen(true);
      setRenameLoading(false);
    }

    setGrpChatNm("");
  };

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
      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{selectedChat.chatName}</DialogTitle>
      <DialogContent>
        <Box
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            paddingBottom: "3px",
          }}
        >
          {selectedChat.users.map((u) => (
            <UserBadgeItem
              key={user._id}
              user={u}
              handleFunction={() => handleRemove(u)}
            />
          ))}
        </Box>
        <Box
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            paddingBottom: "3px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="New Group Name"
            onChange={(e) => setGrpChatNm(e.target.value)}
            variant="outlined"
            size="small"
          />
          <LoadingButton
            loading={renameLoading}
            variant="contained"
            onClick={() => handleRename()}
          >
            Update
          </LoadingButton>
        </Box>
        <Box
          style={{
            display: "flex",
            width: "100%",
            height: "4em",
            flexWrap: "wrap",
            paddingBottom: "3px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search Users"
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
            size="small"
          />
          {loading ? (
            <CircularProgress />
          ) : (
            searchResults
              .slice(0, 4)
              .map((user) => (
                <UserListItem
                  user={user}
                  handleFunction={() => addUser(user)}
                />
              ))
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{ background: "red" }}
          onClick={() => handleRemove(user)}
        >
          Leave Group
        </Button>
      </DialogActions>
      <SimpleSnackbar
        text={snackbarMessage}
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
      />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function UpdateGroupChatDialog({
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<VisibilityIcon />}
        onClick={handleClickOpen}
      />
      <SimpleDialog
        open={open}
        onClose={handleClose}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      />
    </div>
  );
}
