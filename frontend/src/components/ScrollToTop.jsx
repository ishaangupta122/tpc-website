import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Store the current scroll position before navigation
    if (window.history.state && window.history.state.scrollY) {
      const { scrollY } = window.history.state;
      // Restore scroll position if we're going back
      window.scrollTo(0, scrollY);
    } else {
      // Scroll to top for new navigation
      window.scrollTo(0, 0);
    }

    // Save current scroll position before leaving the page
    const handleScroll = () => {
      const state = window.history.state || {};
      window.history.replaceState(
        {
          ...state,
          scrollY: window.scrollY,
        },
        ""
      );
    };

    // Throttle scroll event listener
    let timeout;
    const throttledHandleScroll = () => {
      if (!timeout) {
        timeout = setTimeout(() => {
          handleScroll();
          timeout = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [location]);

  return null;
};

export default ScrollToTop;
