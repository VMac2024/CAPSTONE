import { Button } from "@mui/material";
import ArticleGrid from "../components/ArticleGrid";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function ArticlesPage() {
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  return (
    <>
      <div className="Resources">
        <h1>Eco Innovations Articles</h1>
      </div>
      {currentUser?.id && <Button onClick={() => navigate("/dash/articleUpload")}>Upload Article</Button>}
      <ArticleGrid />
    </>
  );
}
