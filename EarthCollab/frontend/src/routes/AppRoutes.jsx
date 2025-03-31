import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import EventPage from "../pages/EventPage";
import AboutPage from "../pages/AboutPage";
import ArticlesPage from "../pages/ArticlesPage";
import Homepage from "../pages/HomePage";

function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<Homepage {...props} />} />
      <Route path="/posts" element={<PostPage {...props} />} />{" "}
      {/* Look at dynamic param taken from route & stored in variable per lab7 react - AppRoutes7 for Posts.*/}
      <Route path="/loginpage" element={<LoginPage {...props} />} />
      <Route path="/postpage" element={<PostPage {...props} />} />
      <Route path="/events" element={<EventPage {...props} />} />
      <Route path="/about" element={<AboutPage {...props} />} />
      <Route path="/articles" element={<ArticlesPage {...props} />} />
    </Routes>
  );
}

export default AppRoutes;
