import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Tabs, Tab, Box } from "@mui/material";
import PropTypes from "prop-types";
import Login from "../../components/authentication/Login";
import SignUp from "../../components/authentication/SignUp";
import "./LoginSignupPage.css";

const HomePage = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  if (
    localStorage.getItem("userInfo") !== "" &&
    JSON.parse(localStorage.getItem("userInfo"))
  )
    navigate("/play");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="Container">
      <div
        className="Card"
        style={{
          backgroundColor: "#373634",
          borderRadius: "1em",
          width: "40vw",
          margin: "10vh 30vw",
        }}
      >
        <Typography variant="h3">Project Chess</Typography>
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Login" {...a11yProps(0)} style={{ width: "50%" }} />
            <Tab label="SignUp" {...a11yProps(1)} style={{ width: "50%" }} />
          </Tabs>
        </div>
        <CustomTabPanel value={value} index={0}>
          <Login />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SignUp />
        </CustomTabPanel>
      </div>
    </div>
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default HomePage;
