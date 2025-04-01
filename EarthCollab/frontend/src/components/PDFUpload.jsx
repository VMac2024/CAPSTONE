import axios from "axios";
import { useState } from "react"; //useContext
import { Container, CssBaseline, Box, TextField, Button, Select, MenuItem } from "@mui/material";
//import { useUserContext } from "../context/userContext";

// import user context - need to create first.

function PDFUpload() {
  const [file, setFile] = useState({ preview: "", data: "" });
  const [fileTitle, setFileTitle] = useState("");
  const [status, setStatus] = useState("");
  //const { currentUser, handleUpdateUser } = useUserContext();

  //console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent defaul form action from taking effect until submitted.
    let formData = new FormData();
    formData.append("file", file.data); //check if this has a naming convention?
    formData.append("fileTitle", fileTitle);

    //post form data to backend:
    try {
      const response = await axios.post(`/api/upload`, formData); //${currentUser.id} (replace "1" with this when implementing usercontext & login requirements. )
      console.log(response.data);
      setStatus(response.data.result);
      //handleUpdateUser({ ...currentUser, ...response.data.data });
    } catch (err) {
      setStatus(err.message);
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const pdf = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(pdf);
  };

  const categories = [
    "Agriculture",
    "AirQuality",
    "Construction",
    "EcoCities",
    "EcoTech",
    "Oceans",
    "OffGrid",
    "PlantLife",
    "Reforestation",
    "ReGreening",
    "Renewables",
    "Transport",
    "UrbanTech",
    "Waste",
    "Water",
    "Wildlife",
  ];
  const [Category, setCategory] = useState("");

  return (
    <Container component="main" maxWidth="sx">
      <CssBaseline />
      <h5>Note: must be a pdf to upload</h5>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="fileTitle"
          autoFocus
          label="pdf Title"
          name="fileTitle"
          value={fileTitle}
          onChange={(e) => setFileTitle(e.target.value)}
        />
        <Select
          labelId="articleCategory"
          id="articleCategory"
          value={Category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((categories, index) => (
            <MenuItem key={index} value={categories}>
              {categories}
            </MenuItem>
          ))}
        </Select>
        <TextField
          margin="normal"
          required
          fullWidth
          id="articleDescription"
          autoFocus
          label="pdf description"
          name="description"
          value={fileTitle}
          onChange={(e) => setFileTitle(e.target.value)}
        />
        {file.preview && <embed src={file.preview} width="400" height="400" />}
        <input name="file" type="file" onChange={handleFileChange} accept="application/pdf" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
      <p>{status}</p>
    </Container>
  );
}

export default PDFUpload;

//{currentUser.id ? (

//      ) : (
// <p>Please log in first</p>
//)}{" "}
//
