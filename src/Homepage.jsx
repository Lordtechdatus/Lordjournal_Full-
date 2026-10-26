import { Fragment, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const HOMEPAGE_STYLE_ID = 'homepage-inline-styles-white-v3';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

html { scroll-behavior: smooth; overflow-x: hidden; }
body {
  overflow-x: hidden;
  background: #ffffff;
  color: #0f172a;
}

/* ── Hero: White Theme ── */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(0, 82, 204, 0.08) 0%, transparent 34%),
    radial-gradient(circle at bottom right, rgba(52, 211, 153, 0.08) 0%, transparent 32%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

/* Soft light gradient orbs */
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.hero-orb-1 {
  width: 580px; height: 580px;
  background: radial-gradient(circle, rgba(0, 82, 204, 0.12) 0%, transparent 70%);
  top: -120px; left: -110px;
  animation: orbFloat1 12s ease-in-out infinite;
}
.hero-orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(66, 133, 244, 0.10) 0%, transparent 70%);
  bottom: -100px; right: -90px;
  animation: orbFloat2 15s ease-in-out infinite;
}
.hero-orb-3 {
  width: 340px; height: 340px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.09) 0%, transparent 70%);
  top: 52%; left: 50%;
  transform: translate(-50%, -50%);
  animation: orbFloat3 18s ease-in-out infinite;
}

@keyframes orbFloat1 {
  0%,100% { transform: translate(0, 0); }
  33%      { transform: translate(60px, 40px); }
  66%      { transform: translate(-30px, 70px); }
}
@keyframes orbFloat2 {
  0%,100% { transform: translate(0, 0); }
  33%      { transform: translate(-50px, -30px); }
  66%      { transform: translate(30px, -60px); }
}
@keyframes orbFloat3 {
  0%,100% { transform: translate(-50%, -50%) scale(1); }
  50%      { transform: translate(-50%, -50%) scale(1.2); }
}

/* Light dot grid overlay */
.hero-section::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(15, 23, 42, 0.055) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  padding: 140px 24px 80px;
  text-align: center;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 17px;
  background: #eef5ff;
  border: 1px solid #cfe1ff;
  border-radius: 20px;
  color: #0052cc;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 28px;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.1s forwards;
}
.hero-eyebrow-dot {
  width: 6px; height: 6px;
  background: #0052cc;
  border-radius: 50%;
  animation: pulse 2s ease infinite;
}

.hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #0f172a;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInUp 0.9s ease 0.3s forwards;
}
.hero-title-accent {
  background: linear-gradient(135deg, #0052cc 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #475569;
  line-height: 1.7;
  max-width: 640px;
  margin: 0 auto 3rem;
  font-weight: 400;
  opacity: 0;
  animation: fadeInUp 0.9s ease 0.5s forwards;
}

/* Search */
.search-wrap {
  opacity: 0;
  animation: fadeInUp 0.9s ease 0.7s forwards;
  max-width: 680px;
  margin: 0 auto;
}
.search-container {
  display: flex;
  background: #ffffff;
  border: 1px solid #dbe4f0;
  border-radius: 56px;
  padding: 6px 6px 6px 24px;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
}
.search-container:focus-within {
  border-color: rgba(0, 82, 204, 0.55);
  box-shadow: 0 0 0 4px rgba(0, 82, 204, 0.11), 0 16px 42px rgba(15, 23, 42, 0.10);
}
.search-input {
  flex: 1;
  border: none;
  background: transparent;
  color: #0f172a;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  outline: none;
  padding: 10px 0;
}
.search-input::placeholder { color: #94a3b8; }
.search-button {
  background: linear-gradient(135deg, #0052cc, #4285f4);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 48px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 82, 204, 0.24);
}
.search-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(0, 82, 204, 0.30);
  background: linear-gradient(135deg, #003daa, #2a6fec);
}

.search-results {
  margin-top: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  overflow: hidden;
  animation: fadeInUp 0.3s ease forwards;
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.11);
}
.search-result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px;
  text-decoration: none;
  color: #334155;
  border-bottom: 1px solid #edf2f7;
  transition: background 0.15s;
  font-size: 0.9rem;
}
.search-result-item:last-child { border-bottom: none; }
.search-result-item:hover { background: #f1f6ff; }
.search-result-title { font-weight: 600; }
.search-result-link { color: #0052cc; font-size: 0.82rem; font-weight: 700; }

/* Stats row */
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 56px;
  opacity: 0;
  animation: fadeInUp 0.9s ease 0.9s forwards;
}
.hero-stat-item {
  text-align: center;
  background: rgba(255,255,255,0.72);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px 22px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}
.hero-stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: #0f172a;
  font-family: 'Inter', sans-serif;
  line-height: 1;
}
.hero-stat-label {
  font-size: 0.78rem;
  color: #64748b;
  margin-top: 4px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.5; transform: scale(1.3); }
}

/* ── Card Section ── */
.card-section {
  background: #ffffff;
  padding: 100px 24px;
  position: relative;
  border-top: 1px solid #e2e8f0;
}

.card-section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
}
.card-section-eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0052cc;
  margin-bottom: 16px;
}
.card-section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.15;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}
.card-section-subtitle {
  color: #64748b;
  font-size: 1.05rem;
  line-height: 1.65;
}

.card-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 28px;
}

.card-item {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
  cursor: pointer;
  border: 1px solid #e2e8f0;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
              box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 0.7s ease forwards;
}
.card-item:nth-child(1) { animation-delay: 0.05s; }
.card-item:nth-child(2) { animation-delay: 0.12s; }
.card-item:nth-child(3) { animation-delay: 0.19s; }
.card-item:nth-child(4) { animation-delay: 0.26s; }
.card-item:nth-child(5) { animation-delay: 0.33s; }
.card-item:nth-child(6) { animation-delay: 0.40s; }

.card-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 48px rgba(15,23,42,0.12), 0 6px 16px rgba(0,82,204,0.08);
  border-color: transparent;
}

.card-image {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), filter 0.4s ease;
  filter: brightness(0.94) saturate(1.05);
}
.card-item:hover .card-image {
  transform: scale(1.07);
  filter: brightness(0.72) saturate(1.12);
}

.card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(15,23,42,0.35) 0%, transparent 62%);
  transition: opacity 0.4s ease;
  opacity: 0.35;
}
.card-item:hover .card-overlay { opacity: 0.62; }

.card-content {
  position: relative;
  z-index: 2;
  padding: 24px;
  background: linear-gradient(to top, rgba(255,255,255,0.98), rgba(255,255,255,0.90));
  backdrop-filter: blur(12px);
  margin: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.7);
  transition: transform 0.4s ease, background 0.3s ease;
}
.card-item:hover .card-content {
  transform: translateY(-6px);
  background: rgba(255,255,255,0.99);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
  line-height: 1.4;
  transition: color 0.3s ease;
}
.card-item:hover .card-title { color: #0052cc; }

.card-description {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.55;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content { padding: 120px 20px 60px; }
  .hero-stats {
    gap: 14px;
    flex-wrap: wrap;
  }
  .hero-stat-item {
    padding: 14px 16px;
  }
  .hero-stat-number { font-size: 1.4rem; }
  .search-container {
    padding: 6px;
    flex-direction: column;
    border-radius: 20px;
    gap: 8px;
  }
  .search-input {
    padding: 10px 14px;
    text-align: center;
  }
  .search-button {
    width: 100%;
    border-radius: 14px;
  }
  .card-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .card-section {
    padding: 70px 16px;
  }
}
`;

function svgFallbackDataUrl(text = 'Image Unavailable') {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#e9eef7'/><stop offset='100%' stop-color='#cfd9ea'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial,sans-serif' font-size='20' fill='#334155'>${text}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function Homepage() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Remove old homepage style tags so the white theme applies immediately
    ['homepage-inline-styles', 'homepage-inline-styles-v2', HOMEPAGE_STYLE_ID].forEach((id) => {
      const old = document.getElementById(id);
      if (old) old.remove();
    });

    const tag = document.createElement('style');
    tag.id = HOMEPAGE_STYLE_ID;
    tag.appendChild(document.createTextNode(styles));
    document.head.appendChild(tag);
    const timer = setTimeout(() => setImagesLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    { title: 'Discover Open Access', description: 'Explore thousands of freely available research papers and academic resources.', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80' },
    { title: 'Publish with Us', description: 'Share your research with the global academic community through our publishing platform.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80' },
    { title: 'Track Your Research', description: 'Monitor citations, impact metrics, and collaboration opportunities for your work.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80' },
    { title: 'Featured Articles', description: 'Discover trending research and breakthrough studies across all disciplines.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80' },
    { title: 'Browse by Subject', description: 'Navigate through organized categories to find research in your field of interest.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80' },
    { title: 'About Lord Journals', description: 'Learn more about our mission to advance academic research and scholarly communication.', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80' },
  ];

  return (
    <Fragment>
      <HeroSection />
      <CardSection cards={cards} imagesLoaded={imagesLoaded} />
    </Fragment>
  );
}

function HeroSection() {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);

  const journals = [
    { title: 'Lord Journal of Civil Engineering', route: '/journals/civil-engineering', keywords: ['civil', 'ljce', 'infrastructure'] },
    { title: 'Lord Journal of Mechanical Engineering', route: '/journals/mechanical-engineering', keywords: ['mechanical', 'ljme', 'manufacturing'] },
    { title: 'Lord Journal of Electronics', route: '/journals/electronics-engineering', keywords: ['electronics', 'ljee', 'embedded', 'vlsi', 'iot'] },
    { title: 'Lord Journal of Electrical Engineering', route: '/journals/electrical-engineering', keywords: ['electrical', 'power', 'grids', 'machines'] },
    { title: 'Lord Journal of Computer Science & Engineering (CSE)', route: '/journals/computer-science-engineering', keywords: ['computer', 'cse', 'software', 'networks', 'ai'] },
    { title: 'Lord Journal of Applied Science', route: '/journals/applied-science', keywords: ['applied', 'physics', 'chemistry', 'materials'] },
    { title: 'Lord Journal of Artificial Intelligence, Machine Learning & Data Science', route: '/journals/ai-ml-data-science', keywords: ['ai', 'ml', 'data', 'aimlds', 'nlp', 'vision'] },
    { title: 'Lord Journal of Law & Social Science', route: '/journals/law-social-science', keywords: ['law', 'social', 'justice', 'policy'] },
    { title: 'Lord Journal of Education', route: '/journals/education', keywords: ['education', 'learning', 'edtech'] },
    { title: 'Lord Journal of Built Environment & Sustainability', route: '/journals/built-environment-sustainability', keywords: ['built', 'environment', 'sustainability'] },
    { title: 'Lord Journal of Medical Science', route: '/journals/medical-science', keywords: ['medical', 'health', 'medicine'] },
  ];

  useEffect(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) { setResults([]); return; }
    setResults(journals.filter(j => `${j.title} ${j.keywords.join(' ')}`.toLowerCase().includes(q)).slice(0, 8));
  }, [searchValue]);

  return (
    <section className="hero-section">
      {/* Animated orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Open Access Academic Publishing
        </div>

        <h1 className="hero-title">
          Discover <span className="hero-title-accent">Academic</span><br />Excellence
        </h1>

        <p className="hero-subtitle">
          Access millions of research papers, journals, and academic resources from leading institutions worldwide
        </p>

        <div className="search-wrap">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search journals, articles, authors, or keywords…"
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoComplete="off"
            />
            <button className="search-button">🔍 Search</button>
          </div>
          {results.length > 0 && (
            <div className="search-results">
              {results.map((r, i) => (
                <Link key={i} to={r.route} className="search-result-item">
                  <span className="search-result-title">{r.title}</span>
                  <span className="search-result-link">Open →</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="hero-stats">
          {[
            { n: '12+', l: 'Journals' },
            { n: '500+', l: 'Papers Published' },
            { n: '50+', l: 'Countries' },
          ].map((s, i) => (
            <div key={i} className="hero-stat-item">
              <div className="hero-stat-number">{s.n}</div>
              <div className="hero-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardSection({ cards, imagesLoaded }) {
  return (
    <section className="card-section" id="services">
      <div className="card-section-header">
        <div className="card-section-eyebrow">Our Services</div>
        <h2 className="card-section-title">Everything You Need to Publish & Discover</h2>
        <p className="card-section-subtitle">
          Comprehensive academic tools and resources designed to support your research journey from discovery to publication.
        </p>
      </div>
      <div className="card-grid">
        {cards.map((card, i) => (
          <div key={i} className={`card-item ${!imagesLoaded ? 'loading' : ''}`}>
            <img src={card.image} alt={card.title} className="card-image"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = svgFallbackDataUrl(); }}
              loading="lazy"
            />
            <div className="card-overlay" />
            <div className="card-content">
              <div className="card-title">{card.title}</div>
              <div className="card-description">{card.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Homepage;
