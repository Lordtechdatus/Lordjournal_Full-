import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword";
import RegisterPage from "./RegisterPage";
import UserProfile from "./UserProfile";
import PaperSubmissionPage from "./PaperSubmissionPage";
import CivilEngineeringJournal from "./CivilEngineeringJournal";
import MechanicalEngineeringJournal from "./MechanicalEngineeringJournal";
import ElectronicsEngineeringJournal from "./ElectronicsEngineeringJournal";
import ElectricalEngineeringJournal from "./ElectricalEngineeringJournal";
import ComputerScienceEngineeringJournal from "./ComputerScienceEngineeringJournal";
import AppliedScienceJournal from "./AppliedScienceJournal";
import AIMLDSJournal from "./AIMLDSJournal";
import LawSocialScienceJournal from "./LawSocialScienceJournal";
import EducationJournal from "./EducationJournal";
import ManagementJournal from "./ManagementJournal";
import Footer from "./Footer";
import JournalsPage from "./JournalsPage";
import CookieConsent from "./CookieConsent";
import PrivacyPolicy from "./Privacy";
import BooksPage from "./BooksPage";
import DatabasesPage from "./DatabasesPage";
import PlatformsPage from "./PlatformsPage";
import ConnectionTest from "../server/FetchNodeAdmin";
import BuiltEnvironmentSustainability from "./BuiltEnvironmentSustainability";
import MedicalScience from "./MedicalScience";

import AdminDashboard from "./AdminDashboard";

import AdminLogin from "./AdminLogin";

import { WebSocketProvider } from "./contexts/WebSocketContext";
import ScrollToTop from "./components/ScrollToTop";
import useSessionTimeout from "./hooks/useSessionTimeout";


const APP_STYLE_ID = "app-inline-style";

const styles = `
#root {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 100px auto 50px;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .container { margin-top: 120px; }
}

@media (max-width: 480px) {
  .container { margin-top: 100px; padding: 0 15px; }
}
`;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  useSessionTimeout();  
  useEffect(() => {
    if (!document.getElementById(APP_STYLE_ID)) {
      const tag = document.createElement("style");
      tag.id = APP_STYLE_ID;
      tag.type = "text/css";
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <WebSocketProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <Homepage />
          </Layout>
        } />
        <Route path="/login" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <LoginPage onNavigate={navigateTo} />
          </Layout>
        } />
        <Route path="/forgot-password" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <ForgotPassword />
          </Layout>
        } />
        <Route path="/register" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <RegisterPage />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <UserProfile />
          </Layout>
        } />
        <Route path="/my-account" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <UserProfile />
          </Layout>
        } />
        <Route path="/submit" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <PaperSubmissionPage />
          </Layout>
        } />
        <Route path="/journals/civil-engineering" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <CivilEngineeringJournal />
          </Layout>
        } />
        <Route path="/journals/mechanical-engineering" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <MechanicalEngineeringJournal />
          </Layout>
        } />
        <Route path="/journals/electronics-engineering" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <ElectronicsEngineeringJournal />
          </Layout>
        } />
        <Route path="/journals/electrical-engineering" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <ElectricalEngineeringJournal />
          </Layout>
        } />
        <Route path="/journals/computer-science-engineering" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <ComputerScienceEngineeringJournal />
          </Layout>
        } />
        <Route path="/journals/applied-science" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <AppliedScienceJournal />
          </Layout>
        } />
        <Route path="/journals/ai-ml-data-science" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <AIMLDSJournal />
          </Layout>
        } />
        <Route path="/journals/law-social-science" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <LawSocialScienceJournal />
          </Layout>
        } />
        <Route path="/journals/education" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <EducationJournal />
          </Layout>
        } />
        <Route path="/journals/management" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <ManagementJournal />
          </Layout>
        } />
        <Route path="/journals/built-environment-sustainability" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <BuiltEnvironmentSustainability />
          </Layout>
        } />
        <Route path="/journals/medical-science" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <MedicalScience />
          </Layout>
        } />
          <Route path="/footer" element={
          <Footer />
        } />
        <Route path="/journals" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <JournalsPage />
          </Layout>
        } />
        <Route path="/books" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <BooksPage />
          </Layout>
        } />
        <Route path="/databases" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <DatabasesPage />
          </Layout>
        } />
        <Route path="/platforms" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <PlatformsPage />
          </Layout>
        } />
        <Route path="/admin" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <AdminDashboard />
          </Layout>
        } />
        <Route path="/admin-login" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <AdminLogin />
          </Layout>
        } />

        <Route path="/test-connection" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <ConnectionTest />
          </Layout>
        } />
        <Route path="/privacy" element={
          <Layout currentPage={currentPage} onNavigate={navigateTo}>
            <PrivacyPolicy />
          </Layout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CookieConsent />
    </WebSocketProvider>
  );
}

export default App;
