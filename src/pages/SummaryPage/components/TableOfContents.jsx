import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import "../../../figma variables/figma-variables.css";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import useAppStore from "../../../store/useAppStore";
import { cn } from "../../../utils/cn";

const TableOfContents = ({ onSectionClick, activeSection, sections }) => {
  const [activeTabId, setActiveTabId] = useState(sections[0].id);
  const [activeSubTabId, setActiveSubTabId] = useState(null);
  const { selectedMode } = useAppStore();
  const { showPaperSummary } = useSummaryPageStore();

  useEffect(() => {
    if (activeSection) {
      const tab = sections.find((item) => item.sectionId === activeSection);
      if (tab) {
        setActiveTabId(tab.sectionId);
        if (tab.sectionId !== sections[0].sectionId) {
          setActiveSubTabId(null);
        }
      } else {
        const subTab = sections[0].subsections.find(
          (item) => item.sectionId === activeSection,
        );
        if (subTab) {
          setActiveTabId(sections[0].sectionId);
          setActiveSubTabId(subTab.sectionId);
        }
      }
    }
  }, [activeSection]);

  const handleClick = (itemId) => {
    setActiveTabId(itemId);
    setActiveSubTabId(null);
    if (onSectionClick) {
      onSectionClick(itemId);
    }
  };

  const handleSubClick = (itemId) => {
    setActiveSubTabId(itemId);
    if (onSectionClick) {
      onSectionClick(itemId);
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
          selectedMode === "discover"
            ? "3xl:w-[300px] w-[278px]"
            : "3xl:w-[382px] w-[322px]",
        )}
      >
        {sections.map((item) => (
          <div
            key={item.id}
            className="py-sm flex w-full flex-col justify-between border-b border-gray-100 last:border-b-0"
          >
            <button
              onClick={() => handleClick(item.sectionId)}
              className={clsx(
                "text-ui-md-sb cursor-pointer text-start text-gray-400 transition-colors duration-200 hover:text-gray-600",
                activeTabId === item.sectionId && "text-gray-900",
              )}
            >
              {item.content}
            </button>
            {item.subsections && (
              <div className="pt-md gap-md flex flex-col">
                {item.subsections.map((subSection) => (
                  <button
                    key={subSection.id}
                    onClick={() => handleSubClick(subSection.sectionId)}
                    className={clsx(
                      "pl-xl text-ui-sm-sb cursor-pointer text-start text-gray-400 transition-colors duration-200 hover:text-gray-600",
                      activeSubTabId === subSection.sectionId &&
                        "text-gray-900",
                    )}
                  >
                    {subSection.content}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TableOfContents;
