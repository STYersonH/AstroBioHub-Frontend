import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import "../../../figma variables/figma-variables.css";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import useAppStore from "../../../store/useAppStore";
import { cn } from "../../../utils/cn";

const data = [
  {
    id: 1,
    content: "Overview",
    sectionId: "overview",
  },
  {
    id: 2,
    content: "Why this matters",
    sectionId: "why-matters",
  },
  {
    id: 3,
    content: "Related papers",
    sectionId: "related-papers",
  },
];

const TableOfContents = ({ onSectionClick, activeSection }) => {
  const [activeTab, setActiveTab] = useState(data[0]);
  const { selectedMode } = useAppStore();
  const { showPaperSummary } = useSummaryPageStore();

  useEffect(() => {
    if (activeSection) {
      const tab = data.find((item) => item.sectionId === activeSection);
      if (tab) {
        setActiveTab(tab);
      }
    }
  }, [activeSection]);

  const handleClick = (item) => {
    setActiveTab(item);
    if (onSectionClick) {
      onSectionClick(item.sectionId);
    }
  };

  return (
    <motion.div
      className="pt-3xl sticky top-0"
      animate={{
        opacity: showPaperSummary ? 0 : 1,
        x: showPaperSummary ? -20 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <div
        className={cn(
          "py-sm px-lg flex h-auto flex-col items-center justify-center rounded-md border border-gray-100",
          selectedMode === "discover" ? "w-[278px]" : "w-[322px]",
        )}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="py-sm flex w-full flex-col justify-between border-b border-gray-100 last:border-b-0"
          >
            <button
              onClick={() => handleClick(item)}
              className={clsx(
                "text-ui-md-sb cursor-pointer text-start text-gray-400 transition-colors duration-200 hover:text-gray-600",
                activeTab.id === item.id && "text-gray-900",
              )}
            >
              {item.content}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TableOfContents;
