import React from "react";
import Button from "../../../components/Button";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import Toggle from "../../../components/Toggle";

const ButtonComponent = ({ orderPaperReference }) => {
  const { setShowPaperSummary, setSelectedPaperCitationNumber } =
    useSummaryPageStore();
  const { setShowRelatedPapers } = useSummaryPageStore();
  const handleSeePaperPreview = () => {
    setShowPaperSummary(true);
    setSelectedPaperCitationNumber(orderPaperReference);
    // setShowRelatedPapers(false);
  };

  return (
    <Button onClick={() => handleSeePaperPreview()}>See paper preview</Button>
  );
};

const ContentComponent = ({ segments }) => {
  return (
    <p className="text-s-body-md-r space-y-lg">
      {segments.map((segment) => (
        <p key={segment.text} className="text-s-body-md-r">
          <p className="text-s-body-md-r">{segment.text}</p>
          {/* paragraph image */}
          {segment.image && (
            <div className="p-xl flex flex-col items-center">
              <img
                src={segment.image.src}
                alt={segment.image.alt}
                className="h-auto w-3/4 rounded-lg object-cover"
              />
              <p className="text-c-body-sm mt-2 text-center text-gray-600 italic">
                {segment.image.caption}
              </p>
            </div>
          )}
        </p>
      ))}
    </p>
  );
};

const ResultBullet = ({ title, orderPaperReference, segments }) => {
  return (
    <Toggle
      title={title + " [" + orderPaperReference + "]"}
      button={<ButtonComponent orderPaperReference={orderPaperReference} />}
    >
      <ContentComponent segments={segments} />
    </Toggle>
  );
};

export default ResultBullet;
