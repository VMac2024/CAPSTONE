import { Outlet } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function LoginPage() {
  return (
    <div className="LoginPage">
      <Outlet />
    </div>
  );
}
