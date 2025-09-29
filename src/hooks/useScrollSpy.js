import { useState, useEffect, useRef } from "react";

const useScrollSpy = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Encontrar la sección que está más visible
        let maxRatio = 0;
        let mostVisibleSection = sectionIds[0];

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });

        if (maxRatio > 0) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px", // Margen para activar antes
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    observerRef.current = observer;

    // Observar todas las secciones
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds]);

  return activeSection;
};

export default useScrollSpy;
