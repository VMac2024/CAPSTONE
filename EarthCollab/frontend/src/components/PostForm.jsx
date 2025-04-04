import axios from "axios";
import { useState } from "react"; //useContext
import { Container, CssBaseline, Box, TextField, Button, Select, MenuItem } from "@mui/material";
//import { useUserContext } from "../context/userContext";

// import user context - need to create first.

function PostForm() {
  const [post, setPost] = useState({ preview: "", data: "" });
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  //const { currentUser, handleUpdateUser } = useUserContext();

  //console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent defaul form action from taking effect until submitted.
    let formData = new FormData();
    formData.append("post", post.data); //check if this has a naming convention?
    formData.append("postTitle", postTitle);
    formData.append("postContent", postContent);

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
    const image = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setPostImage(image);
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
          id="postTitle"
          autoFocus
          label="post Title"
          name="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <Select
          labelId="articleCategory"
          id="articleCategory"
          value={Category}
          label="Category"
          name="Category"
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
          id="postContent"
          autoFocus
          label="post content"
          name="postContent"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        {image.preview && <img src={image.preview} width="100" height="100" />}
        <input name="image" type="file" onChange={handleFileChange} />
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
