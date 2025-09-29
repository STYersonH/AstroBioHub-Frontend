import React, { useState, useEffect } from "react";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import useAppStore from "../../../store/useAppStore";
import { RedirectIcon } from "../../../components/icons/Icons";
import { CloseIcon } from "../../../components/icons/Icons";
import { motion } from "framer-motion";
import clsx from "clsx";
import AuthorList from "../../../components/AuthorList";

const PaperAcademicSummary = () => {
  const {
    showPaperSummary,
    setShowPaperSummary,
    numberCitationPaperSelected,
    setNumberCitationPaperSelected,
    setShowRelatedPapers,
  } = useSummaryPageStore();
  const { relatedPapers } = useAppStore();

  const [paperSummaryData, setPaperSummaryData] = useState(null);

  useEffect(() => {
    setPaperSummaryData(
      relatedPapers.find(
        (paper) => paper.orderPaperReference === numberCitationPaperSelected,
      ),
    );
  });

  const handleClosePaperSummary = () => {
    setShowPaperSummary(false);
    setNumberCitationPaperSelected(null);
    setShowRelatedPapers(true);
  };

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
          "py-3xl p-2xl gap-2xl relative top-0 flex h-[644px] w-[437px] flex-col overflow-y-scroll rounded-xl border border-gray-200",
          "ultra-minimal-scrollbar",
        )}
      >
        {/* Buttons */}
        <div className="flex justify-between">
          <button>
            <RedirectIcon />
          </button>
          <button
            onClick={() => handleClosePaperSummary()}
            className="cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-sm">
          {/* authors */}
          <AuthorList authors={paperSummaryData?.authors} />

          {/* title */}
          <h3 className="text-s-heading-2xs-b">{paperSummaryData?.title}</h3>
        </div>

        {/* Highlights */}
        <div className="space-y-md">
          <h4 className="text-s-body-md-b">Highlights</h4>
          <div className="space-y-sm">
            {paperSummaryData?.highlights?.map((highlight) => (
              <div className="flex flex-row">
                {/* circle */}
                <div className="flex h-[24px] w-[20px] flex-shrink-0 flex-col items-start justify-center">
                  <div className="h-[5px] w-[5px] rounded-full bg-gray-800"></div>
                </div>
                {/* title paper */}
                <p className="text-s-body-md-r">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Abstract */}
        <div className="space-y-md">
          <h4 className="text-s-body-md-b">Abstract</h4>
          <p className="text-s-body-md-r">{paperSummaryData?.abstract}</p>
        </div>

        {/* Results */}
        <div className="space-y-md">
          <h4 className="text-s-body-md-b">Results</h4>
          <p className="text-s-body-md-r">{paperSummaryData?.results}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperAcademicSummary;
