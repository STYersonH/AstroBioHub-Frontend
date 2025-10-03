import { useState, useEffect } from "react";
import { academicService } from "../services/academicService.js";

// Hook para manejar datos académicos
export const useAcademicData = (searchQuery) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await academicService.getRelatedPapers(searchQuery);
        setData(result);
      } catch (err) {
        setError(err);
        console.error("Error fetching academic data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  return { data, loading, error };
};

// Hook para datos del grafo
export const useGraphData = (searchQuery) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchGraphData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await academicService.getGraphData(searchQuery);
        setGraphData(result);
      } catch (err) {
        setError(err);
        console.error("Error fetching graph data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [searchQuery]);

  return { graphData, loading, error };
};
