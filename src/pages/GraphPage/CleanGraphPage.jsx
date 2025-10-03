import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import graphData from "../../assets/graph.json";

const CleanGraphPage = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Specify the dimensions of the chart.
    const width = 928;
    const height = 680;

    // Specify the color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = graphData.links.map((d) => ({ ...d }));
    const nodes = graphData.nodes.map((d) => ({ ...d }));

    console.log("nodes ->", nodes);
    console.log("links ->", links);

    // Create a simulation with several forces.
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id),
      )
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add a line for each link, and a circle for each node.
    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", (d) => color(d.group))
      .style("cursor", "pointer");

    node.append("title").text((d) => {
      // Hacer tooltips más cortos y útiles
      if (d.group === "Cited Works") {
        return `${d.id.substring(0, 50)}...\nGroup: ${d.group}\nCitations: ${d.citing_patents_count || "N/A"}`;
      } else {
        return `Patent: ${d.id}\nGroup: ${d.group}`;
      }
    });

    // Asegurar que los nodos estén al frente
    node.raise();

    // Add a drag behavior.
    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended),
    );

    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it's no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <div className="mx-auto w-full">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Clean D3.js Force-Directed Graph
          </h1>

          <div className="mb-6 rounded-lg bg-gray-100 p-4">
            <h2 className="mb-2 text-lg font-semibold">Graph Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Nodes:</span>{" "}
                {graphData.nodes.length}
              </div>
              <div>
                <span className="font-medium">Links:</span>{" "}
                {graphData.links.length}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <svg ref={svgRef} className="h-full w-full"></svg>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <h3 className="mb-2 font-semibold">Features:</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>Drag nodes to move them around</li>
              <li>Force simulation with natural physics</li>
              <li>
                Color-coded nodes by group (Cited Works vs Citing Patents)
              </li>
              <li>Link thickness based on connection strength</li>
              <li>Responsive design with proper viewBox</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanGraphPage;
