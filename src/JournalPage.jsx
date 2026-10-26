import { useState } from "react";
import { Link } from "react-router-dom";

export default function JournalPage({ journalInfo }) {
  const [activeTab, setActiveTab] = useState("about");

  const editorInChief = journalInfo.editorialBoard.filter(
    ([, role]) => role === "Editor-in-Chief"
  );
  const boardMembers = journalInfo.editorialBoard.filter(
    ([, role]) => role !== "Editor-in-Chief"
  );

  return (
    <main className="journal-page">
      <style>{`
        .journal-page {
          min-height: 100vh;
          background: #f5f7fb;
          padding-top: 70px;
          color: #1f2937;
        }

        .journal-hero {
          background: linear-gradient(135deg, #003d99, #0f766e);
          color: #fff;
          padding: 56px 24px;
          text-align: center;
        }

        .journal-hero h1 {
          margin: 0 0 12px;
          font-size: 2.6rem;
          font-weight: 800;
        }

        .journal-hero p {
          max-width: 850px;
          margin: 0 auto;
          line-height: 1.7;
          font-size: 1.05rem;
          opacity: 0.95;
        }

        .journal-nav {
          position: sticky;
          top: 70px;
          z-index: 50;
          background: #fff;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
          padding: 14px 20px;
        }

        .journal-nav-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .journal-nav a,
        .journal-nav button {
          border: none;
          background: #f1f5f9;
          color: #003d99;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }

        .journal-nav a:hover,
        .journal-nav button:hover,
        .journal-nav .active {
          background: #003d99;
          color: #fff;
        }

        .journal-container {
          max-width: 1180px;
          margin: 32px auto 0;
          padding: 0 24px 70px;
        }

        .journal-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 26px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        }

        .journal-card h2 {
          margin: 0 0 18px;
          color: #003d99;
          font-size: 1.45rem;
          border-bottom: 2px solid #14b8a6;
          padding-bottom: 10px;
        }

        .journal-card p {
          margin: 0 0 14px;
          color: #374151;
          line-height: 1.8;
          text-align: left;
        }

        .journal-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .journal-info-box {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px;
        }

        .journal-info-box strong {
          display: block;
          color: #111827;
          margin-bottom: 4px;
        }

        .journal-about-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 34px 30px 50px;
          margin-top: 24px;
          min-height: 300px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        }

        .journal-about-content {
          max-width: 820px;
          margin: 0;
          text-align: left;
        }

        .journal-about-content h2 {
          margin: 0 0 22px;
          color: #111827;
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1.2;
          text-align: left;
          border-bottom: none;
          padding-bottom: 0;
        }

        .journal-about-content p {
          margin: 0 0 12px;
          color: #111827;
          font-size: 1rem;
          line-height: 1.7;
          text-align: left;
        }

        .journal-scope-page {
          background: #ffffff;
          padding: 34px 30px 50px;
          min-height: 420px;
        }

        .journal-scope-content {
          max-width: 820px;
          margin: 0;
          text-align: left;
        }

        .journal-scope-content h2 {
          margin: 0 0 22px;
          color: #111827;
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1.2;
          text-align: left;
          border-bottom: none;
          padding-bottom: 0;
        }

        .journal-scope-content p {
          margin: 0 0 12px;
          color: #111827;
          font-size: 1rem;
          line-height: 1.7;
          text-align: left;
        }

        .journal-editorial-page {
          background: #ffffff;
          padding: 34px 30px 50px;
          min-height: 420px;
        }

        .journal-editorial-content {
          max-width: 900px;
          margin: 0;
          text-align: left;
        }

        .journal-editorial-content h2 {
          margin: 0 0 28px;
          color: #111827;
          font-size: 1.75rem;
          font-weight: 800;
          text-align: left;
          border-bottom: none;
          padding-bottom: 0;
        }

        .journal-editorial-section {
          margin-bottom: 36px;
        }

        .journal-editorial-section h3 {
          margin: 0 0 12px;
          color: #003d99;
          font-size: 1.1rem;
          font-weight: 800;
          text-align: left;
        }

        .journal-editorial-row {
          display: grid;
          grid-template-columns: 260px 220px 1fr;
          gap: 20px;
          align-items: start;
          border-bottom: 1px solid #e5e7eb;
          padding: 14px 0;
        }

        .journal-editorial-row strong {
          display: block;
          color: #111827;
          font-size: 1rem;
          font-weight: 800;
          text-align: left;
        }

        .journal-editorial-row span {
          display: block;
          color: #374151;
          font-size: 0.95rem;
          text-align: left;
        }

        .journal-editorial-row p {
          margin: 0;
          color: #374151;
          font-size: 0.95rem;
          line-height: 1.5;
          text-align: left;
        }

        .journal-editorial-empty {
          margin: 0;
          color: #374151;
          font-size: 0.95rem;
          line-height: 1.5;
          text-align: left;
        }

        .journal-submit {
          background: #002b5c;
          color: #fff;
          border-radius: 18px;
          text-align: center;
          padding: 38px 24px;
          box-shadow: 0 12px 30px rgba(0, 43, 92, 0.2);
        }

        .journal-submit h2 {
          margin: 0 0 10px;
        }

        .journal-submit p {
          margin: 0 auto 22px;
          max-width: 650px;
          line-height: 1.7;
        }

        .journal-submit a {
          display: inline-block;
          background: #14b8a6;
          color: #fff;
          padding: 13px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
        }

        .journal-submit a:hover {
          opacity: 0.92;
        }

        @media (max-width: 900px) {
          .journal-info-grid {
            grid-template-columns: 1fr;
          }

          .journal-hero h1 {
            font-size: 2rem;
          }
        }

        @media (max-width: 768px) {
          .journal-editorial-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
      `}</style>

      <section className="journal-hero">
        <h1>{journalInfo.title}</h1>
        <p>{journalInfo.shortDescription}</p>
      </section>

      <nav className="journal-nav">
        <div className="journal-nav-inner">
          <Link to="/">Home</Link>
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={activeTab === "scope" ? "active" : ""}
            onClick={() => setActiveTab("scope")}
          >
            Aim & Scope
          </button>
          <button
            className={activeTab === "editorial" ? "active" : ""}
            onClick={() => setActiveTab("editorial")}
          >
            Editorial Board
          </button>
          <Link to="/submit">Submit Paper</Link>
        </div>
      </nav>

      <div className="journal-container">
        {activeTab === "about" && (
          <>
            <section className="journal-card">
              <h2>Journal Information</h2>
              <div className="journal-info-grid">
                <div className="journal-info-box">
                  <strong>Journal Title</strong>
                  {journalInfo.title}
                </div>
                <div className="journal-info-box">
                  <strong>e-ISSN</strong>
                  {journalInfo.eISSN}
                </div>
                <div className="journal-info-box">
                  <strong>Frequency</strong>
                  {journalInfo.frequency}
                </div>
                <div className="journal-info-box">
                  <strong>Format</strong>
                  {journalInfo.format}
                </div>
                <div className="journal-info-box">
                  <strong>Language</strong>
                  {journalInfo.language}
                </div>
                <div className="journal-info-box">
                  <strong>Publisher</strong>
                  {journalInfo.publisher}
                </div>
              </div>
            </section>

            <section className="journal-about-card">
              <div className="journal-about-content">
                <h2>About the Journal</h2>

                {journalInfo.about.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="journal-submit">
              <h2>Submit Your Manuscript</h2>
              <p>Authors can submit manuscripts through the online submission system.</p>
              <Link to="/submit">Submit Now</Link>
            </section>
          </>
        )}

        {activeTab === "scope" && (
          <section className="journal-scope-page">
            <div className="journal-scope-content">
              <h2>Aims and scope</h2>

              {journalInfo.scope.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {activeTab === "editorial" && (
          <section className="journal-editorial-page">
            <div className="journal-editorial-content">
              <h2>Editorial Board</h2>

              <div className="journal-editorial-section">
                <h3>Editor-in-Chief</h3>

                {editorInChief.length > 0 ? (
                  editorInChief.map(([name, role, affiliation]) => (
                    <div className="journal-editorial-row" key={name}>
                      <strong>{name}</strong>
                      <span>{role}</span>
                      <p>{affiliation}</p>
                    </div>
                  ))
                ) : (
                  <p className="journal-editorial-empty">
                    Editor-in-Chief will be updated soon.
                  </p>
                )}
              </div>

              <div className="journal-editorial-section">
                <h3>Editorial Board Members</h3>

                {boardMembers.length > 0 ? (
                  boardMembers.map(([name, role, affiliation]) => (
                    <div className="journal-editorial-row" key={name}>
                      <strong>{name}</strong>
                      <span>{role}</span>
                      <p>{affiliation}</p>
                    </div>
                  ))
                ) : (
                  <p className="journal-editorial-empty">
                    Editorial Board will be updated soon.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
