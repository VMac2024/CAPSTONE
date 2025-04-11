import axios from "axios";
import { useState } from "react"; //useContext
import { Container, CssBaseline, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@mui/material";
import { useUserContext } from "../context/userContext";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UpdatePost() {
  const { currentUser } = useUserContext(); //get current user from userContext.
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  //Categories to be moved out to a library as an enhancement for .
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

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form action from taking effect until submitted.
    console.log("PostCheckUser:", currentUser);
    if (!file.data) {
      setStatus("Please add image to upload");
      return;
    }

    if (!currentUser) {
      setStatus("You must Login to Post.");
      return;
    }

    let formData = new FormData();
    formData.append("file", file.data); //check if this has a naming convention?
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", category);
    formData.append("userId", currentUser.id);

    const headers = { "x-access-token": currentUser.token };

    console.log("CheckFormData: ", formData);

    //post form data to backend:
    try {
      //check for data being sent:
      console.log("Sending form data:");
      console.log("title:", form.title);
      console.log("content:", form.content);
      console.log("category:", category);
      console.log("file.data:", file.data);
      console.log("userId", currentUser.id);
      const response = await axios.post(`/api/post/create`, formData, { headers: headers }); //${currentUser.id} (replace "1" with this when implementing usercontext & login requirements. )
      console.log(response.data);
      setStatus(response.data.result);
      setTimeout(() => navigate("/posts"), 2000);
    } catch (err) {
      setStatus(err.message);
      setStatus("Error, could not upload file: " + err.message);
      setTimeout(() => navigate("/posts"), 2000);
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
    <Dialog open={open} onclose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit your post</DialogTitle>
      <DialogContent>
        <FormControl onSubmit={handleUpdateSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            autoFocus
            label="Post Title"
            name="title"
            value={post.title}
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
        </FormControl>
      </DialogContent>
    </Dialog>
  );
}
