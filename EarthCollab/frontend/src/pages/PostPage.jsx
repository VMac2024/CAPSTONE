import { Outlet, useNavigate } from "react-router-dom";
import { PostList } from "../components/PostList";

export default function PostPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="PostPage">
        <h1>GreenEarth Posts</h1>
      </div>
      <Outlet />
    </>
  );
}
