import { Box, Container, CssBaseline, FormControl, Grid2, InputLabel, MenuItem, Select } from "@mui/material";
import ArticleCard from "./ArticleCards";
import { useEffect, useReducer, useState } from "react";
import { useData } from "../hooks/useData";
import axios from "axios";
import { useDeleteHook } from "../hooks/deleteHook";

const itemsPerPage = 12;

export default function ArticleGrid({ pdfs = [] }) {
  const { data } = useData("/api/article", []);
  const { deleteHook } = useDeleteHook();

  const articles = data.data ? data.data : data;
  console.log(articles);

  const [deletedArticles, setDeletedArticles] = useState([]);

  const categories = ["All", ...new Set(articles.map((articles) => articles.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredArticles = articles
    .filter((article) => !deletedArticles.includes(article.id))
    .filter((article) => (selectedCategory === "All" ? articles : articles.filter((article) => article.category === selectedCategory)));

  //const articleList = filteredArticles.map((article) => <ArticleCard key={article.id} article={article} />);

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
        <Box sx={{ flexGrow: 1 }}>
          <Grid2 container spacing={2} columns={{ xs: 3, sm: 6, md: 12, lg: 12 }}>
            {filteredArticles.map((article) => (
              <Grid2 key={article.id} size={{ xs: 12, sm: 3, md: 4, lg: 3 }} sx={{ minWidth: 275 }}>
                <ArticleCard
                  article={article}
                  onDelete={() =>
                    deleteHook("api/article", article.id, () => {
                      setDeletedArticles((prev) => [...prev, article.id]);
                    })
                  }
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
    </>
  );
}

//{{ xs: 10, sm: 5, md: 2, gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))" }}
