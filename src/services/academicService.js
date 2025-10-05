import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const academicService = {
  // Obtener papers relacionados
  getRelatedPapers: async (searchQuery) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/summaryAcademic`, {
        params: { searchTerm: searchQuery },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching related papers:", error);
      throw error;
    }
  },

  // Obtener datos del grafo
  getGraphData: async (searchQuery) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/graphData`, {
        params: { searchTerm: searchQuery },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching graph data:", error);
      throw error;
    }
  },

  // Obtener datos de discover
  getDiscoverData: async (searchQuery) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/summaryDiscover`, {
        params: { searchTerm: searchQuery },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching discover data:", error);
      throw error;
    }
  },
};
