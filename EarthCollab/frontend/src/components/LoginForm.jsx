import React from "react";
import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, CssBaseline, Link } from "@mui/material";
import { useUserContext } from "../context/userContext";
import { Link as RouterLink, useNavigate } from "react-router-dom"; //https://v5.reactrouter.com/web/api/Link
import axios from "axios";
import { Alert } from "@mui/material";

function LoginForm() {
  // input state values always need to be strings - empty initially
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  //const [error, setError] = useState("");
  const [loginAlert, setLoginAlert] = useState(false);

  // new state value for showing submission messages to user
  const [submitResult, setSubmitResult] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0); //set to 0, as there haven't been any attempts yet.
  const navigate = useNavigate();
  const { currentUser, handleUpdateUser } = useUserContext();
  const isLoggedIn = submitResult === "Successful login."; //establish constant that if submitResult returns this result, the person is "logged in" and triggers the below functions to hide teh
  const [loggedIn, setLoggedIn] = useState(currentUser.firstName);

  useEffect(() => {
    console.log("LoginAlert changed:", loginAlert);
  }, [loginAlert]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let loggedInUser = null;

    try {
      const response = await axios.post("/api/user/login", {
        emailId: userEmail,
        password: userPassword,
      });
      loggedInUser = response.data.data; //may need to take the extra data off.
      console.log(response.data);
      if (response.data) {
        handleUpdateUser(loggedInUser);
        setLoggedIn(true);
        console.log("LoggedinUser: ", loggedInUser);
        setLoginAlert(true);
        setTimeout(() => setLoginAlert(false), 3000);
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
    setTimeout(() => navigate("/"), 3000);
    //navigate("/");
  };

  if (loginAttempts >= 5) return <p>Too many login attempts. Your account it temporarily suspended.</p>; //counts login attempts and if more than 5, then will link to direction to hide form and suspend account.

  if (isLoggedIn)
    return (
      <div className="LoginForm componentBox">
        <p>Welcome {currentUser}</p>
      </div>
    ); //return welcome message if login is successful.

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />

        {loginAlert && <Alert severity="success">You are loggedin</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
        >
          <Typography variant="h3" align="center">
            Login
          </Typography>
          <Typography>
            Not yet signed up?
            <Link component={RouterLink} to="SignUpForm">
              SIGN UP
            </Link>
          </Typography>
          <TextField
            label="email"
            name="email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="password"
            name="password"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Sign In
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default LoginForm;

/*
 if (userPassword.length < 5) {
      setSubmitResult("Password must be at least 5 characters long");
      setLoginAttempts(loginAttempts + 1);
    } else if (userPassword === userEmail) {
      setSubmitResult("Password must not match email address");
      setLoginAttempts(loginAttempts + 1);
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(userPassword)) {
      setSubmitResult("Password must include a special character");
      setLoginAttempts(loginAttempts + 1);
    } else {
      setSubmitResult("Successful login.");
      handleUpdateUser({ email: userEmail, password: userPassword });
    }
*/
