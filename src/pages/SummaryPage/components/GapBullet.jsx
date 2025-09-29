import React from "react";
import Button from "../../../components/Button";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import Toggle from "../../../components/Toggle";

const ButtonComponent = () => {
  const { setShowPaperSummary } = useSummaryPageStore();
  return (
    <Button onClick={() => setShowPaperSummary(true)}>See paper preview</Button>
  );
};

const ContentComponent = ({ nextSteps }) => {
  return (
    <div className="space-y-lg">
      <h3 className="text-ui-md-sb">Next steps</h3>
      {nextSteps.map((step) => (
        <div className="flex flex-row">
          {/* circle */}
          <div className="flex h-[30px] w-[24px] flex-shrink-0 flex-col items-start justify-center">
            <div className="h-[5px] w-[5px] rounded-full border border-gray-800"></div>
          </div>
          <p key={step} className="text-c-body-md-r">
            {step}
          </p>
        </div>
      ))}
    </div>
  );
};

const GapBullet = ({ title, nextSteps }) => {
  return (
    <Toggle title={title} button={<ButtonComponent />}>
      <ContentComponent nextSteps={nextSteps} />
    </Toggle>
  );
};

export default GapBullet;
