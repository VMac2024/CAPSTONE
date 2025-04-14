import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useUserContext } from "../context/userContext";

export default function PostPage() {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="PostPage">
        <h1>GreenEarth Posts</h1>
      </div>
      {currentUser?.id && <Button onClick={() => navigate("/dash/createPost")}>Create Post</Button>}
      <Outlet />
    </>
  );
}
