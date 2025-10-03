import { create } from "zustand";

const useSummaryPageStore = create((set, get) => ({
  showPaperSummary: false,
  showRelatedPapers: true,
  paperSummaryData: null,
  selectedPaperCitationNumber: null,
  highlightedSegmentId: [-1, -1, -1],

  setShowPaperSummary: (show) => set({ showPaperSummary: show }),
  setShowRelatedPapers: (show) => set({ showRelatedPapers: show }),
  // setPaperSummaryData: (data) => set({ paperSummaryData: data }),
  setSelectedPaperCitationNumber: (number) =>
    set({ selectedPaperCitationNumber: number }),
  setHighlightedSegmentId: (id) => set({ highlightedSegmentId: id }), // id: [idSection, idContentBlock, idSegment]
}));

export default useSummaryPageStore;
