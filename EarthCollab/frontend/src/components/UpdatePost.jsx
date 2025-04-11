import axios from "axios";
import { useEffect, useState } from "react"; //useContext
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useUserContext } from "../context/userContext";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UpdatePost({ open, handleClose, post, onUpdate }) {
  const { currentUser } = useUserContext(); //get current user from userContext.
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");

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

  //code to pre-populate form with relevant post's data, ready for updating:
  useEffect(() => {
    if (post) {
      setForm({ title: post.title, content: post.content });
      setCategory(post.category);
      if (post.imageUrl) {
        setFile({ preview: post.imageUrl, data: null });
      }
    }
  }, [post]);

  //handle file change:
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handle category change:
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  //handle submit of form:
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = currentUser?.token;
    console.log("Token being sent:", token); // Log token to ensure it's valid

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", category);
    if (file.data) {
      formData.append("file", file.data);
    }

    try {
      const response = await axios.put(`/api/post/${post.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token, // Ensure token is being sent
        },
      });
      console.log("Post updated:", response.data);
      onUpdate();
      handleClose();
    } catch (error) {
      console.error("Update failed:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit your post</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", mt: 2 }}
        >
          <FormControl onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            <input name="file" type="file" onChange={handleChange} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
