import React, { useState, useEffect } from "react";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import clsx from "clsx";
import { motion } from "framer-motion";
import "../../../styles/scrollbar.css";
import { CloseIcon } from "../../../components/icons/Icons";
import dataPapersJSON from "../../../data/discover_data_papers_backend.json";

const PaperDiscoverSummary = () => {
  const { showPaperSummary, setShowPaperSummary, selectedPaperCitationNumber } =
    useSummaryPageStore();
  const [paperSummaryData, setPaperSummaryData] = useState(null);

  useEffect(() => {
    console.log("selectedPaperCitationNumber", selectedPaperCitationNumber);
    setPaperSummaryData(
      dataPapersJSON.find(
        (paper) => paper.orderPaperReference === selectedPaperCitationNumber,
      ),
    );
  }, [selectedPaperCitationNumber]);

  useEffect(() => {
    console.log("data papers json", dataPapersJSON);
    console.log("paperSummaryData", paperSummaryData);
  }, [paperSummaryData]);

  return (
    <motion.div
      className="pt-3xl sticky top-0"
      animate={{
        opacity: showPaperSummary ? 1 : 0,
        x: showPaperSummary ? 0 : 200,
        scale: showPaperSummary ? 1 : 0.9,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <div
        className={clsx(
          "py-3xl p-2xl gap-2xl relative top-0 flex h-[644px] w-[604px] flex-col overflow-y-scroll rounded-xl border border-gray-200",
          "ultra-minimal-scrollbar",
        )}
      >
        {/* close button */}
        <button
          className="top-lg right-lg absolute cursor-pointer"
          onClick={() => setShowPaperSummary(false)}
        >
          <CloseIcon />
        </button>

        <div className="gap-sm flex w-full flex-col">
          <p className="text-ui-sm-m text-gray-500">
            {paperSummaryData?.author}, {paperSummaryData?.year}
          </p>
          <p className="font-poppins text-[22px] leading-[150%] font-[600] text-gray-700">
            {paperSummaryData?.title}
          </p>
        </div>
        {/* tags */}
        <div className="gap-md flex flex-wrap">
          {paperSummaryData?.tags.map((tag) => (
            <p
              key={tag}
              className="text-ui-sm-m py-sm px-xl rounded-full border border-gray-200 text-gray-500"
            >
              {tag}
            </p>
          ))}
        </div>
        {/* summary */}
        <div>
          <p className="text-c-body-lg-r text-gray-900">
            {paperSummaryData?.summary}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperDiscoverSummary;
