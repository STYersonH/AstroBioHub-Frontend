import React from "react";
import useSummaryPageStore from "../../../store/useSummaryPageStore";
import clsx from "clsx";
import { motion } from "framer-motion";
import "../../../styles/scrollbar.css";

const paperSummaryData = {
  id: 1,
  author: "Mortz",
  year: "2020",
  title:
    "Evaluation of in vitro macrophage differentiation during space flight.",
  tags: [
    "Risk factors",
    "Proteomics",
    "Systems biology",
    "Mocular Biology",
    "Transcriptomics",
  ],
  summary:
    "Lorem ipsum dolor sit amet consectetur. Lorem ultrices sed ullamcorper pellentesque ac mattis etiam. Risus aliquam quisque non scelerisque in vivamus enim. Sollicitudin dui morbi interdum mauris egestas phasellus tellus. In donec nulla euismod facilisi. Eu massa tristique eget ornare consequat sit. Nec est at aliquam euismod. Consequat pretium sociis sagittis odio posuere. Risus vulputate tellus dictumst adipiscing habitasse. Dui lectus orci in tincidunt. Eget neque cum risus id. Eu vel maecenas egestas amet mattis sed morbi. Proin sed viverra id mauris scelerisque porttitor id elementum elementum. Arcu tempus nulla amet sit non. Nisl mauris egestas duis odio nunc sed tortor eget. Tellus vitae magna id sit odio faucibus ipsum pellentesque. Non leo et risus diam eget. In morbi libero at arcu integer dui lectus nulla augue. Elementum mi egestas orci orci nec suscipit ac. Nisi pharetra a sit neque at purus mauris urna.",
};

const PaperDiscoverSummary = () => {
  const { showPaperSummary, setShowPaperSummary } = useSummaryPageStore();

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4.39705 4.55379L4.46967 4.46967C4.73594 4.2034 5.1526 4.1792 5.44621 4.39705L5.53033 4.46967L12 10.939L18.4697 4.46967C18.7626 4.17678 19.2374 4.17678 19.5303 4.46967C19.8232 4.76256 19.8232 5.23744 19.5303 5.53033L13.061 12L19.5303 18.4697C19.7966 18.7359 19.8208 19.1526 19.6029 19.4462L19.5303 19.5303C19.2641 19.7966 18.8474 19.8208 18.5538 19.6029L18.4697 19.5303L12 13.061L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303C4.17678 19.2374 4.17678 18.7626 4.46967 18.4697L10.939 12L4.46967 5.53033C4.2034 5.26406 4.1792 4.8474 4.39705 4.55379L4.46967 4.46967L4.39705 4.55379Z"
              fill="#04071E"
            />
          </svg>
        </button>

        <div className="gap-sm flex w-full flex-col">
          <p className="text-ui-sm-m text-gray-500">
            {paperSummaryData.author}, {paperSummaryData.year}
          </p>
          <p className="font-poppins text-[22px] leading-[150%] font-[600] text-gray-700">
            {paperSummaryData.title}
          </p>
        </div>
        {/* tags */}
        <div className="gap-md flex flex-wrap">
          {paperSummaryData.tags.map((tag) => (
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
            {paperSummaryData.summary}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperDiscoverSummary;
