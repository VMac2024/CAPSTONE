import { Link, useSearchParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import PostCard from "./PostCard";
import { useEffect, useReducer, useState } from "react";
import { Grid2, Container, CssBaseline, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

//include search function
export function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") ? searchParams.get("limit") : 5;

  const { loading, data, error } = useData("api/post", []);

  const posts = data.data ? data.data : data;
  console.log(posts);

  const [message, setMessage] = useState("");
  const [currentPosts, setCurrentPosts] = useState(posts);

  const categories = ["All", ...new Set(posts.map((posts) => posts.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredPosts = selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory);

  const postList = posts.map((post) => <PostCard key={post.id} post={post} />);

  const handleChangeLimit = (e) => {
    setSearchParams({ limit: e.target.value });
  };

  return (
    <>
      <Container>
        <CssBaseline />
        <FormControl fullWidth sx={{ mb: 3, width: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="filterCategory"
            label="Filter by Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid2 container spacing={2} size={{ xs: 12, sm: 6, md: 3 }}>
          {postList}
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
