import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ADMIN_LOGIN_STYLE_ID = "admin-login-inline-styles";
const AUTH_CHANGE_EVENT = "lj-auth-change";

const styles = `
.admin-login-page {
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(circle at top left, rgba(0, 82, 204, 0.12), transparent 34%),
    linear-gradient(135deg, #f8fafc 0%, #eef4fb 50%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 110px 20px 40px;
  box-sizing: border-box;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.admin-login-shell {
  width: 100%;
  max-width: 1040px;
  min-height: 580px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  background: #ffffff;
  border-radius: 28px;
  overflow: hidden;
  box-shadow:
    0 30px 80px rgba(15, 23, 42, 0.14),
    0 12px 32px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.admin-login-visual {
  position: relative;
  padding: 48px;
  color: #ffffff;
  background:
    radial-gradient(circle at 20% 20%, rgba(66, 133, 244, 0.45), transparent 32%),
    radial-gradient(circle at 90% 80%, rgba(52, 211, 153, 0.22), transparent 34%),
    linear-gradient(135deg, #071821 0%, #0a2a38 52%, #123f58 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.admin-login-visual::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 34px 34px;
  opacity: 0.75;
  pointer-events: none;
}

.admin-login-brand,
.admin-login-visual-content {
  position: relative;
  z-index: 1;
}

.admin-login-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.admin-login-logo {
  width: 48px;
  height: 48px;
  border-radius: 15px;
  background: linear-gradient(135deg, #ffffff, #dceaff);
  color: #0052cc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  letter-spacing: -0.04em;
  box-shadow: 0 16px 34px rgba(0, 82, 204, 0.28);
  flex-shrink: 0;
}

.admin-login-brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.admin-login-brand-title {
  font-size: 1.35rem;
  font-weight: 850;
  color: #ffffff;
  letter-spacing: -0.03em;
}

.admin-login-brand-subtitle {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.62);
  margin-top: 4px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.admin-login-visual-content {
  margin-top: 92px;
  max-width: 470px;
}

.admin-login-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.84);
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 22px;
}

.admin-login-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 6px rgba(52, 211, 153, 0.12);
}

.admin-login-visual-title {
  font-size: clamp(2.1rem, 4vw, 3.3rem);
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.055em;
  margin: 0 0 18px;
  color: #ffffff;
}

.admin-login-visual-text {
  max-width: 430px;
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.72);
  margin: 0;
}

.admin-login-panel {
  padding: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-login-form-wrap {
  width: 100%;
  max-width: 390px;
}

.admin-login-header {
  margin-bottom: 30px;
}

.admin-login-eyebrow {
  color: #0052cc;
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.admin-login-title {
  margin: 0 0 10px;
  color: #0f172a;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.04em;
}

.admin-login-subtitle {
  color: #64748b;
  font-size: 0.96rem;
  line-height: 1.6;
  margin: 0;
}

.admin-login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.admin-login-error {
  background: #fff1f2;
  color: #be123c;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #fecdd3;
  font-size: 0.9rem;
  font-weight: 600;
}

.admin-login-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-login-label {
  color: #1e293b;
  font-size: 0.9rem;
  font-weight: 750;
}

.admin-login-input-wrap {
  position: relative;
}

.admin-login-input {
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: 1.5px solid #dbe3ef;
  border-radius: 14px;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.96rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-sizing: border-box;
}

.admin-login-input:focus {
  border-color: #0052cc;
  box-shadow: 0 0 0 4px rgba(0, 82, 204, 0.10);
}

.admin-login-input::placeholder {
  color: #94a3b8;
}

.admin-login-password-input {
  padding-right: 86px;
}

.admin-login-password-toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 34px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: #f1f5f9;
  color: #334155;
  font-size: 0.8rem;
  font-weight: 750;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.admin-login-password-toggle:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.admin-login-submit {
  width: 100%;
  height: 52px;
  margin-top: 4px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #0052cc, #2877f0);
  color: #ffffff;
  font-size: 0.98rem;
  font-weight: 850;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(0, 82, 204, 0.28);
  transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.22s ease;
}

.admin-login-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 18px 38px rgba(0, 82, 204, 0.36);
}

.admin-login-submit:disabled {
  opacity: 0.68;
  cursor: not-allowed;
}

.admin-login-footer {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid #e5eaf1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.admin-login-note {
  color: #64748b;
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 0;
}

.admin-login-home {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 8px;
  color: #0052cc;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 800;
}

.admin-login-home:hover {
  text-decoration: underline;
}

@media (max-width: 920px) {
  .admin-login-page {
    padding: 95px 18px 34px;
  }

  .admin-login-shell {
    grid-template-columns: 1fr;
    max-width: 620px;
  }

  .admin-login-visual {
    padding: 34px;
  }

  .admin-login-visual-content {
    margin-top: 42px;
  }

  .admin-login-panel {
    padding: 38px 34px 42px;
  }

  .admin-login-form-wrap {
    max-width: 100%;
  }
}

@media (max-width: 560px) {
  .admin-login-page {
    padding: 86px 14px 26px;
  }

  .admin-login-shell {
    border-radius: 22px;
  }

  .admin-login-visual {
    padding: 26px;
  }

  .admin-login-logo {
    width: 42px;
    height: 42px;
    border-radius: 13px;
  }

  .admin-login-brand-title {
    font-size: 1.18rem;
  }

  .admin-login-visual-content {
    margin-top: 34px;
  }

  .admin-login-visual-title {
    font-size: 2rem;
  }

  .admin-login-panel {
    padding: 30px 22px 34px;
  }

  .admin-login-title {
    font-size: 1.72rem;
  }
}
`;

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    let tag = document.getElementById(ADMIN_LOGIN_STYLE_ID);

    if (!tag) {
      tag = document.createElement("style");
      tag.id = ADMIN_LOGIN_STYLE_ID;
      tag.type = "text/css";
      document.head.appendChild(tag);
    }

    tag.textContent = styles;
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("adminAuthToken");
    const userEmail = localStorage.getItem("userEmail");

    if (authToken && userEmail === "admin@lordjournal.com") {
      setIsLoggedIn(true);
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        setError(data?.message || "Invalid admin credentials.");
        return;
      }

      const admin = data.admin || {};
      const adminName = [admin.given_names, admin.family_name]
        .filter(Boolean)
        .join(" ")
        .trim();

      localStorage.setItem("adminAuthToken", data.token);
      localStorage.setItem("userEmail", admin.email || cleanEmail);
      localStorage.setItem("userName", adminName || admin.email || cleanEmail);
      localStorage.setItem("adminRole", admin.role || "admin");
      localStorage.setItem("isLoggedIn", "true");

      window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));

      setIsLoggedIn(true);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError("Login failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-shell">
        <div className="admin-login-visual">
          <div className="admin-login-brand">
            <div className="admin-login-logo">LJ</div>

            <div className="admin-login-brand-text">
              <div className="admin-login-brand-title">LordJournals</div>
              <div className="admin-login-brand-subtitle">Admin Portal</div>
            </div>
          </div>

          <div className="admin-login-visual-content">
            <div className="admin-login-badge">
              <span className="admin-login-badge-dot" />
              Secure Editorial Access
            </div>

            <h1 className="admin-login-visual-title">
              Manage submissions with clarity and control.
            </h1>

            <p className="admin-login-visual-text">
              Access the administrative dashboard to review manuscripts, manage
              journal records, and monitor editorial workflows.
            </p>
          </div>
        </div>

        <div className="admin-login-panel">
          <div className="admin-login-form-wrap">
            <div className="admin-login-header">
              <div className="admin-login-eyebrow">Restricted Access</div>

              <h2 className="admin-login-title">Admin Login</h2>

              <p className="admin-login-subtitle">
                Sign in with authorized administrator credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="admin-login-form">
              {error && <div className="admin-login-error">{error}</div>}

              <div className="admin-login-group">
                <label htmlFor="admin-email" className="admin-login-label">
                  Email Address
                </label>

                <div className="admin-login-input-wrap">
                  <input
                    type="email"
                    id="admin-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="admin-login-input"
                    placeholder="admin@lordjournal.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="admin-login-group">
                <label htmlFor="admin-password" className="admin-login-label">
                  Password
                </label>

                <div className="admin-login-input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="admin-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="admin-login-input admin-login-password-input"
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="admin-login-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="admin-login-submit"
              >
                {isLoading ? "Signing in..." : "Login to Dashboard"}
              </button>
            </form>

            <div className="admin-login-footer">
              <p className="admin-login-note">
                Only authorized LordJournals administrators are permitted to
                access this area.
              </p>

              <Link to="/" className="admin-login-home">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;