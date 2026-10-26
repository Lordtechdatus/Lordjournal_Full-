import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateProfile } from '../server/FetchNodeAdmin';
import InstitutionField from './components/InstitutionField';
import { notyf } from './utils/notyf';
import { useWebSocket } from './contexts/WebSocketContext';
import { clearAuthStorage, getIsAdmin } from './utils/auth';

const PROFILE_STYLE_ID = 'profile-inline-styles';







const styles = `
/* NAYA background — purana replace karo */
.profile-container {
  max-width: 1480px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  text-align: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;

  /* Paper texture effect using CSS only */
  background-color: #f7f6f2;
  background-image:
    /* Fine grain noise — paper feel */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"),
    /* Subtle horizontal lines — ruled paper */
    repeating-linear-gradient(
      transparent,
      transparent 39px,
      rgba(0, 52, 130, 0.06) 39px,
      rgba(0, 52, 130, 0.06) 40px
    ),
    /* Warm paper base gradient */
    linear-gradient(175deg, #f0eee8 0%, #f7f6f2 30%, #f4f6fa 70%, #eef2f8 100%);
  background-size: 300px 300px, 100% 40px, 100% 100%;

  /* LJ watermark — bottom right */
  position: relative;
}

/* Watermark overlay */
.profile-container::before {
  content: 'LJ';
  position: fixed;
  bottom: 6%;
  right: 5%;
  font-size: 18vw;
  font-weight: 900;
  color: rgba(0, 82, 204, 0.04);
  font-family: 'Inter', sans-serif;
  pointer-events: none;
  letter-spacing: -0.05em;
  line-height: 1;
  z-index: 0;
  user-select: none;
}

/* Ensure content stays above watermark */
.profile-content,
.profile-header,
.profile-brand,
.profile-subtitle {
  position: relative;
  z-index: 1;
}
  
.profile-brand {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.profile-subtitle {
  color: #555;
  margin-bottom: 40px;
  font-size: 1.1rem;
  font-weight: 400;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.profile-sidebar {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  height: fit-content;
  text-align: center;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 3rem;
  color: white;
  font-weight: 600;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.profile-email {
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
}

.profile-status {
  display: inline-block;
  padding: 6px 16px;
  background: #10b981;
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-action-btn {
  padding: 12px 20px;
  border: 1px solid #e1e5ee;
  background: white;
  color: #333;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.profile-action-btn:hover {
  background: #f8fafc;
  border-color: #0052cc;
  color: #0052cc;
}

.profile-action-btn.danger {
  border-color: #ef4444;
  color: #ef4444;
}

.profile-action-btn.danger:hover {
  background: #fef2f2;
}

.profile-main {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: left;
}

.profile-section {
  margin-bottom: 30px;
}

.profile-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f1f5f9;
}

.profile-field {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}

.profile-field-label {
  width: 150px;
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
}

.profile-field-value {
  flex: 1;
  color: #333;
  font-size: 1rem;
}

.profile-field-value.empty {
  color: #999;
  font-style: italic;
}



.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.profile-stat {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e1e5ee;
}

.profile-stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #0052cc;
  margin-bottom: 8px;
}

.profile-stat-label {
  color: #666;
  font-size: 0.9rem;
}

.journal-submissions {
  margin-top: 20px;
}

.submission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.submission-card {
  background: #f8fafc;
  border: 1px solid #e1e5ee;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.submission-card:hover {
  border-color: #0052cc;
  box-shadow: 0 4px 15px rgba(0, 82, 204, 0.1);
}

.individual-submissions-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.individual-submission-card {
  background: #f8fafc;
  border: 1px solid #e1e5ee;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.individual-submission-card:hover {
  border-color: #0052cc;
  box-shadow: 0 4px 15px rgba(0, 82, 204, 0.1);
}

.individual-submission-card.highlighted {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  background: #f0fdf4;
  animation: highlightPulse 2s ease-in-out;
}

@keyframes highlightPulse {
  0% { 
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
  50% { 
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.1);
  }
  100% { 
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
}

.submission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.submission-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.4;
}

.submission-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submission-date {
  font-size: 0.85rem;
  color: #666;
}

.submission-updated {
  font-size: 0.8rem;
  color: #888;
  font-style: italic;
}

.submission-journal {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.journal-icon {
  font-size: 1.8rem;
}

.journal-name {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.3;
}

.submission-count {
  text-align: center;
  margin-bottom: 15px;
}

.count-number {
  font-size: 2rem;
  font-weight: 700;
  color: #0052cc;
  margin-bottom: 5px;
}

.count-label {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.submission-status {
  text-align: center;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.published {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.under_review {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.submitted {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.accepted {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.rejected {
  background: #fee2e2;
  color: #dc2626;
}

.no-submissions {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.no-submissions-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.5;
}

.no-submissions-text {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.no-submissions-hint {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .profile-container {
    padding: 100px 15px 40px;
  }
  
  .profile-brand {
    font-size: 2.2rem;
  }
  
  .submission-grid {
    grid-template-columns: 1fr;
  }
}

/* Edit Profile Modal Styles */
.edit-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.edit-modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.edit-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e1e5ee;
}

.edit-modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f1f5f9;
  color: #333;
}

.edit-modal-content {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #0052cc;
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
}

.password-toggle-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e1e5ee;
  text-align: center;
}

.password-toggle-btn {
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  color: #6c757d;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.password-toggle-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
  color: #495057;
}

.password-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e1e5ee;
}

.password-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.password-section-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.close-password-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #6c757d;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-password-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
  color: #495057;
}

.edit-modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e1e5ee;
  justify-content: flex-end;
}

.cancel-btn {
  padding: 10px 20px;
  border: 1px solid #d1d5db;
  background: white;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.save-btn {
  padding: 10px 20px;
  border: none;
  background: #0052cc;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.save-btn:hover {
  background: #003d99;
}

@media (max-width: 768px) {
  .edit-modal {
    margin: 10px;
    max-height: 95vh;
  }
  
  .edit-modal-header,
  .edit-modal-content,
  .edit-modal-footer {
    padding: 16px;
  }
  
  .edit-modal-footer {
    flex-direction: column;
  }
  
  .cancel-btn,
  .save-btn {
    width: 100%;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}`;

function UserProfile() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const navigate = useNavigate();
  const { joinUserRoom, onSubmissionStatusUpdate, offSubmissionStatusUpdate, isConnected, usePolling } = useWebSocket();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [editForm, setEditForm] = useState({
    given_names: '',
    family_name: '',
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [statusUpdateNotification, setStatusUpdateNotification] = useState(null);
  const [highlightedSubmission, setHighlightedSubmission] = useState(null);

  useEffect(() => {
    if (getIsAdmin()) {
      navigate('/admin', { replace: true });
      return;
    }

    const authToken = localStorage.getItem('googleCredential');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!authToken && !isLoggedIn) {
      navigate('/login');
      return;
    }

    loadUserProfile();
  }, [navigate]);

  // WebSocket event handling
  useEffect(() => {
    if (userProfile && userProfile.email) {
      // Join user room for real-time updates
      joinUserRoom(userProfile.email);
    }
  }, [userProfile, joinUserRoom]);

  // Listen for submission status updates
  useEffect(() => {
    const handleStatusUpdate = (data) => {
      console.log('Received status update:', data);
      
      // Determine notification type based on status
      let notificationType = 'success';
      let statusDisplay = data.status.replace('_', ' ').toUpperCase();
      
      if (data.status === 'rejected') {
        notificationType = 'error';
      } else if (data.status === 'accepted' || data.status === 'published') {
        notificationType = 'success';
      } else if (data.status === 'under_review') {
        notificationType = 'info';
      }
      
      // Show notification with more details
      setStatusUpdateNotification({
        type: notificationType,
        message: `Your paper "${data.paperTitle}" in ${data.journalName} has been updated to ${statusDisplay}`,
        timestamp: new Date().toISOString(),
        paperTitle: data.paperTitle,
        journalName: data.journalName,
        status: data.status
      });

      // Highlight the updated submission
      setHighlightedSubmission(data.id);

      // Refresh user profile data
      loadUserProfile();

      // Auto-hide notification after 7 seconds for better readability
      setTimeout(() => {
        setStatusUpdateNotification(null);
      }, 7000);

      // Remove highlight after 5 seconds
      setTimeout(() => {
        setHighlightedSubmission(null);
      }, 5000);
    };

    onSubmissionStatusUpdate(handleStatusUpdate);

    return () => {
      offSubmissionStatusUpdate(handleStatusUpdate);
    };
  }, [onSubmissionStatusUpdate, offSubmissionStatusUpdate]);

  const loadUserProfile = async () => {
    try {
      const authToken = localStorage.getItem('googleCredential');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!authToken && !isLoggedIn) {
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }

      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        setError('No user email found');
        setIsLoading(false);
        return;
      }

      // Always fetch from database for both Google and normal login
      const response = await getUserProfile(userEmail);
      if (response.success && response.user) {
        setUserProfile(response.user);
      } else {
        setError(response.message || 'Failed to load profile data');
      }
      setIsLoading(false);
    } catch (error) {
      setError('Failed to connect to server. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuthStorage();
    navigate('/login');
  };

  const handleEditProfile = () => {
    // Populate form with current user data
    setEditForm({
      given_names: userProfile.given_names || '',
      family_name: userProfile.family_name || '',
      email: userProfile.email || '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
    setShowPasswordSection(false);
    setIsEditing(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    // Validate form
    if (!editForm.given_names.trim()) {
      notyf.error('Full Name are required');
      return;
    }
    if (!editForm.family_name.trim()) {
      notyf.error('Family name is required');
      return;
    }
    if (!editForm.email.trim()) {
      notyf.error('Email is required');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      notyf.error('Please enter a valid email address');
      return;
    }

    // If changing password, validate password fields
    // Validate password fields if password section is shown and any password is provided
    if (showPasswordSection && (editForm.new_password || editForm.current_password || editForm.confirm_password)) {
      if (!editForm.current_password) {
        notyf.error('Current password is required to change password');
        return;
      }
      if (!editForm.new_password) {
        notyf.error('New password is required');
        return;
      }
      if (editForm.new_password.length < 12) {
        notyf.error('New password must be at least 12 characters long');
        return;
      }
      if (editForm.new_password !== editForm.confirm_password) {
        notyf.error('New password and confirm password do not match');
        return;
      }
    }

    try {
      const userEmail = localStorage.getItem('userEmail');
      
      // Prepare update data
      const updateData = {
        userEmail: userEmail,
        given_names: editForm.given_names,
        family_name: editForm.family_name,
        new_email: editForm.email !== userEmail ? editForm.email : undefined,
        current_password: editForm.current_password || undefined,
        new_password: editForm.new_password || undefined
      };
      
      // Call API to update profile
      const response = await updateProfile(updateData);
      
      if (response.success) {
        // Update local state
        setUserProfile(prev => ({
          ...prev,
          given_names: editForm.given_names,
          family_name: editForm.family_name,
          email: editForm.email
        }));
        
        // Update localStorage
        localStorage.setItem('userEmail', editForm.email);
        localStorage.setItem('userName', editForm.given_names);
        
        setIsEditing(false);
        
        // Show success message
        if (response.data.email_changed) {
          notyf.success('Profile updated successfully! Please check your new email for verification.');
        } else {
          notyf.success('Profile updated successfully!');
        }
      } else {
        notyf.error(response.message || 'Failed to update profile. Please try again.');
      }
      
    } catch (error) {
      notyf.error('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setShowPasswordSection(false);
    setEditForm({
      given_names: '',
      family_name: '',
      email: '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
          <div>Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '20px', color: '#ef4444' }}>❌</div>
          <div style={{ color: '#ef4444', marginBottom: '20px' }}>{error}</div>
          <button 
            onClick={() => {
              setError('');
              setIsLoading(true);
              loadUserProfile();
            }} 
            style={{ 
              padding: '10px 20px', 
              background: '#0052cc', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer' 
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  const initials = `${userProfile.given_names.charAt(0)}${userProfile.family_name.charAt(0)}`;

  return (
    <div className="profile-container">
      <div className="profile-brand">
        Lord Journal <span style={{ fontWeight: 300 }}>My Account</span>
      </div>
      
      <p className="profile-subtitle">
        Welcome back! Here's your account overview
      </p>

      {/* Connection Status */}
      {!isConnected && (
        <div style={{
          background: usePolling ? '#dbeafe' : '#fef3c7',
          color: usePolling ? '#1e40af' : '#92400e',
          padding: '10px 20px',
          borderRadius: '8px',
          margin: '0 auto 20px',
          maxWidth: '600px',
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          {usePolling ? (
            <>🔄 Using polling for updates (every 30 seconds). Real-time updates are not available.</>
          ) : (
            <>⚠️ Real-time updates are not available. Some features may not work properly.</>
          )}
        </div>
      )}

      {/* Status Update Notification */}
      {statusUpdateNotification && (
        <div style={{
          background: statusUpdateNotification.type === 'success' ? '#d1fae5' : 
                     statusUpdateNotification.type === 'error' ? '#fee2e2' : '#dbeafe',
          color: statusUpdateNotification.type === 'success' ? '#065f46' : 
                 statusUpdateNotification.type === 'error' ? '#dc2626' : '#1e40af',
          padding: '15px 20px',
          borderRadius: '8px',
          margin: '0 auto 20px',
          maxWidth: '600px',
          textAlign: 'center',
          fontSize: '0.9rem',
          border: `1px solid ${statusUpdateNotification.type === 'success' ? '#a7f3d0' : 
                   statusUpdateNotification.type === 'error' ? '#fecaca' : '#93c5fd'}`,
          animation: 'slideDown 0.3s ease-out',
          position: 'relative'
        }}>
          <button
            onClick={() => setStatusUpdateNotification(null)}
            style={{
              position: 'absolute',
              top: '5px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              color: 'inherit',
              opacity: 0.7
            }}
            title="Close notification"
          >
            ×
          </button>
          {statusUpdateNotification.type === 'success' ? '✅' : 
           statusUpdateNotification.type === 'error' ? '❌' : 'ℹ️'} {statusUpdateNotification.message}
        </div>
      )}

      <div className="profile-content">
        {/* Left Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-avatar">
            {initials}
          </div>
          
          <div className="profile-name">
            {userProfile.given_names} 
          </div>
          
          <div className="profile-email">
            {userProfile.email}
          </div>
          
          <div className="profile-actions">
            <button className="profile-action-btn" onClick={handleEditProfile}>
              ✏️ Edit Profile
            </button>
            <button className="profile-action-btn danger" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Personal Information */}
          <div className="profile-section">
            <h3>👤 Personal Information</h3>
            
            <div className="profile-field">
              <div className="profile-field-label">Full Name</div>
              <div className="profile-field-value">
                {userProfile.given_names} 
              </div>
            </div>
            
            <div className="profile-field">
              <div className="profile-field-label">Email Address</div>
              <div className="profile-field-value">
                {userProfile.email}
                {userProfile.email_verified && <span style={{ color: '#10b981', marginLeft: '8px' }}>✓</span>}
              </div>
            </div>
            
            <div className="profile-field">
              <div className="profile-field-label"> Family Name</div>
              <div className="profile-field-value">
              {userProfile.family_name}
              </div>
            </div>
            
            <div className= "profile-field">
              <div className="profile-field-label">Member Since</div>
              <div className="profile-field-value">
                {formatDate(userProfile.created_at)}
              </div>
            </div>
          </div>

          {/* Institution & Submission */}
          <div className="profile-section">
            <h3>🎓 Institution & Submission</h3>
            
            {/* Institution Field with Searchable Dropdown */}
            <InstitutionField userProfile={userProfile} setUserProfile={setUserProfile} />
            

            
            <div className="profile-field">
              <div className="profile-field-label">Submit Paper</div>
              <div className="profile-field-value" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button 
                  onClick={() => navigate('/submit')}
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: '#0052cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#003d99'}
                  onMouseLeave={(e) => e.target.style.background = '#0052cc'}
                >
                  📄 Submit Your Paper
                </button>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>
                  Click to submit your research paper
                </span>
              </div>
            </div>
          </div>


          {/* Statistics */}
          <div className="profile-section">
            <h3>📊 Research Statistics</h3>
            
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-number">{userProfile.stats?.total_papers || 0}</div>
                <div className="profile-stat-label">Total Papers</div>
              </div>
              
              <div className="profile-stat">
                <div className="profile-stat-number">{userProfile.stats?.published || 0}</div>
                <div className="profile-stat-label">Published</div>
              </div>
              
            </div>
          </div>

          {/* Individual Paper Submissions */}
          <div className="profile-section">
            <h3>📚 Your Paper Submissions</h3>
            
            <div className="journal-submissions">
              {userProfile.individual_submissions && userProfile.individual_submissions.length > 0 ? (
                <div className="individual-submissions-list">
                  {userProfile.individual_submissions.map((submission, index) => (
                    <div 
                      key={submission.id || index} 
                      className={`individual-submission-card ${highlightedSubmission === submission.id ? 'highlighted' : ''}`}
                    >
                      <div className="submission-header">
                        <div className="submission-journal">
                          <div className="journal-icon">{submission.journal_icon}</div>
                          <div className="journal-name">{submission.journal_name}</div>
                        </div>
                        <div className="submission-date">
                          Submitted: {formatDate(submission.submission_date)}
                        </div>
                      </div>
                      <div className="submission-title">
                        {submission.paper_title}
                      </div>
                      <div className="submission-footer">
                        <div className="submission-status">
                          <span className={`status-badge ${submission.status}`}>
                            {submission.status === 'published' ? '✅ Published' : 
                             submission.status === 'under_review' ? '⏳ Under Review' : 
                             submission.status === 'accepted' ? '✅ Accepted' :
                             submission.status === 'rejected' ? '❌ Rejected' :
                             '📝 Submitted'}
                          </span>
                        </div>
                        {submission.updated_at && submission.updated_at !== submission.submission_date && (
                          <div className="submission-updated">
                            Updated: {formatDate(submission.updated_at)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-submissions">
                  <div className="no-submissions-icon">📄</div>
                  <div className="no-submissions-text">No papers submitted yet</div>
                  <div className="no-submissions-hint">Click "Submit Your Paper" to get started</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="edit-modal-overlay" onClick={handleCancelEdit}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>Edit Profile</h3>
              <button className="close-btn" onClick={handleCancelEdit}>×</button>
            </div>
            
            <div className="edit-modal-content">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="given_names"
                  value={editForm.given_names}
                  onChange={handleEditFormChange}
                  className="form-input"
                  placeholder="Enter your Full Name"
                />
              </div>
              
              <div className="form-group">
                <label>Family Name *</label>
                <input
                  type="text"
                  name="family_name"
                  value={editForm.family_name}
                  onChange={handleEditFormChange}
                  className="form-input"
                  placeholder="Enter your family name"
                />
              </div>
              
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditFormChange}
                  className="form-input"
                  placeholder="Enter your email address"
                />
              </div>
              
              {!showPasswordSection ? (
                  <div className="password-toggle-section">
                    <button 
                      type="button"
                      className="password-toggle-btn" 
                      onClick={() => setShowPasswordSection(true)}
                    >
                      🔒 Change Password
                    </button>
                </div>
              ) : (
                <div className="password-section">
                  <div className="password-section-header">
                    <h4>Change Password</h4>
                    <button 
                      type="button"
                      className="close-password-btn" 
                      onClick={() => setShowPasswordSection(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Current Password *</label>
                    <input
                      type="password"
                      name="current_password"
                      value={editForm.current_password}
                      onChange={handleEditFormChange}
                      className="form-input"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password *</label>
                    <input
                      type="password"
                      name="new_password"
                      value={editForm.new_password}
                      onChange={handleEditFormChange}
                      className="form-input"
                      placeholder="Enter new password (min 12 characters)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password *</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={editForm.confirm_password}
                      onChange={handleEditFormChange}
                      className="form-input"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="edit-modal-footer">
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {styles}
      </style>
    </div>
  );
}

export default UserProfile;
