import { Link, useSearchParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import PostCard from "./PostCard";
import { useEffect, useReducer, useState } from "react";
import { Grid2, Container, CssBaseline, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useDeleteHook } from "../hooks/deleteHook";
import { useUpdateHook } from "../hooks/updateHook";

//include search function
export function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") ? searchParams.get("limit") : 5;

  const { loading, data, error } = useData("api/post", []);
  const { deleteHook } = useDeleteHook();
  const { updateHook } = useUpdateHook();

  const posts = data.data ? data.data : data;
  console.log(posts);

  const [deletedPosts, setDeletedPosts] = useState([]);

  const categories = ["All", ...new Set(posts.map((posts) => posts.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredPosts = posts
    .filter((post) => !deletedPosts.includes(post.id))
    .filter((post) => (selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory)));

  const handleChangeCategory = (e) => {
    setSelectedCategory({ limit: e.target.value });
  };

  const handleChangeLimit = (e) => {
    setSearchParams({ limit: e.target.value });
  };

  const handleUpdate = (e) => {
    const updatedData = { title: "Updated Title", content: "New Content" };
    updateHook("api/post", post.id, updatedData, () => {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item)));
    });
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
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() =>
                deleteHook("api/post", post.id, () => {
                  setDeletedPosts((prev) => [...prev, post.id]);
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

/*  const postList = postsData?.map((post) => (
    <li key={post.id}>
      <Link to={"/posts/" + post.id}> 
        Post #{post.id}: {post.title}
      </Link>
    </li>
  )); */
