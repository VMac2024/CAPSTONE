import { Button } from "@mui/material";
import PDFUpload from "../components/PDFUpload";
import { useUserContext } from "../context/userContext";
import { useNavigate, Outlet } from "react-router-dom";
import PostForm from "../components/PostForm";

//NOTE: NAME OF WEB-PAGE STILL PENDING.
export default function DashboardPage() {
  const navigate = useNavigate();
  //const { currentUser } = useUserContext();

  /*if (!currentUser) {
    return <div>Please Login to upload a PDF</div>;
  }*/
  return (
    <>
      <div className="Dash">
        <h1>Dashboard</h1>
        <button onClick={() => navigate("/dash/articleUpload")}>Upload Article</button>
        <button onClick={() => navigate("/dash/createPost")}>Create Post</button>
        <Outlet />
      </div>
    </>
  );
}

export function ArticleUpload(props) {
  return (
    <>
      <h3> Submit an Article</h3>
      <PDFUpload />
    </>
  );
}

export function CreatePost(props) {
  return <PostForm />;
}
