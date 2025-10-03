import { useState, useEffect, useCallback } from "react";

export const useTextSelection = () => {
  const [selectedText, setSelectedText] = useState("");
  const [selectionRange, setSelectionRange] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text.length > 0) {
      setSelectedText(text);
      setSelectionRange(selection.getRangeAt(0));

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const menuWidth = 200;
      const x = rect.left + rect.width / 2;
      const y = rect.bottom + 15;

      const adjustedX = Math.max(
        menuWidth / 2,
        Math.min(x, window.innerWidth - menuWidth / 2),
      );
      const adjustedY = y + 50 > window.innerHeight ? rect.top - 60 : y;

      setMenuPosition({
        x: adjustedX,
        y: adjustedY,
      });

      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedText("");
    setSelectionRange(null);
    setShowMenu(false);

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("keyup", handleTextSelection);

    const handleClickOutside = (event) => {
      const menu = document.querySelector("[data-text-selection-menu]");
      const isMenuClick = menu && menu.contains(event.target);
      const isTextSelection =
        event.target.tagName === "TEXTAREA" || event.target.tagName === "INPUT";

      if (!isMenuClick && !isTextSelection) {
        clearSelection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("keyup", handleTextSelection);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleTextSelection, clearSelection]);

  return {
    selectedText,
    selectionRange,
    menuPosition,
    showMenu,
    clearSelection,
  };
};
