import PDFUpload from "../components/PDFUpload";
import { useNavigate, Outlet } from "react-router-dom";
import PostForm from "../components/PostForm";

//Page used solely for article uploads and post uploads.
export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="Dash">
        <Outlet />
      </div>
    </>
  );
}

export function ArticleUpload(props) {
  return (
    <>
      <PDFUpload />
    </>
  );
}

export function CreatePost(props) {
  return <PostForm />;
}
