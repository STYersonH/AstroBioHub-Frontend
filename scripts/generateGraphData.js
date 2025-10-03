import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar el transformer
import graphDataTransformer from "../src/utils/graphDataTransformer.js";

// Generar el archivo JSON
const outputPath = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "graph_papers.json",
);
fs.writeFileSync(outputPath, JSON.stringify(graphDataTransformer, null, 2));
console.log("JSON generado exitosamente en:", outputPath);
