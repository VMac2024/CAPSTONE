import { Container, CssBaseline, FormControl, Grid2, InputLabel, MenuItem, Select } from "@mui/material";
import ArticleCard from "./ArticleCards";
import { useEffect, useReducer, useState } from "react";
import { useData } from "../hooks/useData";
import axios from "axios";

const itemsPerPage = 12;

export default function ArticleGrid({ pdfs = [] }) {
  const { loading, data, error } = useData("/api/article", []);
  const articles = data.data ? data.data : data;
  console.log(articles);
  const [message, setMessage] = useState("");

  const [currentArticles, setCurrentArticles] = useState(articles);

  const articleList = articles.map((article) => <ArticleCard key={article.id} article={article} />);

  const categories = ["All", ...new Set(articles.map((articles) => articles.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = selectedCategory === "All" ? articles : articles.filter((article) => article.category === selectedCategory);

  return (
    <>
      <Container>
        <CssBaseline />
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="filterCategory"
            label="Filter by Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem key={category} value={category}></MenuItem>
          </Select>
        </FormControl>
        <Grid2 container spacing={2} size={{ xs: 12, sm: 6, md: 3 }}>
          {articleList}
        </Grid2>
      </Container>
    </>
  );
}

//{currentItems.length > 0 ? (
//    currentItems.map((article) => (

//          )) ) : (    <p>No articles matching your search</p>  )}

/* const items = useData("/api/article");

  useEffect(() => {
    console.log("fetched items:", items);
  }, [items]); */
