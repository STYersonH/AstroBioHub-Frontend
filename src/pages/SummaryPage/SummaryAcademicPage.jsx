import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import TableOfContents from "./components/TableOfContents";
import useSummaryPageStore from "../../store/useSummaryPageStore";
import useScrollSpy from "../../hooks/useScrollSpy";
import { useOutletContext, useNavigate } from "react-router";
import ResultBullet from "./components/ResultBullet";
import GapBullet from "./components/GapBullet";
import PaperAcademicCard from "./components/PaperAcademicCard";
import PaperAcademicSummary from "./components/PaperAcademicSummary";
import HighligthedText from "./components/HighligthedText";
import { cn } from "../../utils/cn";
import useAppStore from "../../store/useAppStore";
import ListOfRelatedPapers from "./components/ListOfRelatedPapers";
import { GraphIcon } from "../../components/icons/Icons";
import useBreakpointStore from "../../store/useBreakpointStore";

const SummaryAcademicPage = () => {
  const context = useOutletContext();
  const data = context?.academicData;
  const navigate = useNavigate();
  // in the academic page
  const overviewRef = useRef(null);
  const relevantResultsRef = useRef(null);
  const nextStepsRef = useRef(null);
  // Dynamic refs for subsections
  const subsectionRefs = useRef({});

  const { breakpoints } = useBreakpointStore();
  const { showPaperSummary, setShowPaperSummary } = useSummaryPageStore();
  const { searchQuery } = useAppStore();

  // Function to get or create a ref for a subsection
  const getSubsectionRef = (subsectionId) => {
    if (!subsectionRefs.current[subsectionId]) {
      subsectionRefs.current[subsectionId] = { current: null };
    }
    return subsectionRefs.current[subsectionId];
  };

  const [searchQueryModified, setSearchQueryModified] = useState(searchQuery);
  const [sectionIds, setSectionIds] = useState([
    "overview",
    "relevant-results",
    "next-steps",
  ]);
  const [sections, setSections] = useState([
    {
      id: 1,
      content: "Overview",
      sectionId: "overview",
      subsections: [],
    },
    {
      id: 2,
      content: "Relevant Results and Findings",
      sectionId: "relevant-results",
    },
    {
      id: 3,
      content: "Research Gaps & Future Directions",
      sectionId: "next-steps",
    },
  ]);

  const [subSections, setSubSections] = useState([]);

  const getAnimationValues = () => {
    if (breakpoints.is3xl) {
      return {
        x: showPaperSummary ? 20 : 380,
      };
    } else {
      return {
        x: showPaperSummary ? -20 : 315,
      };
    }
  };

  // restart the summary box
  useEffect(() => {
    setShowPaperSummary(false);
  }, []);

  // effect to update subSections
  useEffect(() => {
    if (data?.sections) {
      const subsections = [];
      const subsectionIds = [];
      data.sections.forEach((section) => {
        if (section?.title) {
          subsections.push(section?.title);
          subsectionIds?.push(section?.title.toLowerCase());
        }
      });
      setSubSections(subsections);
      setSectionIds([...sectionIds, ...subsectionIds]);
    }
  }, [data]);

  useEffect(() => {
    const queryModified = searchQuery.replace(/ /g, "+");
    setSearchQueryModified(queryModified);
  }, [searchQuery]);

  // update the subsections in the table of contents
  useEffect(() => {
    if (subSections.length > 0) {
      const subsectionRefObjects = subSections
        .map((subSection, index) => {
          if (!subSection) return null; // Skip if subSection is undefined/null

          const sectionId = subSection.toLowerCase();
          return {
            id: index + 1,
            content: subSection,
            sectionId: sectionId,
            ref: getSubsectionRef(sectionId), // Add ref to each subsection
          };
        })
        .filter(Boolean); // Remove null entries

      setSections((prevSections) => {
        const updatedSections = prevSections.map((section, index) =>
          index === 0
            ? { ...section, subsections: subsectionRefObjects }
            : section,
        );
        return updatedSections;
      });
    }
  }, [subSections]);

  const activeSection = useScrollSpy(sectionIds);

  const sectionRefs = {
    overview: overviewRef,
    "relevant-results": relevantResultsRef,
    "next-steps": nextStepsRef,
  };

  const scrollToSection = (sectionId) => {
    // Try main sections first
    const targetRef = sectionRefs[sectionId];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // Try subsections
    const subsectionRef = subsectionRefs.current[sectionId];
    if (subsectionRef?.current) {
      subsectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* title */}
      <h2 className="text-s-heading-xl-b">{data.title}</h2>

      {/* buttons and line */}
      <div className="pt-2xl 3xl:w-[1570px] flex w-[1370px] flex-col justify-center">
        {/* buttons */}
        <div className="px-xl flex w-full flex-row justify-between">
          <div className="gap-sm flex flex-row">
            <div className="px-2xl py-md rounded-t-sm border border-b-0 border-gray-100 bg-gray-50">
              Topic Analysis
            </div>
            <a
              href={`https://pmc.ncbi.nlm.nih.gov/search/?term=${searchQueryModified}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2xl mb-sm flex cursor-pointer items-center justify-center rounded-sm transition-all duration-300 hover:bg-gray-50"
            >
              Paper Search
            </a>
          </div>

          <div
            className="px-2xl mb-sm gap-md flex cursor-pointer flex-row items-center rounded-sm border border-gray-100 transition-all duration-300 hover:bg-gray-50"
            onClick={() => navigate("/knowledge-graph")}
          >
            <GraphIcon />
            <p>Knowledge Graph</p>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-100"></div>
      </div>

      {/* Content */}
      <motion.div
        className="gap-xl 3xl:gap-4xl hide-horizontal-scrollbar relative z-10 flex items-start"
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
        <div
          className={cn(
            "gap-4xl 3xl:w-[768px] flex w-[668px] shrink-0 flex-col",
            // showPaperSummary ? "w-[555px]" : "w-[40%]",
          )}
        >
          <div
            id="overview"
            className="gap-4xl py-3xl flex flex-col items-center"
          >
            {/* summary content */}
            <div className="gap-xl flex flex-col" ref={overviewRef}>
              {data.sections?.map((section, idSection) => (
                <div key={idSection} className="gap-xl flex flex-col">
                  {section?.title && (
                    <h3
                      className="text-s-heading-sm-b"
                      id={section.title.toLowerCase()}
                      ref={getSubsectionRef(section.title.toLowerCase())}
                    >
                      {section.title}
                    </h3>
                  )}
                  {section?.contentBlocks?.map(
                    (contentBlock, idContentBlock) => (
                      <div
                        key={idContentBlock}
                        className="gap-lg flex flex-col"
                      >
                        <p className="text-s-body-lg-r">
                          {contentBlock?.segments?.map((segment, idSegment) => (
                            <React.Fragment key={idSegment}>
                              {segment.type === "text" && (
                                <span>{segment.text}</span>
                              )}{" "}
                              {segment.type === "reference" && (
                                <HighligthedText
                                  segment={segment}
                                  listIntex={[
                                    idSection,
                                    idContentBlock,
                                    idSegment,
                                  ]}
                                />
                              )}{" "}
                            </React.Fragment>
                          ))}
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
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* relevant results */}
          <motion.div
            layout
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            ref={relevantResultsRef}
            id="relevant-results"
            className="p-2xl gap-xl flex flex-col rounded-xl bg-gray-50"
          >
            <h3 className="text-s-heading-sm-b">
              Relevant Results and Findings
            </h3>

            <div className="gap-xs flex flex-col">
              {data.relevantResults.map((relevantResult) => (
                <ResultBullet
                  title={relevantResult.title}
                  orderPaperReference={relevantResult.orderPaperReference}
                  segments={relevantResult.segments}
                />
              ))}
            </div>
          </motion.div>

          {/* gaps */}
          <div ref={nextStepsRef} id="next-steps" className="space-y-xl">
            <h3 className="text-s-heading-sm-b">
              Research Gaps & Future Directions
            </h3>
            <div className="flex flex-col">
              {data.researchGaps.map((nextStep) => (
                <GapBullet
                  key={nextStep.orderPaperReference}
                  orderPaperReference={nextStep.orderPaperReference}
                  title={nextStep.title}
                  nextSteps={nextStep.nextSteps}
                />
              ))}
            </div>
          </div>
        </div>

        {/* related papers */}
        <ListOfRelatedPapers className="pt-3xl" />

        {/* paper summary */}
        <PaperAcademicSummary className="pt-3xl" />
      </motion.div>
    </div>
  );
};

export default SummaryAcademicPage;
