import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import EventPage from "../pages/EventPage";
import AboutPage from "../pages/AboutPage";
import ArticlesPage from "../pages/ArticlesPage";
import Homepage from "../pages/HomePage";
import { Post } from "../components/Post";
import { PostList } from "../components/PostList";
import DashboardPage, { ArticleUpload, CreatePost } from "../pages/Dashboard";

function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<Homepage {...props} />} />
      <Route path="/posts" element={<PostPage {...props} />}>
        <Route index element={<PostList />} />
        {/* dynamic param taken from route, stored in variable called id */}
        <Route path=":id" element={<Post />} />
      </Route>
      <Route path="/loginpage" element={<LoginPage {...props} />} />
      <Route path="/events" element={<EventPage {...props} />} />
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
/*<Route path="dash" element={<ProtectedRoute>
<DashboardPage {...props} /></ProtectedRoute>}>
<Route path="messages" element={<DashboardMessages />} />
<Route path="tasks" element={<DashboardTasks />} />
</Route>
<Route path="login" element={<LoginForm/>} />
// update NavBar.jsx to include our login page
<li><NavLink to="/login">Login</NavLink></li> */
