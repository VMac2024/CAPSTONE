import { Grid2 } from "@mui/material";
import ArticleCard from "./ArticleCards";
import { useEffect, useReducer } from "react";
import { useData } from "../hooks/useData";

const itemsPerPage = 12;

export default function ArticleGrid({ pdfs = [] }) {
  return (
    <>
      <Grid2 container spacing={2} my={2} sx={{ marginTop: "80px" }}>
        {pdfs.map((pdf, index) => (
          <Grid2 item key={index} size xs={12} sm={6} md={3}>
            <ArticleCard title={pdf.title} pdfUrl={pdf.url} />
          </Grid2>
        ))}
      </Grid2>
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
