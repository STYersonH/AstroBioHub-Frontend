import React, { useState } from "react";
import { useNavigate } from "react-router";
import KnowledgeGraph from "./components/KnowledgeGraph";
import ListOfRelatedPapers from "../SummaryPage/components/ListOfRelatedPapers";
import data from "../../data/academic_data_50_papers.json";
import {
  AddIcon,
  ArrowStepInIcon,
  ArrowStepOutIcon,
  HorizontalLineIcon,
  LeftArrowIcon,
} from "../../components/icons/Icons";
import { cn } from "../../utils/cn";
import { PaperAcademicSummaryContent } from "../SummaryPage/components/PaperAcademicSummary";
import useSummaryPageStore from "../../store/useSummaryPageStore";
import { motion } from "framer-motion";
import useAppStore from "../../store/useAppStore";

const KnowledgeGraphPage = () => {
  const navigate = useNavigate();
  const { showPaperSummary } = useSummaryPageStore();
  const { searchQuery } = useAppStore();
  const handleBackToSummary = () => {
    navigate("/summary/academic");
  };

  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      layout
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToSummary}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
            >
              <LeftArrowIcon className="h-4 w-4 text-gray-700" />
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-ui-lg-sb font-semibold text-gray-900">
              Knowledge Graph of {searchQuery}
            </h1>
          </div>

          {/* Legend */}
          <div className="gap-2xl flex items-center">
            <div className="gap-md flex flex-row items-center">
              <ArrowStepInIcon className="text-green-500" />
              <span className="text-ui-md-r text-gray-600">
                Es referenciado por
              </span>
            </div>
            <div className="gap-md flex items-center">
              <ArrowStepOutIcon className="text-blue-500" />
              <span className="text-ui-md-r text-gray-600">Cita a</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="p-xl gap-xl flex h-full w-[500px] flex-col border-r border-gray-200 bg-white">
          <motion.div
            layout
            className="gap-md flex flex-col rounded-lg border-gray-200 bg-gray-50 p-4"
          >
            <motion.div
              layout
              className="flex w-full flex-row items-center justify-between"
            >
              <h2 className="text-ui-md-sb text-gray-900">
                Papers Relacionados
              </h2>
              <div
                className="flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full px-1"
                onClick={() => setShowInstructions(!showInstructions)}
              >
                {showInstructions ? (
                  <HorizontalLineIcon className="h-full w-full" />
                ) : (
                  <AddIcon className="h-full w-full" />
                )}
              </div>
            </motion.div>
            {showInstructions && (
              <motion.ul
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-2 text-sm text-gray-600"
              >
                <li>
                  • Haz hover sobre un paper o nodo para ver sus conexiones en
                  el grafo
                </li>
                <li>• Haz click en un paper o nodo para ver su resumen</li>
                <li>• Reacomoda los nodos para una mejor visualización</li>
              </motion.ul>
            )}
          </motion.div>

          <motion.div
            layout
            className="h-[1px] w-full bg-gray-200"
          ></motion.div>

          {!showPaperSummary && (
            <motion.div layout className="w-full flex-1 overflow-hidden">
              <ListOfRelatedPapers
                relatedPapers={data.academicData.relatedPapers}
                className="h-full w-full"
              />
            </motion.div>
          )}
          {showPaperSummary && (
            <motion.div layout className="w-full flex-1 overflow-hidden">
              {/* <PaperAcademicSummary className="h-full w-full" /> */}
              <PaperAcademicSummaryContent />
            </motion.div>
          )}
        </div>

        {/* Graph Area */}
        <div className="flex-1 bg-white">
          <div className="h-full p-4">
            <div className="h-full w-full overflow-hidden rounded-lg bg-gray-50">
              <KnowledgeGraph className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default KnowledgeGraphPage;
