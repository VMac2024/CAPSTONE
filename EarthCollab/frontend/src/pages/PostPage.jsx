import { Outlet } from "react-router-dom";
import { PostList } from "../components/PostList";

export default function PostPage() {
  return (
    <>
      <div className="PostPage">
        <h1>GreenEarth Posts</h1>
      </div>
      <PostList />
    </>
  );
}
