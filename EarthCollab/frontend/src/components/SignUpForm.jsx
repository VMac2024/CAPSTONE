import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Container, Button, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    accessLevel: "",
    location: "",
    expertise: "",
  });

  const [result, setResult] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //  const data = new FormData(event.currentTarget);

    axios
      .post(`/api/user/create`, form)
      .then((response) => {
        let result = response.data.result;
        let user = response.data.data;
        console.log("User created: ", user);

        setResult(result);
        if (user) {
          navigate("/loginpage");
        }
      })
      .catch((err) => {
        console.log(err);
        setResult(err.message + ": " + err.response.data.result);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sm={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography>Sign Up</Typography>
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Access Level"
          name="accessLevel"
          value={form.accessLevel}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Expertise"
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField label="Email" name="emailId" value={form.emailId} onChange={handleChange} variant="outlined" fullWidth margin="normal" />
        <TextField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default SignUpForm;
