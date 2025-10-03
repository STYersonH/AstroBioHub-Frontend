import { create } from "zustand";

const useBreakpointStore = create((set, get) => ({
  // Estado de breakpoints
  breakpoints: {
    is3xl: false,
    is2xl: false,
    isXl: false,
    isLg: false,
    isMd: false,
    isSm: false,
  },

  // Acciones
  setBreakpoints: (newBreakpoints) => set({ breakpoints: newBreakpoints }),

  // Función para inicializar breakpoints
  initBreakpoints: () => {
    const checkBreakpoints = () => {
      const newBreakpoints = {
        is3xl: window.matchMedia("(min-width: 1740px)").matches,
        is2xl: window.matchMedia("(min-width: 1536px)").matches,
        isXl: window.matchMedia("(min-width: 1280px)").matches,
        isLg: window.matchMedia("(min-width: 1024px)").matches,
        isMd: window.matchMedia("(min-width: 768px)").matches,
        isSm: window.matchMedia("(min-width: 640px)").matches,
      };

      set({ breakpoints: newBreakpoints });
    };

    checkBreakpoints();
    window.addEventListener("resize", checkBreakpoints);

    // Retornar función de cleanup
    return () => window.removeEventListener("resize", checkBreakpoints);
  },
}));

export default useBreakpointStore;
