import { useState, useEffect } from "react";

// Hook personalizado para detectar breakpoints
export const useBreakpoint = (breakpoint) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(breakpoint);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);

  return matches;
};

// Hook para múltiples breakpoints
export const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState({
    is3xl: false,
    is2xl: false,
    isXl: false,
    isLg: false,
    isMd: false,
    isSm: false,
  });

  useEffect(() => {
    const checkBreakpoints = () => {
      setBreakpoints({
        is3xl: window.matchMedia("(min-width: 1740px)").matches,
        is2xl: window.matchMedia("(min-width: 1536px)").matches,
        isXl: window.matchMedia("(min-width: 1280px)").matches,
        isLg: window.matchMedia("(min-width: 1024px)").matches,
        isMd: window.matchMedia("(min-width: 768px)").matches,
        isSm: window.matchMedia("(min-width: 640px)").matches,
      });
    };

    checkBreakpoints();
    window.addEventListener("resize", checkBreakpoints);
    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  return breakpoints;
};
