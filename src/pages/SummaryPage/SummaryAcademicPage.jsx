import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import TableOfContents from "./components/TableOfContents";
import useSummaryPageStore from "../../store/useSummaryPageStore";
import useScrollSpy from "../../hooks/useScrollSpy";
import { useOutletContext } from "react-router";
import ResultBullet from "./components/ResultBullet";
import GapBullet from "./components/GapBullet";
import PaperAcademicCard from "./components/PaperAcademicCard";
import PaperAcademicSummary from "./components/PaperAcademicSummary";
import HighligthedText from "./components/HighligthedText";
import { cn } from "../../utils/cn";
import useAppStore from "../../store/useAppStore";

const dataRelatedPapers = [
  {
    id: 1,
    orderPaperReference: 1,
    authors: [
      "Afshin Smith",
      "Kaushik Chakravarty",
      "Manu Nambiar",
      "Jana Behr",
      "Erika O'Brien",
      "Patricio Cuenca",
      "Lucas Pagani",
      "Evan Gehman",
      "Nick Hensley",
      "Vikas Chawla",
    ],
    year: "2020",
    title:
      "Genomic and functional characterization of Enterococcus faecalis isolates recovered from the International Space Station and their potential for pathogenicity",
    publicationPlace: "Journal of Bone and Mineral Research",
    typeResearch: "Theoretical",
    highlights: [
      "1 Metastases mostly disseminate late from primary breast tumors, keeping most drivers",
      "1 Drivers at relapse sample from a wider range of cancer genes than in primary tumors",
      "1 Mutations in SWI-SNF complex and inactivated JAK-STAT signaling enriched at relapse",
      "1 Mutational processes similar in primary and relapse; radiotherapy can damage genome",
    ],
    abstract:
      "Lorem ipsum dolor sit amet consectetur. Lorem ultrices sed ullamcorper pellentesque ac mattis etiam. Risus aliquam quisque non scelerisque in vivamus enim. Sollicitudin dui morbi interdum mauris egestas phasellus tellus. In donec nulla euismod facilisi. Eu massa tristique eget ornare consequat sit. Nec est at aliquam euismod. Consequat pretium sociis sagittis odio posuere. Risus vulputate tellus dictumst adipiscing habitasse. Dui lectus orci in tincidunt. Eget neque cum risus id. Eu vel maecenas egestas amet mattis sed morbi. Proin sed viverra id mauris scelerisque porttitor id elementum elementum. Arcu tempus nulla amet sit non. Nisl mauris egestas duis odio nunc sed tortor eget. Tellus vitae magna id sit odio faucibus ipsum pellentesque. Non leo et risus diam eget. In morbi libero at arcu integer dui lectus nulla augue. Elementum mi egestas orci orci nec suscipit ac. Nisi pharetra a sit neque at purus mauris urna.",
    results:
      "Lorem ipsum dolor sit amet consectetur. Amet nullam velit ullamcorper arcu hac. Elementum bibendum risus eget tellus dui facilisis volutpat lectus viverra. Odio metus mi eget ultricies. Mus elementum ornare parturient tellus aliquam porttitor. Lobortis id mauris fusce dui enim urna tincidunt ultricies. Sed ac porttitor sed cras fringilla eu. Rhoncus eget enim aliquet ultricies volutpat ipsum. Id massa id quam ut ut proin augue aliquet nisi. Aliquet fusce massa eu imperdiet odio elementum elit felis.",
  },
  {
    id: 2,
    orderPaperReference: 2,
    authors: [
      "Jodn Forrier",
      "Andre Borm",
      "Adam Lockhart",
      "Werner Meier",
      "Robertson",
    ],
    year: "2018",
    title:
      "Low-dose beta radiation alters bone structure and strength in mice.",
    publicationPlace: "Nature Communications",
    typeResearch: "Practical",
    highlights: [
      "2 Metastases mostly disseminate late from primary breast tumors, keeping most drivers",
      "2 Drivers at relapse sample from a wider range of cancer genes than in primary tumors",
      "2 Mutations in SWI-SNF complex and inactivated JAK-STAT signaling enriched at relapse",
      "2 Mutational processes similar in primary and relapse; radiotherapy can damage genome",
    ],
    abstract:
      "Lorem ipsum dolor sit amet consectetur. Lorem ultrices sed ullamcorper pellentesque ac mattis etiam. Risus aliquam quisque non scelerisque in vivamus enim. Sollicitudin dui morbi interdum mauris egestas phasellus tellus. In donec nulla euismod facilisi. Eu massa tristique eget ornare consequat sit. Nec est at aliquam euismod. Consequat pretium sociis sagittis odio posuere. Risus vulputate tellus dictumst adipiscing habitasse. Dui lectus orci in tincidunt. Eget neque cum risus id. Eu vel maecenas egestas amet mattis sed morbi. Proin sed viverra id mauris scelerisque porttitor id elementum elementum. Arcu tempus nulla amet sit non. Nisl mauris egestas duis odio nunc sed tortor eget. Tellus vitae magna id sit odio faucibus ipsum pellentesque. Non leo et risus diam eget. In morbi libero at arcu integer dui lectus nulla augue. Elementum mi egestas orci orci nec suscipit ac. Nisi pharetra a sit neque at purus mauris urna.",
    results:
      "Lorem ipsum dolor sit amet consectetur. Amet nullam velit ullamcorper arcu hac. Elementum bibendum risus eget tellus dui facilisis volutpat lectus viverra. Odio metus mi eget ultricies. Mus elementum ornare parturient tellus aliquam porttitor. Lobortis id mauris fusce dui enim urna tincidunt ultricies. Sed ac porttitor sed cras fringilla eu. Rhoncus eget enim aliquet ultricies volutpat ipsum. Id massa id quam ut ut proin augue aliquet nisi. Aliquet fusce massa eu imperdiet odio elementum elit felis.",
  },
  {
    id: 3,
    orderPaperReference: 3,
    authors: [
      "Mortz",
      "Lucas Pagani",
      "Evan Gehman",
      "Nick Hensley",
      "Vikas Chawla",
    ],
    year: "2017",
    title:
      "Understanding macrophage differentiation during space flight: The importance of ground-based experiments before space flight.",
    publicationPlace: "Nature Communications",
    typeResearch: "Theoretical",
    highlights: [
      "3 Metastases mostly disseminate late from primary breast tumors, keeping most drivers",
      "3 Drivers at relapse sample from a wider range of cancer genes than in primary tumors",
      "3 Mutations in SWI-SNF complex and inactivated JAK-STAT signaling enriched at relapse",
      "3 Mutational processes similar in primary and relapse; radiotherapy can damage genome",
    ],
    abstract:
      "Lorem ipsum dolor sit amet consectetur. Lorem ultrices sed ullamcorper pellentesque ac mattis etiam. Risus aliquam quisque non scelerisque in vivamus enim. Sollicitudin dui morbi interdum mauris egestas phasellus tellus. In donec nulla euismod facilisi. Eu massa tristique eget ornare consequat sit. Nec est at aliquam euismod. Consequat pretium sociis sagittis odio posuere. Risus vulputate tellus dictumst adipiscing habitasse. Dui lectus orci in tincidunt. Eget neque cum risus id. Eu vel maecenas egestas amet mattis sed morbi. Proin sed viverra id mauris scelerisque porttitor id elementum elementum. Arcu tempus nulla amet sit non. Nisl mauris egestas duis odio nunc sed tortor eget. Tellus vitae magna id sit odio faucibus ipsum pellentesque. Non leo et risus diam eget. In morbi libero at arcu integer dui lectus nulla augue. Elementum mi egestas orci orci nec suscipit ac. Nisi pharetra a sit neque at purus mauris urna.",
    results:
      "Lorem ipsum dolor sit amet consectetur. Amet nullam velit ullamcorper arcu hac. Elementum bibendum risus eget tellus dui facilisis volutpat lectus viverra. Odio metus mi eget ultricies. Mus elementum ornare parturient tellus aliquam porttitor. Lobortis id mauris fusce dui enim urna tincidunt ultricies. Sed ac porttitor sed cras fringilla eu. Rhoncus eget enim aliquet ultricies volutpat ipsum. Id massa id quam ut ut proin augue aliquet nisi. Aliquet fusce massa eu imperdiet odio elementum elit felis.",
  },
  {
    id: 4,
    orderPaperReference: 4,
    authors: [
      "Matt Torres",
      "Matteo Bulfaro",
      "Martina Pavone",
      "Mauro Bistarelli",
      "Paolo Rossi",
      "Giovanni De Gioia",
      "Marco Zappino",
    ],
    year: "2017",
    title:
      "Stress exposure during spaceflight affects bone mineral density in the first year after returning to Earth.",
    publicationPlace: "Nature Communications",
    typeResearch: "Practical",
    highlights: [
      "4 Metastases mostly disseminate late from primary breast tumors, keeping most drivers",
      "4 Drivers at relapse sample from a wider range of cancer genes than in primary tumors",
      "4 Mutations in SWI-SNF complex and inactivated JAK-STAT signaling enriched at relapse",
      "4 Mutational processes similar in primary and relapse; radiotherapy can damage genome",
    ],
    abstract:
      "Lorem ipsum dolor sit amet consectetur. Lorem ultrices sed ullamcorper pellentesque ac mattis etiam. Risus aliquam quisque non scelerisque in vivamus enim. Sollicitudin dui morbi interdum mauris egestas phasellus tellus. In donec nulla euismod facilisi. Eu massa tristique eget ornare consequat sit. Nec est at aliquam euismod. Consequat pretium sociis sagittis odio posuere. Risus vulputate tellus dictumst adipiscing habitasse. Dui lectus orci in tincidunt. Eget neque cum risus id. Eu vel maecenas egestas amet mattis sed morbi. Proin sed viverra id mauris scelerisque porttitor id elementum elementum. Arcu tempus nulla amet sit non. Nisl mauris egestas duis odio nunc sed tortor eget. Tellus vitae magna id sit odio faucibus ipsum pellentesque. Non leo et risus diam eget. In morbi libero at arcu integer dui lectus nulla augue. Elementum mi egestas orci orci nec suscipit ac. Nisi pharetra a sit neque at purus mauris urna.",
    results:
      "Lorem ipsum dolor sit amet consectetur. Amet nullam velit ullamcorper arcu hac. Elementum bibendum risus eget tellus dui facilisis volutpat lectus viverra. Odio metus mi eget ultricies. Mus elementum ornare parturient tellus aliquam porttitor. Lobortis id mauris fusce dui enim urna tincidunt ultricies. Sed ac porttitor sed cras fringilla eu. Rhoncus eget enim aliquet ultricies volutpat ipsum. Id massa id quam ut ut proin augue aliquet nisi. Aliquet fusce massa eu imperdiet odio elementum elit felis.",
  },
  {
    id: 5,
    orderPaperReference: 5,
    authors: [
      "Ross Praga",
      "Miles Cohen",
      "Hernan Deras",
      "Sebastian Atzberger",
      "Daniel Meli",
    ],
    year: "2017",
    title:
      "High-altitude spaceflight alters bone mineral density in astronauts.",
    publicationPlace: "Space Medicine",
    typeResearch: "Practical",
    highlights: [
      "5 Metastases mostly disseminate late from primary breast tumors, keeping most drivers",
      "5 Drivers at relapse sample from a wider range of cancer genes than in primary tumors",
      "5 Mutations in SWI-SNF complex and inactivated JAK-STAT signaling enriched at relapse",
      "5 Mutational processes similar in primary and relapse; radiotherapy can damage genome",
    ],
    abstract:
      "Lorem ipsum dolor sit amet consectetur. Lorem ultrices sed ullamcorper pellentesque ac mattis etiam. Risus aliquam quisque non scelerisque in vivamus enim. Sollicitudin dui morbi interdum mauris egestas phasellus tellus. In donec nulla euismod facilisi. Eu massa tristique eget ornare consequat sit. Nec est at aliquam euismod. Consequat pretium sociis sagittis odio posuere. Risus vulputate tellus dictumst adipiscing habitasse. Dui lectus orci in tincidunt. Eget neque cum risus id. Eu vel maecenas egestas amet mattis sed morbi. Proin sed viverra id mauris scelerisque porttitor id elementum elementum. Arcu tempus nulla amet sit non. Nisl mauris egestas duis odio nunc sed tortor eget. Tellus vitae magna id sit odio faucibus ipsum pellentesque. Non leo et risus diam eget. In morbi libero at arcu integer dui lectus nulla augue. Elementum mi egestas orci orci nec suscipit ac. Nisi pharetra a sit neque at purus mauris urna.",

    results:
      "Lorem ipsum dolor sit amet consectetur. Amet nullam velit ullamcorper arcu hac. Elementum bibendum risus eget tellus dui facilisis volutpat lectus viverra. Odio metus mi eget ultricies. Mus elementum ornare parturient tellus aliquam porttitor. Lobortis id mauris fusce dui enim urna tincidunt ultricies. Sed ac porttitor sed cras fringilla eu. Rhoncus eget enim aliquet ultricies volutpat ipsum. Id massa id quam ut ut proin augue aliquet nisi. Aliquet fusce massa eu imperdiet odio elementum elit felis.",
  },
];

const SummaryAcademicPage = () => {
  const data = useOutletContext().academicData;

  const overviewRef = useRef(null);
  const relevantResultsRef = useRef(null);
  const nextStepsRef = useRef(null);
  const papersContainerRef = useRef(null);

  const sectionIds = ["overview", "relevant-results", "next-steps"];
  const { showPaperSummary, numberCitationPaperSelected, showRelatedPapers } =
    useSummaryPageStore();
  const { setRelatedPapers } = useAppStore();

  useEffect(() => {
    setRelatedPapers(dataRelatedPapers);
  }, []);

  // Auto scroll to selected paper card
  useEffect(() => {
    if (numberCitationPaperSelected && papersContainerRef.current) {
      const selectedCard = papersContainerRef.current.querySelector(
        `[data-paper-reference="${numberCitationPaperSelected}"]`,
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
  }, [numberCitationPaperSelected]);

  const activeSection = useScrollSpy(sectionIds);
  const scrollToSection = (sectionId) => {
    const refs = {
      overview: overviewRef,
      "relevant-results": relevantResultsRef,
      "next-steps": nextStepsRef,
    };

    const targetRef = refs[sectionId];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex w-full justify-center">
      {/* Content */}
      <motion.div
        className="gap-xl hide-horizontal-scrollbar relative z-10 flex items-start"
        animate={{
          x: showPaperSummary ? -170 : 240,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
      >
        <TableOfContents
          onSectionClick={scrollToSection}
          activeSection={activeSection}
        />

        {/* text content */}
        <div
          className={cn(
            "gap-4xl flex shrink-0 flex-col",
            showPaperSummary ? "w-[555px]" : "w-[668px]",
          )}
        >
          <div
            ref={overviewRef}
            id="overview"
            className="gap-4xl py-3xl flex flex-col items-center"
          >
            {/* title */}
            <h2 className="text-s-heading-xl-b">{data.title}</h2>
            {/* summary content */}
            <div className="gap-xl flex flex-col">
              {data.sections.map((section, idSection) => (
                <div key={idSection} className="gap-xl flex flex-col">
                  <h3 className="text-s-heading-md-b">{section.title}</h3>
                  {section.contentBlocks.map((contentBlock, idContentBlock) => (
                    <div key={idContentBlock} className="gap-lg flex flex-col">
                      {/* Render sections by type */}
                      {contentBlock.segments.map((segment, idSegment) => (
                        <div key={idSegment} className="gap-sm flex flex-col">
                          {segment.type === "text" && (
                            <p className="text-s-body-lg-r">{segment.text}</p>
                          )}
                          {segment.type === "reference" && (
                            <HighligthedText
                              segment={segment}
                              listIntex={[idSection, idContentBlock, idSegment]}
                            />
                          )}
                        </div>
                      ))}

                      {/* paragraph image */}
                      {contentBlock.image && (
                        <div className="flex flex-col items-center">
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
            <h3 className="text-s-heading-md-b">
              Relevant Results and Findings
            </h3>

            {data.relevantResults.map((relevantResult) => (
              <ResultBullet
                title={relevantResult.title}
                orderPaperReference={relevantResult.orderPaperReference}
                segments={relevantResult.segments}
              />
            ))}
          </motion.div>

          {/* gaps */}
          <div ref={nextStepsRef} id="next-steps" className="space-y-xl">
            <h3 className="text-s-heading-md-b">
              Research Gaps & Future Directions
            </h3>
            <div className="flex flex-col">
              {data.researchGaps.map((nextStep) => (
                <GapBullet
                  key={nextStep.orderPaperReference}
                  title={
                    nextStep.title + " [" + nextStep.orderPaperReference + "]"
                  }
                  nextSteps={nextStep.nextSteps}
                />
              ))}
            </div>
          </div>

          {/* References section */}
          {data.references && (
            <div className="space-y-xl">
              <h3 className="text-s-heading-md-b">References</h3>
              <div className="space-y-md">
                {data.references.map((reference) => (
                  <div key={reference.id} className="gap-sm flex">
                    <span className="text-s-body-sm min-w-[24px] font-medium text-blue-600">
                      [{reference.id}]
                    </span>
                    <div className="text-s-body-sm">
                      <p className="font-medium">
                        {reference.author} ({reference.year})
                      </p>
                      <p className="italic">{reference.title}</p>
                      <p className="text-gray-600">
                        {reference.journal}, {reference.volume},{" "}
                        {reference.pages}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* related papers */}
        {showRelatedPapers && (
          <div className="pt-3xl sticky top-0 h-[644px] w-[322px]">
            <div
              ref={papersContainerRef}
              className="ultra-minimal-scrollbar gap-md flex h-full flex-col overflow-y-scroll"
            >
              {data.relatedPapers.map((paper) => (
                <PaperAcademicCard
                  key={paper.id}
                  dataPaper={paper}
                  data-paper-reference={paper.orderPaperReference}
                />
              ))}
            </div>
          </div>
        )}

        {/* paper summary */}
        <PaperAcademicSummary />
      </motion.div>
    </div>
  );
};

export default SummaryAcademicPage;
