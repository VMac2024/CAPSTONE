import { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  );
}

export default App;
