import { Button } from "@mui/material";
import ArticleGrid from "../components/ArticleGrid";
import PDFUpload from "../components/PDFUpload";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

//NOTE: NAME OF WEB-PAGE STILL PENDING.
export default function ArticlesPage() {
  const navigate = useNavigate();
  //const { currentUser } = useUserContext();

  /*if (!currentUser) {
    return <div>Please Login to upload a PDF</div>;
  }*/
  return (
    <>
      <div className="Resources">
        <h1>Eco Innovations Articles</h1>
      </div>
      <Button onClick={() => navigate("/dash/articleUpload")}>Upload Article</Button>
      <ArticleGrid />
    </>
  );
}

//<ArticleGrid />
