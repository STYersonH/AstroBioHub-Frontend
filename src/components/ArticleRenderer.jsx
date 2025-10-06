import { useEffect, useRef } from "react";

const ArticleRenderer = ({ htmlContent }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && htmlContent) {
      // Limpiar el contenido anterior
      containerRef.current.innerHTML = "";

      // Crear un elemento temporal para parsear el HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      // Extraer solo el contenido del body
      const bodyContent = tempDiv.querySelector("body");
      if (bodyContent) {
        // Procesar las rutas de las imágenes
        const images = bodyContent.querySelectorAll("img");
        images.forEach((img) => {
          const src = img.getAttribute("src");
          if (src && src.startsWith("../images/")) {
            // Convertir ruta relativa a ruta absoluta desde public
            const newSrc = src.replace("../images/", "/images/");
            img.setAttribute("src", newSrc);
          }
        });

        // Clonar el contenido del body
        const clonedContent = bodyContent.cloneNode(true);
        containerRef.current.appendChild(clonedContent);
      } else {
        // Si no hay body, usar todo el contenido
        containerRef.current.innerHTML = htmlContent;
      }
    }
  }, [htmlContent]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="article-content" />
    </div>
  );
};

export default ArticleRenderer;
