import React from "react";
import axios from "axios";
import { TextField, Typography, Stack, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCpassword] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [alertMsgs, setAlertMsgs] = React.useState([]);

  const navigate = useNavigate();

  // const postDetails = async (pics) => {
  //   setLoading(true);
  //   if (pics == undefined) {
  //     <Alert severity="error">No image selected</Alert>;
  //     return;
  //   }

  //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //     const result = await cloudinary.uploader.upload(pics, {
  //       folder: "profile-images",
  //     });
  //     console.log(result);
  //     setPic(result.secure_url);
  //     setLoading(false);
  //   } else {
  //     <Alert severity="error">Selected file is not an image!</Alert>;
  //     setLoading(false);
  //   }
  // };

  function handleImage(img) {
    setLoading(true);
    var reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      console.log(reader.result);
      setProfileImage(reader.result);
      setLoading(false);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
      setLoading(false);
    };
  }

  function showError(msg) {
    let calertMsgs = alertMsgs.slice();
    calertMsgs.push(msg);
    setAlertMsgs(calertMsgs);
  }

  const submitHandler = async () => {
    if (!name || !email || !password || !cpassword || !profileImage) {
      showError("fill all the required fields!");
      return;
    }

    if (password != cpassword) {
      showError("Entered Passwords don't match!");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/signup`,
        {
          name,
          email,
          password,
          pic: profileImage,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      console.log(result);
      setLoading(false);
      navigate("/play");
    } catch (e) {
      showError(e.message);
      console.log(e);
      setLoading(false);
    }
  };
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
        {console.log(alertMsgs)}
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
      <Typography variant="body1">Enter Name</Typography>
      <TextField
        id="usrnm"
        variant="outlined"
        size="small"
        style={{ marginBottom: "2vh" }}
        onChange={(e) => setName(e.target.value)}
      />
      <Typography variant="body1">Enter Email</Typography>
      <TextField
        id="usremail"
        variant="outlined"
        size="small"
        style={{ marginBottom: "2vh" }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Typography variant="body1">Enter Password</Typography>
      <TextField
        id="pwd"
        variant="outlined"
        size="small"
        type="password"
        style={{ marginBottom: "2vh" }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Typography variant="body1">Confirm Password</Typography>
      <TextField
        id="confirm-pwd"
        variant="outlined"
        size="small"
        type="password"
        style={{ marginBottom: "2vh" }}
        onChange={(e) => setCpassword(e.target.value)}
      />
      <Typography variant="body1">Upload Profile Picture</Typography>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImage(e.target.files[0])}
      />
      {profileImage && profileImage !== "" ? (
        <img src={profileImage} style={{ width: "10vw", height: "10vh" }} />
      ) : null}
      <LoadingButton
        variant="contained"
        loading={loading}
        onClick={submitHandler}
      >
        Signup
      </LoadingButton>
    </div>
  );
};

export default SignUp;
