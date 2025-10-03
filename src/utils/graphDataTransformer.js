import dataJSON from "../data/academic_data_50_papers.json";
import fs from "fs";
import path from "path";

const graphData = {
  nodes: [],
  links: [],
};

const citationMap = new Map();

dataJSON.academicData.relatedPapers.forEach((paper) => {
  graphData.nodes.push({
    id: paper.orderPaperReference,
    name: paper.title,
    group: "Paper",
    year: paper.year,
    authors: paper.authors,
  });

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

graphData.nodes.forEach((node) => {
  node.citationCount = citationMap.get(node.id) || 0;
});

// for (const paper of dataJSON.academicData.relatedPapers) {
//   graphData.nodes.push({
//     id: paper.orderPaperReference,
//     name: paper.title,
//     group: "Paper",
//     year: paper.year,
//     authors: paper.authors,
//   });

//   for (const reference of paper?.references || []) {
//     graphData.links.push({
//       source: paper.orderPaperReference,
//       target: reference,
//       value: 2,
//     });
//   }
// }

// Generar el archivo JSON
const outputPath = path.join(process.cwd(), "..", "data", "graph_papers.json");
fs.writeFileSync(outputPath, JSON.stringify(graphData, null, 2));
console.log("JSON generado exitosamente en:", outputPath);

export default graphData;
