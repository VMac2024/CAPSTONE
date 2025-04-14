import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import AboutPage from "../pages/AboutPage";
import ArticlesPage from "../pages/ArticlesPage";
import Homepage from "../pages/HomePage";
import { PostList } from "../components/PostList";
import DashboardPage, { ArticleUpload, CreatePost } from "../pages/Dashboard";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<Homepage {...props} />} />
      <Route path="/posts" element={<PostPage {...props} />}>
        <Route index element={<PostList />} />
      </Route>
      <Route path="/loginpage/*" element={<LoginPage {...props} />}>
        <Route index element={<LoginForm />} />
        <Route path="SignUpForm" element={<SignUpForm />} />
      </Route>
      <Route path="/about" element={<AboutPage {...props} />} />
      <Route path="/articles" element={<ArticlesPage {...props} />} />
      <Route path="/dash/*" element={<DashboardPage {...props} />}>
        <Route path="articleUpload" element={<ArticleUpload />} />
        <Route path="createPost" element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
