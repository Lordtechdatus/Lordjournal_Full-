import { useEffect, useState } from 'react';

// Simple API client for Node admin backend
// Auto-detect environment and use appropriate API base URL
const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';
const API_BASE = isProduction 
  ? '/api'  // Production: use proxy from vite.config.js
  : 'http://localhost:3000/api';  // Local: connect directly to backend
const TOKEN_STORAGE_KEY = 'adminAuthToken';

// API helper functions
async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

export async function healthCheck() {
  return makeRequest('/health');
}

export async function adminLogin(credentials) {
  const response = await makeRequest('/registration/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  
  if (response.token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
  }
  
  return response;
}

// Registration API functions
export async function checkEmail(email) {
  return makeRequest('/registration/check-email', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

export async function registerUser(userData) {
  return makeRequest('/registration/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  
}

export async function verifyEmail(token) {
  return makeRequest(`/registration/verify/${token}`);
}

export async function getUserProfile(email) {
  return makeRequest(`/registration/profile/${email}`);
}

export async function submitPaper(submissionData) {
  // Check if submissionData is FormData (file upload) or regular object
  if (submissionData instanceof FormData) {
    // For file uploads, don't set Content-Type header, let browser set it with boundary
    const response = await fetch(`${API_BASE}/registration/submit-paper`, {
      method: 'POST',
      body: submissionData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } else {
    // For regular JSON submissions
    return makeRequest('/registration/submit-paper', {
      method: 'POST',
      body: JSON.stringify(submissionData)
    });
  }
}

export async function updateProfile(profileData) {
  return makeRequest('/registration/update-profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
}

export async function recordCookieConsent(consentData) {
  return makeRequest('/registration/cookie-consent', {
    method: 'POST',
    body: JSON.stringify(consentData)
  });
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

// Admin API functions
export async function fetchAdminSubmissions(filters = {}) {
  const authToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  const queryParams = new URLSearchParams(filters);
  
  return makeRequest(`/admin/submissions?${queryParams}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
}

export async function updateSubmissionStatus(submissionId, status) {
  const authToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  
  return makeRequest(`/admin/submissions/${submissionId}/status`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ status })
  });
}

export async function downloadSubmissionFile(submissionId) {
  const authToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  
  const response = await fetch(`/api/admin/submissions/${submissionId}/download`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.blob();
}

export async function fetchDashboardStats() {
  const authToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  
  return makeRequest('/admin/dashboard/stats', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
}

// Connection Test Component
export default function ConnectionTest() {
  const [status, setStatus] = useState('checking...');
  const [detail, setDetail] = useState('');

  const checkConnection = async () => {
    setStatus('checking...');
    setDetail('');
    
    try {
      const res = await healthCheck();
      setStatus('✅ Connected to Backend');
      setDetail(`API Base: ${API_BASE}\nResponse: ${JSON.stringify(res, null, 2)}`);
    } catch (err) {
      setStatus('❌ Connection Failed');
      setDetail(`Error: ${err.message}\n\nMake sure your backend is running on ${API_BASE}`);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div style={{ 
      fontFamily: 'system-ui', 
      padding: '20px',
      maxWidth: '500px',
      margin: '20px auto',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>🔌 Backend Connection Test</h3>
      <p><strong>Status:</strong> {status}</p>
      {detail && (
        <pre style={{ 
          background: '#f0f0f0', 
          padding: '12px', 
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto'
        }}>
          {detail}
        </pre>
      )}
      <button 
        onClick={checkConnection}
        style={{ 
          padding: '10px 16px',
          marginTop: '12px',
          backgroundColor: '#007bff',
          cursor: 'pointer'
        }}
      >
        🔄 Test Again
      </button>
    </div>
  );
}
