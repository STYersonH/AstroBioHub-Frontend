import React, { useState, useEffect } from "react";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import useAppStore from "../../../store/useAppStore";
import { RedirectIcon } from "../../../components/icons/Icons";
import { CloseIcon } from "../../../components/icons/Icons";
import { motion } from "framer-motion";
import clsx from "clsx";
import AuthorList from "../../../components/AuthorList";
import { cn } from "../../../utils/cn";
import dataPapersJSON from "../../../data/academic_data_papers_backend.json";
import useBreakpointStore from "../../../store/useBreakpointStore";
import axios from "axios";

const PaperAcademicSummaryContent = () => {
  const {
    setShowPaperSummary,
    selectedPaperCitationNumber,
    setSelectedPaperCitationNumber,
    setShowRelatedPapers,
  } = useSummaryPageStore();

  const [paperSummaryData, setPaperSummaryData] = useState(null);

  const getPaperSummaryData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/paperAcademicSummary",
        {
          params: { id: selectedPaperCitationNumber },
        },
      );
      setPaperSummaryData(res.data);
    } catch (error) {
      console.error("Error en paperAcademicSummary:", error);
    }
  };

  useEffect(() => {
    getPaperSummaryData();
  }, [selectedPaperCitationNumber]);

  const handleClosePaperSummary = () => {
    setShowPaperSummary(false);
    setSelectedPaperCitationNumber(null);
    setShowRelatedPapers(true);
  };
  return (
    <div
      className={clsx(
        "py-3xl p-2xl gap-2xl relative top-0 flex h-full w-full flex-col overflow-y-scroll rounded-xl border border-gray-200",
        "ultra-minimal-scrollbar",
      )}
    >
      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() =>
            window.open(
              `https://pmc.ncbi.nlm.nih.gov/articles/${paperSummaryData?.PMCID}/`,
              "_blank",
            )
          }
        >
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
  );
};

const PaperAcademicSummary = ({ className }) => {
  const { showPaperSummary } = useSummaryPageStore();

  // Usar hook global para animaciones responsivas
  const { breakpoints } = useBreakpointStore();

  const getAnimationValues = () => {
    if (breakpoints.is3xl) {
      return {
        x: showPaperSummary ? -400 : 200,
        scale: showPaperSummary ? 1 : 0.9,
      };
    } else {
      return {
        x: showPaperSummary ? -300 : 200,
        scale: showPaperSummary ? 1 : 0.9,
      };
    }
  };

  return (
    <motion.div
      className={cn(
        "3xl:w-[700px] 3xl:h-[800px] sticky top-0 h-[644px] w-[600px]",
        className,
      )}
      animate={{
        opacity: showPaperSummary ? 1 : 0,
        ...getAnimationValues(),
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <PaperAcademicSummaryContent />
    </motion.div>
  );
};

export default PaperAcademicSummary;
export { PaperAcademicSummaryContent };
