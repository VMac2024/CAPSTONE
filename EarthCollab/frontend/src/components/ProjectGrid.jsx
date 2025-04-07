import { Link, useSearchParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import ProjectCard from "./ProjectCard";
import { useEffect, useReducer, useState } from "react";
import { Grid2, Container, CssBaseline, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useDeleteHook } from "../hooks/deleteHook";
//include search function
export function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") ? searchParams.get("limit") : 5;

  const { loading, data, error } = useData("api/project", []);
  const { deleteHook } = useDeleteHook();

  const posts = data.data ? data.data : data;
  console.log(projects);

  //const [message, setMessage] = useState("");
  //const [currentPosts, setCurrentPosts] = useState(posts);

  const [deletedPosts, setDeletedPosts] = useState([]);

  const categories = ["All", ...new Set(projects.map((posts) => projects.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProjects = projects
    .filter((project) => !deletedPosts.includes(project.id))
    .filter((project) => (selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)));

  const handleChangeCategory = (e) => {
    setSelectedCategory({ limit: e.target.value });
  };

  const handleChangeLimit = (e) => {
    setSearchParams({ limit: e.target.value });
  };

  return (
    <>
      <Container>
        <CssBaseline />
        <FormControl fullWidth sx={{ mb: 3, width: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select name="filterCategory" label="Filter by Category" value={selectedCategory} onChange={handleChangeCategory}>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid2 container spacing={2} size={{ xs: 12, sm: 6, md: 3 }}>
          {filteredProjects.map((project) => (
            <PostCard
              key={project.id}
              project={project}
              onDelete={() =>
                deleteHook("api/project", project.id, () => {
                  setDeletedPosts((prev) => [...prev, project.id]);
                })
              }
            />
          ))}
        </Grid2>
      </Container>
      <label>
        Show number of posts:
        <select onChange={handleChangeLimit}>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
      </label>
    </>
  );
}
