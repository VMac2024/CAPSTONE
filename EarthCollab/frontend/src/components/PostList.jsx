import { Link, useSearchParams } from "react-router-dom";
import { useData } from "../hooks/useData";

//include search function
export function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") ? searchParams.get("limit") : 5;
  const postsData = useData("https://jsonplaceholder.typicode.com/posts?_limit=5"); //change to api/posts.. Placeholder used initially for setup.
  // the ? means only call map if postsData is not null

  const handleChangeLimit = (e) => {
    setSearchParams({ limit: e.target.value });
  };

  const postList = postsData?.map((post) => (
    <li key={post.id}>
      <Link to={"/posts/" + post.id}>
        Post #{post.id}: {post.title}
      </Link>
    </li>
  ));
  return (
    <>
      <ul>{postList}</ul>
      <label>
        Show number of posts:
        <select onChange={handleChangeLimit}>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
      </label>
    </>
  );
}

/*  const postList = postsData?.map((post) => (
    <li key={post.id}>
      <Link to={"/posts/" + post.id}> 
        Post #{post.id}: {post.title}
      </Link>
    </li>
  )); */
