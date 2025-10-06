import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSummaryPageStore = create(
  persist(
    (set, get) => ({
      showPaperSummary: false,
      showRelatedPapers: true,
      paperSummaryData: null,
      selectedPaperCitationNumber: null,
      highlightedSegmentId: [-1, -1, -1],
      dataAcademic: null,
      dataDiscover: null,

      setShowPaperSummary: (show) => set({ showPaperSummary: show }),
      setShowRelatedPapers: (show) => set({ showRelatedPapers: show }),
      // setPaperSummaryData: (data) => set({ paperSummaryData: data }),
      setSelectedPaperCitationNumber: (number) =>
        set({ selectedPaperCitationNumber: number }),
      setHighlightedSegmentId: (id) => set({ highlightedSegmentId: id }), // id: [idSection, idContentBlock, idSegment]
      setDataAcademic: (data) => set({ dataAcademic: data }),
      setDataDiscover: (data) => set({ dataDiscover: data }),
    }),
    {
      name: "astrobiobub-summary-page-storage",
      partialize: (state) => ({
        paperSummaryData: state.paperSummaryData,
        selectedPaperCitationNumber: state.selectedPaperCitationNumber,
        highlightedSegmentId: state.highlightedSegmentId,
        dataAcademic: state.dataAcademic,
        dataDiscover: state.dataDiscover,
      }),
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

export default useSummaryPageStore;
