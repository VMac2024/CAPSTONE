import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Container, Button, CssBaseline, Typography, Select, MenuItem, Link } from "@mui/material";
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
  });

  const expertiseLevel = ["Enthusiast", "Professional"];
  const [expertise, setExpertise] = useState("");

  const [result, setResult] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExpertiseChange = (e) => {
    setExpertise(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //  const data = new FormData(event.currentTarget);

    let formData = new FormData();

    formData.append("firstName", form.firstName);
    formData.append("emailId", form.emailId);
    formData.append("password", form.password);
    formData.append("location", form.location);
    formData.append("expertise", expertise);
    //  accessLevel: "",

    axios
      .post(`/api/user/create`, formData)
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
      <Container component="main" maxWidth="md">
        <CssBaseline />

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sm={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Typography variant="h3" align="center">
            Sign Up
          </Typography>
          <Typography>
            Already signed up? <Link to="/loginForm">LOG IN HERE</Link>
          </Typography>
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

          <Select labelId="expertise" label="Expertise" name="expertise" value={expertise} onChange={handleExpertiseChange}>
            {expertiseLevel.map((level, index) => (
              <MenuItem key={index} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
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

/*<TextField
label="Access Level"
name="accessLevel"
value={form.accessLevel}
onChange={handleChange}
variant="outlined"
fullWidth
margin="normal"
/> - NOTE - SET THIS ACCESSLEVEL AT THE BACKEND - NOT A USER'S CHOICE*/
