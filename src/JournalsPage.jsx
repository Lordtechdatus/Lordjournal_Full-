import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const STYLE_ID = "journals-page-styles-v2";

export default function JournalsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const journals = [
    {
      id: 1,
      title: "Lord Journal of Academic Excellence",
      category: "education",
      impactFactor: 4.8,
      coverImage:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=80",
      description:
        "A leading journal covering innovations in educational research and practice.",
      tags: ["Education", "Research", "Academic"],
    },
    {
      id: 2,
      title: "Lord Journal of International Medical Research",
      category: "medical",
      impactFactor: 5.2,
      coverImage:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=80",
      description:
        "Cutting-edge research in medical science and clinical practice.",
      tags: ["Medical", "Healthcare", "Research"],
    },
    {
      id: 3,
      title: "Lord Journal of Environmental Science Today",
      category: "science",
      impactFactor: 4.5,
      coverImage:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=500&auto=format&fit=crop&q=80",
      description:
        "Focused on environmental challenges and sustainable solutions.",
      tags: ["Environment", "Science", "Sustainability"],
    },
    {
      id: 4,
      title: "Lord Journal of Digital Technology & Society",
      category: "technology",
      impactFactor: 3.9,
      coverImage:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=80",
      description:
        "Exploring the intersection of technology and societal impact.",
      tags: ["Technology", "Digital", "Society"],
    },
    {
      id: 5,
      title: "Lord Journal of Business Strategy Review",
      category: "business",
      impactFactor: 4.1,
      coverImage:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80",
      description:
        "Analysis of business trends, strategies, and management practices.",
      tags: ["Business", "Management", "Strategy"],
    },
    {
      id: 6,
      title: "Lord Journal of Psychology & Behavioral Sciences",
      category: "psychology",
      impactFactor: 4.7,
      coverImage:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=80",
      description:
        "Research on human behavior, cognition, and mental health.",
      tags: ["Psychology", "Behavior", "Mental Health"],
    },
    {
      id: 7,
      title: "Lord Journal of Arts & Humanities Quarterly",
      category: "humanities",
      impactFactor: 3.5,
      coverImage:
        "https://images.unsplash.com/photo-1580711465053-6757198851cf?w=500&auto=format&fit=crop&q=80",
      description:
        "Scholarly research in literature, philosophy, and the arts.",
      tags: ["Arts", "Humanities", "Culture"],
    },
    {
      id: 8,
      title: "Lord Journal of Law & Policy Review",
      category: "law",
      impactFactor: 3.8,
      coverImage:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=80",
      description:
        "Analysis of legal developments and policy implications.",
      tags: ["Law", "Policy", "Governance"],
    },
  ];

  const categories = [
    { id: "all", name: "All Journals" },
    { id: "education", name: "Education" },
    { id: "medical", name: "Medical" },
    { id: "science", name: "Science" },
    { id: "technology", name: "Technology" },
    { id: "business", name: "Business" },
    { id: "psychology", name: "Psychology" },
    { id: "humanities", name: "Humanities" },
    { id: "law", name: "Law" },
  ];

  const filteredJournals = journals.filter((journal) => {
    const matchesCategory =
      activeFilter === "all" || journal.category === activeFilter;

    const q = searchQuery.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      journal.title.toLowerCase().includes(q) ||
      journal.description.toLowerCase().includes(q) ||
      journal.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const styles = `
      .journals-page {
        min-height: 100vh;
        background: #f8fafc;
      }

      .journals-hero {
        background: linear-gradient(135deg, #0a2a38 0%, #123f58 100%);
        color: #ffffff;
        padding: 110px 20px 70px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .journals-hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
        background-size: 34px 34px;
        opacity: 0.7;
        pointer-events: none;
      }

      .journals-hero-inner {
        max-width: 900px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      .journals-title {
        font-size: clamp(2.4rem, 5vw, 3.8rem);
        font-weight: 900;
        margin: 0 0 16px;
        line-height: 1.1;
        letter-spacing: -0.04em;
        color: #ffffff;
      }

      .journals-subtitle {
        font-size: clamp(1rem, 2vw, 1.18rem);
        max-width: 760px;
        margin: 0 auto 28px;
        color: rgba(255,255,255,0.82);
        line-height: 1.7;
      }

      .journals-search-bar {
        max-width: 640px;
        margin: 0 auto;
        display: flex;
        background: rgba(255,255,255,0.16);
        border-radius: 999px;
        padding: 6px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.18);
      }

      .journals-search-input {
        flex: 1;
        background: transparent;
        border: none;
        padding: 14px 20px;
        font-size: 1rem;
        color: #ffffff;
        outline: none;
      }

      .journals-search-input::placeholder {
        color: rgba(255,255,255,0.68);
      }

      .journals-search-button {
        background: #ffffff;
        color: #0a2a38;
        border: none;
        border-radius: 999px;
        padding: 12px 28px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.25s ease;
      }

      .journals-search-button:hover {
        background: #f1f5f9;
        transform: translateY(-1px);
      }

      .journals-content {
        max-width: 1250px;
        margin: 0 auto;
        padding: 52px 20px 70px;
      }

      .journals-filter-container {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 38px;
        justify-content: center;
      }

      .journals-filter-button {
        background: #ffffff;
        border: 1px solid #d9dee7;
        padding: 11px 22px;
        border-radius: 999px;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #0f172a;
      }

      .journals-filter-button:hover {
        background: #eff6ff;
        border-color: #93c5fd;
      }

      .journals-filter-button.active {
        background: #0a2a38;
        color: #ffffff;
        border-color: #0a2a38;
      }

      .journals-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 30px;
      }

      .journals-card {
        background: #ffffff;
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(20px);
        animation: journalsFadeInUp 0.55s ease forwards;
      }

      .journals-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
      }

      .journals-card-image {
        height: 210px;
        width: 100%;
        object-fit: cover;
        display: block;
      }

     .journals-card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
}

.journals-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 10px;
  color: #0f172a;
  line-height: 1.35;
  text-align: left;
}

.journals-card-description {
  color: #475569;
  font-size: 0.95rem;
  font-weight: 400;
  margin: 0 0 16px;
  line-height: 1.55;
  text-align: left;
}

.journals-card-meta {
  display: block;
  margin-top: 4px;
}

.journals-impact {
  background: transparent;
  color: #334155;
  padding: 0;
  border-radius: 0;
  font-size: 0.9rem;
  font-weight: 600;
}

.journals-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 14px;
}

.journals-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 5px 9px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 500;
}

.journals-card-link {
  display: inline-block;
  margin-top: 16px;
  color: #0052cc;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
}

.journals-card-link:hover {
  text-decoration: underline;
}

      .journals-no-results {
        text-align: center;
        padding: 48px 20px;
        color: #64748b;
        font-size: 1rem;
      }

      @keyframes journalsFadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .journals-card:nth-child(1) { animation-delay: 0.05s; }
      .journals-card:nth-child(2) { animation-delay: 0.10s; }
      .journals-card:nth-child(3) { animation-delay: 0.15s; }
      .journals-card:nth-child(4) { animation-delay: 0.20s; }
      .journals-card:nth-child(5) { animation-delay: 0.25s; }
      .journals-card:nth-child(6) { animation-delay: 0.30s; }
      .journals-card:nth-child(7) { animation-delay: 0.35s; }
      .journals-card:nth-child(8) { animation-delay: 0.40s; }

      .journals-skeleton-card {
        height: 420px;
        border-radius: 18px;
        overflow: hidden;
        background: #ffffff;
        border: 1px solid #e5e7eb;
      }

      .journals-skeleton {
        background: linear-gradient(90deg, #eef2f7 25%, #e2e8f0 50%, #eef2f7 75%);
        background-size: 200% 100%;
        animation: journalsLoading 1.5s infinite;
      }

      .journals-skeleton-image {
        height: 210px;
        width: 100%;
      }

      .journals-skeleton-content {
        padding: 22px;
      }

      .journals-skeleton-title {
        height: 24px;
        margin-bottom: 15px;
        width: 80%;
        border-radius: 8px;
      }

      .journals-skeleton-description {
        height: 70px;
        margin-bottom: 16px;
        border-radius: 8px;
      }

      .journals-skeleton-meta {
        height: 22px;
        width: 60%;
        border-radius: 8px;
      }

      @keyframes journalsLoading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      @media (max-width: 1024px) {
        .journals-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 768px) {
        .journals-hero {
          padding: 96px 16px 56px;
        }

        .journals-search-bar {
          flex-direction: column;
          background: transparent;
          border: none;
          padding: 0;
          gap: 10px;
        }

        .journals-search-input {
          width: 100%;
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          text-align: center;
        }

        .journals-search-button {
          width: 100%;
          padding: 14px;
        }

        .journals-filter-container {
          overflow-x: auto;
          justify-content: flex-start;
          flex-wrap: nowrap;
          padding-bottom: 8px;
        }

        .journals-filter-button {
          white-space: nowrap;
        }
      }

      @media (max-width: 560px) {
        .journals-content {
          padding: 36px 15px 52px;
        }

        .journals-grid {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        .journals-card-image {
          height: 190px;
        }

        .journals-card-content {
          padding: 18px;
        }
      }
    `;

    let styleTag = document.getElementById(STYLE_ID);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = STYLE_ID;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = styles;
  }, []);

  return (
    <div className="journals-page">
      <header className="journals-hero">
        <div className="journals-hero-inner">
          <h1 className="journals-title">Academic Journals</h1>

          <p className="journals-subtitle">
            Explore our collection of peer-reviewed journals spanning various
            disciplines, featuring cutting-edge research and scholarly articles.
          </p>

          <div className="journals-search-bar">
            <input
              type="text"
              className="journals-search-input"
              placeholder="Search journals by title, topic, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" className="journals-search-button">
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="journals-content">
        <div className="journals-filter-container">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`journals-filter-button ${
                activeFilter === category.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {!isLoaded ? (
          <div className="journals-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="journals-skeleton-card">
                <div className="journals-skeleton-image journals-skeleton" />
                <div className="journals-skeleton-content">
                  <div className="journals-skeleton-title journals-skeleton" />
                  <div className="journals-skeleton-description journals-skeleton" />
                  <div className="journals-skeleton-meta journals-skeleton" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredJournals.length > 0 ? (
          <div className="journals-grid">
            {filteredJournals.map((journal) => (
              <article key={journal.id} className="journals-card">
                <img
                  src={journal.coverImage}
                  alt={journal.title}
                  className="journals-card-image"
                  loading="lazy"
                />

                <div className="journals-card-content">
                  <h2 className="journals-card-title">{journal.title}</h2>

                  <p className="journals-card-description">
                    {journal.description}
                  </p>

                  <div className="journals-card-meta">
                    <span className="journals-impact">
                      Impact Factor: {journal.impactFactor}
                    </span>
                  </div>

                  <div className="journals-tags">
                    {journal.tags.map((tag, index) => (
                      <span key={index} className="journals-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/journals/${journal.id}`}
                    className="journals-card-link"
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="journals-no-results">
            <h3>No journals found matching your criteria</h3>
            <p>Try adjusting your search or filter settings.</p>
          </div>
        )}
      </main>
    </div>
  );
}