import axios from "axios";
import { useState } from "react"; //useContext
import { Container, CssBaseline, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@mui/material";
import { useUserContext } from "../context/userContext";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
  const { currentUser } = useUserContext(); //get current user from userContext.
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const categories = [
    "TreePlanting",
    "BeachCleanup",
    "CommunityGarden",
    "Conservation",
    "EnvironmentalEducation",
    "HabitatRestoration",
    "TreePlanting",
    "WildlifeMonitoring",
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
      setStatus("You must Login to List a Project.");
      return;
    }

    let formData = new FormData();
    formData.append("file", file.data);
    formData.append("projectName", form.projectName);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("webpage", webpage);
    //formData.append("volunteer", volunteer);

    const headers = { "x-access-token": currentUser.token };

    console.log("CheckFormData: ", formData);

    //post form data to backend:
    try {
      //check for data being sent:
      console.log("Sending form data:");
      console.log("title:", form.projectName);
      console.log("content:", form.description);
      console.log("category:", form.location);
      console.log("category:", form.webpage); //volunteer.
      console.log("file.data:", file.data);
      console.log("userId", currentUser.id);
      const response = await axios.post(`/api/project/create`, formData, { headers: headers }); //${currentUser.id} (replace "1" with this when implementing usercontext & login requirements. )
      console.log(response.data);
      setStatus(response.data.result);
      setTimeout(() => navigate("/projects"), 2000);
    } catch (err) {
      setStatus(err.message);
      setStatus("Error, could not upload file: " + err.message);
      setTimeout(() => navigate("/projects"), 2000);
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
        <Typography variant="h3" align="center">
          List Project
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          id="projectName"
          autoFocus
          label="Project Name"
          name="projectName"
          value={form.projectName}
          onChange={(e) => setForm({ ...form, projectName: e.target.value })}
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
          label="Project description"
          name="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="location"
          autoFocus
          label="Project location"
          name="location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="webpage"
          autoFocus
          label="Project webpage"
          name="webpage"
          value={form.webpage}
          onChange={(e) => setForm({ ...form, webpage: e.target.value })}
        />
        {file.preview && <img src={file.preview} width="100" height="100" />}
        <input name="file" type="file" onChange={handleFileChange} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
      {status === 200 && <Alert severity="success">Project Listed</Alert>}
      {status === 500 && <Alert severity="error">Listing failed, please try again</Alert>}
    </Container>
  );
}

export default ProjectForm;
