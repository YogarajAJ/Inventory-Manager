import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetForm } from "../store/slices/userSlice";

const TitleBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const loggedIn = useSelector(({ user }) => user.loggedIn);
  const userName = useSelector(({ user }) => user.userName);
  const navigate = useNavigate();

  const openProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(resetForm());
    navigate("/")
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={Link}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, paddingRight: 0 }}
            to="/"
          >
            <Inventory2Icon />
          </IconButton>
          <Typography sx={{ flexGrow: 1, fontSize: 15 }}>
            <Button
              color="inherit"
              component={Link}
              to={loggedIn ? "/home" : "/"}
            >
              {"Comparison Quotes".toLocaleUpperCase()}
            </Button>
          </Typography>

          {loggedIn && (
            <Button color="inherit" component={Link} to={"/addInventory"}>
              <AddCircleOutlineIcon /> &nbsp; Add Quote
            </Button>
          )}
          {loggedIn && (
            <span>
              <Button color="inherit" onClick={openProfile}>
                <AccountCircleIcon />
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
                <MenuItem>{userName}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </span>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TitleBar;
