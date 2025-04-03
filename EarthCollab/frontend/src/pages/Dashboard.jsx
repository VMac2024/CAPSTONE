import { Button } from "@mui/material";
import PDFUpload from "../components/PDFUpload";
import { useUserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

//NOTE: NAME OF WEB-PAGE STILL PENDING.
export default function DashboardPage() {
  //const { currentUser } = useUserContext();

  /*if (!currentUser) {
    return <div>Please Login to upload a PDF</div>;
  }*/
  return (
    <>
      <div className="Dash">
        <h1>Dashboard</h1>
        <Button onClick={() => Navigate("dash/ArticleUpload")}>Upload Article</Button>
        <Button onClick={() => Navigate("dash/CreatePost")}>Create Post</Button>
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
