import React, { useState, useEffect } from "react";
import { cn } from "../../../utils/cn";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import useAppStore from "../../../store/useAppStore";

const HighligthedText = ({ segment, listIntex }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [numberCitationHighlighted, setNumberCitationHighlighted] =
    useState(null);

  // const {};
  const { setHighlightedSegmentId, highlightedSegmentId } =
    useSummaryPageStore();
  const {
    showPaperSummary,
    setShowPaperSummary,
    setSelectedPaperCitationNumber,
    setShowRelatedPapers,
    selectedPaperCitationNumber,
  } = useSummaryPageStore();

  const handleClick = (numberCitation) => {
    setHighlightedSegmentId(listIntex);
    setNumberCitationHighlighted(numberCitation);
    setIsHighlighted(true);
    setShowPaperSummary(true);
    setSelectedPaperCitationNumber(numberCitation);

    if (
      numberCitationHighlighted === numberCitation &&
      isHighlighted &&
      showPaperSummary
    ) {
      setIsHighlighted(false);
      setNumberCitationHighlighted(null);
      setShowRelatedPapers(true);
      setShowPaperSummary(false);
    } else {
      setIsHighlighted(true);
      setShowPaperSummary(true);
      setSelectedPaperCitationNumber(numberCitation);
      setShowRelatedPapers(false);
    }
  };

  const handleMouseEnter = (numberCitation) => {
    setHighlightedSegmentId(listIntex);
    setNumberCitationHighlighted(numberCitation);
    setIsHighlighted(true);
    setSelectedPaperCitationNumber(numberCitation);
  };

  const handleMouseLeave = () => {
    if (!showPaperSummary) {
      setIsHighlighted(false);
      setNumberCitationHighlighted(null);
      setSelectedPaperCitationNumber(null);
    }
  };

  useEffect(() => {
    if (
      (highlightedSegmentId[0] !== listIntex[0] ||
        highlightedSegmentId[1] !== listIntex[1] ||
        highlightedSegmentId[2] !== listIntex[2]) &&
      isHighlighted
    ) {
      setIsHighlighted(false);
      setNumberCitationHighlighted(null);
    }
  }, [highlightedSegmentId, isHighlighted]);

  useEffect(() => {
    if (!showPaperSummary) {
      setIsHighlighted(false);
      setNumberCitationHighlighted(null);
    }
  }, [showPaperSummary]);

  return (
    <>
      <span className="text-s-body-lg-r">
        <span
          className={cn(
            "transition-all duration-300",
            isHighlighted ? "rounded-sm bg-blue-100 py-0.5 shadow-sm" : "",
          )}
        >
          {segment.text}
        </span>
        <span className="gap-xs ml-1 inline-flex">
          {"["}
          {segment.citations.map((numberCitation, index) => (
            <span
              key={numberCitation}
              onClick={() => handleClick(numberCitation)}
              onMouseEnter={() => handleMouseEnter(numberCitation)}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "inline-flex cursor-pointer items-center justify-center font-medium hover:text-blue-500",
                numberCitationHighlighted === numberCitation
                  ? "text-blue-500"
                  : "",
              )}
              title={`Reference ${numberCitation} - Hover to highlight text`}
            >
              {" "}
              {numberCitation}
              {index < segment.citations.length - 1 ? ", " : " "}
            </span>
          ))}
          {"]"}
        </span>
      </span>
    </>
  );
};

export default HighligthedText;
