import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import EventPage from "../pages/EventPage";
import AboutPage from "../pages/AboutPage";
import ResourcesPage from "../pages/EventPage copy";

function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<Homepage {...props} />} />
      <Route path="/posts" element={<PostPage {...props} />} />{" "}
      {/* Look at dynamic param taken from route & stored in variable per lab7 react - AppRoutes7 for Posts.*/}
      <Route path="/login" element={<LoginPage {...props} />} />
      <Route path="/events" element={<EventPage {...props} />} />
      <Route path="/about" element={<AboutPage {...props} />} />
      <Route path="/resources" element={<ResourcesPage {...props} />} />
    </Routes>
  );
}

export default AppRoutes;
