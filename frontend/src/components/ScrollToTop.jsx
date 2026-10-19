import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// On navigation: scroll to the #section in the URL if there is one, otherwise
// restore the saved position (back button) or go to the top.
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Link like "/#gallery" -> scroll to that section. Retry for a moment in
    // case the section has not rendered yet.
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      let frame;
      let tries = 0;
      const scrollToSection = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries++ < 30) {
          frame = requestAnimationFrame(scrollToSection);
        }
      };
      scrollToSection();
      return () => cancelAnimationFrame(frame);
    }

    if (window.history.state && window.history.state.scrollY) {
      // Restore scroll position if we're going back
      window.scrollTo(0, window.history.state.scrollY);
    } else {
      // Scroll to top for new navigation
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Remember the scroll position of the current history entry.
  useEffect(() => {
    let timeout;
    const saveScrollPosition = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        const state = window.history.state || {};
        window.history.replaceState({ ...state, scrollY: window.scrollY }, "");
        timeout = null;
      }, 100);
    };

    window.addEventListener("scroll", saveScrollPosition);
    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default ScrollToTop;
