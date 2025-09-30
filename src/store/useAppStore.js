import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "astrobiobub-app-storage", // Nombre único para localStorage
      // Solo persistir estas propiedades específicas
      partialize: (state) => ({
        selectedMode: state.selectedMode,
        searchActive: state.searchActive,
        searchQuery: state.searchQuery,
      }),
      // Configuración adicional
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            return JSON.parse(str);
          } catch (error) {
            console.warn("Error parsing localStorage data:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.warn("Error saving to localStorage:", error);
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

export default useAppStore;
