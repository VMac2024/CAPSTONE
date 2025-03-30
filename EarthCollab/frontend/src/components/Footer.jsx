//import { useThemeContext } from "../context/MyThemeContext";

export default function Footer() {
  //const { theme } = useThemeContext();

  return (
    <div className="footer" style={{ backgroundColor: theme.background, color: theme.foreground }}>
      <h5>Copyright 2025 </h5>
    </div>
  );
}
