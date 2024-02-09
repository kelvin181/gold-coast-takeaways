import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToAnchor = () => {
  const location = useLocation();
  const lastHash = useRef("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    const navbarHeight = 65;

    if (location.hash) {
      lastHash.current = location.hash.slice(1);
    }

    if (lastHash.current) {
      const targetElement = document.getElementById(lastHash.current);

      if (targetElement) {
        timeoutRef.current = setTimeout(() => {
          const scrollPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });

          lastHash.current = "";
        }, 100);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location]);

  return null;
};

export default ScrollToAnchor;
