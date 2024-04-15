import React from "react";
import { Typography, TextField, Stack, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [alertMsgs, setAlertMsgs] = React.useState([]);

  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!email || !password) {
      showError("fill all the required fields!");
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/login`,
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      setLoading(false);
      navigate("/play");
    } catch (e) {
      showError(e.message);
      setLoading(false);
    }
  };

  function showError(msg) {
    let calertMsgs = alertMsgs.slice();
    calertMsgs.push(msg);
    setAlertMsgs(calertMsgs);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        margin: "auto",
      }}
    >
      <Stack
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          backgroundColor: "Red",
        }}
      >
        {alertMsgs.map((alertMsg) => (
          <Alert
            severity="error"
            onClose={() => {
              setAlertMsgs([]);
            }}
          >
            {alertMsg}
          </Alert>
        ))}
      </Stack>
      <Typography variant="h4" style={{ marginBottom: "2vh" }}>
        Hi! Welcome Back!
      </Typography>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "2vh" }}
      />
      <TextField
        id="pwd"
        label="Password"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "2vh" }}
      />
      <LoadingButton
        variant="contained"
        loading={loading}
        onClick={submitHandler}
      >
        Login
      </LoadingButton>
    </div>
  );
};

export default Login;
