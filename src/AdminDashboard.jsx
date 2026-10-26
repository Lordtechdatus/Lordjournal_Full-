import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "./contexts/WebSocketContext";
import { notyf } from "./utils/notyf";
import { clearAuthStorage } from "./utils/auth";

const ADMIN_DASHBOARD_STYLE_ID = "admin-dashboard-inline-styles";

const styles = `
.admin-dashboard-page {
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(circle at top left, rgba(0, 82, 204, 0.10), transparent 30%),
    linear-gradient(135deg, #f8fafc 0%, #eef4fb 45%, #ffffff 100%);
  padding: 104px 20px 42px;
  box-sizing: border-box;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.admin-dashboard-inner {
  width: 100%;
  max-width: 1420px;
  margin: 0 auto;
}

.admin-dashboard-hero {
  background:
    radial-gradient(circle at 15% 20%, rgba(66, 133, 244, 0.28), transparent 32%),
    radial-gradient(circle at 90% 90%, rgba(52, 211, 153, 0.14), transparent 34%),
    linear-gradient(135deg, #071821 0%, #0a2a38 54%, #123f58 100%);
  border-radius: 28px;
  padding: 34px;
  color: #ffffff;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.14);
  position: relative;
  overflow: hidden;
  margin-bottom: 26px;
}

.admin-dashboard-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 34px 34px;
  opacity: 0.65;
  pointer-events: none;
}

.admin-dashboard-hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: center;
}

.admin-dashboard-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.82);
  font-size: 0.78rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.admin-dashboard-kicker-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 6px rgba(52, 211, 153, 0.13);
}

.admin-dashboard-title {
  margin: 0 0 10px;
  font-size: clamp(2rem, 4vw, 3.1rem);
  font-weight: 950;
  letter-spacing: -0.055em;
  line-height: 1.08;
  color: #ffffff;
}

.admin-dashboard-subtitle {
  max-width: 680px;
  margin: 0;
  color: rgba(255,255,255,0.72);
  font-size: 1rem;
  line-height: 1.65;
}

.admin-dashboard-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-dashboard-user-card {
  min-width: 230px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.14);
  backdrop-filter: blur(12px);
}

.admin-dashboard-user-label {
  color: rgba(255,255,255,0.58);
  font-size: 0.76rem;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.admin-dashboard-user-email {
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 750;
  word-break: break-word;
}

.admin-dashboard-btn {
  height: 42px;
  padding: 0 16px;
  border: none;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 850;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
  white-space: nowrap;
}

.admin-dashboard-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.admin-dashboard-btn:disabled {
  opacity: 0.62;
  cursor: not-allowed;
}

.admin-dashboard-btn-light {
  background: #ffffff;
  color: #0052cc;
  box-shadow: 0 12px 28px rgba(0,0,0,0.18);
}

.admin-dashboard-btn-danger {
  background: rgba(255,255,255,0.10);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.18);
}

.admin-dashboard-alert {
  max-width: 1420px;
  margin: 0 auto 18px;
  padding: 14px 18px;
  border-radius: 14px;
  font-size: 0.92rem;
  font-weight: 650;
  line-height: 1.5;
}

.admin-dashboard-alert-info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}

.admin-dashboard-alert-warning {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
}

.admin-dashboard-alert-error {
  background: #fff1f2;
  color: #be123c;
  border: 1px solid #fecdd3;
}

.admin-dashboard-alert-animate {
  animation: adminDashboardSlideDown 0.3s ease-out;
}

.admin-dashboard-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.admin-dashboard-stats-grid-legacy {
  display: none;
}

.admin-dashboard-stat-card {
  background: rgba(255,255,255,0.92);
  border: 1px solid #e5eaf1;
  border-radius: 18px;
  padding: 18px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.admin-dashboard-stat-card::after {
  content: "";
  position: absolute;
  inset: auto -28px -34px auto;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: var(--stat-glow, rgba(59, 130, 246, 0.12));
}

.admin-dashboard-stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.12);
  border-color: var(--stat-border, #bfdbfe);
}

.admin-dashboard-stat-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.02em;
  flex-shrink: 0;
  color: var(--stat-color, #1d4ed8);
  background: var(--stat-bg, #dbeafe);
}

.admin-dashboard-stat-card-blue {
  --stat-bg: #dbeafe;
  --stat-color: #1d4ed8;
  --stat-border: #93c5fd;
  --stat-glow: rgba(59, 130, 246, 0.14);
}

.admin-dashboard-stat-card-yellow {
  --stat-bg: #fef3c7;
  --stat-color: #a16207;
  --stat-border: #facc15;
  --stat-glow: rgba(234, 179, 8, 0.16);
}

.admin-dashboard-stat-card-cyan {
  --stat-bg: #cffafe;
  --stat-color: #0e7490;
  --stat-border: #67e8f9;
  --stat-glow: rgba(6, 182, 212, 0.14);
}

.admin-dashboard-stat-card-green {
  --stat-bg: #dcfce7;
  --stat-color: #166534;
  --stat-border: #86efac;
  --stat-glow: rgba(34, 197, 94, 0.14);
}

.admin-dashboard-stat-card-red {
  --stat-bg: #fee2e2;
  --stat-color: #991b1b;
  --stat-border: #fca5a5;
  --stat-glow: rgba(239, 68, 68, 0.13);
}

.admin-dashboard-stat-card-purple {
  --stat-bg: #f3e8ff;
  --stat-color: #6b21a8;
  --stat-border: #d8b4fe;
  --stat-glow: rgba(168, 85, 247, 0.13);
}

.admin-dashboard-stat-card-indigo {
  --stat-bg: #e0e7ff;
  --stat-color: #3730a3;
  --stat-border: #a5b4fc;
  --stat-glow: rgba(99, 102, 241, 0.13);
}

.admin-dashboard-stat-card-slate {
  --stat-bg: #e2e8f0;
  --stat-color: #334155;
  --stat-border: #cbd5e1;
  --stat-glow: rgba(100, 116, 139, 0.12);
}

.admin-dashboard-stat-number {
  font-size: 1.72rem;
  font-weight: 950;
  letter-spacing: -0.04em;
  color: #0f172a;
  line-height: 1;
  position: relative;
  z-index: 1;
}

.admin-dashboard-stat-label {
  color: #64748b;
  font-size: 0.84rem;
  font-weight: 700;
  margin-top: 6px;
  line-height: 1.3;
  position: relative;
  z-index: 1;
}

.admin-dashboard-stat-meta {
  margin-top: 7px;
  color: #94a3b8;
  font-size: 0.74rem;
  font-weight: 750;
  position: relative;
  z-index: 1;
}

.admin-dashboard-card {
  background: rgba(255,255,255,0.95);
  border: 1px solid #e5eaf1;
  border-radius: 22px;
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.07);
  overflow: hidden;
}

.admin-dashboard-filters {
  padding: 22px;
  margin-bottom: 24px;
}

.admin-dashboard-filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}

.admin-dashboard-section-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.025em;
}

.admin-dashboard-small-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.admin-dashboard-small-btn {
  height: 36px;
  padding: 0 13px;
  border-radius: 10px;
  border: 1px solid #dbe3ef;
  background: #ffffff;
  color: #334155;
  cursor: pointer;
  font-size: 0.84rem;
  font-weight: 800;
  transition: all 0.2s ease;
}

.admin-dashboard-small-btn:hover {
  border-color: #0052cc;
  color: #0052cc;
  background: #eff6ff;
}

.admin-dashboard-filters-grid {
  display: grid;
  grid-template-columns: 1.4fr repeat(5, minmax(150px, 1fr));
  gap: 14px;
}

.admin-dashboard-filter-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.admin-dashboard-filter-label {
  color: #334155;
  font-size: 0.84rem;
  font-weight: 850;
}

.admin-dashboard-filter-input,
.admin-dashboard-filter-select {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1.5px solid #dbe3ef;
  border-radius: 12px;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.9rem;
  outline: none;
  box-sizing: border-box;
}

.admin-dashboard-filter-input:focus,
.admin-dashboard-filter-select:focus {
  border-color: #0052cc;
  box-shadow: 0 0 0 4px rgba(0, 82, 204, 0.10);
}

.admin-dashboard-table-header {
  padding: 22px;
  border-bottom: 1px solid #e5eaf1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.admin-dashboard-loading-text {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 700;
}

.admin-dashboard-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.admin-dashboard-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1080px;
}

.admin-dashboard-table th,
.admin-dashboard-table td {
  padding: 15px 18px;
  text-align: left;
  border-bottom: 1px solid #eef2f7;
  vertical-align: middle;
}

.admin-dashboard-table th {
  background: #f8fafc;
  color: #334155;
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.035em;
  position: sticky;
  top: 0;
  z-index: 5;
}

.admin-dashboard-table tbody tr:hover {
  background: #f8fbff;
}

.admin-dashboard-sortable {
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.admin-dashboard-sortable:hover {
  color: #0052cc;
}

.admin-dashboard-sort-indicator {
  margin-left: 6px;
  color: #0052cc;
}

.admin-dashboard-author {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.admin-dashboard-author-name {
  font-weight: 850;
  color: #0f172a;
  font-size: 0.92rem;
}

.admin-dashboard-author-email {
  font-size: 0.8rem;
  color: #64748b;
}

.admin-dashboard-paper-title {
  font-weight: 750;
  color: #0f172a;
  max-width: 340px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-dashboard-journal {
  display: flex;
  align-items: center;
  gap: 9px;
  max-width: 280px;
}

.admin-dashboard-journal-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.admin-dashboard-journal-name {
  font-size: 0.88rem;
  color: #334155;
  line-height: 1.35;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-dashboard-status-select {
  min-width: 138px;
  height: 34px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 850;
  cursor: pointer;
  outline: none;
}

.admin-status-submitted { background: #dbeafe; color: #1e40af; }
.admin-status-under-review { background: #fef3c7; color: #92400e; }
.admin-status-accepted { background: #dcfce7; color: #166534; }
.admin-status-rejected { background: #fee2e2; color: #991b1b; }
.admin-status-published { background: #f3e8ff; color: #6b21a8; }
.admin-status-default { background: #f1f5f9; color: #475569; }

.admin-dashboard-action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.admin-dashboard-action-btn {
  height: 34px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 850;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  white-space: nowrap;
}

.admin-dashboard-action-btn:hover {
  transform: translateY(-1px);
}

.admin-dashboard-download-btn {
  background: #10b981;
  color: #ffffff;
}

.admin-dashboard-view-btn {
  background: #3b82f6;
  color: #ffffff;
}

.admin-dashboard-no-file {
  height: 34px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 800;
}

.admin-dashboard-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(15, 23, 42, 0.54);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
}

.admin-dashboard-modal {
  width: min(680px, 100%);
  max-height: calc(100vh - 44px);
  overflow-y: auto;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 26px 80px rgba(15, 23, 42, 0.26);
  text-align: left;
}

.admin-dashboard-modal-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  padding: 22px;
  border-bottom: 1px solid #e5eaf1;
}

.admin-dashboard-modal-title {
  margin: 0;
  color: #0f172a;
  font-size: 1.2rem;
  line-height: 1.35;
  font-weight: 900;
}

.admin-dashboard-modal-close {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 10px;
  background: #f1f5f9;
  color: #334155;
  cursor: pointer;
  font-size: 0;
  line-height: 1;
  flex-shrink: 0;
}

.admin-dashboard-modal-close::before {
  content: "x";
  font-size: 1.2rem;
}

.admin-dashboard-modal-body {
  padding: 22px;
}

.admin-dashboard-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.admin-dashboard-detail-item {
  border: 1px solid #e5eaf1;
  border-radius: 14px;
  padding: 13px 14px;
  background: #f8fafc;
}

.admin-dashboard-detail-item-full {
  grid-column: 1 / -1;
}

.admin-dashboard-detail-label {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 5px;
}

.admin-dashboard-detail-value {
  color: #0f172a;
  font-size: 0.94rem;
  line-height: 1.45;
  font-weight: 700;
  word-break: break-word;
}

.admin-dashboard-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 0 22px 22px;
  flex-wrap: wrap;
}

.admin-dashboard-remarks-section {
  margin-top: 18px;
  border: 1px solid #dbe3ef;
  border-radius: 16px;
  background: #f8fafc;
  padding: 16px;
}

.admin-dashboard-remarks-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}

.admin-dashboard-remarks-title {
  margin: 0;
  color: #0f172a;
  font-size: 0.98rem;
  font-weight: 900;
}

.admin-dashboard-remarks-help {
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 700;
}

.admin-dashboard-remarks-textarea {
  width: 100%;
  min-height: 118px;
  resize: vertical;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  background: #ffffff;
  color: #0f172a;
  padding: 12px;
  font: inherit;
  font-size: 0.92rem;
  line-height: 1.5;
  outline: none;
  box-sizing: border-box;
}

.admin-dashboard-remarks-textarea:focus {
  border-color: #0052cc;
  box-shadow: 0 0 0 4px rgba(0, 82, 204, 0.10);
}

.admin-dashboard-remarks-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.admin-dashboard-empty {
  padding: 54px 24px;
  text-align: center;
}

.admin-dashboard-empty-icon {
  font-size: 2.4rem;
  margin-bottom: 12px;
}

.admin-dashboard-empty-title {
  color: #0f172a;
  font-size: 1.15rem;
  font-weight: 900;
  margin: 0 0 8px;
}

.admin-dashboard-empty-text {
  color: #64748b;
  margin: 0;
  font-size: 0.94rem;
}

.admin-dashboard-pagination {
  display: flex;
  justify-content: center;
  gap: 9px;
  padding: 20px;
  border-top: 1px solid #eef2f7;
  flex-wrap: wrap;
}

.admin-dashboard-pagination-btn {
  min-width: 38px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #dbe3ef;
  background: #ffffff;
  color: #334155;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 850;
}

.admin-dashboard-pagination-btn.active {
  background: #0052cc;
  color: #ffffff;
  border-color: #0052cc;
}

.admin-dashboard-pagination-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.admin-dashboard-pagination-info {
  text-align: center;
  padding: 15px 20px 20px;
  color: #64748b;
  font-size: 0.88rem;
  font-weight: 650;
  border-top: 1px solid #eef2f7;
}

.admin-dashboard-loader-page {
  min-height: 100vh;
  padding-top: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.admin-dashboard-loader-card {
  background: #ffffff;
  border: 1px solid #e5eaf1;
  border-radius: 22px;
  padding: 34px;
  min-width: 290px;
  text-align: center;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.10);
}

.admin-dashboard-spinner {
  width: 42px;
  height: 42px;
  margin: 0 auto 16px;
  border: 4px solid #e5eaf1;
  border-top: 4px solid #0052cc;
  border-radius: 50%;
  animation: adminDashboardSpin 1s linear infinite;
}

.admin-dashboard-loader-text {
  color: #475569;
  font-weight: 750;
}

@keyframes adminDashboardSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes adminDashboardSlideDown {
  from { opacity: 0; transform: translateY(-18px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1160px) {
  .admin-dashboard-hero-content {
    grid-template-columns: 1fr;
  }

  .admin-dashboard-actions {
    justify-content: flex-start;
  }

  .admin-dashboard-stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .admin-dashboard-filters-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .admin-dashboard-page {
    padding: 92px 14px 30px;
  }

  .admin-dashboard-hero {
    padding: 26px;
    border-radius: 22px;
  }

  .admin-dashboard-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-dashboard-user-card {
    min-width: 0;
  }

  .admin-dashboard-btn {
    width: 100%;
  }

  .admin-dashboard-stats-grid {
    grid-template-columns: 1fr;
  }

  .admin-dashboard-filters-header,
  .admin-dashboard-table-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .admin-dashboard-filters-grid {
    grid-template-columns: 1fr;
  }

  .admin-dashboard-detail-grid {
    grid-template-columns: 1fr;
  }
}
`;

const initialFilters = {
  journal: "",
  status: "",
  dateFrom: "",
  dateTo: "",
  search: "",
};

const initialPagination = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
};

const DEFAULT_STATUS_OPTIONS = [
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "published", label: "Published" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const {
    joinAdminRoom,
    onSubmissionStatusUpdate,
    offSubmissionStatusUpdate,
    isConnected,
    usePolling,
  } = useWebSocket();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [submissions, setSubmissions] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [sorting, setSorting] = useState({
    field: "submission_date",
    order: "DESC",
  });
  const [pagination, setPagination] = useState(initialPagination);

  const [stats, setStats] = useState({
    totalSubmissions: 0,
    statusBreakdown: [],
    topJournals: [],
    recentSubmissions: [],
    monthlyTrends: [],
    journals: [],
    statuses: [],
  });

  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [error, setError] = useState("");
  const [statusUpdateNotification, setStatusUpdateNotification] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);
  const [remarksBySubmissionId, setRemarksBySubmissionId] = useState({});
  const [currentRemarks, setCurrentRemarks] = useState("");

  const adminEmail = useMemo(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("userEmail") || "";
  }, [isAuthenticated]);

  const getJournalName = useCallback((submission) => {
    return (
      submission?.journal_name ||
      submission?.journal ||
      submission?.journalName ||
      submission?.selected_journal ||
      submission?.journal_title ||
      submission?.journalTitle ||
      submission?.publication_journal ||
      "No Journal"
    );
  }, []);

  const getSubmissionValue = useCallback((submission, keys) => {
    return keys
      .map((key) => submission?.[key])
      .find((value) => value !== undefined && value !== null && String(value).trim());
  }, []);

  const getSubmissionAbstract = useCallback(
    (submission) =>
      getSubmissionValue(submission, [
        "abstract",
        "paper_abstract",
        "manuscript_abstract",
        "summary",
      ]),
    [getSubmissionValue]
  );

  const getSubmissionKeywords = useCallback(
    (submission) => {
      const keywords = getSubmissionValue(submission, [
        "keywords",
        "paper_keywords",
        "keyword",
        "tags",
      ]);

      return Array.isArray(keywords) ? keywords.join(", ") : keywords;
    },
    [getSubmissionValue]
  );

  const normalizeStatus = useCallback((status) => {
    if (!status) return "";

    return String(status)
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, "_")
      .replace(/_+/g, "_");
  }, []);

  const formatStatusLabel = useCallback((status) => {
    const normalizedStatus = normalizeStatus(status);

    if (!normalizedStatus) return "Unknown";

    return normalizedStatus
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }, [normalizeStatus]);

  const journalOptions = useMemo(() => {
    const statJournals = Array.isArray(stats.journals) ? stats.journals : [];
    const submissionJournals = submissions.map((submission) =>
      getJournalName(submission)
    );

    return [...new Set([...statJournals, ...submissionJournals])].filter(
      (journal) => journal && journal !== "No Journal"
    );
  }, [getJournalName, stats.journals, submissions]);

  const statusOptions = useMemo(() => {
    const defaultStatuses = DEFAULT_STATUS_OPTIONS.map((status) => status.value);
    const statStatuses = Array.isArray(stats.statuses) ? stats.statuses : [];
    const submissionStatuses = submissions.map((submission) => submission.status);
    const statusValues = [
      ...defaultStatuses,
      ...statStatuses,
      ...submissionStatuses,
    ].map((status) => normalizeStatus(status));

    return [...new Set(statusValues)]
      .filter(Boolean)
      .map((status) => {
        const defaultOption = DEFAULT_STATUS_OPTIONS.find(
          (option) => option.value === status
        );

        return (
          defaultOption || { value: status, label: formatStatusLabel(status) }
        );
      });
  }, [formatStatusLabel, normalizeStatus, stats.statuses, submissions]);

  const displayedSubmissions = useMemo(() => {
    const selectedStatus = normalizeStatus(filters.status);

    return submissions.filter(
      (submission) =>
        (!filters.journal || getJournalName(submission) === filters.journal) &&
        (!selectedStatus ||
          normalizeStatus(submission.status) === selectedStatus)
    );
  }, [
    filters.journal,
    filters.status,
    getJournalName,
    normalizeStatus,
    submissions,
  ]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    let tag = document.getElementById(ADMIN_DASHBOARD_STYLE_ID);

    if (!tag) {
      tag = document.createElement("style");
      tag.id = ADMIN_DASHBOARD_STYLE_ID;
      tag.type = "text/css";
      document.head.appendChild(tag);
    }

    tag.textContent = styles;
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("adminAuthToken");
    const userEmail = localStorage.getItem("userEmail");
    const adminRole = localStorage.getItem("adminRole");
    const hasAdminIdentity =
      adminRole === "admin" || userEmail === "admin@lordjournal.com";

    if (!authToken || !userEmail || !hasAdminIdentity) {
      navigate("/admin-login", { replace: true });
      return;
    }

    setIsAuthenticated(true);
    setIsLoading(false);
  }, [navigate]);

  const getStatusCount = useCallback(
    (status) => {
      const normalizedStatus = normalizeStatus(status);

      return (
        stats.statusBreakdown?.find(
          (item) => normalizeStatus(item.status) === normalizedStatus
        )?.count || 0
      );
    },
    [normalizeStatus, stats.statusBreakdown]
  );

  const fetchDashboardStats = useCallback(async () => {
    setIsLoadingStats(true);

    try {
      const authToken = localStorage.getItem("adminAuthToken");
      const userEmail = localStorage.getItem("userEmail");

      const response = await fetch(
        `/api/admin/dashboard/stats?email=${encodeURIComponent(userEmail || "")}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setStats((prev) => ({
          ...prev,
          ...data.data,
        }));
      }
    } catch (err) {
    // console.error("Failed to fetch dashboard stats:", err);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  const fetchSubmissions = useCallback(async () => {
    setIsLoadingSubmissions(true);
    setError("");

    try {
      const authToken = localStorage.getItem("adminAuthToken");
      const userEmail = localStorage.getItem("userEmail");

      const queryParams = new URLSearchParams({
        page: String(pagination.currentPage),
        limit: String(pagination.itemsPerPage),
        journal: filters.journal,
        status: normalizeStatus(filters.status),
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        search: filters.search,
        sortBy: sorting.field,
        sortOrder: sorting.order,
        email: userEmail || "",
      });

      const response = await fetch(`/api/admin/submissions?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        const fetchedSubmissions = data.data.submissions || [];

        // console.log("Submission sample:", fetchedSubmissions?.[0]);
        // console.log("Status sample:", fetchedSubmissions?.map((s) => s.status));

        setSubmissions(fetchedSubmissions);
        setPagination((prev) => ({
          ...prev,
          ...(data.data.pagination || {}),
        }));
      } else {
        setError(data.message || "Failed to fetch submissions.");
      }
    } catch (err) {
      setError("Failed to fetch submissions. Please try again.");
    } finally {
      setIsLoadingSubmissions(false);
    }
  }, [
    filters,
    normalizeStatus,
    pagination.currentPage,
    pagination.itemsPerPage,
    sorting,
  ]);

  useEffect(() => {
    if (isAuthenticated) fetchSubmissions();
  }, [isAuthenticated, fetchSubmissions]);

  useEffect(() => {
    if (isAuthenticated) fetchDashboardStats();
  }, [isAuthenticated, fetchDashboardStats]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      joinAdminRoom(userEmail);
    }
  }, [isAuthenticated, joinAdminRoom]);

  useEffect(() => {
    const handleSocketStatusUpdate = (data) => {
      setStatusUpdateNotification({
        type: "info",
        message: `Another admin updated "${data.paperTitle}" status to ${formatStatusLabel(
          data.status
        )}.`,
        timestamp: new Date().toISOString(),
      });

      fetchSubmissions();
      fetchDashboardStats();

      setTimeout(() => setStatusUpdateNotification(null), 5000);
    };

    onSubmissionStatusUpdate(handleSocketStatusUpdate);

    return () => {
      offSubmissionStatusUpdate(handleSocketStatusUpdate);
    };
  }, [
    fetchDashboardStats,
    fetchSubmissions,
    onSubmissionStatusUpdate,
    offSubmissionStatusUpdate,
  ]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const refreshDashboard = () => {
    fetchSubmissions();
    fetchDashboardStats();
  };

  const handleSort = (field) => {
    setSorting((prev) => ({
      field,
      order: prev.field === field && prev.order === "ASC" ? "DESC" : "ASC",
    }));

    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleStatusUpdate = async (submissionId, newStatus) => {
    try {
      const authToken = localStorage.getItem("adminAuthToken");
      const userEmail = localStorage.getItem("userEmail");

      const response = await fetch(
        `/api/admin/submissions/${submissionId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
            email: userEmail,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSubmissions((prev) =>
          prev.map((submission) =>
            submission.id === submissionId
              ? {
                  ...submission,
                  status: newStatus,
                  updated_at: new Date().toISOString(),
                }
              : submission
          )
        );

        notyf.success("Submission status updated successfully.");
        fetchDashboardStats();
      } else {
        setError(data.message || "Failed to update status.");
      }
    } catch (err) {
      setError("Failed to update status. Please try again.");
    }
  };

  const openStatusConfirmModal = (submission, newStatus) => {
    const normalizedNewStatus = normalizeStatus(newStatus);

    if (normalizeStatus(submission.status) === normalizedNewStatus) return;

    setPendingStatusChange({
      submissionId: submission.id,
      newStatus: normalizedNewStatus,
      paperTitle: submission.paper_title || "Untitled Paper",
    });
    setIsStatusConfirmOpen(true);
  };

  const closeStatusConfirmModal = () => {
    setIsStatusConfirmOpen(false);
    setPendingStatusChange(null);
  };

  const confirmStatusUpdate = async () => {
    if (!pendingStatusChange) return;

    const { submissionId, newStatus } = pendingStatusChange;
    closeStatusConfirmModal();
    await handleStatusUpdate(submissionId, newStatus);
  };

  const handleDownload = async (submissionId, fileName) => {
    try {
      const authToken = localStorage.getItem("adminAuthToken");
      const userEmail = localStorage.getItem("userEmail");

      const response = await fetch(
        `/api/admin/submissions/${submissionId}/download?email=${encodeURIComponent(
          userEmail || ""
        )}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download = fileName || "paper";
      document.body.appendChild(anchor);
      anchor.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    } catch (err) {
      setError("Failed to download file. Please try again.");
    }
  };

  const handleLogout = () => {
    clearAuthStorage();
    navigate("/admin-login", { replace: true });
  };

  const openDetailsModal = (submission) => {
    setSelectedSubmission(submission);
    setCurrentRemarks(
      remarksBySubmissionId[submission.id] || submission.remarks || ""
    );
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedSubmission(null);
    setCurrentRemarks("");
  };

  const saveRemarks = async () => {
    if (!selectedSubmission) return;

    const submissionId = selectedSubmission.id;

    setRemarksBySubmissionId((prev) => ({
      ...prev,
      [submissionId]: currentRemarks,
    }));

    try {
      const authToken = localStorage.getItem("adminAuthToken");
      const response = await fetch(
        `/api/admin/submissions/${submissionId}/remarks`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remarks: currentRemarks,
            email: adminEmail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Remarks endpoint unavailable");
      }

      const data = await response.json().catch(() => ({}));

      if (data.success === false) {
        throw new Error(data.message || "Failed to save remarks");
      }

      notyf.success("Remarks saved successfully.");
    } catch (err) {
      notyf.success("Remarks saved locally for this session.");
    }
  };

  const getStatusClass = (status) => {
    const normalizedStatus = normalizeStatus(status);
    const classes = {
      submitted: "admin-status-submitted",
      under_review: "admin-status-under-review",
      accepted: "admin-status-accepted",
      rejected: "admin-status-rejected",
      published: "admin-status-published",
    };

    return classes[normalizedStatus] || "admin-status-default";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const visiblePages = useMemo(() => {
    const total = pagination.totalPages || 1;
    const current = pagination.currentPage || 1;
    const pages = [];

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    return pages;
  }, [pagination.currentPage, pagination.totalPages]);

  const showingFrom =
    pagination.totalItems === 0
      ? 0
      : (pagination.currentPage - 1) * pagination.itemsPerPage + 1;

  const showingTo = Math.min(
    pagination.currentPage * pagination.itemsPerPage,
    pagination.totalItems
  );

  const todaySubmissionsCount = useMemo(() => {
    const today = new Date();

    return submissions.filter((submission) => {
      if (!submission.submission_date) return false;

      const submissionDate = new Date(submission.submission_date);

      return (
        submissionDate.getFullYear() === today.getFullYear() &&
        submissionDate.getMonth() === today.getMonth() &&
        submissionDate.getDate() === today.getDate()
      );
    }).length;
  }, [submissions]);

  const thisMonthSubmissionsCount = useMemo(() => {
    const today = new Date();

    return submissions.filter((submission) => {
      if (!submission.submission_date) return false;

      const submissionDate = new Date(submission.submission_date);

      return (
        submissionDate.getFullYear() === today.getFullYear() &&
        submissionDate.getMonth() === today.getMonth()
      );
    }).length;
  }, [submissions]);

  const summaryCards = useMemo(
    () => [
      {
        label: "Total Submissions",
        value: isLoadingStats ? "—" : stats.totalSubmissions || 0,
        icon: "ALL",
        tone: "blue",
        meta: "All time",
      },
      {
        label: "New Submissions",
        value: isLoadingStats ? "—" : getStatusCount("submitted"),
        icon: "NEW",
        tone: "yellow",
        meta: "Submitted",
      },
      {
        label: "Under Review",
        value: isLoadingStats ? "—" : getStatusCount("under_review"),
        icon: "REV",
        tone: "cyan",
        meta: "Editorial queue",
      },
      {
        label: "Accepted",
        value: isLoadingStats ? "—" : getStatusCount("accepted"),
        icon: "OK",
        tone: "green",
        meta: "Approved papers",
      },
      {
        label: "Rejected",
        value: isLoadingStats ? "—" : getStatusCount("rejected"),
        icon: "NO",
        tone: "red",
        meta: "Declined papers",
      },
      {
        label: "Published",
        value: isLoadingStats ? "—" : getStatusCount("published"),
        icon: "PUB",
        tone: "purple",
        meta: "Live papers",
      },
      {
        label: "Today's Submissions",
        value: isLoadingSubmissions ? "—" : todaySubmissionsCount,
        icon: "DAY",
        tone: "indigo",
        meta: "Loaded results",
      },
      {
        label: "This Month Submissions",
        value: isLoadingSubmissions ? "—" : thisMonthSubmissionsCount,
        icon: "MON",
        tone: "slate",
        meta: "Loaded results",
      },
    ],
    [
      getStatusCount,
      isLoadingStats,
      isLoadingSubmissions,
      stats.totalSubmissions,
      thisMonthSubmissionsCount,
      todaySubmissionsCount,
    ]
  );

  if (isLoading) {
    return (
      <main className="admin-dashboard-loader-page">
        <div className="admin-dashboard-loader-card">
          <div className="admin-dashboard-spinner" />
          <div className="admin-dashboard-loader-text">
            Loading admin dashboard...
          </div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-inner">
        <section className="admin-dashboard-hero">
          <div className="admin-dashboard-hero-content">
            <div>
              <div className="admin-dashboard-kicker">
                <span className="admin-dashboard-kicker-dot" />
                Admin Control Panel
              </div>

              <h1 className="admin-dashboard-title">Admin Dashboard</h1>

              <p className="admin-dashboard-subtitle">
                Manage paper submissions, track editorial status, download
                manuscripts, and monitor publishing workflow activity.
              </p>
            </div>

            <div className="admin-dashboard-actions">
              <div className="admin-dashboard-user-card">
                <div className="admin-dashboard-user-label">Signed in as</div>
                <div className="admin-dashboard-user-email">
                  {adminEmail || "Administrator"}
                </div>
              </div>

              <button
                type="button"
                className="admin-dashboard-btn admin-dashboard-btn-light"
                onClick={refreshDashboard}
                disabled={isLoadingSubmissions || isLoadingStats}
              >
                {isLoadingSubmissions || isLoadingStats
                  ? "Refreshing..."
                  : "Refresh"}
              </button>

              <button
                type="button"
                className="admin-dashboard-btn admin-dashboard-btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {!isConnected && (
          <div
            className={`admin-dashboard-alert ${
              usePolling
                ? "admin-dashboard-alert-info"
                : "admin-dashboard-alert-warning"
            }`}
          >
            {usePolling
              ? "🔄 Using polling for updates every 30 seconds. Real-time updates are not available."
              : "⚠️ Real-time updates are not available. Some features may not work properly."}
          </div>
        )}

        {statusUpdateNotification && (
          <div className="admin-dashboard-alert admin-dashboard-alert-info admin-dashboard-alert-animate">
            ℹ️ {statusUpdateNotification.message}
          </div>
        )}

        {error && (
          <div className="admin-dashboard-alert admin-dashboard-alert-error">
            {error}
          </div>
        )}

        <section className="admin-dashboard-stats-grid">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className={`admin-dashboard-stat-card admin-dashboard-stat-card-${card.tone}`}
            >
              <div className="admin-dashboard-stat-icon">{card.icon}</div>

              <div>
                <div className="admin-dashboard-stat-number">{card.value}</div>
                <div className="admin-dashboard-stat-label">{card.label}</div>
                <div className="admin-dashboard-stat-meta">{card.meta}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="admin-dashboard-stats-grid admin-dashboard-stats-grid-legacy">
          <div className="admin-dashboard-stat-card">
            <div className="admin-dashboard-stat-icon admin-dashboard-stat-icon-blue">
              📊
            </div>
            <div>
              <div className="admin-dashboard-stat-number">
                {isLoadingStats ? "—" : stats.totalSubmissions || 0}
              </div>
              <div className="admin-dashboard-stat-label">Total Submissions</div>
            </div>
          </div>

          <div className="admin-dashboard-stat-card">
            <div className="admin-dashboard-stat-icon admin-dashboard-stat-icon-yellow">
              📝
            </div>
            <div>
              <div className="admin-dashboard-stat-number">
                {isLoadingStats ? "—" : getStatusCount("submitted")}
              </div>
              <div className="admin-dashboard-stat-label">New Submissions</div>
            </div>
          </div>

          <div className="admin-dashboard-stat-card">
            <div className="admin-dashboard-stat-icon admin-dashboard-stat-icon-green">
              ⏳
            </div>
            <div>
              <div className="admin-dashboard-stat-number">
                {isLoadingStats ? "—" : getStatusCount("under_review")}
              </div>
              <div className="admin-dashboard-stat-label">Under Review</div>
            </div>
          </div>

          <div className="admin-dashboard-stat-card">
            <div className="admin-dashboard-stat-icon admin-dashboard-stat-icon-purple">
              ✅
            </div>
            <div>
              <div className="admin-dashboard-stat-number">
                {isLoadingStats ? "—" : getStatusCount("published")}
              </div>
              <div className="admin-dashboard-stat-label">Published</div>
            </div>
          </div>
        </section>

        {false && (
        <section className="admin-dashboard-card admin-dashboard-activity">
          <div className="admin-dashboard-filters-header">
            <h2 className="admin-dashboard-section-title">Recent Activity</h2>
            <div className="admin-dashboard-loading-text">
              Latest submission updates
            </div>
          </div>

          {recentActivities.length > 0 ? (
            <div className="admin-dashboard-activity-list">
              {recentActivities.map((submission) => {
                const authorName =
                  [submission.given_names, submission.family_name]
                    .filter(Boolean)
                    .join(" ") || "Unknown Author";
                const activityDate =
                  submission.updated_at || submission.submission_date;

                return (
                  <div
                    key={`activity-${submission.id}`}
                    className="admin-dashboard-activity-item"
                  >
                    <div className="admin-dashboard-activity-icon">ACT</div>

                    <div>
                      <h3 className="admin-dashboard-activity-title">
                        {submission.paper_title || "Untitled Paper"}
                      </h3>
                      <div className="admin-dashboard-activity-meta">
                        {authorName} • {getJournalName(submission)} •{" "}
                        {formatDate(activityDate)}
                      </div>
                    </div>

                    <span
                      className={`admin-dashboard-activity-status ${getStatusClass(
                        submission.status
                      )}`}
                    >
                      {formatStatusLabel(submission.status)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="admin-dashboard-activity-empty">
              No recent activity found.
            </div>
          )}
        </section>
        )}

        <section className="admin-dashboard-card admin-dashboard-filters">
          <div className="admin-dashboard-filters-header">
            <h2 className="admin-dashboard-section-title">Filter Submissions</h2>

            <div className="admin-dashboard-small-actions">
              <button
                type="button"
                className="admin-dashboard-small-btn"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

              <button
                type="button"
                className="admin-dashboard-small-btn"
                onClick={refreshDashboard}
              >
                Refresh Data
              </button>
            </div>
          </div>

          <div className="admin-dashboard-filters-grid">
            <div className="admin-dashboard-filter-group">
              <label className="admin-dashboard-filter-label">Search</label>
              <input
                type="text"
                placeholder="Author name or paper title..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="admin-dashboard-filter-input"
              />
            </div>

            <div className="admin-dashboard-filter-group">
              <label className="admin-dashboard-filter-label">Journal</label>

              <select
                value={filters.journal}
                onChange={(e) => handleFilterChange("journal", e.target.value)}
                className="admin-dashboard-filter-select"
              >
                <option value="">All Journals</option>

                {journalOptions.map((journal) => (
                  <option key={journal} value={journal}>
                    {journal}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-dashboard-filter-group">
              <label className="admin-dashboard-filter-label">Status</label>
              <select
                value={normalizeStatus(filters.status)}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="admin-dashboard-filter-select"
              >
                <option value="">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-dashboard-filter-group">
              <label className="admin-dashboard-filter-label">Date From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                className="admin-dashboard-filter-input"
              />
            </div>

            <div className="admin-dashboard-filter-group">
              <label className="admin-dashboard-filter-label">Date To</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                className="admin-dashboard-filter-input"
              />
            </div>

            <div className="admin-dashboard-filter-group">
              <label className="admin-dashboard-filter-label">Items</label>
              <select
                value={pagination.itemsPerPage}
                onChange={(e) => {
                  setPagination((prev) => ({
                    ...prev,
                    itemsPerPage: parseInt(e.target.value, 10),
                    currentPage: 1,
                  }));
                }}
                className="admin-dashboard-filter-select"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </section>

        <section className="admin-dashboard-card admin-dashboard-submissions">
          <div className="admin-dashboard-table-header">
            <h2 className="admin-dashboard-section-title">Paper Submissions</h2>

            {isLoadingSubmissions && (
              <div className="admin-dashboard-loading-text">Loading...</div>
            )}
          </div>

          {displayedSubmissions.length > 0 ? (
            <div className="admin-dashboard-table-wrap">
              <table className="admin-dashboard-table">
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSort("submission_date")}
                      className="admin-dashboard-sortable"
                    >
                      Date
                      {sorting.field === "submission_date" && (
                        <span className="admin-dashboard-sort-indicator">
                          {sorting.order === "ASC" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>

                    <th
                      onClick={() => handleSort("given_names")}
                      className="admin-dashboard-sortable"
                    >
                      Author
                      {sorting.field === "given_names" && (
                        <span className="admin-dashboard-sort-indicator">
                          {sorting.order === "ASC" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>

                    <th
                      onClick={() => handleSort("paper_title")}
                      className="admin-dashboard-sortable"
                    >
                      Paper Title
                      {sorting.field === "paper_title" && (
                        <span className="admin-dashboard-sort-indicator">
                          {sorting.order === "ASC" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>

                    <th
                      onClick={() => handleSort("journal_name")}
                      className="admin-dashboard-sortable"
                    >
                      Journal
                      {sorting.field === "journal_name" && (
                        <span className="admin-dashboard-sort-indicator">
                          {sorting.order === "ASC" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>

                    <th
                      onClick={() => handleSort("status")}
                      className="admin-dashboard-sortable"
                    >
                      Status
                      {sorting.field === "status" && (
                        <span className="admin-dashboard-sort-indicator">
                          {sorting.order === "ASC" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>

                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {displayedSubmissions.map((submission) => {
                    const journalName = getJournalName(submission);

                    return (
                      <tr key={submission.id}>
                        <td>{formatDate(submission.submission_date)}</td>

                        <td>
                          <div className="admin-dashboard-author">
                            <div className="admin-dashboard-author-name">
                              {submission.given_names} {submission.family_name}
                            </div>

                            <div className="admin-dashboard-author-email">
                              {submission.email}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div
                            className="admin-dashboard-paper-title"
                            title={submission.paper_title}
                          >
                            {submission.paper_title || "Untitled Paper"}
                          </div>
                        </td>

                        <td>
                          <div className="admin-dashboard-journal">
                            <span className="admin-dashboard-journal-icon">
                              {submission.journal_icon || "📘"}
                            </span>

                            <span
                              className="admin-dashboard-journal-name"
                              title={journalName}
                            >
                              {journalName}
                            </span>
                          </div>
                        </td>

                        <td>
                          <select
                            value={normalizeStatus(submission.status)}
                            onChange={(e) =>
                              openStatusConfirmModal(submission, e.target.value)
                            }
                            className={`admin-dashboard-status-select ${getStatusClass(
                              submission.status
                            )}`}
                          >
                            {statusOptions.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td>
                          <div className="admin-dashboard-action-buttons">
                            {submission.file_path ? (
                              <button
                                type="button"
                                onClick={() =>
                                  handleDownload(
                                    submission.id,
                                    submission.paper_title
                                  )
                                }
                                className="admin-dashboard-action-btn admin-dashboard-download-btn"
                                title="Download Paper"
                              >
                                Download
                              </button>
                            ) : (
                              <span
                                className="admin-dashboard-no-file"
                                title="No file attached"
                              >
                                No File
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() => openDetailsModal(submission)}
                              className="admin-dashboard-action-btn admin-dashboard-view-btn"
                              title="View Details"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-dashboard-empty">
              <div className="admin-dashboard-empty-icon">📄</div>
              <h3 className="admin-dashboard-empty-title">No submissions found</h3>
              <p className="admin-dashboard-empty-text">
                Try adjusting filters or refresh the dashboard.
              </p>
            </div>
          )}

          {pagination.totalPages > 1 && (
            <div className="admin-dashboard-pagination">
              <button
                type="button"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="admin-dashboard-pagination-btn"
              >
                Previous
              </button>

              {visiblePages[0] > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => handlePageChange(1)}
                    className="admin-dashboard-pagination-btn"
                  >
                    1
                  </button>

                  {visiblePages[0] > 2 && (
                    <button
                      type="button"
                      disabled
                      className="admin-dashboard-pagination-btn"
                    >
                      ...
                    </button>
                  )}
                </>
              )}

              {visiblePages.map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`admin-dashboard-pagination-btn ${
                    page === pagination.currentPage ? "active" : ""
                  }`}
                >
                  {page}
                </button>
              ))}

              {visiblePages[visiblePages.length - 1] < pagination.totalPages && (
                <>
                  {visiblePages[visiblePages.length - 1] <
                    pagination.totalPages - 1 && (
                    <button
                      type="button"
                      disabled
                      className="admin-dashboard-pagination-btn"
                    >
                      ...
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handlePageChange(pagination.totalPages)}
                    className="admin-dashboard-pagination-btn"
                  >
                    {pagination.totalPages}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="admin-dashboard-pagination-btn"
              >
                Next
              </button>
            </div>
          )}

          <div className="admin-dashboard-pagination-info">
            Showing {showingFrom} to {showingTo} of {pagination.totalItems}{" "}
            submissions
          </div>
        </section>

        {isDetailsModalOpen && selectedSubmission && (
          <div
            className="admin-dashboard-modal-backdrop"
            role="presentation"
            onClick={closeDetailsModal}
          >
            <div
              className="admin-dashboard-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="submission-details-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="admin-dashboard-modal-header">
                <h3
                  id="submission-details-title"
                  className="admin-dashboard-modal-title"
                >
                  {selectedSubmission.paper_title || "Untitled Paper"}
                </h3>

                <button
                  type="button"
                  className="admin-dashboard-modal-close"
                  onClick={closeDetailsModal}
                  aria-label="Close submission details"
                >
                  ×
                </button>
              </div>

              <div className="admin-dashboard-modal-body">
                <div className="admin-dashboard-detail-grid">
                  <div className="admin-dashboard-detail-item admin-dashboard-detail-item-full">
                    <div className="admin-dashboard-detail-label">Paper Title</div>
                    <div className="admin-dashboard-detail-value">
                      {selectedSubmission.paper_title || "Untitled Paper"}
                    </div>
                  </div>

                  <div className="admin-dashboard-detail-item">
                    <div className="admin-dashboard-detail-label">Author</div>
                    <div className="admin-dashboard-detail-value">
                      {[selectedSubmission.given_names, selectedSubmission.family_name]
                        .filter(Boolean)
                        .join(" ") || "Unknown Author"}
                    </div>
                  </div>

                  <div className="admin-dashboard-detail-item">
                    <div className="admin-dashboard-detail-label">Email</div>
                    <div className="admin-dashboard-detail-value">
                      {selectedSubmission.email || "No Email"}
                    </div>
                  </div>

                  <div className="admin-dashboard-detail-item">
                    <div className="admin-dashboard-detail-label">Journal</div>
                    <div className="admin-dashboard-detail-value">
                      {getJournalName(selectedSubmission)}
                    </div>
                  </div>

                  <div className="admin-dashboard-detail-item">
                    <div className="admin-dashboard-detail-label">Status</div>
                    <div className="admin-dashboard-detail-value">
                      {formatStatusLabel(selectedSubmission.status)}
                    </div>
                  </div>

                  <div className="admin-dashboard-detail-item">
                    <div className="admin-dashboard-detail-label">Submitted</div>
                    <div className="admin-dashboard-detail-value">
                      {formatDate(selectedSubmission.submission_date)}
                    </div>
                  </div>

                  {selectedSubmission.updated_at && (
                    <div className="admin-dashboard-detail-item">
                      <div className="admin-dashboard-detail-label">Updated</div>
                      <div className="admin-dashboard-detail-value">
                        {formatDate(selectedSubmission.updated_at)}
                      </div>
                    </div>
                  )}

                  {getSubmissionAbstract(selectedSubmission) && (
                    <div className="admin-dashboard-detail-item admin-dashboard-detail-item-full">
                      <div className="admin-dashboard-detail-label">Abstract</div>
                      <div className="admin-dashboard-detail-value">
                        {getSubmissionAbstract(selectedSubmission)}
                      </div>
                    </div>
                  )}

                  {getSubmissionKeywords(selectedSubmission) && (
                    <div className="admin-dashboard-detail-item admin-dashboard-detail-item-full">
                      <div className="admin-dashboard-detail-label">Keywords</div>
                      <div className="admin-dashboard-detail-value">
                        {getSubmissionKeywords(selectedSubmission)}
                      </div>
                    </div>
                  )}

                  <div className="admin-dashboard-detail-item admin-dashboard-detail-item-full">
                    <div className="admin-dashboard-detail-label">File</div>
                    <div className="admin-dashboard-detail-value">
                      {selectedSubmission.file_path ? "File attached" : "No file attached"}
                    </div>
                  </div>
                </div>

                <div className="admin-dashboard-remarks-section">
                  <div className="admin-dashboard-remarks-header">
                    <h4 className="admin-dashboard-remarks-title">
                      Admin Remarks
                    </h4>
                    <span className="admin-dashboard-remarks-help">
                      Internal notes
                    </span>
                  </div>

                  <textarea
                    value={currentRemarks}
                    onChange={(event) => setCurrentRemarks(event.target.value)}
                    className="admin-dashboard-remarks-textarea"
                    placeholder="Write internal remarks for this paper..."
                  />

                  <div className="admin-dashboard-remarks-actions">
                    <button
                      type="button"
                      onClick={saveRemarks}
                      className="admin-dashboard-action-btn admin-dashboard-download-btn"
                    >
                      Save Remarks
                    </button>
                  </div>
                </div>
              </div>

              <div className="admin-dashboard-modal-actions">
                {selectedSubmission.file_path && (
                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(
                        selectedSubmission.id,
                        selectedSubmission.paper_title
                      )
                    }
                    className="admin-dashboard-action-btn admin-dashboard-download-btn"
                  >
                    Download
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeDetailsModal}
                  className="admin-dashboard-action-btn admin-dashboard-view-btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isStatusConfirmOpen && pendingStatusChange && (
          <div
            className="admin-dashboard-modal-backdrop"
            role="presentation"
            onClick={closeStatusConfirmModal}
          >
            <div
              className="admin-dashboard-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="status-confirm-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="admin-dashboard-modal-header">
                <h3
                  id="status-confirm-title"
                  className="admin-dashboard-modal-title"
                >
                  Confirm Status Update
                </h3>

                <button
                  type="button"
                  className="admin-dashboard-modal-close"
                  onClick={closeStatusConfirmModal}
                  aria-label="Close status confirmation"
                />
              </div>

              <div className="admin-dashboard-modal-body">
                <div className="admin-dashboard-detail-grid">
                  <div className="admin-dashboard-detail-item admin-dashboard-detail-item-full">
                    <div className="admin-dashboard-detail-label">Paper</div>
                    <div className="admin-dashboard-detail-value">
                      {pendingStatusChange.paperTitle}
                    </div>
                  </div>

                  <div className="admin-dashboard-detail-item admin-dashboard-detail-item-full">
                    <div className="admin-dashboard-detail-label">Status Change</div>
                    <div className="admin-dashboard-detail-value">
                      Are you sure you want to change the status of this paper to{" "}
                      {formatStatusLabel(pendingStatusChange.newStatus)}?
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-dashboard-modal-actions">
                <button
                  type="button"
                  onClick={closeStatusConfirmModal}
                  className="admin-dashboard-action-btn admin-dashboard-view-btn"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmStatusUpdate}
                  className="admin-dashboard-action-btn admin-dashboard-download-btn"
                >
                  Confirm Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
