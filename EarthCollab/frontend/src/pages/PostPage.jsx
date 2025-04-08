import { Outlet, useNavigate } from "react-router-dom";
import { PostList } from "../components/PostList";
import { Button } from "@mui/material";

export default function PostPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="PostPage">
        <h1>GreenEarth Posts</h1>
      </div>
      <Button onClick={() => navigate("/dash/createPost")}>Create Post</Button>
      <Outlet />
    </>
  );
}
