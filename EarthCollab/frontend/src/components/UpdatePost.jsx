import axios from "axios";
import { useEffect, useState } from "react"; //useContext
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useUserContext } from "../context/userContext";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UpdatePost({ open, handleClose, post, onUpdate }) {
  //Open - whether dialog shows or not. handleClose - close the dialog, post - existing post object to be updated. onUpdate - callback to refresh post data after updating.
  const { currentUser } = useUserContext(); //get current user from userContext.
  const [form, setForm] = useState({ title: post.title, content: post.content, category: post.category, preview: post.imageUrl });

  //Categories to be moved out to a library as an enhancement in due course to ensure consistency across site.
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

  //handle file change:
  const handleChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  //handle category change:
  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  //handle submit of form:
  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(form);
    handleClose();
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
                value={form.category}
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
            {form.preview && <img src={form.preview} width="100" height="100" />}
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
