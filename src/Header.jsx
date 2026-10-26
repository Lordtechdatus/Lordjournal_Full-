import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AUTH_CHANGE_EVENT, clearAuthStorage, getIsAdmin } from './utils/auth';

const HEADER_STYLE_ID = 'header-inline-styles';

function getInitials(name, email) {
  const trimmed = (name || '').trim();
  if (trimmed) {
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return trimmed.substring(0, 2).toUpperCase();
  }
  const localPart = (email || '').split('@')[0];
  return localPart ? localPart.substring(0, 2).toUpperCase() : '??';
}


function LordJournalLogo() {
  return (
    <svg
      className="brand-logo-mark"
      viewBox="0 0 64 64"
      role="img"
      aria-label="Lord Journals academic logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lordJournalLogoGradient" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B5ED7" />
          <stop offset="0.58" stopColor="#0047AB" />
          <stop offset="1" stopColor="#082F6F" />
        </linearGradient>
        <linearGradient id="lordJournalAccentGradient" x1="16" y1="15" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#29D3E8" />
          <stop offset="1" stopColor="#0097B2" />
        </linearGradient>
      </defs>

      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#lordJournalLogoGradient)" />
      <path
        d="M32 10L48 17V31.5C48 42.5 41.7 50.7 32 54C22.3 50.7 16 42.5 16 31.5V17L32 10Z"
        fill="white"
        fillOpacity="0.13"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <path
        d="M32 21.4C26.8 16.9 21.2 17.3 17.6 19.2V42.1C21.9 40.1 27.3 40.8 32 45.1C36.7 40.8 42.1 40.1 46.4 42.1V19.2C42.8 17.3 37.2 16.9 32 21.4Z"
        fill="white"
      />
      <path
        d="M32 21.4V45.1M21.6 24.4C24.9 23.4 28.3 24.3 32 27.1M42.4 24.4C39.1 23.4 35.7 24.3 32 27.1M21.6 31.1C25.1 30.2 28.3 31 32 33.7M42.4 31.1C38.9 30.2 35.7 31 32 33.7M21.6 37.7C25.2 36.9 28.5 37.8 32 40.5M42.4 37.7C38.8 36.9 35.5 37.8 32 40.5"
        fill="none"
        stroke="#0B4FB3"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47 12.5L49.4 17.4L54.6 18.2L50.8 22L51.7 27.2L47 24.8L42.3 27.2L43.2 22L39.4 18.2L44.6 17.4L47 12.5Z"
        fill="url(#lordJournalAccentGradient)"
        stroke="white"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const JOURNALS = [
  {
    title: "Lord Journal of Civil Engineering",
    short: "Civil Engineering",
    route: "/journals/civil-engineering",
    icon: "civil"
  },
  {
    title: "Lord Journal of Mechanical Engineering",
    short: "Mechanical Engineering",
    route: "/journals/mechanical-engineering",
    icon: "mechanical"
  },
  {
    title: "Lord Journal of Electronics Engineering",
    short: "Electronics Engineering",
    route: "/journals/electronics-engineering",
    icon: "electronics"
  },
  {
    title: "Lord Journal of Electrical Engineering",
    short: "Electrical Engineering",
    route: "/journals/electrical-engineering",
    icon: "electrical"
  },
  {
    title: "Lord Journal of Computer Science & Engineering",
    short: "Computer Science & Engineering",
    route: "/journals/computer-science-engineering",
    icon: "cs"
  },
  {
    title: "Lord Journal of AI, ML & Data Science",
    short: "AI, ML & Data Science",
    route: "/journals/ai-ml-data-science",
    icon: "ai"
  },
  {
    title: "Lord Journal of Applied Science",
    short: "Applied Science",
    route: "/journals/applied-science",
    icon: "applied"
  },
  {
    title: "Lord Journal of Law & Social Science",
    short: "Law & Social Science",
    route: "/journals/law-social-science",
    icon: "law"
  },
  {
    title: "Lord Journal of Education",
    short: "Education",
    route: "/journals/education",
    icon: "education"
  },
  {
    title: "Lord Journal of Built Environment & Sustainability",
    short: "Built Environment & Sustainability",
    route: "/journals/built-environment-sustainability",
    icon: "sustainability"
  },
  {
    title: "Lord Journal of Medical Science",
    short: "Medical Science",
    route: "/journals/medical-science",
    icon: "medical"
  }
];

const JOURNAL_MENU_COLUMNS = [
  {
    title: 'Engineering Journals',
    icon: 'engineering',
    links: JOURNALS.slice(0, 5).map(({ short, route }) => ({ label: short, to: route })),
  },
  {
    title: 'Technology & Science',
    icon: 'technology',
    links: JOURNALS.slice(5, 7)
      .concat(JOURNALS.slice(9, 10))
      .map(({ short, route }) => ({ label: short, to: route })),
  },
  {
    title: 'Social & Professional Studies',
    icon: 'socialStudies',
    links: JOURNALS.slice(7, 9)
      .concat(JOURNALS.slice(10, 11))
      .map(({ short, route }) => ({ label: short, to: route }))
      .concat([{ label: 'Management', to: '/journals/management' }]),
  },
];

const PUBLISH_MENU_COLUMNS = [
  {
    title: 'Journals',
    icon: 'journals',
    links: [
      { label: 'Find a journal', to: '/journals' },
      { label: 'Calls for papers', to: '/calls-for-papers' },
      { label: 'Lord Journals', to: '/journals' },
      { label: 'Publishing Services', to: '/publishing-services' },
      { label: 'Open access journals', to: '/open-access-journals' },
      { label: 'How-to guides', to: '/how-to-guides' },
    ],
  },
  {
    title: 'Case Studies',
    icon: 'caseStudies',
    links: [
      { label: 'Find a case study', to: '/find-case-study' },
      { label: 'Calls for papers', to: '/case-calls' },
      { label: 'Case study competitions', to: '/case-competition' },
      { label: 'Submit your case study', to: '/submit' },
      { label: 'Teaching with cases', to: '/teaching-cases' },
      { label: 'Cases hub', to: '/cases-hub' },
    ],
  },
  {
    title: 'Open Research',
    icon: 'openResearch',
    links: [
      { label: 'New fully open access journals', to: '/open-access-journals' },
      { label: 'Choose your open access route', to: '/open-access-route' },
      { label: 'Open access publishing agreements', to: '/open-access-agreements' },
    ],
  },
  {
    title: 'Author Policies',
    icon: 'authorPolicies',
    links: [
      { label: 'Author rights', to: '/author-rights' },
      { label: 'Author services', to: '/author-services' },
      { label: 'Editorial & originality', to: '/editorial-policies' },
      { label: 'Permissions', to: '/permissions' },
      { label: 'Article withdrawal & correction', to: '/withdrawal-policy' },
      { label: 'Open research policies', to: '/research-policies' },
      { label: 'Transparent price setting', to: '/pricing' },
    ],
  },
  {
    title: 'Ethics & Integrity',
    icon: 'ethics',
    links: [
      { label: 'Publishing ethics', to: '/publishing-ethics' },
      { label: 'Research integrity', to: '/research-integrity' },
      { label: 'DORA', to: '/dora' },
      { label: 'UN SDG Publishers Compact', to: '/sdg' },
    ],
  },
];

const MEGA_ICON_PATHS = {
  journals: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V4a2 2 0 00-2-2H6.5A2.5 2.5 0 004 4.5v15z",
  engineering: "M4 21h16M5 21V9l7-5 7 5v12M9 21v-6h4v6",
  technology: "M13 2L4.5 14h6l-1 8L18.5 10h-6l1-8z",
  socialStudies: "M2 8l10-5 10 5-10 5-10-5zM6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5",
  caseStudies: "M3 7h5l2 2h11v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z",
  openResearch: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20",
  authorPolicies: "M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5l8-3zM9 12l2 2 4-4",
  ethics: "M12 3v3M12 3L4 7l8 3 8-3-8-4zM4 7v9M20 7v9M4 10l-2 4h6l-2-4M20 10l-2 4h6l-2-4M9 21h6",
};

function MegaColumnIcon({ name }) {
  const path = MEGA_ICON_PATHS[name] || MEGA_ICON_PATHS.journals;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const styles = `
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow: visible;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  min-height: 70px;
  gap: 0.75rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
  flex-wrap: nowrap;
  min-width: max-content;
} 

.logo-section:hover {
  opacity: 0.8;
}

.brand-logo-mark {
  width: 46px;
  height: 46px;
  display: block;
  flex-shrink: 0;
  filter: drop-shadow(0 3px 8px rgba(0, 82, 204, 0.18));
}

.logo-text {
  margin: 0;
  font-size: 1.6rem;
  color: #0052cc;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1;
}
.nav-menu {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  min-width: 0;
  overflow: visible;
}

.nav-link {
  color: #213547;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  min-height: 40px;
}

.nav-link:hover {
  background: #f0f4ff;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-link-dropdown {
  color: #213547;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  min-height: 40px;
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
}

.nav-link-dropdown:hover {
  background: #f0f4ff;
}

.dropdown-arrow {
  font-size: 12px;
  transition: transform 0.2s;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.menu-backdrop {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgba(8, 15, 30, 0.45);
  backdrop-filter: blur(2px);
  cursor: default;
  animation: menuBackdropFadeIn 0.18s ease;
}

@keyframes menuBackdropFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes megaMenuIn {
  from { opacity: 0; transform: translate(-50%, -6px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

.mega-menu-wrapper {
  position: static;
}

@media (min-width: 901px) {
  .mega-menu-wrapper {
    position: relative;
  }
}

.mega-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: min(1400px, calc(100vw - 2rem));
  background: linear-gradient(180deg, #ffffff 0%, #f4f8fb 100%);
  padding: 28px 36px 32px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  box-shadow: 0 18px 44px rgba(15, 45, 90, 0.16), 0 2px 6px rgba(15, 45, 90, 0.06);
  border-radius: 0 0 18px 18px;
  border-top: 3px solid;
  border-image: linear-gradient(90deg, #0052cc, #29d3e8) 1;
  z-index: 1002;
  animation: megaMenuIn 0.18s ease;
}

.journals-mega-dropdown,
.publish-mega-dropdown {
  position: fixed !important;
  top: 70px !important;
  left: 18px !important;
  right: 18px !important;
  width: auto !important;
  max-width: none !important;
  transform: none !important;
  animation: none !important;
  background: linear-gradient(180deg, #ffffff 0%, #f4f8fb 100%);
  border-top: 3px solid #0ea5e9;
  border-radius: 0 0 18px 18px;
  box-shadow: 0 22px 55px rgba(15, 23, 42, 0.18);
  padding: 36px 48px;
  z-index: 1002;
  box-sizing: border-box;
  overflow: visible;
}

.journals-mega-dropdown .mega-dropdown-inner {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 36px;
  width: 100%;
  box-sizing: border-box;
}

.publish-mega-dropdown {
  display: grid !important;
  grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  gap: 24px !important;
}

.journals-mega-dropdown {
  display: block !important;
}

.journals-mega-dropdown .mega-column,
.publish-mega-dropdown .mega-column {
  min-width: 0 !important;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 26px 30px;
  min-height: 300px;
  box-sizing: border-box;
}

.journals-mega-dropdown .mega-column-header,
.publish-mega-dropdown .mega-column-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 14px;
  margin-bottom: 18px;
  border-bottom: 1px solid #e5e7eb;
}

.journals-mega-dropdown .mega-column-icon,
.publish-mega-dropdown .mega-column-icon {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #e7f1ff, #e2fbff);
  color: #0052cc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.journals-mega-dropdown .mega-column-icon svg,
.publish-mega-dropdown .mega-column-icon svg {
  width: 17px;
  height: 17px;
}

.journals-mega-dropdown .mega-column h4,
.publish-mega-dropdown .mega-column h4 {
  margin: 0;
  color: #111827;
  font-size: 1rem;
  font-weight: 800;
  text-align: left;
}

.journals-mega-dropdown .mega-column a,
.publish-mega-dropdown .mega-column a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  text-decoration: none;
  margin: 0 -8px 6px;
  padding: 8px 8px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
}

.journals-mega-dropdown .mega-column a::before,
.publish-mega-dropdown .mega-column a::before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #c7d2e0;
}

.journals-mega-dropdown .mega-column a:hover,
.publish-mega-dropdown .mega-column a:hover {
  background: #f0f6ff;
  color: #0052cc;
  transform: translateX(2px);
}

.journals-mega-dropdown .mega-column a:hover::before,
.publish-mega-dropdown .mega-column a:hover::before {
  background: #0052cc;
}

.legacy-mega-rule-disabled {
  content: "•";
  color: #cbd5e1;
  margin-right: 10px;
}

.mega-column {
  background: #ffffff;
  border: 1px solid #e6ebf2;
  border-radius: 12px;
  padding: 16px 14px 10px;
  transition: box-shadow 0.18s ease, border-color 0.18s ease;
}

.mega-column:hover {
  box-shadow: 0 10px 22px rgba(0, 82, 204, 0.1);
  border-color: #cfe0ff;
}

.mega-column-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eef2f7;
}

.mega-column-icon {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e7f1ff, #e2fbff);
  color: #0052cc;
}

.mega-column-icon svg {
  width: 16px;
  height: 16px;
}

.mega-column h4 {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
}

.mega-column a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  text-decoration: none;
  margin: 0 -8px 2px;
  padding: 7px 8px;
  border-radius: 8px;
  font-size: 13.5px;
  line-height: 1.4;
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
}

.mega-column a::before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #c7d2e0;
  transition: background-color 0.15s ease;
}

.mega-column a:hover {
  background: #f0f6ff;
  color: #0052cc;
  transform: translateX(2px);
}

.mega-column a:hover::before {
  background: #0052cc;
}

.user-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.auth-buttons {
  display: flex;
  gap: 15px;
  align-items: center;
}

.login-btn {
  background: #0052cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.login-btn:hover {
  background: #003d99;
  transform: translateY(-1px);
}

.user-menu {
  position: relative;
}

.user-menu-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  max-width: 220px;
}

.user-menu-trigger:hover {
  background: rgba(0, 82, 204, 0.1);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.user-name {
  font-weight: 500;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 120px;
}

.user-menu.open .user-menu-trigger .dropdown-arrow {
  transform: rotate(180deg);
}

.user-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e1e5ee;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1003;
  margin-top: 8px;
}

.user-info {
  padding: 15px;
  border-bottom: 1px solid #f1f5f9;
}

.user-email {
  color: #666;
  font-size: 0.9rem;
  word-break: break-word;
}

.user-actions {
  padding: 10px;
}

.user-action-btn {
  width: 100%;
  padding: 10px 15px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.user-action-btn:hover {
  background: #f8fafc;
}

.user-action-btn.logout {
  color: #ef4444;
}

.user-action-btn.logout:hover {
  background: #fef2f2;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  outline: none;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 6px;
  color: #0052cc;
  flex-shrink: 0;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
}

.mobile-nav.open {
  display: block;
}

.mobile-nav-link {
  display: block;
  padding: 15px 20px;
  color: #213547;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 100%;
  text-align: left;
  font-family: inherit;
  font-size: inherit;
  box-sizing: border-box;
}

.mobile-nav-link:hover {
  background: #f8f9fa;
}

.mobile-dropdown {
  background: #f8f9fa;
}

.mobile-dropdown-item {
  display: block;
  padding: 12px 40px;
  color: #213547;
  text-decoration: none;
  font-size: 14px;
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.2s;
}

.mobile-dropdown-item:hover {
  background: #e9ecef;
  color: #0052cc;
}

.mobile-mega-panel {
  background: #f5f7f8;
  padding: 16px 20px 20px;
}

.mobile-mega-column {
  margin-bottom: 20px;
  background: #ffffff;
  border: 1px solid #e6ebf2;
  border-radius: 12px;
  padding: 14px;
}

.mobile-mega-column:last-child {
  margin-bottom: 0;
}

.mobile-mega-column-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eef2f7;
}

.mobile-mega-column-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e7f1ff, #e2fbff);
  color: #0052cc;
}

.mobile-mega-column-icon svg {
  width: 15px;
  height: 15px;
}

.mobile-mega-column h4 {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
}

.mobile-mega-column a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  text-decoration: none;
  margin: 0 -6px 2px;
  padding: 8px 6px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.mobile-mega-column a::before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #c7d2e0;
}

.mobile-mega-column a:hover {
  background: #f0f6ff;
  color: #0052cc;
}

.mobile-mega-column a:hover::before {
  background: #0052cc;
}

@media (max-width: 1200px) {
  .mega-menu {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 24px;
  }
}

@media (max-width: 900px) {
  .nav-menu {
    display: none;
  }

  .mega-menu,
  .journals-mega-dropdown,
  .publish-mega-dropdown {
    display: none !important;
  }

  .mobile-menu-button {
    display: block;
  }

  .header-container {
    padding: 0 0.75rem;
  }

  .user-name {
    display: none;
  }

  .user-menu-trigger {
    padding: 6px 8px;
    gap: 6px;
    max-width: none;
  }

  .user-menu-trigger .dropdown-arrow {
    display: none;
  }

  .login-btn {
    padding: 8px 14px;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .mobile-mega-panel {
    max-height: 70vh;
    overflow-y: auto;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.2rem;
    white-space: nowrap;
  }
}

  .brand-logo-mark {
    width: 36px;
    height: 36px;
  }

  .login-btn {
    padding: 8px 12px;
    font-size: 0.85rem;
  }
}
`;

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [publishMenuOpen, setPublishMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobilePublishOpen, setMobilePublishOpen] = useState(false);
  const journalsNavRef = useRef(null);
  const publishNavRef = useRef(null);
  const userMenuRef = useRef(null);
  const menuCloseTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuthStatus = useCallback(() => {
    const authToken =
      localStorage.getItem('adminAuthToken') ||
      localStorage.getItem('googleCredential');
    const userEmail = localStorage.getItem('userEmail');
    const isLoggedInFlag = localStorage.getItem('isLoggedIn') === 'true';
    const adminUser = getIsAdmin();

    setIsAdmin(adminUser);

    if ((authToken || isLoggedInFlag) && userEmail) {
      const userName = localStorage.getItem('userName') || userEmail.split('@')[0];
      setIsLoggedIn(true);
      setUserInfo({
        name: userName,
        email: userEmail,
        initials: getInitials(userName, userEmail),
      });
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserInfo(null);
    }
  }, []);

  useEffect(() => {
    if (!document.getElementById(HEADER_STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = HEADER_STYLE_ID;
      tag.type = 'text/css';
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();

    const onAuthChange = () => checkAuthStatus();
    window.addEventListener(AUTH_CHANGE_EVENT, onAuthChange);
    window.addEventListener('storage', onAuthChange);
    window.addEventListener('focus', onAuthChange);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, onAuthChange);
      window.removeEventListener('storage', onAuthChange);
      window.removeEventListener('focus', onAuthChange);
    };
  }, [location.pathname, checkAuthStatus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (journalsNavRef.current && !journalsNavRef.current.contains(event.target)) {
        clearTimeout(menuCloseTimer.current);
        setDropdownOpen(false);
      }
      if (publishNavRef.current && !publishNavRef.current.contains(event.target)) {
        clearTimeout(menuCloseTimer.current);
        setPublishMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    clearTimeout(menuCloseTimer.current);
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
    setMobilePublishOpen(false);
    setDropdownOpen(false);
    setPublishMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => () => clearTimeout(menuCloseTimer.current), []);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    }
  };

  const handleLogout = () => {
    clearAuthStorage();

    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserInfo(null);
    setIsUserMenuOpen(false);

    navigate('/');
  };

  const handleProfile = () => {
    navigate('/my-account');
    setIsUserMenuOpen(false);
    closeMobileMenu();
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
    setIsUserMenuOpen(false);
    closeMobileMenu();
  };

  const handleSubmitPaper = () => {
    navigate('/submit');
    setIsUserMenuOpen(false);
    closeMobileMenu();
  };

  const handleLogin = () => {
    navigate('/login');
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
    setMobilePublishOpen(false);
  };

  const openJournalsMenu = () => {
    clearTimeout(menuCloseTimer.current);
    setPublishMenuOpen(false);
    setDropdownOpen(true);
  };

  const openPublishMenu = () => {
    clearTimeout(menuCloseTimer.current);
    setDropdownOpen(false);
    setPublishMenuOpen(true);
  };

  const closeMenusWithDelay = () => {
    menuCloseTimer.current = setTimeout(() => {
      setDropdownOpen(false);
      setPublishMenuOpen(false);
    }, 250);
  };

  const closeMenus = () => {
    clearTimeout(menuCloseTimer.current);
    setDropdownOpen(false);
    setPublishMenuOpen(false);
  };

  const renderJournalColumns = (columnClassName, linkClassName, onNavigateAway) => {
    const isMobile = columnClassName === 'mobile-mega-column';
    const headerClass = isMobile ? 'mobile-mega-column-header' : 'mega-column-header';
    const iconClass = isMobile ? 'mobile-mega-column-icon' : 'mega-column-icon';

    return JOURNAL_MENU_COLUMNS.map((column) => (
      <div key={column.title} className={columnClassName}>
        <div className={headerClass}>
          <span className={iconClass}>
            <MegaColumnIcon name={column.icon} />
          </span>
          <h4>{column.title}</h4>
        </div>
        {column.links.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={linkClassName}
            onClick={onNavigateAway}
          >
            {link.label}
          </Link>
        ))}
      </div>
    ));
  };

  const renderMegaColumns = (columnClassName, linkClassName, onNavigateAway) => {
    const isMobile = columnClassName === 'mobile-mega-column';
    const headerClass = isMobile ? 'mobile-mega-column-header' : 'mega-column-header';
    const iconClass = isMobile ? 'mobile-mega-column-icon' : 'mega-column-icon';

    return PUBLISH_MENU_COLUMNS.map((column) => (
      <div key={column.title} className={columnClassName}>
        <div className={headerClass}>
          <span className={iconClass}>
            <MegaColumnIcon name={column.icon} />
          </span>
          <h4>{column.title}</h4>
        </div>
        {column.links.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={linkClassName}
            onClick={onNavigateAway}
          >
            {link.label}
          </Link>
        ))}
      </div>
    ));
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link
          to="/"
          className="logo-section"
          style={{ textDecoration: 'none' }}
          onClick={handleLogoClick}
        >
          <LordJournalLogo />
          <h1 className="logo-text">Lord Journals</h1>
        </Link>

        <nav className="nav-menu" aria-label="Primary">
          {isAdmin && (
            <div className="nav-item">
              <Link to="/admin" className="nav-link">
                Admin Dashboard
              </Link>
            </div>
          )}
          {/* Journals dropdown */}
          <div
            className="nav-item mega-menu-wrapper"
            style={{ display: isAdmin ? 'none' : undefined }}
            ref={journalsNavRef}
            onMouseEnter={openJournalsMenu}
            onMouseLeave={closeMenusWithDelay}
          >
            <button
              type="button"
              className="nav-link-dropdown"
              onClick={() => {
                clearTimeout(menuCloseTimer.current);
                setPublishMenuOpen(false);
                setDropdownOpen((prev) => !prev);
              }}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              Journals
              <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
            </button>

            {dropdownOpen && (
              <div
                className="mega-menu journals-mega-dropdown"
                role="menu"
                onMouseEnter={openJournalsMenu}
                onMouseLeave={closeMenusWithDelay}
              >
                <div className="mega-dropdown-inner">
                  {renderJournalColumns('mega-column', '', closeMenus)}
                </div>
              </div>
            )}
          </div>

          {/* Publish with us mega menu */}
          <div
            className="nav-item mega-menu-wrapper"
            style={{ display: isAdmin ? 'none' : undefined }}
            ref={publishNavRef}
            onMouseEnter={openPublishMenu}
            onMouseLeave={closeMenusWithDelay}
          >
            <button
              type="button"
              className="nav-link-dropdown"
              onClick={() => {
                clearTimeout(menuCloseTimer.current);
                setDropdownOpen(false);
                setPublishMenuOpen((prev) => !prev);
              }}
              aria-expanded={publishMenuOpen}
              aria-haspopup="true"
            >
              Publish with us
              <span className={`dropdown-arrow ${publishMenuOpen ? 'open' : ''}`}>▼</span>
            </button>

            {publishMenuOpen && (
              <div
                className="mega-menu publish-mega-dropdown"
                role="menu"
                onMouseEnter={openPublishMenu}
                onMouseLeave={closeMenusWithDelay}
              >
                {renderMegaColumns('mega-column', '', closeMenus)}
              </div>
            )}
          </div>

          {/* Submission Link */}
          <div className="nav-item" style={{ display: isAdmin ? 'none' : undefined }}>
            <Link to="/submit" className="nav-link">
              Submission Link
            </Link>
          </div>
        </nav>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className="user-section">
          {isLoggedIn && userInfo ? (
            <div className={`user-menu ${isUserMenuOpen ? 'open' : ''}`} ref={userMenuRef}>
              <button
                type="button"
                className="user-menu-trigger"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <div className="user-avatar">{userInfo.initials}</div>
                <span className="user-name">{userInfo.name}</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-info">
                    <div className="user-email">{userInfo.email}</div>
                  </div>
                  <div className="user-actions">
                    {isAdmin && (
                      <button type="button" onClick={handleAdminDashboard} className="user-action-btn">
                        Admin Dashboard
                      </button>
                    )}
                    <button type="button" onClick={handleProfile} className="user-action-btn" style={{ display: isAdmin ? 'none' : undefined }}>
                      👤 My Account
                    </button>
                    {!isAdmin && (
                      <button type="button" onClick={handleSubmitPaper} className="user-action-btn">
                        Submit Paper
                      </button>
                    )}
                    <button type="button" onClick={handleLogout} className="user-action-btn logout">
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button type="button" onClick={handleLogin} className="login-btn">
                🔑 Login
              </button>
            </div>
          )}
        </div>
      </div>

      {(dropdownOpen || publishMenuOpen) && (
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Close menu"
          onClick={closeMenus}
        />
      )}

      {mobileMenuOpen && (
        <nav className="mobile-nav open" aria-label="Mobile">
          {isAdmin && (
            <Link to="/admin" className="mobile-nav-link" onClick={closeMobileMenu}>
              Admin Dashboard
            </Link>
          )}
          <button
            type="button"
            className="mobile-nav-link"
            style={{ display: isAdmin ? 'none' : undefined }}
            onClick={() => setMobileDropdownOpen((prev) => !prev)}
            aria-expanded={mobileDropdownOpen}
          >
            Journals{' '}
            <span className={`dropdown-arrow ${mobileDropdownOpen ? 'open' : ''}`}>▼</span>
          </button>
          {!isAdmin && mobileDropdownOpen && (
            <div className="mobile-mega-panel">
              {renderJournalColumns(
                'mobile-mega-column',
                'mobile-mega-link',
                closeMobileMenu
              )}
            </div>
          )}

          <button
            type="button"
            className="mobile-nav-link"
            style={{ display: isAdmin ? 'none' : undefined }}
            onClick={() => setMobilePublishOpen((prev) => !prev)}
            aria-expanded={mobilePublishOpen}
          >
            Publish with us{' '}
            <span className={`dropdown-arrow ${mobilePublishOpen ? 'open' : ''}`}>▼</span>
          </button>
          {!isAdmin && mobilePublishOpen && (
            <div className="mobile-mega-panel">
              {renderMegaColumns(
                'mobile-mega-column',
                'mobile-mega-link',
                closeMobileMenu
              )}
            </div>
          )}

          <Link
            to="/submit"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
            style={{ display: isAdmin ? 'none' : undefined }}
          >
            Submission Link
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
