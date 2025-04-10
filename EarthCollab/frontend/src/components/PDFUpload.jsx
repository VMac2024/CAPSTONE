import axios from "axios";
import { useState } from "react"; //useContext
import { Container, CssBaseline, Box, TextField, Button, Select, MenuItem, Typography, FormControl, InputLabel } from "@mui/material";
import { useUserContext } from "../context/userContext";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PDFUpload() {
  const { currentUser } = useUserContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

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
    "Rewilding",
    "Sustainability",
    "Transport",
    "UrbanTech",
    "Waste",
    "Water",
    "Wildlife",
  ];
  const [category, setCategory] = useState("");

  // const { currentUser, handleUpdateUser } = useUserContext();

  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent defaul form action from taking effect until submitted.

    if (!file.data) {
      setStatus("Please add file to upload");
      return;
    }

    let formData = new FormData();
    formData.append("file", file.data); //check if this has a naming convention?
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", category);
    formData.append("userId", currentUser.id);

    const headers = { "x-access-token": currentUser.token };

    //post form data to backend:
    try {
      const response = await axios.post(`/api/article/create`, formData, { headers: headers });
      console.log(response.data);
      setStatus(response.data.result);
      setTimeout(() => navigate("/articles"), 2000);
    } catch (err) {
      console.error(err);
      setStatus("Error, could not upload file: " + err.message);
      setTimeout(() => navigate("/articles"), 2000);
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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Container component="main" maxWidth="sx">
      <CssBaseline />

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h3" align="center">
          Article Upload
        </Typography>
        <Typography variant="h6" align="center">
          NOTE: Must be a PDF to upload
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          autoFocus
          label="Title"
          name="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="category">Category</InputLabel>
          <Select
            fullWidth
            labelId="category"
            id="category"
            value={category}
            label="Category"
            name="category"
            onChange={handleCategoryChange}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          autoFocus
          label="PDF description"
          name="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {/** {file.preview && <embed src={file.preview} width="400" height="400" />} */}
        <input name="file" type="file" onChange={handleFileChange} accept="application/pdf" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
      {status === 200 && <Alert severity="success">Article Submitted</Alert>}
      {status === 500 && <Alert severity="error">Upload failed, please try again</Alert>}
    </Container>
  );
}

export default PDFUpload;

//{currentUser.id ? (

//      ) : (
// <p>Please log in first</p>
//)}{" "}
//
