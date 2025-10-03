import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import graphData from "../../data/graph_papers.json";
import KnowledgeGraph from "./components/KnowledgeGraph";
import ListOfRelatedPapers from "../SummaryPage/components/ListOfRelatedPapers";
import PaperAcademicSummary from "../SummaryPage/components/PaperAcademicSummary";
import data from "../../data/academic_data_50_papers.json";

const KnowledgeGraphPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-row p-8">
      <div className="">
        {/* related papers */}
        <ListOfRelatedPapers relatedPapers={data.academicData.relatedPapers} />

        {/* paper summary */}
        {/* <PaperAcademicSummary /> */}
      </div>
      <div>
        <KnowledgeGraph />
      </div>
    </div>
  );
};

export default KnowledgeGraphPage;
