import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import {
  Tooltip,
  Typography,
  TextField,
  Snackbar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

export default function SearchUserDrawer({ accessChat, loadingChat }) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openSnackBarSearchEmpty, setOpenSnackBarSearchEmpty] =
    React.useState(false);
  const [openSnackBarSearchFailed, setOpenSnackBarSearchFailed] =
    React.useState(false);

  const { user } = ChatState();

  //code for handling the snackbar SearchEmpty
  const handleClickSearchEmpty = () => {
    setOpenSnackBarSearchEmpty(true);
  };
  const handleCloseSearchEmpty = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBarSearchEmpty(false);
  };

  const actionSearchEmpty = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSearchEmpty}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  //end of code for handling the snackbarSearchEmpty

  //code for handling the snackbar SearchFailed
  const handleClickSearchFailed = () => {
    setOpenSnackBarSearchFailed(true);
  };
  const handleCloseSearchFailed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBarSearchFailed(false);
  };

  const actionSearchFailed = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSearchFailed}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  //end of code for handling the snackbarSearchFailed

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  //code for handling search
  const handleSearch = async () => {
    if (!search) handleClickSearchEmpty();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      console.log(user.token);

      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/allusers?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResults(data);
    } catch (err) {
      handleClickSearchFailed();
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography variant="h6">Search Users</Typography>
      <Snackbar
        open={openSnackBarSearchEmpty}
        autoHideDuration={6000}
        onClose={handleCloseSearchEmpty}
        message="Please Enter Something to Search"
        action={actionSearchEmpty}
      />
      <Snackbar
        open={openSnackBarSearchFailed}
        autoHideDuration={6000}
        onClose={handleCloseSearchFailed}
        message="Search Failed!"
        action={actionSearchFailed}
      />
      <Box style={{ display: "flex", paddingBottom: "2px" }}>
        <TextField
          id="search-user-input"
          label="Search By Name or Email"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ margin: "2px" }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Go
        </Button>
      </Box>
      {loading ? (
        <ChatLoading />
      ) : (
        searchResults?.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            handleFunction={() => accessChat(user._id)}
          />
        ))
      )}
    </Box>
  );

  return (
    <div>
      <Tooltip title="Search Users To Chat" placement="bottom-end" arrow>
        <Button variant="contained" onClick={toggleDrawer(true)}>
          <SearchIcon />
          Search User
        </Button>
      </Tooltip>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        {loadingChat && <CircularProgress />}
      </Drawer>
    </div>
  );
}
