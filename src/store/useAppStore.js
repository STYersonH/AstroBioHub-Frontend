import { create } from "zustand";

const useAppStore = create((set, get) => ({
  // Estado
  selectedMode: "discover", // 'discover' o 'academic'
  searchActive: false,
  searchQuery: "",
  isLoading: false,
  relatedPapers: [],

  // Acciones
  setMode: (mode) => set({ selectedMode: mode }),
  setSearchActive: (active) => set({ searchActive: active }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ isLoading: loading }),
  setRelatedPapers: (papers) => set({ relatedPapers: papers }),

  // Acción compleja
  performSearch: async (query) => {
    set({ isLoading: true, searchQuery: query });

    try {
      // Aquí iría tu lógica de búsqueda
      console.log("Buscando:", query);

      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error en búsqueda:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAppStore;
