import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function LoginPage() {
  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <LoginForm />
      <SignUpForm />
    </div>
  );
}
