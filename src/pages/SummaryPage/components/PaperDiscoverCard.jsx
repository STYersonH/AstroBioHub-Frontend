import React from "react";
import useSummaryPageStore from "../../../store/useSummaryPageStore";

const PaperDiscoverCard = ({ paper }) => {
  const { setShowPaperSummary } = useSummaryPageStore();

  return (
    <div
      className="p-xl w-full cursor-pointer rounded-xl border border-gray-100 hover:bg-gray-50"
      onClick={() => setShowPaperSummary(true)}
    >
      <p className="text-ui-sm-m text-gray-500">
        {paper.mainResearcher}, {paper.year}
      </p>
      <p className="text-c-body-md-sb text-gray-700">{paper.title}</p>
    </div>
  );
};

export default PaperDiscoverCard;
