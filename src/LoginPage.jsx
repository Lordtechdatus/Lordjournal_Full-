import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkEmail, adminLogin, googleLogin } from '../server/FetchNodeAdmin';
import { notyf } from './utils/notyf';

const LOGIN_STYLE_ID = 'login-inline-styles';

const styles = `
.login-container {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 120px 20px 40px;
  text-align: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f0f2f7 100%);
}

.login-brand {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.login-subtitle {
  color: #555;
  margin-bottom: 40px;
  font-size: 1.1rem;
  font-weight: 400;
}

.login-box {
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
  perspective: 1000px;
}

.login-column {
  flex: 1;
  min-width: 300px;
  background: white;
  padding: 35px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
}

.login-column:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.08);
  transform: translateY(-5px);
}

.login-column h3 {
  font-size: 1.5rem;
  margin-bottom: 25px;
  font-weight: 600;
  color: #333;
}

.input-container {
  position: relative;
  margin: 20px 0;
}

.login-input {
  display: block;
  width: 100%;
  padding: 15px 16px;
  font-size: 1rem;
  border: 1.5px solid #e1e5ee;
  border-radius: 12px;
  box-sizing: border-box;
  background-color: #f8fafc;
  color: #333;
  transition: all 0.25s ease;
  font-family: inherit;
}

.login-input:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.15);
  background-color: #fff;
  transform: translateY(-2px);
}

.login-input::placeholder {
  color: #a0aec0;
  transition: all 0.25s ease;
}

.login-input:focus::placeholder {
  opacity: 0.5;
  transform: translateX(5px);
}

.login-button {
  background: #0052cc;
  color: white;
  padding: 15px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
}

.login-button:hover {
  background: linear-gradient(45deg, #003d99, #2a75f3);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 82, 204, 0.3);
}

.login-button:active {
  transform: translateY(1px);
}

.forgot-password-link-wrap {
  margin: -8px 0 6px;
  text-align: right;
}

.forgot-password-link {
  color: #4285f4;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-password-link:hover {
  color: #0052cc;
  text-decoration: underline;
}

.google-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  min-height: 44px;
}

.form-footer {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #6b7280;
}

.form-footer a {
  color: #4285f4;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.form-footer a:hover {
  color: #0052cc;
}

@media (max-width: 768px) {
  .login-box {
    flex-direction: column;
    gap: 1.5rem;
  }
  .login-container {
    padding: 100px 15px 40px;
  }
  .login-brand {
    font-size: 2.2rem;
  }
  .login-column {
    padding: 25px 20px;
  }
}`;

function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById(LOGIN_STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = LOGIN_STYLE_ID;
      tag.type = 'text/css';
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }

    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }
  }, []);

  // Initialize Google Identity Services
  useEffect(() => {
    const clientId = '513447738204-t72iq6dqng049ou3ntbcthq0588jfr27.apps.googleusercontent.com';

    const initGoogle = () => {
      const gis = window.google?.accounts?.id;
      if (!gis) return;

      gis.initialize({
        client_id: clientId,
        callback: async (response) => {
          if (response?.credential) {
            try {
              const authResponse = await googleLogin(response.credential);
              const payload = JSON.parse(atob(response.credential.split('.')[1]));

              localStorage.removeItem('adminAuthToken');
              localStorage.removeItem('adminRole');
              localStorage.setItem('googleCredential', response.credential);
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem(
                'userEmail',
                authResponse.user?.email || payload.email || ''
              );
              localStorage.setItem(
                'userName',
                authResponse.user?.given_names ||
                  payload.name ||
                  payload.given_name ||
                  ''
              );
              window.dispatchEvent(new Event('lj-auth-change'));
              navigate('/profile');
            } catch (err) {
              console.error('Google login error:', err);
              notyf.error(err.message || 'Google login failed. Please try again.');
            }
          }
        },
        ux_mode: 'popup',
      });

      if (googleBtnRef.current) {
        gis.renderButton(googleBtnRef.current, {
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          width: 260,
          logo_alignment: 'left',
          text: 'continue_with',
        });
      }
    };

    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      // Remove existing GIS script if any to avoid duplicates
      const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existing) {
        existing.onload = initGoogle;
      } else {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initGoogle;
        document.head.appendChild(script);
      }
    }
  }, [navigate]);

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      notyf.error('Enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      if (!showPasswordInput) {
        const response = await checkEmail(email);
        if (response.success) {
          if (response.exists) {
            setUserExists(true);
            setShowPasswordInput(true);
          } else {
            navigate('/register', { state: { email } });
          }
        } else {
          notyf.error(response.message || 'Something went wrong. Please try again.');
        }
      } else {
        const loginResponse = await adminLogin({ email, password });
        if (loginResponse.success || loginResponse.token) {
          localStorage.removeItem('adminAuthToken');
          localStorage.removeItem('adminRole');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', loginResponse.user?.given_names || email.split('@')[0]);
          window.dispatchEvent(new Event('lj-auth-change'));
          navigate('/profile');
        } else {
          notyf.error(loginResponse.message || 'Login failed. Please check your password.');
        }
      }
    } catch (error) {
      notyf.error('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowPasswordInput(false);
    setUserExists(false);
    setPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-brand" style={{ animation: 'fadeInDown 0.6s ease-out' }}>
        Lord Journal <span style={{ fontWeight: 300 }}>Login</span>
      </div>

      <p className="login-subtitle" style={{ animation: 'fadeIn 0.8s ease-out' }}>
        Access research faster and smarter
      </p>

      <div className="login-box">
        {/* Left column - Google login */}
        <div className="login-column" style={{ animation: 'fadeInLeft 0.6s ease-out' }}>
          <h3>Quick Access</h3>
          <div className="google-btn-wrapper">
            <div ref={googleBtnRef} aria-label="Continue with Google" />
          </div>
          <p className="form-footer">
            By continuing, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>

        {/* Right column - Email/Password login */}
        <form
          onSubmit={handleSubmit}
          className="login-column"
          style={{ animation: 'fadeInRight 0.6s ease-out' }}
        >
          <h3>{showPasswordInput ? 'Enter Your Password' : 'Enter Your Email'}</h3>
          <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem' }}>
            {showPasswordInput
              ? `Welcome back! Please enter your password for ${email}`
              : "We'll check if you have an account"}
          </p>

          {!showPasswordInput ? (
            <div className="input-container">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
                className="login-input"
                autoComplete="email"
                style={emailFocused ? { transform: 'translateY(-2px)' } : {}}
              />
            </div>
          ) : (
            <>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  className="login-input"
                  autoComplete="current-password"
                  style={passwordFocused ? { transform: 'translateY(-2px)' } : {}}
                />
              </div>
              <div className="forgot-password-link-wrap">
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>
              <button
                type="button"
                onClick={handleBackToEmail}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginBottom: '20px',
                  textDecoration: 'underline',
                }}
              >
                ← Use different email
              </button>
            </>
          )}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Please wait...' : showPasswordInput ? 'Login' : 'Continue'}
          </button>

        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
