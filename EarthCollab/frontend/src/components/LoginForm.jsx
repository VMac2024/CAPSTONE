import React from "react";
import { useState } from "react";
import { Container, TextField, Button, Typography, Box, CssBaseline } from "@mui/material";
import { useUserContext } from "../context/userContext";
import { Form } from "react-router-dom";

function LoginForm() {
  // input state values always need to be strings - empty initially
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  // new state value for showing submission messages to user
  const [submitResult, setSubmitResult] = useState("");

  const [loginAttempts, setLoginAttempts] = useState(0); //set to 0, as there haven't been any attempts yet.

  const { currentUser, handleUpdateUser } = useUserContext();

  const isLoggedIn = submitResult === "Successful login."; //establish constant that if submitResult returns this result, the person is "logged in" and triggers the below functions to hide teh

  const handleSubmit = (e) => {
    e.preventDefault();

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
  };

  if (loginAttempts >= 5) return <p>Too many login attempts. Your account it temporarily suspended.</p>; //counts login attempts and if more than 5, then will link to direction to hide form and suspend account.

  if (isLoggedIn)
    return (
      <div className="LoginForm componentBox">
        <p>Welcome {currentUser}</p>
      </div>
    ); //return welcome message if login is successful.

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
      >
        <Typography variant="h3" align="center">
          Login
        </Typography>
        <TextField label="email" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth />
        <TextField label="password" name="password" type="password" value={form.password} onChange={handleChange} required fullWidth />
        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
      </Box>
    </Container>

    /* 
      {loginAttempts < 5 ? (
        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <label>
              Email Address:
              <input
                type="email"
                value={userEmail}
                name="userEmail"
                onChange={(e) => {
                  console.log(userEmail);
                  setUserEmail(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              Password:
              <input type="password" value={userPassword} name="password" onChange={(e) => setUserPassword(e.target.value)} />
            </label>
          </div>
          <button>Log In</button>
          <p>{submitResult}</p>
        </form>
      ) : null}
    </div>*/
  );
}

export default LoginForm;

/*function LoginForm() {
  return (
    <form>
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField label="Password" variant="outlined" fullWidth margin="normal" />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default LoginForm;*/
