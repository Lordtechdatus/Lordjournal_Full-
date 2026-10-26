import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FORGOT_PASSWORD_STYLE_ID = "forgot-password-inline-styles";

const styles = `
.forgot-password-page {
  width: 100%;
  min-height: 100vh;
  padding: 120px 20px 40px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #ffffff 0%, #f0f2f7 100%);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  text-align: center;
}

.forgot-password-brand {
  margin-bottom: 12px;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.forgot-password-subtitle {
  margin: 0 0 34px;
  color: #555;
  font-size: 1.05rem;
}

.forgot-password-card {
  width: min(460px, 100%);
  margin: 0 auto;
  padding: 36px;
  box-sizing: border-box;
  border: 1px solid #e8edf5;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.09);
  text-align: left;
}

.forgot-password-title {
  margin: 0 0 10px;
  color: #1f2937;
  font-size: 1.55rem;
  font-weight: 700;
  text-align: center;
}

.forgot-password-description {
  margin: 0 0 24px;
  color: #6b7280;
  font-size: 0.92rem;
  line-height: 1.55;
  text-align: center;
}

.forgot-password-label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 650;
}

.forgot-password-input {
  display: block;
  width: 100%;
  padding: 15px 16px;
  box-sizing: border-box;
  border: 1.5px solid #e1e5ee;
  border-radius: 12px;
  outline: none;
  background: #f8fafc;
  color: #333;
  font: inherit;
  font-size: 1rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.forgot-password-input:focus {
  border-color: #4285f4;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.15);
}

.forgot-password-message {
  margin: 0 0 18px;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.45;
}

.forgot-password-message-success {
  border: 1px solid #86efac;
  background: #dcfce7;
  color: #166534;
}

.forgot-password-message-error {
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #b91c1c;
}

.forgot-password-submit {
  width: 100%;
  margin-top: 20px;
  padding: 15px 24px;
  border: none;
  border-radius: 12px;
  background: #0052cc;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 650;
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.forgot-password-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  background: linear-gradient(45deg, #003d99, #2a75f3);
  box-shadow: 0 7px 16px rgba(0, 82, 204, 0.3);
}

.forgot-password-submit:disabled {
  cursor: not-allowed;
  opacity: 0.68;
}

.forgot-password-back {
  display: block;
  margin-top: 22px;
  color: #4285f4;
  font-size: 0.92rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
}

.forgot-password-back:hover {
  color: #0052cc;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .forgot-password-page {
    padding: 100px 15px 32px;
  }

  .forgot-password-brand {
    font-size: 2.15rem;
  }

  .forgot-password-card {
    padding: 28px 22px;
  }
}
`;

function ForgotPassword() {
  const navigate = useNavigate();
  const redirectTimerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!document.getElementById(FORGOT_PASSWORD_STYLE_ID)) {
      const styleTag = document.createElement("style");
      styleTag.id = FORGOT_PASSWORD_STYLE_ID;
      styleTag.type = "text/css";
      styleTag.appendChild(document.createTextNode(styles));
      document.head.appendChild(styleTag);
    }

    return () => clearTimeout(redirectTimerRef.current);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || "Email is not registered or the request failed."
        );
      }

      localStorage.setItem("resetEmail", cleanEmail);
      setSuccessMessage("OTP has been sent to your email.");

      redirectTimerRef.current = setTimeout(() => {
        navigate("/verify-otp");
      }, 900);
    } catch (error) {
      setErrorMessage(
        error.message || "Unable to send OTP. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="forgot-password-page">
      <div className="forgot-password-brand">
        Lord Journal <span style={{ fontWeight: 300 }}>Password Reset</span>
      </div>

      <p className="forgot-password-subtitle">
        Securely recover access to your account
      </p>

      <section className="forgot-password-card">
        <h1 className="forgot-password-title">Forgot Password?</h1>
        <p className="forgot-password-description">
          Enter your registered email address and we will send you a one-time
          password.
        </p>

        {successMessage && (
          <div className="forgot-password-message forgot-password-message-success">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="forgot-password-message forgot-password-message-error">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="forgot-password-email" className="forgot-password-label">
            Email Address
          </label>
          <input
            id="forgot-password-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="forgot-password-input"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            className="forgot-password-submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <Link to="/login" className="forgot-password-back">
          Back to Login
        </Link>
      </section>
    </main>
  );
}

export default ForgotPassword;
