import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Container, Button, CssBaseline, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    location: "",
    expertise: "",
  });

  const expertiseLevel = ["Enthusiast", "Professional"];

  const [result, setResult] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExpertiseChange = (e) => {
    setForm({ ...form, expertise: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
    <>
      <Typography variant="h3" align="center">
        Sign Up
      </Typography>
      <Typography>
        Already signed up? <button onClick={() => navigate(-1)}>Go Back</button>
      </Typography>
      <Container component="main" maxWidth="md">
        <CssBaseline />

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sm={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
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
          <FormControl fullWidth variant="outlined">
            <InputLabel id="expertise">Environmental Expertise?</InputLabel>
            <Select
              labelId="expertise"
              fullWidth
              label="Expertise"
              name="expertise"
              value={form.expertise}
              onChange={handleExpertiseChange}
            >
              {expertiseLevel.map((level, index) => (
                <MenuItem key={index} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Email"
            name="emailId"
            value={form.emailId}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
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
    </>
  );
}

export default SignUpForm;

/*NOTE - ACCESSLEVEL SET AT THE BACKEND - NOT A USER'S CHOICE*/
