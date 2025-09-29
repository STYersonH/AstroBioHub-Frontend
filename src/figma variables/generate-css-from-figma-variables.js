import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to convert RGB values to hex
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Helper function to convert font weight names to CSS values
function getFontWeight(style) {
  const weightMap = {
    Regular: "400",
    Medium: "500",
    SemiBold: "600",
    Bold: "700",
  };
  return weightMap[style] || "400";
}

// Helper function to convert line height percentage to CSS
function getLineHeight(lineHeight) {
  return `${lineHeight}%`;
}

// Helper function to sanitize class names
function sanitizeClassName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function sanitizeTextClassName(name) {
  const parts = name.split("/");
  const lastPart = parts.slice(-1).join("-"); // Toma las últimas 2 partes
  console.log(lastPart);

  return lastPart
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function sanitizeColorClassName(name) {
  const parts = name.split("/");
  const lastTwoParts = parts.slice(-2).join("-"); // Toma las últimas 2 partes
  return lastTwoParts
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Load and parse JSON files
function loadJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return null;
  }
}

// Generate spacing classes
function generateSpacingClasses(spacingData) {
  let css = "/* Spacing Classes */\n@theme{\n";

  spacingData.variables.forEach((variable) => {
    const name = variable.name.replace("spacing-", "");
    const value =
      variable.resolvedValuesByMode[
        Object.keys(variable.resolvedValuesByMode)[0]
      ].resolvedValue;
    const className = sanitizeClassName(name);

    css += `\t--spacing-${className}: ${value}px;\n`;
  });

  return css + "\n}\n";
}

// Generate radius classes
function generateRadiusClasses(radiusData) {
  let css = "/* Border Radius Classes */\n@theme{\n";

  radiusData.variables.forEach((variable) => {
    const name = variable.name.replace("radius-", "");
    const value =
      variable.resolvedValuesByMode[
        Object.keys(variable.resolvedValuesByMode)[0]
      ].resolvedValue;
    const className = sanitizeClassName(name);

    css += `\t--radius-${className}: ${value}px;\n`;
  });

  return css + "\n}\n";
}

// Generate color classes
function generateColorClasses(primitivesData) {
  let css = "/* Color Classes */\n@theme{\n";

  // Filtrar y procesar colores primero
  const colorEntries = [];

  primitivesData.variables.forEach((variable) => {
    if (variable.type === "COLOR") {
      const name = variable.name;
      const colorValue =
        variable.resolvedValuesByMode[
          Object.keys(variable.resolvedValuesByMode)[0]
        ].resolvedValue;

      if (colorValue && colorValue.r !== undefined) {
        const hexColor = rgbToHex(colorValue.r, colorValue.g, colorValue.b);
        const className = sanitizeColorClassName(name);

        colorEntries.push({
          className,
          hexColor,
          originalName: name,
        });
      }
    }
  });

  // Ordenar alfabéticamente por className
  colorEntries.sort((a, b) => a.className.localeCompare(b.className));

  // Generar CSS ordenado
  colorEntries.forEach(({ className, hexColor }) => {
    css += `\t--color-${className}: ${hexColor};\n`;
  });

  return css + "\n}\n";
}

// Generate text style classes
function generateTextStyleClasses(textStyleData, textTokensData) {
  let css = "/* Text Style Classes */\n";

  // Group text tokens by their base name (e.g., "UI/ui lg (B)" -> "ui-lg-b")
  const textTokenGroups = {};

  textTokensData.variables.forEach((variable) => {
    const name = variable.name;
    const value =
      variable.resolvedValuesByMode[
        Object.keys(variable.resolvedValuesByMode)[0]
      ].resolvedValue;

    // Extract the base name (everything before the last slash)
    const baseName = name.split("/").slice(0, -1).join("/");
    const property = name.split("/").pop();

    if (!textTokenGroups[baseName]) {
      textTokenGroups[baseName] = {};
    }

    textTokenGroups[baseName][property] = value;
  });

  // Generate CSS classes for each text token group
  Object.keys(textTokenGroups).forEach((baseName) => {
    const group = textTokenGroups[baseName];
    const className = sanitizeTextClassName(baseName);

    if (
      group["Font Family"] &&
      group["Font Size"] &&
      group["Font Style"] &&
      group["Line height"]
    ) {
      const fontFamily = group["Font Family"];
      const fontSize = group["Font Size"];
      const fontWeight = getFontWeight(group["Font Style"]);
      const lineHeight = getLineHeight(group["Line height"]);

      css += `.text-${className} {\n`;
      css += `  font-family: "${fontFamily}", sans-serif;\n`;
      css += `  font-size: ${fontSize}px;\n`;
      css += `  font-weight: ${fontWeight};\n`;
      css += `  line-height: ${lineHeight};\n`;
      css += `}\n\n`;
    }
  });

  return css;
}

// Generate utility classes for font sizes
function generateFontSizeClasses(textStyleData) {
  let css = "/* Font Size Utility Classes */\n@theme{\n";

  textStyleData.variables.forEach((variable) => {
    if (variable.name.startsWith("fontSize/fontSize")) {
      const name = variable.name.replace("fontSize/fontSize ", "");
      const value =
        variable.resolvedValuesByMode[
          Object.keys(variable.resolvedValuesByMode)[0]
        ].resolvedValue;
      const className = sanitizeTextClassName(name);

      css += `\t--text-${className}: ${value}px;\n`;
    }
  });

  return css + "\n}\n";
}

// Generate font family utility classes
function generateFontFamilyClasses(textStyleData) {
  let css = "/* Font Family Utility Classes */\n@theme{\n";

  textStyleData.variables.forEach((variable) => {
    if (variable.name.startsWith("fontFamily/")) {
      const name = variable.name.replace("fontFamily/", "");
      const value =
        variable.resolvedValuesByMode[
          Object.keys(variable.resolvedValuesByMode)[0]
        ].resolvedValue;
      const className = sanitizeClassName(name);

      css += `\t--font-${className}: "${value}", sans-serif;\n`;
    }
  });

  return css + "}\n";
}

// Generate font weight utility classes
function generateFontWeightClasses(textStyleData) {
  let css = "/* Font Weight Utility Classes */\n";

  textStyleData.variables.forEach((variable) => {
    if (variable.name.startsWith("fontStyle/")) {
      const name = variable.name.replace("fontStyle/", "");
      const value =
        variable.resolvedValuesByMode[
          Object.keys(variable.resolvedValuesByMode)[0]
        ].resolvedValue;
      const className = sanitizeClassName(name);
      const weight = getFontWeight(value);

      css += `.font-${className} { font-weight: ${weight}; }\n`;
    }
  });

  return css + "\n";
}

// Main function to generate all CSS
function generateCSS() {
  const variablesDir = path.join(__dirname);

  // Load all JSON files
  const spacingData = loadJsonFile(
    path.join(variablesDir, "Spacing Tokens.json")
  );
  const radiusData = loadJsonFile(
    path.join(variablesDir, "Radius Tokens.json")
  );
  const primitivesData = loadJsonFile(
    path.join(variablesDir, "Primitives.json")
  );
  const textStyleData = loadJsonFile(
    path.join(variablesDir, "Text Style.json")
  );
  const textTokensData = loadJsonFile(
    path.join(variablesDir, "Text tokens.json")
  );

  if (
    !spacingData ||
    !radiusData ||
    !primitivesData ||
    !textStyleData ||
    !textTokensData
  ) {
    console.error("Failed to load one or more JSON files");
    return;
  }

  let css = `/* Generated CSS from Figma Variables */
/* Generated on: ${new Date().toISOString()} */

`;

  // Generate all CSS sections
  css += generateSpacingClasses(spacingData);
  css += generateRadiusClasses(radiusData);
  css += generateColorClasses(primitivesData);
  css += generateFontSizeClasses(textStyleData);
  css += generateFontFamilyClasses(textStyleData);
  css += generateFontWeightClasses(textStyleData);
  css += generateTextStyleClasses(textStyleData, textTokensData);

  // Write to file
  const outputPath = path.join(__dirname, "figma-variables.css");
  fs.writeFileSync(outputPath, css);

  console.log("CSS file generated successfully at:", outputPath);
  console.log("Total CSS length:", css.length, "characters");
}

// Run the script
generateCSS();

export { generateCSS };
