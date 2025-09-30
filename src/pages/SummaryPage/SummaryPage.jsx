import React, { useRef } from "react";
import ModeSelector from "../../components/ModeSelector";
import SearchBar from "../../components/SearchBar";
import "../../styles/scrollbar.css";
import { Outlet } from "react-router";
import useAppStore from "../../store/useAppStore";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import Chat from "./components/Chat";

const data = {
  discoverData: {
    title: "Bone density loss",
    // Imagen principal que aparece después del título
    heroImage: {
      src: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      alt: "Astronaut in space with Earth in background",
      caption:
        "Astronauts experience significant bone density loss during extended space missions",
    },
    sections: [
      {
        contentBlocks: [
          {
            text: "Lorem ipsum dolor sit amet consectetur. Lorem tempus nulla amet sit non. Nisl mauris egestas duis odio nunc sed tortor eget. Tellus vitae magna id sit odio faucibus ipsum pellentesque. Non leo et risus diam eget. In morbi libero at arcu integer dui lectus nulla augue. Elementum mi egestas orci orci nec suscipit ac. Nisi pharetra a sit neque at purus mauris urna.",
            // Imagen que aparece después de este párrafo
            image: {
              src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
              alt: "Medical X-ray showing bone structure",
              caption:
                "Comparison of bone density loss between Earth and space environments",
            },
          },
          {
            text: "Lorem arcu. Ipsum ullamcorper massa quam hendrerit iaculis nibh odio. Consectetur ac facilisi diam cursus ac pulvinar ac. Sed in egestas est euismod in sit volutpat. Est cursus pellentesque tempor consequat et egestas justo vitae tellus.",
            // Este párrafo no tiene imagen
          },
        ],
      },
      {
        title: "The importance of bone density loss",
        contentBlocks: [
          {
            type: "text",
            text: "Lorem ipsum dolor sit amet consectetur. Ullamcorper molestie donec arcu pulvinar tellus ut interdum. Massa sit eleifend pellentesque vitae nisl. Nisi diam lacus venenatis in pellentesque fusce varius at in. Augue et pharetra placerat morbi ut dui purus amet augue. Fermentum nisl nisl cursus enim. Augue in eget odio purus diam nunc est nulla. Dignissim netus consectetur nunc diam eget nisl. ",
          },
        ],
      },
    ],
    importance: [
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper molestie donec arcu pulvinar tellus ut interdum. Massa sit eleifend pellentesque vitae nisl. Nisi diam lacus venenatis in pellentesque fusce varius at in. Augue et pharetra placerat morbi ut dui purus amet augue. Fermentum nisl nisl cursus enim. Augue in eget odio purus diam nunc est nulla. Dignissim netus consectetur nunc diam eget nisl. ",
      "Lorem ipsum dolor sit amet consectetur. Ullamcorper molestie donec arcu pulvinar tellus ut interdum. Massa sit eleifend pellentesque vitae nisl. Nisi diam lacus venenatis in pellentesque fusce varius at in. Augue et pharetra placerat morbi ut dui purus amet augue. Fermentum nisl nisl cursus enim. Augue in eget odio purus diam nunc est nulla. Dignissim netus consectetur nunc diam eget nisl. ",
    ],
    relatedPapers: [
      {
        id: 1,
        mainResearcher: "Mortz",
        year: "2020",
        title:
          "Evaluation of in vitro macrophage differentiation during space flight.",
      },
      {
        id: 2,
        mainResearcher: "Le",
        year: "2018",
        title:
          "Genomic and functional characterization of Enterococcus faecalis isolates recovered from the International Space Station and their potential for pathogenicity.",
      },
      {
        id: 3,
        mainResearcher: "Mortz",
        year: "2017",
        title:
          "Understanding macrophage differentiation during space flight: The importance of ground-based experiments before space flight.",
      },
    ],
  },
  academicData: {
    title: "Bone density loss",
    sections: [
      {
        contentBlocks: [
          {
            segments: [
              {
                type: "text",
                text: "Countermeasures have been developed to mitigate bone loss, including resistive exercise equipment and pharmacological interventions .",
              },
              {
                type: "reference",
                text: "However, current countermeasures are only partially effective, with astronauts still experiencing significant bone loss despite intensive exercise protocols .",
                citations: [1, 2], // [1, 2] son el orden de las referencias
              },
            ],
            // Este segmento no tiene imagen
          },
          {
            segments: [
              {
                type: "text",
                text: "The mechanisms behind this bone loss involve multiple factors including reduced mechanical loading, altered calcium metabolism, and changes in hormonal regulation.",
              },
            ],
          },
        ],
      },
      {
        title: "The importance of bone density loss",
        contentBlocks: [
          {
            segments: [
              {
                type: "text",
                text: "Astronauts experience significant bone density loss during extended space missions, with studies showing up to 1-2% bone loss per month in weight-bearing bones.",
              },
              {
                type: "reference",
                text: "This bone loss occurs primarily in the lumbar spine and hip regions, where mechanical loading is reduced in microgravity environments.",
                citations: [3],
              },
              {
                type: "text",
                text: "The mechanisms behind this bone loss involve multiple factors including reduced mechanical loading, altered calcium metabolism, and changes in hormonal regulation.",
              },
            ],
            // Imagen que aparece después de este segmento
            image: {
              src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
              alt: "Medical X-ray showing bone structure",
              caption:
                "Comparison of bone density loss between Earth and space environments",
            },
          },
          {
            segments: [
              {
                type: "text",
                text: "Countermeasures have been developed to mitigate bone loss, including resistive exercise equipment and pharmacological interventions .",
              },
              {
                type: "reference",
                text: "However, current countermeasures are only partially effective, with astronauts still experiencing significant bone loss despite intensive exercise protocols .",
                citations: [4, 5],
              },
            ],
            // Este segmento no tiene imagen
          },
        ],
      },
      {
        title: "the truth about bone density loss",
        contentBlocks: [
          {
            segments: [
              {
                type: "text",
                text: "The truth about bone density loss is that it is a complex issue that requires a multi-disciplinary approach to understand and address.",
              },
              {
                type: "text",
                text: "The mechanisms behind this bone loss involve multiple factors including reduced mechanical loading, altered calcium metabolism, and changes in hormonal regulation.",
              },
              {
                type: "reference",
                text: "This bone loss occurs primarily in the lumbar spine and hip regions, where mechanical loading is reduced in microgravity environments.",
                citations: [3],
              },
            ],
          },
        ],
      },
    ],

    relevantResults: [
      {
        title: "Bone density decreases 10–15% after 6 months in orbit",
        orderPaperReference: 1,
        segments: [
          {
            text: "Astronauts experience significant bone density loss during extended space missions, with studies showing up to 1-2% bone loss per month in weight-bearing bones.",
            // Imagen que aparece después de este párrafo
            image: {
              src: "https://images.unsplash.com/photo-1543320569-693a209c644a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
              alt: "Astronaut in space with Earth in background",
              caption:
                "Astronauts experience significant bone density loss during extended space missions",
            },
          },
          {
            text: "The mechanisms behind this bone loss involve multiple factors including reduced mechanical loading, altered calcium metabolism, and changes in hormonal regulation.",
            // Este segmento no tiene imagen
          },
          {
            text: "The mechanisms behind this bone loss involve multiple factors including reduced mechanical loading, altered calcium metabolism, and changes in hormonal regulation. Countermeasures have been developed to mitigate bone loss, including resistive exercise equipment and pharmacological interventions. However, current countermeasures are only partially effective, with astronauts still experiencing significant bone loss despite intensive exercise protocols.",
            image: {
              src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
              alt: "Medical X-ray showing bone structure",
              caption:
                "Comparison of bone density loss between Earth and space environments",
            },
          },
        ],
      },
      {
        title:
          "The bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
        orderPaperReference: 2,
        segments: [
          {
            text: "The bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
          },
          {
            text: " This study found that the bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
            image: {
              src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
              alt: "Medical X-ray showing bone structure",
              caption:
                "Comparison of bone density loss between Earth and space environments",
            },
          },
          {
            text: " This study found that the bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
            image: {
              src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
              alt: "Medical X-ray showing bone structure",
              caption:
                "Comparison of bone density loss between Earth and space environments",
            },
          },
          {
            text: " This study found that the bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
          },
        ],
      },
      {
        title:
          "The bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
        orderPaperReference: 3,
        segments: [
          {
            text: "The bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
          },
          {
            text: " This study found that the bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
            image: {
              src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
              alt: "Medical X-ray showing bone structure",
              caption:
                "Comparison of bone density loss between Earth and space environments",
            },
          },
          {
            text: " This study found that the bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
            image: {
              src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
              alt: "Medical X-ray showing bone structure",
              caption:
                "Comparison of bone density loss between Earth and space environments",
            },
          },
          {
            text: " This study found that the bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
          },
        ],
      },
      {
        title:
          "The bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
        orderPaperReference: 4,
        segments: [
          {
            text: "The bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
          },
        ],
      },
      {
        title:
          "The bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
        orderPaperReference: 5,
        segments: [
          {
            text: "The bodies of astronauts in orbit are very similar to the bodies of people on Earth.",
          },
        ],
      },
    ],

    researchGaps: [
      {
        title: "Small astronaut cohorts limit statistical power.",
        orderPaperReference: 1,
        nextSteps: [
          "Extend follow-up studies beyond 2 years to track recovery trajectories.",
          "Investigate bone microarchitecture changes using high-resolution imaging.",
          "Compare recovery patterns between astronauts and Earth-based analogs (e.g., bed rest).",
        ],
      },
      {
        title: "Long-term bone loss may be underestimated.",
        orderPaperReference: 2,
        nextSteps: [
          "Enhance recovery assessment protocols with additional imaging modalities.",
          "Explore potential interventions to mitigate bone loss in microgravity.",
          "Develop predictive models to estimate bone density trajectories in space.",
        ],
      },
      {
        title: "Microgravity conditions may influence bone health.",
        orderPaperReference: 3,
        nextSteps: [
          "Investigate the role of gravity-dependent mechanical forces on bone health.",
          "Study the impact of microgravity on bone mineralization processes.",
          "Explore potential therapeutic strategies to enhance bone density in space.",
        ],
      },
      {
        title: "Small astronaut cohorts limit statistical power.",
        orderPaperReference: 4,
        nextSteps: [
          "Extend follow-up studies beyond 2 years to track recovery trajectories.",
          "Investigate bone microarchitecture changes using high-resolution imaging.",
          "Compare recovery patterns between astronauts and Earth-based analogs (e.g., bed rest).",
        ],
      },
      {
        title: "Long-term bone loss may be underestimated.",
        orderPaperReference: 5,
        nextSteps: [
          "Enhance recovery assessment protocols with additional imaging modalities.",
          "Explore potential interventions to mitigate bone loss in microgravity.",
          "Develop predictive models to estimate bone density trajectories in space.",
        ],
      },
      {
        title: "Microgravity conditions may influence bone health.",
        orderPaperReference: 6,
        nextSteps: [
          "Investigate the role of gravity-dependent mechanical forces on bone health.",
          "Study the impact of microgravity on bone mineralization processes.",
          "Explore potential therapeutic strategies to enhance bone density in space.",
        ],
      },
      {
        title: "Small astronaut cohorts limit statistical power.",
        orderPaperReference: 7,
        nextSteps: [
          "Extend follow-up studies beyond 2 years to track recovery trajectories.",
          "Investigate bone microarchitecture changes using high-resolution imaging.",
          "Compare recovery patterns between astronauts and Earth-based analogs (e.g., bed rest).",
        ],
      },
      {
        title: "Long-term bone loss may be underestimated.",
        orderPaperReference: 8,
        nextSteps: [
          "Enhance recovery assessment protocols with additional imaging modalities.",
          "Explore potential interventions to mitigate bone loss in microgravity.",
          "Develop predictive models to estimate bone density trajectories in space.",
        ],
      },
      {
        title: "Microgravity conditions may influence bone health.",
        orderPaperReference: 9,
        nextSteps: [
          "Investigate the role of gravity-dependent mechanical forces on bone health.",
          "Study the impact of microgravity on bone mineralization processes.",
          "Explore potential therapeutic strategies to enhance bone density in space.",
        ],
      },
    ],

    // Related papers
    relatedPapers: [
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
          "High-altitude spaceflight alters bone mineral density in astronauts...",
        publicationPlace: "Space Medicine",
        typeResearch: "Practical",
      },
    ],
  },
};

const SummaryPage = () => {
  const { selectedMode } = useAppStore();

  return (
    <div className="py-6xl gap-4xl relative flex w-full flex-col items-center justify-center overflow-x-clip">
      {/* background */}
      <motion.div
        className="absolute top-0 h-[200px] w-full bg-white"
        animate={{
          background:
            selectedMode === "discover"
              ? "linear-gradient(180deg, #66FF9E 0%, #FFF 100%)"
              : "linear-gradient(180deg, #60A5FA 0%, #FFF 100%)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      ></motion.div>

      {/* header search */}
      <div className="gap-xl relative z-10 flex w-[628px] flex-col">
        <ModeSelector />
        <SearchBar />
      </div>

      <Outlet context={data} />

      {/* chat button */}
      <Chat />
    </div>
  );
};

export default SummaryPage;
