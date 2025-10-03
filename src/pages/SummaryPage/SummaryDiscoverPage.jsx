import React, { useRef } from "react";
import { motion } from "framer-motion";
import TableOfContents from "./components/TableOfContents";
import PaperDiscoverSummary from "./components/PaperDiscoverSummary";
import PaperDiscoverCard from "./components/PaperDiscoverCard";
import useSummaryPageStore from "../../store/useSummaryPageStore";
import useScrollSpy from "../../hooks/useScrollSpy";
import { useOutletContext } from "react-router";
import useBreakpointStore from "../../store/useBreakpointStore";

const SummaryDiscoverPage = () => {
  const data = useOutletContext().discoverData;

  const overviewRef = useRef(null);
  const whyMattersRef = useRef(null);
  const relatedPapersRef = useRef(null);

  const sectionIds = ["overview", "why-matters", "related-papers"];
  const { showPaperSummary } = useSummaryPageStore();
  const { breakpoints } = useBreakpointStore();

  const activeSection = useScrollSpy(sectionIds);

  const scrollToSection = (sectionId) => {
    const refs = {
      overview: overviewRef,
      "why-matters": whyMattersRef,
      "related-papers": relatedPapersRef,
    };

    const targetRef = refs[sectionId];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const sections = [
    {
      id: 1,
      content: "Overview",
      sectionId: "overview",
    },
    {
      id: 2,
      content: "Why this matters",
      sectionId: "why-matters",
    },
    {
      id: 3,
      content: "Related papers",
      sectionId: "related-papers",
    },
  ];

  const getAnimationValues = () => {
    if (breakpoints.is3xl) {
      return {
        x: showPaperSummary ? -30 : 300,
      };
    } else {
      return {
        x: showPaperSummary ? -200 : 120,
      };
    }
  };

  return (
    <div className="w-full">
      {/* Content */}
      <motion.div
        className="gap-4xl hide-horizontal-scrollbar relative z-10 flex items-start"
        animate={{
          ...getAnimationValues(),
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
      >
        <TableOfContents
          onSectionClick={scrollToSection}
          activeSection={activeSection}
          sections={sections}
        />
        {/* text content */}
        <div className="gap-4xl flex w-[628px] flex-shrink-0 flex-col">
          <div
            ref={overviewRef}
            id="overview"
            className="gap-4xl py-3xl flex flex-col items-center"
          >
            {/* title */}
            <h2 className="text-c-heading-xl-sb">{data.title}</h2>

            {/* hero image */}
            {data.heroImage && (
              <div className="w-full">
                <img
                  src={data.heroImage.src}
                  alt={data.heroImage.alt}
                  className="h-auto w-full rounded-lg object-cover"
                />
              </div>
            )}

            {/* summary content */}
            <div className="gap-xl flex flex-col">
              {data.sections.map((section) => (
                <div key={section.title} className="gap-lg flex flex-col">
                  <h3 className="text-c-heading-md-sb">{section.title}</h3>
                  {section.contentBlocks.map((contentBlock, index) => (
                    <div key={index} className="gap-lg flex flex-col">
                      <p className="text-c-body-lg-r">
                        <p className="text-c-body-lg-r">{contentBlock.text}</p>
                      </p>
                      {/* paragraph image */}
                      {contentBlock.image && (
                        <div className="py-xl flex flex-col items-center">
                          <img
                            src={contentBlock.image.src}
                            alt={contentBlock.image.alt}
                            className="h-auto w-3/4 rounded-lg object-cover"
                          />
                          <p className="text-c-body-sm mt-2 text-center text-gray-600 italic">
                            {contentBlock.image.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* why this matters */}
          <div
            ref={whyMattersRef}
            id="why-matters"
            className="p-2xl gap-xl flex flex-col rounded-xl bg-gray-50"
          >
            <h3 className="text-c-heading-md-sb">Why this matters</h3>
            {data.importance.map((importance) => (
              <p key={importance} className="text-c-body-lg-r">
                {importance}
              </p>
            ))}
          </div>

          {/* related papers */}
          <div
            ref={relatedPapersRef}
            id="related-papers"
            className="space-y-xl"
          >
            <h3 className="text-c-heading-md-sb">
              Most relevant investigations
            </h3>
            <div className="gap-lg flex flex-col">
              {data.relatedPapers.map((paper) => (
                <PaperDiscoverCard key={paper.id} paper={paper} />
              ))}
            </div>
          </div>
        </div>
        <PaperDiscoverSummary />
      </motion.div>
    </div>
  );
};

export default SummaryDiscoverPage;
