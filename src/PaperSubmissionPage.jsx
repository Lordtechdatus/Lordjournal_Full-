import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitPaper } from '../server/FetchNodeAdmin';
import { getIsAdmin } from './utils/auth';

const JOURNAL_CATEGORIES = [
  {
    id: 'civil-engineering',
    name: 'Lord Journal of Civil Engineering',
    description: 'Research in structural engineering, geotechnical engineering, transportation engineering, and environmental engineering.',
    icon: '🏗️'
  },
  {
    id: 'mechanical-engineering',
    name: 'Lord Journal of Mechanical Engineering',
    description: 'Research in mechanical systems, thermodynamics, fluid mechanics, and manufacturing engineering.',
    icon: '⚙️'
  },
  {
    id: 'electronics-engineering',
    name: 'Lord Journal of Electronics Engineering',
    description: 'Research in electronic circuits, embedded systems, signal processing, and communication systems.',
    icon: '🔌'
  },
  {
    id: 'electrical-engineering',
    name: 'Lord Journal of Electrical Engineering',
    description: 'Research in power systems, control systems, renewable energy, and electrical machines.',
    icon: '⚡'
  },
  {
    id: 'computer-science-engineering',
    name: 'Lord Journal of Computer Science & Engineering',
    description: 'Research in algorithms, software engineering, artificial intelligence, and computer networks.',
    icon: '💻'
  },
  {
    id: 'applied-science',
    name: 'Lord Journal of Applied Science',
    description: 'Research in applied mathematics, physics, chemistry, and interdisciplinary sciences.',
    icon: '🔬'
  },
  {
    id: 'ai-ml-data-science',
    name: 'Lord Journal of Artificial Intelligence, Machine Learning & Data Science',
    description: 'Research in AI algorithms, machine learning models, data analytics, and intelligent systems.',
    icon: '🤖'
  },
  {
    id: 'law-social-science',
    name: 'Lord Journal of Law & Social Science',
    description: 'Research in legal studies, social sciences, public policy, and human rights.',
    icon: '⚖️'
  },
  {
    id: 'education',
    name: 'Lord Journal of Education',
    description: 'Research in educational technology, pedagogy, curriculum development, and learning sciences.',
    icon: '📚'
  },
  {
    id: 'management',
    name: 'Lord Journal of Management',
    description: 'Research in business management, organizational behavior, marketing, and entrepreneurship.',
    icon: '📊'
  },
  {
    id: 'built-environment-sustainability',
    name: 'Lord Journal of Built Environment & Sustainability',
    description: 'Research in sustainable construction, green buildings, smart cities, resilient infrastructure, and environmental planning.',
    icon: '🏙️'
  },
  {
    id: 'medical-science',
    name: 'Lord Journal of Medical Science',
    description: 'Research in clinical medicine, public health, biomedical sciences, healthcare systems, and medical education.',
    icon: '🩺'
  }
];

// ─── Toast Notification Component ────────────────────────────────────────────
const toastStyles = `
.submit-toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.14);
  max-width: 360px;
  width: 100%;
  font-family: 'Inter', system-ui, sans-serif;
  animation: toastSlideIn 0.4s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
  overflow: hidden;
  position: fixed;
}
.submit-toast.success {
  background: #f0fdf4;
  border: 1.5px solid #86efac;
}
.submit-toast.error {
  background: #fef2f2;
  border: 1.5px solid #fca5a5;
}
.submit-toast.loading {
  background: #eff6ff;
  border: 1.5px solid #93c5fd;
}
.submit-toast-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 1px;
}
.submit-toast-body { flex: 1; }
.submit-toast-title {
  font-size: 0.92rem;
  font-weight: 700;
  margin-bottom: 3px;
}
.submit-toast.success .submit-toast-title { color: #15803d; }
.submit-toast.error   .submit-toast-title { color: #dc2626; }
.submit-toast.loading .submit-toast-title { color: #1d4ed8; }
.submit-toast-msg {
  font-size: 0.8rem;
  line-height: 1.45;
  color: #64748b;
}
.submit-toast-close {
  background: none;
  border: none;
  font-size: 1rem;
  color: #94a3b8;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  line-height: 1;
  transition: color 0.15s;
}
.submit-toast-close:hover { color: #475569; }
.submit-toast-bar {
  position: absolute;
  bottom: 0; left: 0;
  height: 3px;
  border-radius: 0 0 16px 16px;
  animation: toastBarShrink linear forwards;
}
.submit-toast.success .submit-toast-bar { background: #4ade80; animation-duration: 5s; }
.submit-toast.error   .submit-toast-bar { background: #f87171; animation-duration: 5s; }
.submit-toast.loading .submit-toast-bar { background: #60a5fa; animation-duration: 999s; }

@keyframes toastSlideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes toastBarShrink {
  from { width: 100%; }
  to   { width: 0%; }
}
.spinner {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid #93c5fd;
  border-top-color: #1d4ed8;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
  margin-top: 3px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@media (max-width: 480px) {
  .submit-toast {
    bottom: 16px; right: 16px; left: 16px;
    max-width: 100%;
  }
}
`;

function SubmitToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast || toast.type === 'loading') return;
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: '✅',
    error:   '❌',
    loading: null,
  };
  const titles = {
    success: 'Paper Submitted!',
    error:   'Submission Failed',
    loading: 'Submitting Paper…',
  };

  return (
    <>
      <style>{toastStyles}</style>
      <div className={`submit-toast ${toast.type}`}>
        {toast.type === 'loading'
          ? <div className="spinner" />
          : <div className="submit-toast-icon">{icons[toast.type]}</div>
        }
        <div className="submit-toast-body">
          <div className="submit-toast-title">{titles[toast.type]}</div>
          <div className="submit-toast-msg">{toast.message}</div>
        </div>
        {toast.type !== 'loading' && (
          <button className="submit-toast-close" onClick={onClose}>✕</button>
        )}
        <div className="submit-toast-bar" />
      </div>
    </>
  );
}

// ─── Main Styles ──────────────────────────────────────────────────────────────
const styles = `
.submission-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,242,247,0.9) 100%);
}
.submission-header { text-align: center; margin-bottom: 50px; }
.submission-title {
  font-size: 3rem; font-weight: 800;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 20px; letter-spacing: -0.5px;
}
.submission-subtitle {
  color: #666; font-size: 1.2rem; margin-bottom: 30px;
  max-width: 600px; margin-left: auto; margin-right: auto;
}
.submission-steps {
  display: flex; justify-content: center; margin-bottom: 40px; gap: 20px;
}
.step {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 24px; border-radius: 25px; font-weight: 500;
  transition: all 0.3s ease;
}
.step.active    { background: #0052cc; color: white; }
.step.completed { background: #10b981; color: white; }
.step.pending   { background: #f1f5f9; color: #64748b; }
.journal-selection { margin-bottom: 40px; }
.section-title {
  font-size: 1.8rem; font-weight: 600; color: #333;
  margin-bottom: 20px; text-align: center;
}
.journal-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px; margin-bottom: 30px;
}
.submission-journal-card {
  background: #ffffff; border: 2px solid #e1e5ee;
  border-radius: 12px; padding: 24px; cursor: pointer;
  transition: all 0.3s ease; position: relative;
  display: block !important; min-height: 155px;
}
.submission-journal-card:hover {
  border-color: #0052cc; transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 82, 204, 0.15);
}
.submission-journal-card.selected {
  border-color: #0052cc; background: #f6f8ff;
}
.journal-icon  { display: block !important; font-size: 2.5rem; margin-bottom: 15px; }
.journal-name  { display: block !important; font-size: 1.2rem; font-weight: 700; color: #1e3a8a; margin-bottom: 10px; line-height: 1.35; }
.journal-description { display: block !important; color: #666; font-size: 0.9rem; line-height: 1.5; }
.selected-indicator {
  position: absolute; top: 15px; right: 15px;
  width: 24px; height: 24px; background: #0052cc; border-radius: 50%;
  display: flex !important; align-items: center; justify-content: center;
  color: white; font-size: 0.8rem; font-weight: bold;
}
.upload-section {
  background: white; border-radius: 12px; padding: 30px;
  margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  animation: fadeInUp 0.5s ease-out;
}
.upload-area {
  border: 2px dashed #d1d5db; border-radius: 8px; padding: 40px;
  text-align: center; transition: all 0.3s ease; cursor: pointer;
}
.upload-area:hover, .upload-area.dragover {
  border-color: #0052cc; background: #f6f8ff;
}
.upload-icon  { font-size: 3rem; color: #9ca3af; margin-bottom: 15px; }
.upload-text  { color: #666; font-size: 1.1rem; margin-bottom: 10px; }
.upload-hint  { color: #9ca3af; font-size: 0.9rem; }
.file-input   { display: none; }
.file-info {
  margin-top: 20px; padding: 15px; background: #f0f9ff;
  border-radius: 8px; border-left: 4px solid #0052cc;
}
.file-name    { font-weight: 600; color: #333; margin-bottom: 5px; }
.file-details { color: #666; font-size: 0.9rem; }
.submit-section { text-align: center; margin-top: 40px; animation: fadeInUp 0.5s ease-out; }
.submit-button {
  background: linear-gradient(45deg, #0052cc, #4285f4);
  color: white; border: none; padding: 15px 40px;
  border-radius: 8px; font-size: 1.1rem; font-weight: 600;
  cursor: pointer; transition: all 0.3s ease;
}
.submit-button:hover {
  transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 82, 204, 0.3);
}
.submit-button:disabled {
  background: #9ca3af; cursor: not-allowed; transform: none; box-shadow: none;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (max-width: 768px) {
  .submission-container { padding: 100px 15px 40px; }
  .submission-title { font-size: 2.2rem; }
  .journal-grid { grid-template-columns: 1fr; }
  .submission-steps { flex-direction: column; align-items: center; }
}
`;

function PaperSubmissionPage() {
  const navigate = useNavigate();
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [uploadedFile, setUploadedFile]       = useState(null);
  const [isDragging, setIsDragging]           = useState(false);
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [isLoading, setIsLoading]             = useState(true);
  const [userName, setUserName]               = useState('');
  const [toast, setToast]                     = useState(null); // ← toast state

  useEffect(() => {
    if (getIsAdmin()) {
      navigate('/admin', { replace: true });
      return;
    }

    const authToken = localStorage.getItem('googleCredential');
    const userEmail = localStorage.getItem('userEmail');
    const storedUserName = localStorage.getItem('userName');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if ((!authToken && !isLoggedIn) || !userEmail) { navigate('/login'); return; }
    setUserName(storedUserName || userEmail.split('@')[0]);
    setIsLoading(false);
  }, [navigate]);

  const showToast = (type, message) => setToast({ type, message });
  const closeToast = () => setToast(null);

  const handleJournalSelect = (journal) => {
    setSelectedJournal(journal);
    setTimeout(() => {
      const el = document.querySelector('.upload-section');
      if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }, 100);
  };

  const handleChangeJournal = () => {
    setSelectedJournal(null);
    setUploadedFile(null);
    setTimeout(() => {
      const el = document.querySelector('.journal-selection');
      if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }, 100);
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showToast('error', 'File size must be less than 10MB.');
      return;
    }
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!['.doc', '.docx', '.txt'].includes(ext)) {
      showToast('error', 'Please upload only DOC, DOCX, or TXT files.');
      return;
    }
    setUploadedFile(file);
    setTimeout(() => {
      const el = document.querySelector('.submit-section');
      if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!selectedJournal) { showToast('error', 'Please select a journal category.'); return; }
    if (!uploadedFile)    { showToast('error', 'Please upload your paper document.'); return; }

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) { showToast('error', 'You must be logged in to submit.'); navigate('/login'); return; }

    setIsSubmitting(true);
    showToast('loading', `Uploading "${uploadedFile.name}" to ${selectedJournal.name}…`);

    try {
      const formData = new FormData();
      formData.append('userEmail', userEmail);
      formData.append('journalName', selectedJournal.name);
      formData.append('journalIcon', selectedJournal.icon);
      formData.append('paperTitle', uploadedFile.name.replace(/\.[^/.]+$/, ''));
      formData.append('paperFile', uploadedFile);

      const response = await submitPaper(formData);

      if (response.success) {
        showToast('success', `"${uploadedFile.name}" submitted to ${selectedJournal.name}! You will receive a confirmation email shortly.`);
        setTimeout(() => {
          setSelectedJournal(null);
          setUploadedFile(null);
          closeToast();
          navigate('/profile');
        }, 3000);
      } else {
        showToast('error', response.message || 'Failed to submit paper. Please try again.');
      }
    } catch (err) {
      const message = err?.message || 'Failed to submit paper. Please try again.';
      if (message.toLowerCase().includes('user not found')) {
        showToast('error', 'Your account was not found. Please sign in again before submitting.');
      } else {
        showToast('error', message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStep = !selectedJournal ? 1 : !uploadedFile ? 2 : 3;

  if (isLoading) return (
    <div className="submission-container">
      <style>{styles}</style>
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
        <div>Checking authentication...</div>
      </div>
    </div>
  );

  return (
    <div className="submission-container">
      <style>{styles}</style>

      {/* ── Toast ── */}
      <SubmitToast toast={toast} onClose={closeToast} />

      <div className="submission-header">
        <h1 className="submission-title">Submit Your Paper</h1>
        <p className="submission-subtitle">
          Welcome, {userName}! Share your research with the academic community.
          Select a journal category, upload your paper, and submit for review.
        </p>
        <div className="submission-steps">
          <div className={`step ${currentStep > 1 ? 'completed' : 'active'}`}>
            <span>1</span><span>Select Journal</span>
          </div>
          <div className={`step ${currentStep >= 2 ? (currentStep > 2 ? 'completed' : 'active') : 'pending'}`}>
            <span>2</span><span>Upload Paper</span>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : 'pending'}`}>
            <span>3</span><span>Submit</span>
          </div>
        </div>
      </div>

      {/* ── Journal Selection ── */}
      <div className="journal-selection">
        <h2 className="section-title">Select Journal Category</h2>
        <div className="journal-grid">
          {JOURNAL_CATEGORIES.map((journal) => (
            <div
              key={journal.id}
              className={`submission-journal-card ${selectedJournal?.id === journal.id ? 'selected' : ''}`}
              onClick={() => handleJournalSelect(journal)}
            >
              {selectedJournal?.id === journal.id && (
                <div className="selected-indicator">✓</div>
              )}
              <div className="journal-icon">{journal.icon}</div>
              <div className="journal-name">{journal.name}</div>
              <div className="journal-description">{journal.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Upload Section ── */}
      {selectedJournal && (
        <div className="upload-section">
          <h2 className="section-title">Upload Your Paper</h2>
          <div style={{
            background: '#f8f9ff', padding: '20px', borderRadius: '8px',
            marginBottom: '20px', border: '1px solid #e0e7ff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>{selectedJournal.icon}</span>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e3a8a' }}>Selected Journal:</div>
                  <div style={{ color: '#4b5563' }}>{selectedJournal.name}</div>
                </div>
              </div>
              <button
                onClick={handleChangeJournal}
                style={{
                  background: 'transparent', border: '1px solid #1e3a8a',
                  color: '#1e3a8a', padding: '8px 16px', borderRadius: '6px',
                  cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500'
                }}
              >
                Change Journal
              </button>
            </div>
          </div>

          <div
            className={`upload-area ${isDragging ? 'dragover' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileUpload(e.dataTransfer.files[0]); }}
            onClick={() => document.getElementById('file-input').click()}
          >
            <div className="upload-icon">📄</div>
            <div className="upload-text">
              {uploadedFile ? 'Click to change file' : 'Click to upload or drag and drop'}
            </div>
            <div className="upload-hint">DOC, DOCX, or TXT files up to 10MB</div>
            <input
              id="file-input" type="file" className="file-input"
              accept=".doc,.docx,.txt" onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </div>

          {uploadedFile && (
            <div className="file-info">
              <div className="file-name">{uploadedFile.name}</div>
              <div className="file-details">Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          )}
        </div>
      )}

      {/* ── Submit Section ── */}
      {selectedJournal && uploadedFile && (
        <div className="submit-section">
          <div style={{
            background: '#f0f9ff', padding: '20px', borderRadius: '8px',
            marginBottom: '20px', border: '1px solid #bae6fd'
          }}>
            <h3 style={{ color: '#0369a1', marginBottom: '10px' }}>Ready to Submit?</h3>
            <p style={{ color: '#0c4a6e', margin: 0 }}>
              Your paper <strong>"{uploadedFile.name}"</strong> will be submitted to{' '}
              <strong>{selectedJournal.name}</strong> for review.
            </p>
          </div>
          <button className="submit-button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit Paper'}
          </button>
        </div>
      )}
    </div>
  );
}

export default PaperSubmissionPage;
