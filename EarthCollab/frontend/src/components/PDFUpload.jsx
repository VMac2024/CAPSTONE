import axios from "axios";
import { useContext, useState } from "react";
import { Container, CssBaseline, Box, TextField, Button } from "@mui/material";

// import user context - need to create first.

function PDFUpload() {
  const [file, setFile] = useState({ preview: "", data: "" });
  const [fileTitle, setFileTitle] = useState("");
  const [status, setStatus] = useState("");
  //const {currentUser, handleUpdateUser} = useUserContext()
}

//console.log(currentUser)

const handleSubmit = async (e) => {
  e.preventDefault(); //prevent defaul form action from taking effect until submitted.
  let formData = new FormData();
  formData.append("file", file.data); //check if this has a naming convention?
  formData.append("fileTitle", fileTitle);

  //post form data to backend:
  try {
    const response = await axios.post("/api/users/${currentUser.id}/file", formData); //NOTE: Backend route still to be set up.
    console.log(response.data);
    setStatus(response.data.result);
    handleUpdateUser({ ...currentUser, ...response.data.data });
  } catch (err) {
    setStatus(err.message);
  }
};

const handleFileChange = (e) => {
  console.log(e.targets.files[0]);
  const pdf = {
    preview: URL.createObjectURL(e.target.files[0]),
    data: e.target.files[0],
  };
  setFile(pdf);
};

return (
  <container component="main" maxWidth="sx">
    <CssBaseline />
    <h3>Upload Article</h3>
    <h5>Note: must be a pdf to upload</h5>
    {currentUser.id ? (
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
      ></Box>
    ) : (
      <p>Please log in first</p>
    )}{" "}
    <p>{status}</p>
  </container>
);
