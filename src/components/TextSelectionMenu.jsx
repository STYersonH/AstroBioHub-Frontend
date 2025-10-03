import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { CloseIcon } from "./icons/Icons";

const TextSelectionMenu = ({
  position,
  isVisible,
  onExplain,
  onClose,
  selectedText,
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      data-text-selection-menu
      onMouseDown={(e) => e.preventDefault()}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "fixed z-50 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg",
        "backdrop-blur-sm",
      )}
      style={{
        left: position.x,
        top: position.y,
        transform: "translateX(-50%)",
      }}
    >
      {/* Botón Explicar */}
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onExplain(selectedText);
          onClose();
        }}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium",
          "bg-blue-50 text-blue-500 hover:bg-blue-100",
          "transition-colors duration-200",
        )}
      >
        Explicar
      </button>

      {/* Botón Cerrar */}
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        className={cn(
          "flex items-center justify-center rounded-md p-1.5 text-gray-500",
          "hover:bg-gray-100 hover:text-gray-700",
          "transition-colors duration-200",
        )}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default TextSelectionMenu;
