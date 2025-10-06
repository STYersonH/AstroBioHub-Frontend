import { useState, useEffect } from "react";
import { Link } from "react-router";
import ArticleRenderer from "../../components/ArticleRenderer";
import { motion } from "framer-motion";

const ArticleA = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(
          "/src/pages/InteractiveModePage/articulos_godot/a.html",
        );
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error("Error loading article:", error);
      }
    };

    loadArticle();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Article Content */}
      <div className="mx-auto w-full px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArticleRenderer htmlContent={htmlContent} />
        </motion.div>
      </div>
    </div>
  );
};

export default ArticleA;
