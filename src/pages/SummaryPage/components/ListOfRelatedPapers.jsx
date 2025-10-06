import React, { useEffect, useRef } from "react";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import PaperAcademicCard from "./PaperAcademicCard";
import { cn } from "../../../utils/cn";
import useAppStore from "../../../store/useAppStore";

const ListOfRelatedPapers = ({ className }) => {
  // inside the papers container
  const papersContainerRef = useRef(null);
  const isHoveringRef = useRef(false);
  const { showRelatedPapers, selectedPaperCitationNumber } =
    useSummaryPageStore();
  const { relatedPapers } = useAppStore();

  // Auto scroll to selected paper card
  useEffect(() => {
    if (
      selectedPaperCitationNumber &&
      papersContainerRef.current &&
      !isHoveringRef.current
    ) {
      const selectedCard = papersContainerRef.current.querySelector(
        `[data-paper-reference="${selectedPaperCitationNumber}"]`,
      );
      if (selectedCard) {
        const container = papersContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const cardRect = selectedCard.getBoundingClientRect();

        // Calculate the position to center the card in the container
        const scrollTop =
          container.scrollTop +
          (cardRect.top - containerRect.top) -
          containerRect.height / 2 +
          cardRect.height / 2;

        container.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }
    }
  }, [selectedPaperCitationNumber]);

  const handleHoverStart = () => {
    isHoveringRef.current = true;
  };

  const handleHoverEnd = () => {
    isHoveringRef.current = false;
  };

  return (
    <div
      className={cn(
        "3xl:w-[382px] sticky top-0 h-[644px] w-[322px]",
        className,
      )}
    >
      {showRelatedPapers && (
        <div
          ref={papersContainerRef}
          className="ultra-minimal-scrollbar gap-md flex h-full w-full flex-col overflow-y-scroll"
        >
          {relatedPapers.map((paper) => (
            <PaperAcademicCard
              key={paper.id}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              dataPaper={paper}
              data-paper-reference={paper.orderPaperReference}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfRelatedPapers;
