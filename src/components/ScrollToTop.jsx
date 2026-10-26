import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll — no animation
    window.scrollTo({ top: 0, behavior: "instant" });

    // Backup: agar content late load ho toh bhi top pe rahe
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
