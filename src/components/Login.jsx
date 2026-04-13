import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isValid = email.trim() !== "" && password.trim() !== "";

  const handleLogin = () => {
    if (isValid) {
      setIsLoading(true);

      setTimeout(() => {
        localStorage.setItem("user", email.split("@")[0] || email);
        localStorage.setItem("userEmail", email);
        navigate("/home");
      }, 600);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isValid) {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="card-accent"></div>
        
        <div className="card-content">
          <div className="brand-section">
            <div className="logo-wrapper">
              <div className="logo-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="white" stroke="white" strokeWidth="1.2"/>
                  <path d="M12 6L13 9L16 9.5L13.5 11.5L14 14.5L12 13L10 14.5L10.5 11.5L8 9.5L11 9L12 6Z" fill="#667eea"/>
                </svg>
              </div>
            </div>
            <h2 className="welcome-title">Welcome back</h2>
            <p className="welcome-subtitle">Please sign in to your account</p>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="muthupandi@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                className="form-input"
                autoFocus
              />
              <span className="input-focus-ring"></span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                className="form-input password-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="21" y1="3" x2="3" y2="21" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
              <span className="input-focus-ring"></span>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button
            className={`login-btn ${isValid ? "active" : ""}`}
            onClick={handleLogin}
            disabled={isLoading || !isValid}
          >
            {isLoading ? (
              <span className="btn-loader">
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
              </span>
            ) : (
              "Sign in →"
            )}
          </button>

          <div className="signup-prompt">
            <p>Don't have an account? <a href="#">Create account</a></p>
          </div>

          <div className="legal-note">
            <p>By signing in, you agree to our terms</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;