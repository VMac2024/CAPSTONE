import axios from "axios";
import { useState } from "react"; //useContext
import { Container, CssBaseline, Box, TextField, Button, Select, MenuItem } from "@mui/material";
import { useUserContext } from "../context/userContext";

function PDFUpload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");

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
  const [category, setCategory] = useState("");

  const { currentUser, handleUpdateUser } = useUserContext();

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

    //post form data to backend:
    try {
      const response = await axios.post(`/api/article/create`, formData); //${currentUser.id} (replace "1" with this when implementing usercontext & login requirements. )
      console.log(response.data);
      setStatus(response.data.result);
      handleUpdateUser({ ...currentUser, ...response.data.data });
    } catch (err) {
      console.error(err);
      setStatus("Error, could not upload file: " + err.message);
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
          id="title"
          autoFocus
          label="Title"
          name="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
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
