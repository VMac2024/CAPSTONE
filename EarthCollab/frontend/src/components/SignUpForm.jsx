import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LoginForm() {
  return (
    <form>
      <TextField label="First Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Last Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Location" variant="outlined" fullWidth margin="normal" />
      <TextField label="Access Level" variant="outlined" fullWidth margin="normal" />
      <TextField label="Expertise" variant="outlined" fullWidth margin="normal" />

      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField label="Password" variant="outlined" fullWidth margin="normal" />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default LoginForm;
