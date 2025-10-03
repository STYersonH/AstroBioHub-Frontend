import React from "react";
import useSummaryPageStore from "../../../store/useSummaryPageStore";

const PaperDiscoverCard = ({ paper }) => {
  const { setSelectedPaperCitationNumber } = useSummaryPageStore();
  const { setShowPaperSummary } = useSummaryPageStore();

  const handleClick = (orderPaperReference) => {
    console.log("paper", paper);
    console.log("orderPaperReference", orderPaperReference);
    setShowPaperSummary(true);
    setSelectedPaperCitationNumber(orderPaperReference);
  };

  return (
    <div
      className="p-xl w-full cursor-pointer rounded-xl border border-gray-100 hover:bg-gray-50"
      onClick={() => handleClick(paper.orderPaperReference)}
    >
      <p className="text-ui-sm-m text-gray-500">
        {paper.mainResearcher}, {paper.year}
      </p>
      <p className="text-c-body-md-sb text-gray-700">{paper.title}</p>
    </div>
  );
};

export default PaperDiscoverCard;
