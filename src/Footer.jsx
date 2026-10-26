import { useEffect } from "react";
import { Link } from "react-router-dom";

const FOOTER_STYLE_ID = "footer-inline-styles";

const footerSections = [
  {
    title: "Products",
    links: [
      { label: "Journals", to: "/journals" },
      { label: "Open Access Journals", to: "/open-access-journals" },
      { label: "Calls for Papers", to: "/calls-for-papers" },
      { label: "Publishing Services", to: "/publishing-services" },
      { label: "Admin", to: "/admin" },
    ],
  },
  {
    title: "Researchers & Authors",
    links: [
      { label: "Authors", to: "/authors" },
      { label: "Author Guidelines", to: "/author-guidelines" },
      { label: "Publishing Ethics", to: "/publishing-ethics" },
      { label: "Editorial Policies", to: "/editorial-policies" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How-to Guides", to: "/how-to-guides" },
      { label: "Research Integrity", to: "/research-integrity" },
      { label: "Permissions", to: "/permissions" },
      { label: "Article Withdrawal", to: "/withdrawal-policy" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/careers" },
      { label: "Media Centre", to: "/media-centre" },
      { label: "Policies", to: "/policies" },
    ],
  },
];

const styles = `
.footer {
  width: 100%;
  background:
    radial-gradient(circle at top left, rgba(66, 133, 244, 0.16), transparent 32%),
    linear-gradient(135deg, #06131f 0%, #0a2433 48%, #071821 100%);
  color: #dbe6ec;
  padding: 70px 20px 28px;
  position: relative;
  overflow: hidden;
  text-align: left;
}

.footer * {
  box-sizing: border-box;
}

.footer::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px);
  background-size: 34px 34px;
  opacity: 0.55;
  pointer-events: none;
}

.footer-inner {
  position: relative;
  z-index: 1;
  max-width: 1250px;
  margin: 0 auto;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.15fr 2.85fr;
  gap: 56px;
  align-items: flex-start;
}

.footer-brand {
  max-width: 370px;
  text-align: left;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #ffffff;
  margin-bottom: 20px;
}

.footer-logo-mark {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff, #dceaff);
  color: #0052cc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: -0.04em;
  box-shadow: 0 14px 32px rgba(0, 82, 204, 0.28);
  flex-shrink: 0;
}

.footer-logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  white-space: nowrap;
}

.footer-description {
  color: rgba(255,255,255,0.72);
  line-height: 1.75;
  font-size: 0.98rem;
  margin: 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 36px;
  text-align: left;
}

.footer-column {
  text-align: left;
}

.footer-column h4 {
  color: #ffffff;
  margin: 0 0 18px;
  font-size: 1.02rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.35;
  padding-bottom: 0;
  border: none;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list li {
  margin-bottom: 12px;
}

.footer-list a {
  color: rgba(255,255,255,0.72);
  text-decoration: none;
  font-size: 0.94rem;
  line-height: 1.45;
  transition: color 0.2s ease, padding-left 0.2s ease;
}

.footer-list a:hover {
  color: #ffffff;
  padding-left: 5px;
}

.footer-bottom {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.12);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
}

.footer-copy {
  color: rgba(255,255,255,0.64);
  font-size: 0.88rem;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
}

.social-icon {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.09);
  border: 1px solid rgba(255,255,255,0.12);
  color: #ffffff;
  text-decoration: none;
  font-weight: 800;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}

.social-icon:hover {
  transform: translateY(-2px);
  background: rgba(255,255,255,0.18);
  border-color: rgba(255,255,255,0.28);
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  flex-wrap: wrap;
}

.footer-bottom-link {
  color: rgba(255,255,255,0.68);
  text-decoration: none;
  font-size: 0.88rem;
  transition: color 0.2s ease;
}

.footer-bottom-link:hover {
  color: #ffffff;
}

@media (max-width: 1100px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 44px;
  }

  .footer-brand {
    max-width: 650px;
  }

  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 850px) {
  .footer {
    padding: 58px 18px 26px;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 28px;
  }

  .footer-bottom {
    grid-template-columns: 1fr;
    align-items: flex-start;
    gap: 18px;
  }

  .social-icons {
    justify-content: flex-start;
  }

  .footer-bottom-links {
    justify-content: flex-start;
  }
}

@media (max-width: 540px) {
  .footer {
    padding: 48px 16px 24px;
  }

  .footer-logo-mark {
    width: 42px;
    height: 42px;
    border-radius: 13px;
  }

  .footer-logo-text {
    font-size: 1.25rem;
  }

  .footer-description {
    font-size: 0.93rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer-column h4 {
    margin-bottom: 13px;
  }

  .footer-list li {
    margin-bottom: 10px;
  }

  .footer-bottom-links {
    gap: 12px 16px;
  }
}
`;

export default function Footer() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    let tag = document.getElementById(FOOTER_STYLE_ID);

    if (!tag) {
      tag = document.createElement("style");
      tag.id = FOOTER_STYLE_ID;
      tag.type = "text/css";
      document.head.appendChild(tag);
    }

    tag.textContent = styles;
  }, []);

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="LordJournals Home">
              <div className="footer-logo-mark">LJ</div>
              <div className="footer-logo-text">LordJournals</div>
            </Link>

            <p className="footer-description">
              LordJournals supports open access academic publishing, peer-reviewed
              research dissemination, and scholarly communication across major
              disciplines.
            </p>
          </div>

          <div className="footer-grid">
            {footerSections.map((section) => (
              <div className="footer-column" key={section.title}>
                <h4>{section.title}</h4>

                <ul className="footer-list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} LordJournals. All rights reserved.
          </div>

          <div className="social-icons" aria-label="Social links">
            <a href="#" className="social-icon" aria-label="X">
              𝕏
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              f
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              in
            </a>
          </div>

          <div className="footer-bottom-links">
            <Link to="/terms" className="footer-bottom-link">
              Terms
            </Link>
            <Link to="/privacy" className="footer-bottom-link">
              Privacy
            </Link>
            <Link to="/cookies" className="footer-bottom-link">
              Cookies
            </Link>
            <Link to="/accessibility" className="footer-bottom-link">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}