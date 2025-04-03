import { useData } from "../hooks/useData";
import { useParams } from "react-router-dom";

// add to PostsPage.jsx
export function Post() {
  const { id } = useParams(); // custom hook to access dynamic params
  const post = useData("https://jsonplaceholder.typicode.com/posts/" + id);
  return (
    <div className="Post">
      {post ? (
        <>
          <h3>
            Post #{post.id}: {post.title}
          </h3>
          <p>{post.body}</p>
        </>
      ) : (
        "Loading ..."
      )}
    </div>
  );
}
// ++ Add a Next Post button to the Post component
