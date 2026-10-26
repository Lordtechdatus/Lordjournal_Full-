import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerUser } from '../server/FetchNodeAdmin';
import { notyf } from './utils/notyf';

const REGISTER_STYLE_ID = 'register-inline-styles';

const styles = `
.register-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  text-align: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,242,247,0.9) 100%);
}

.register-brand {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.register-subtitle {
  color: #555;
  margin-bottom: 40px;
  font-size: 1.1rem;
  font-weight: 400;
}

.register-box {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
}

.register-email {
  color: #0052cc;
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1.5px solid #e1e5ee;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #f8fafc;
  color: #333;
  transition: all 0.25s ease;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.15);
  background-color: #fff;
}

.password-requirements {
  font-size: 0.8rem;
  color: #666;
  margin-top: 4px;
}

.password-toggle {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 10px;
}

.password-toggle:hover {
  color: #333;
}

.terms-section {
  margin: 30px 0;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e1e5ee;
}

.terms-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 15px;
}

.terms-checkbox input[type="checkbox"] {
  width: auto;
  margin-top: 2px;
}

.terms-checkbox label {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;
}

.terms-checkbox a {
  color: #0052cc;
  text-decoration: none;
}

.terms-checkbox a:hover {
  text-decoration: underline;
}

.marketing-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 15px;
}

.marketing-checkbox input[type="checkbox"] {
  width: auto;
  margin-top: 2px;
}

.marketing-checkbox label {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #666;
}

.marketing-checkbox a {
  color: #0052cc;
  text-decoration: none;
}

.marketing-checkbox a:hover {
  text-decoration: underline;
}

.marketing-note {
  font-size: 0.8rem;
  color: #888;
  line-height: 1.4;
  margin-top: 10px;
}

.register-button {
  background: #0052cc;
  color: white;
  padding: 15px 32px;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
  margin-top: 20px;
}

.register-button:hover {
  background: linear-gradient(45deg, #003d99, #2a75f3);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 82, 204, 0.3);
}

.register-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #0052cc;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .register-container {
    padding: 100px 15px 40px;
  }
  
  .register-brand {
    font-size: 2.2rem;
  }
  
  .register-box {
    padding: 25px 20px;
  }
}`;

function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  
  const [formData, setFormData] = useState({
    givenNames: '',
    familyName: '',
    password: '',
    repeatPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById(REGISTER_STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = REGISTER_STYLE_ID;
      tag.type = 'text/css';
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }

    // Add Inter font if not already present
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }

    // Redirect if no email provided
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isPasswordValid = (password) => {
    return password.length >= 12;
  };

  const doPasswordsMatch = () => {
    return formData.password === formData.repeatPassword;
  };

  const isFormValid = () => {
    const isValid = (
      formData.givenNames.trim() &&
      formData.familyName.trim() &&
      isPasswordValid(formData.password) &&
      doPasswordsMatch() &&
      termsAccepted
    );
    

    
    return isValid;
  };

  // Add real-time validation feedback
  const getValidationMessage = () => {
    if (!formData.givenNames.trim()) return 'Please enter your Full Name';
    if (!formData.familyName.trim()) return 'Please enter your family name';
    if (!isPasswordValid(formData.password)) return 'Password must be at least 12 characters';
    if (!doPasswordsMatch()) return 'Passwords do not match';
    if (!termsAccepted) return 'Please accept the terms and conditions';
    return '';
  };

  const validationMessage = getValidationMessage();
  const canSubmit = isFormValid() && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      notyf.error('Please fill in all required fields and accept the terms.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the real registration API
      const response = await registerUser({
        email,
        givenNames: formData.givenNames,
        familyName: formData.familyName,
        password: formData.password,
        termsAccepted,
        marketingAccepted
      });

      if (response.success) {
        notyf.success('Registration successful! Please check your email for verification.');
        navigate('/login');
      } else {
        notyf.error(response.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      notyf.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="register-container">
      <div className="register-brand">
        Lord Journal <span style={{ fontWeight: 300 }}>Registration</span>
      </div>
      
      <p className="register-subtitle">
        Create your account to access research faster and smarter
      </p>

      <div className="register-box">
        <div className="register-header">
          <h3>Create Account</h3>
          <div className="register-email">
            Registering as {email}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <p style={{ color: '#666', marginBottom: '25px', fontSize: '1rem' }}>
            Enter your personal details
          </p>

              {/* Progress Indicator */}
      <div style={{ 
        marginBottom: '25px',
        padding: '15px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e1e5ee'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333' }}>
            Form Completion
          </span>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>
            {formData.givenNames.trim() === '' ? 0 : Math.round(([
              formData.givenNames.trim(),
              formData.familyName.trim(),
              isPasswordValid(formData.password),
              doPasswordsMatch(),
              termsAccepted
            ].filter(Boolean).length / 5) * 100)}%
          </span>
        </div>
        <div style={{ 
          width: '100%', 
          height: '6px', 
          backgroundColor: '#e1e5ee', 
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: formData.givenNames.trim() === '' ? '0%' : `${([
              formData.givenNames.trim(),
              formData.familyName.trim(),
              isPasswordValid(formData.password),
              doPasswordsMatch(),
              termsAccepted
            ].filter(Boolean).length / 5) * 100}%`,
            height: '100%',
            backgroundColor: '#10b981',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="givenNames">Full Name</label>
              <input
                type="text"
                id="givenNames"
                value={formData.givenNames}
                onChange={(e) => handleInputChange('givenNames', e.target.value)}
                required
                placeholder="Enter your Full Name"
                style={{
                  borderColor: formData.givenNames.trim() ? '#10b981' : '#e5e7eb',
                  backgroundColor: formData.givenNames.trim() ? '#f0fdf4' : '#f8fafc'
                }}
              />
              {formData.givenNames.trim() && (
                <span style={{ color: '#10b981', fontSize: '0.8rem', marginLeft: '8px' }}>✓</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="familyName">Family name</label>
              <input
                type="text"
                id="familyName"
                value={formData.familyName}
                onChange={(e) => handleInputChange('familyName', e.target.value)}
                required
                placeholder="Enter your family name"
                style={{
                  borderColor: formData.familyName.trim() ? '#10b981' : '#e5e7eb',
                  backgroundColor: formData.familyName.trim() ? '#f0fdf4' : '#f8fafc'
                }}
              />
              {formData.familyName.trim() && (
                <span style={{ color: '#10b981', fontSize: '0.8rem', marginLeft: '8px' }}>✓</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
              <span className="password-requirements"> (12 or more characters)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                placeholder="Enter your password"
                style={{ 
                  paddingRight: '50px',
                  borderColor: isPasswordValid(formData.password) ? '#10b981' : '#e5e7eb',
                  backgroundColor: isPasswordValid(formData.password) ? '#f0fdf4' : '#f8fafc'
                }}
              />
              {isPasswordValid(formData.password) && (
                <span style={{ 
                  position: 'absolute', 
                  right: '50px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#10b981',
                  fontSize: '0.8rem'
                }}>✓</span>
              )}
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
              >
                {showPassword ? 'hide' : 'show'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="repeatPassword">Repeat password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                id="repeatPassword"
                value={formData.repeatPassword}
                onChange={(e) => handleInputChange('repeatPassword', e.target.value)}
                required
                placeholder="Repeat your password"
                style={{ 
                  paddingRight: '50px',
                  borderColor: doPasswordsMatch() && formData.password ? '#10b981' : '#e5e7eb',
                  backgroundColor: doPasswordsMatch() && formData.password ? '#f0fdf4' : '#f8fafc'
                }}
              />
              {doPasswordsMatch() && formData.password && (
                <span style={{ 
                  position: 'absolute', 
                  right: '50px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#10b981',
                  fontSize: '0.8rem'
                }}>✓</span>
              )}
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
              >
                {showRepeatPassword ? 'hide' : 'show'}
              </button>
            </div>
          </div>

          <div className="terms-section">
            <p style={{ fontWeight: '600', marginBottom: '15px', color: '#333' }}>
              Complete Terms and Conditions and Marketing preferences
            </p>
            
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                style={{ 
                  width: '18px', 
                  height: '18px',
                  accentColor: '#10b981'
                }}
              />
              <label htmlFor="terms" style={{ 
                color: termsAccepted ? '#10b981' : '#333',
                fontWeight: termsAccepted ? '600' : '400'
              }}>
                I agree to the{' '}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Lord Journal terms of use
                </a>
                {termsAccepted && <span style={{ marginLeft: '8px', color: '#10b981' }}>✓</span>}
              </label>
            </div>

            <div className="marketing-checkbox">
              <input
                type="checkbox"
                id="marketing"
                checked={marketingAccepted}
                onChange={(e) => setMarketingAccepted(e.target.checked)}
              />
              <label htmlFor="marketing">
                I want to receive marketing emails about Lord Journal products and services, 
                and my email can be used for digital advertising through third-party platforms
              </label>
            </div>

            <p className="marketing-note">
              You can opt out of your email being used for marketing purposes anytime by selecting 
              the link at the bottom of all marketing emails contacting customer services or directly 
              via the third-party platforms.
            </p>

            <p className="marketing-note">
              As a registered user you agree that Lord Journal can collect and use your personal 
              data as detailed in our Privacy Statement.
            </p>
          </div>

          {/* Validation Message */}
          {validationMessage && (
            <div style={{ 
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '4px',
              color: '#856404',
              fontSize: '0.9rem'
            }}>
              ⚠️ {validationMessage}
            </div>
          )}

          <button 
            type="submit" 
            className="register-button"
            disabled={!canSubmit}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <a href="/login" className="back-link">
          ← Try another method of logging in
        </a>
      </div>
    </div>
  );
}

export default RegisterPage;
