import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { FiLogIn } from "react-icons/fi";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || `/`;

  return (
    <section className="login-page">
      <div className="login-card">
        <FiLogIn className="login-icon" />
        <h2>Welcome Back</h2>
        <p>Sign in to access your settings and personalized content.</p>
        <button
          className="login-btn"
          onClick={() => {
            login();
            navigate(from);
          }}
        >
          <FiLogIn /> Sign In
        </button>
      </div>
    </section>
  );
}
