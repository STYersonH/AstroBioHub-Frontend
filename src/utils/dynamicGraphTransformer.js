// Función para transformar datos dinámicamente
export const transformDataToGraph = (data) => {
  console.log("data ->", data);
  const graphData = {
    nodes: [],
    links: [],
  };

  const citationMap = new Map();

  // Procesar papers relacionados - puede venir de diferentes fuentes
  const relatedPapers = data.relatedPapers || [];
  // data.academicData?.relatedPapers || data.relatedPapers || [];

  relatedPapers.forEach((paper) => {
    graphData.nodes.push({
      id: paper.orderPaperReference,
      name: paper.title,
      group: "Paper",
      year: paper.year,
      authors: paper.authors,
      citationCount: 0, // Se calculará después
    });

    // Procesar referencias
    if (paper.references && paper.references.length > 0) {
      paper.references.forEach((reference) => {
        const refId = reference;
        citationMap.set(refId, (citationMap.get(refId) || 0) + 1);
        graphData.links.push({
          source: paper.orderPaperReference,
          target: refId,
          value: 2,
        });
      });
    }
  });

  // Calcular citation counts
  graphData.nodes.forEach((node) => {
    node.citationCount = citationMap.get(node.id) || 0;
  });

  return graphData;
};

// Hook personalizado para usar el transformer
export const useGraphData = (data) => {
  return React.useMemo(() => {
    if (!data) return { nodes: [], links: [] };
    return transformDataToGraph(data);
  }, [data]);
};
