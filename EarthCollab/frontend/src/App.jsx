import { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/userContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserProvider>
        <NavBar />
        <AppRoutes />
      </UserProvider>
    </>
  );
}

export default App;
