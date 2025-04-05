import axios from "axios";
import { useState } from "react"; //useContext
import { Container, CssBaseline, Box, TextField, Button, Select, MenuItem } from "@mui/material";
//import { useUserContext } from "../context/userContext";

// import user context - need to create first.

function PostForm() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  //const { currentUser, handleUpdateUser } = useUserContext();

  //console.log(currentUser);

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

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent defaul form action from taking effect until submitted.

    if (!file.data) {
      setStatus("Please add image to upload");
      return;
    }

    let formData = new FormData();
    formData.append("file", file.data); //check if this has a naming convention?
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", category);

    //post form data to backend:
    try {
      console.log("Sending form data:");
      console.log("title:", form.title);
      console.log("content:", form.content);
      console.log("category:", category);
      console.log("file.data:", file.data);
      const response = await axios.post(`/api/post/create`, formData); //${currentUser.id} (replace "1" with this when implementing usercontext & login requirements. )
      console.log(response.data);
      setStatus(response.data.result);
      //handleUpdateUser({ ...currentUser, ...response.data.data });
    } catch (err) {
      setStatus(err.message);
      setStatus("Error, could not upload file: " + err.message);
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(file);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />

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
          label="Post Title"
          name="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Select labelId="category" id="category" value={category} label="Category" name="category" onChange={handleCategoryChange}>
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
          id="content"
          autoFocus
          label="Post Content"
          name="content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        {file.preview && <img src={file.preview} width="100" height="100" />}
        <input name="file" type="file" onChange={handleFileChange} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
      <p>{status}</p>
    </Container>
  );
}

export default PostForm;

//{currentUser.id ? (

//      ) : (
// <p>Please log in first</p>
//)}{" "}
//

//Post inputs: title, content, image, category.
