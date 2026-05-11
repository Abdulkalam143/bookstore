import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate latency

    let result;
    if (mode === "login") {
      result = login(form.email, form.password);
    } else {
      result = register(form.name, form.email, form.password);
    }

    setLoading(false);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-bg">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
      </div>

      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-logo">
            <BookOpen size={30} />
            <span>Bibliophile</span>
          </Link>
          <h1>{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p>{mode === "login" ? "Sign in to your library" : "Join 150,000+ readers today"}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" id="auth-form">
          {mode === "register" && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                id="auth-name"
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              id="auth-email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                id="auth-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={loading}
            id="auth-submit"
          >
            {loading ? (
              <span className="loading-spinner" />
            ) : mode === "login" ? (
              <><LogIn size={18} /> Sign In</>
            ) : (
              <><UserPlus size={18} /> Create Account</>
            )}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-switch">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => setMode("register")} className="auth-switch-btn" id="switch-to-register">
                Sign up free
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="auth-switch-btn" id="switch-to-login">
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
