import React from "react";
import { useState } from "react";
import { Container, TextField, Button, Typography, Box, CssBaseline, Link } from "@mui/material";
import { useUserContext } from "../context/userContext";
import { Link as RouterLink, useNavigate } from "react-router-dom"; //https://v5.reactrouter.com/web/api/Link
import axios from "axios";
import { Alert } from "@mui/material";

function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // new state value for showing submission messages to user
  const [submitResult, setSubmitResult] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const navigate = useNavigate();
  const { currentUser, handleUpdateUser } = useUserContext();
  const isLoggedIn = currentUser?.id; //establish constant that if submitResult returns this result, the person is "logged in" and triggers the below functions to hide teh

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/user/login", {
        emailId: userEmail,
        password: userPassword,
      });
      const { data } = response.data;

      console.log(response.data);
      if (response.data) {
        handleUpdateUser(data);

        console.log("LoggedinUser: ", data);

        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Login error: ", error);
      setLoginAttempts((prev) => prev + 1);
      setSubmitResult("Login failed, Please try again");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />

        {isLoggedIn && <Alert severity="success">You are loggedin</Alert>}
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
