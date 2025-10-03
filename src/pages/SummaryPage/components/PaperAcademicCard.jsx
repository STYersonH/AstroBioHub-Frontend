import React, { useState } from "react";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import useAppStore from "../../../store/useAppStore";
import AuthorList from "../../../components/AuthorList";
import { cn } from "../../../utils/cn";

const PaperAcademicCard = ({
  dataPaper,
  onHoverStart,
  onHoverEnd,
  ...props
}) => {
  const {
    setShowPaperSummary,
    setSelectedPaperCitationNumber,
    selectedPaperCitationNumber,
  } = useSummaryPageStore();

  const handleMouseEnter = () => {
    onHoverStart();
    setSelectedPaperCitationNumber(dataPaper.orderPaperReference);
  };
  const handleMouseLeave = () => {
    onHoverEnd();
    setSelectedPaperCitationNumber(null);
  };

  return (
    <div
      {...props}
      className={cn(
        "gap-lg p-xl flex cursor-pointer flex-col rounded-xl border border-gray-100 transition-all duration-200 hover:bg-gray-50",
        selectedPaperCitationNumber === dataPaper.orderPaperReference
          ? "bg-gray-50"
          : "",
      )}
      onClick={() => {
        setShowPaperSummary(true);
        setSelectedPaperCitationNumber(dataPaper.orderPaperReference);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AuthorList authors={dataPaper.authors} />
      <h3 className="text-s-heading-2xs-b">
        <span className="text-gray-400">
          [{dataPaper.orderPaperReference}] &nbsp;
        </span>
        {dataPaper.title}
      </h3>
      <div className="gap-md flex flex-row items-center">
        <p className="text-ui-2xs-m text-gray-400">{dataPaper.year} </p>
        <div className="h-[4px] w-[4px] rounded-full bg-gray-200"></div>
        <p className="text-ui-2xs-r text-gray-400">
          {dataPaper.publicationPlace}
        </p>
      </div>
    </div>
  );
};

export default PaperAcademicCard;
