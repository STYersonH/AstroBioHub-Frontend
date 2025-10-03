import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import graphData from "../../../data/graph_papers.json";
import useSummaryPageStore from "../../../store/useSummaryPageStore";

const KnowledgeGraph = () => {
  const svgRef = useRef(null);
  const { selectedPaperCitationNumber, setSelectedPaperCitationNumber } =
    useSummaryPageStore();

  const getGraphElements = () => {
    const svg = d3.select(svgRef.current);
    const container = svg.select("g");
    const groups = container.selectAll("g");

    return {
      tooltipGroup: groups.nodes()[0] ? d3.select(groups.nodes()[0]) : null,
      linkGroup: groups.nodes()[1] ? d3.select(groups.nodes()[1]) : null,
      nodeGroup: groups.nodes()[2] ? d3.select(groups.nodes()[2]) : null,
    };
  };

  const createArrowMarkers = () => {
    const svg = d3.select(svgRef.current);
    const defs = svg.append("defs");

    const markerConfigs = [
      { id: "arrowhead-blue", color: "#155dfd" },
      { id: "arrowhead-green", color: "#00a63e" },
      { id: "arrowhead-gray", color: "gray" },
    ];

    markerConfigs.forEach((config) => {
      defs
        .append("marker")
        .attr("id", config.id)
        .attr("viewBox", "-0 -5 10 10")
        .attr("refX", 22)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("xoverflow", "visible")
        .append("svg:path")
        .attr("d", "M 0,-5 L 10 ,0 L 0,5")
        .attr("fill", config.color)
        .attr("stroke", "none");
    });
  };

  const updateTooltipPosition = (nodeElement, tooltipGroup) => {
    if (!tooltipGroup || tooltipGroup.style("opacity") == 0) return;

    const currentX = parseFloat(nodeElement.attr("cx"));
    const currentY = parseFloat(nodeElement.attr("cy"));

    tooltipGroup.attr("transform", `translate(${currentX}, ${currentY + 30})`);
  };

  const getNodeAndLinkSelections = () => {
    const elements = getGraphElements();
    if (!elements)
      return {
        node: d3.select(),
        link: d3.select(),
        tooltipText: d3.select(),
      };

    return {
      node: elements.nodeGroup
        ? elements.nodeGroup.selectAll("circle")
        : d3.select(),
      link: elements.linkGroup
        ? elements.linkGroup.selectAll("line")
        : d3.select(),
      tooltipText: elements.tooltipGroup
        ? elements.tooltipGroup.select("text")
        : d3.select(),
      tooltipGroup: elements.tooltipGroup,
    };
  };

  const getConnectedNodeIds = (nodeId) => {
    const connectedNodeIds = new Set();
    connectedNodeIds.add(nodeId);

    graphData.links.forEach((link) => {
      if (link.source === nodeId) {
        connectedNodeIds.add(link.target);
      }
      if (link.target === nodeId) {
        connectedNodeIds.add(link.source);
      }
    });

    return connectedNodeIds;
  };

  const highlightNode = (nodeId) => {
    const { node, link, tooltipGroup, tooltipText } =
      getNodeAndLinkSelections();
    const nodeElement = node.filter((d) => d.id == nodeId);
    const nodeData = graphData.nodes.find((d) => d.id == nodeId);

    if (!nodeData || nodeElement.empty()) return;

    const connectedNodeIds = getConnectedNodeIds(nodeId);

    node
      ?.transition()
      .duration(200)
      .style("opacity", (n) => (connectedNodeIds.has(n.id) ? 1 : 0.3));

    link
      ?.transition()
      .duration(200)
      .style("opacity", (l) => {
        const sourceId = typeof l.source === "string" ? l.source : l.source.id;
        const targetId = typeof l.target === "string" ? l.target : l.target.id;
        return sourceId == nodeId || targetId == nodeId ? 1 : 0.1;
      })
      .attr("stroke", (l) => {
        const sourceId = typeof l.source === "string" ? l.source : l.source.id;
        const targetId = typeof l.target === "string" ? l.target : l.target.id;
        if (sourceId == nodeId || targetId == nodeId) {
          if (sourceId == nodeId) {
            return "#155dfd";
          } else {
            return "#00a63e";
          }
        } else {
          return "gray";
        }
      })
      .attr("marker-end", (l) => {
        const sourceId = typeof l.source === "string" ? l.source : l.source.id;
        const targetId = typeof l.target === "string" ? l.target : l.target.id;

        if (sourceId == nodeId || targetId == nodeId) {
          if (sourceId == nodeId) {
            return "url(#arrowhead-blue)";
          } else {
            return "url(#arrowhead-green)";
          }
        } else {
          return "url(#arrowhead-gray)";
        }
      });

    nodeElement.attr("r", calculateNodeRadius(nodeData.citationCount));

    showTooltip(nodeData, nodeElement, tooltipGroup, tooltipText);
  };

  const calculateNodeRadius = (citationCount) => {
    if (!citationCount && citationCount !== 0) return 5; // Valor por defecto

    const minCitations = Math.min(
      ...graphData.nodes.map((n) => n.citationCount || 0),
    );
    const maxCitations = Math.max(
      ...graphData.nodes.map((n) => n.citationCount || 0),
    );

    if (minCitations === maxCitations) return 5; // Evitar división por 0

    const normalizedCitations =
      (citationCount - minCitations) / (maxCitations - minCitations);
    return 5 + normalizedCitations * 10;
  };

  const resetNode = () => {
    const { node, link, tooltipGroup } = getNodeAndLinkSelections();

    node
      ?.transition()
      .duration(200)
      .style("opacity", 1)
      .attr("r", (d) => {
        return calculateNodeRadius(d.citationCount);
      });

    link
      ?.transition()
      .duration(200)
      .style("opacity", 0.6)
      .attr("stroke", "#999")
      .attr("marker-end", "url(#arrowhead-gray)");
    tooltipGroup?.transition().duration(200).style("opacity", 0);
  };

  const showTooltip = (nodeData, nodeElement, tooltipGroup, tooltipText) => {
    const paperTitle =
      nodeData.name.length > 25
        ? nodeData.name.substring(0, 25) + "..."
        : nodeData.name;

    const currentX = parseFloat(nodeElement.attr("cx"));
    const currentY = parseFloat(nodeElement.attr("cy"));

    tooltipGroup
      .attr("transform", `translate(${currentX}, ${currentY + 30})`)
      ?.transition()
      .duration(200)
      .style("opacity", 1);

    tooltipText.text(paperTitle);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Specify the dimensions of the chart.
    const width = 928;
    const height = 680;

    let isDragging = false;

    // Specify the color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // create a copy to not mutate the original data
    const links = graphData.links.map((d) => ({ ...d }));
    const nodes = graphData.nodes.map((d) => ({ ...d }));

    // Create a simulation with several forces.
    const simulation = d3
      .forceSimulation(nodes) // inicializa nodos y se prepara para agregar fuerzas
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id), // como encontrar cada nodo en la lista de nodos
      ) // mantenemos pegados los nodos - fuerza de enlace
      .force("collision", d3.forceCollide().radius(40)) // evita que los nodos se superpongan
      .force("charge", d3.forceManyBody()) // hace que los nodos se repelen
      .force("x", d3.forceX()) // fuerza horizontal al centro x
      .force("y", d3.forceY()); // fuerza vertical al centro y

    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Create arrow marker
    createArrowMarkers();

    // Create a container group for zoom
    const container = svg.append("g");

    // Create tooltip group inside container (so it transforms with zoom)
    const tooltipGroup = container
      .append("g")
      .style("opacity", 0)
      .style("pointer-events", "none");

    // Create tooltip text inside tooltip group
    const tooltipText = tooltipGroup
      .append("text")
      .attr("font-family", "system-ui, sans-serif")
      .attr("font-size", "14px")
      .attr("font-weight", "500")
      .attr("fill", "#374151")
      .attr("text-anchor", "middle");

    // Add a line for each link with arrows, and a circle for each node.
    const link = container
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value))
      .attr("marker-end", "url(#arrowhead)");

    const node = container
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => calculateNodeRadius(d.citationCount))
      .attr("fill", "#5c5c5c")
      .style("cursor", "pointer")
      .style("opacity", 1)
      .on("mouseover", function (event, d) {
        if (isDragging) return;
        // Highlight connected nodes and links
        highlightNode(d.id);
        setSelectedPaperCitationNumber(d.id);
      })
      .on("mouseout", function (event, d) {
        if (isDragging) return;
        // Reset all nodes and links
        resetNode();
        setSelectedPaperCitationNumber(null);
      });

    // Add zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4]) // Min and max zoom levels
      .on("zoom", (event) => {
        // Apply zoom transform to the container
        container.attr("transform", event.transform);

        // Update tooltip position if it's visible
        if (tooltipGroup.style("opacity") > 0) {
          const hoveredNode = node.filter(function (d) {
            return (
              d3.select(this).attr("r") == calculateNodeRadius(d.citationCount)
            );
          });

          if (!hoveredNode.empty()) {
            const currentX = parseFloat(hoveredNode.attr("cx"));
            const currentY = parseFloat(hoveredNode.attr("cy"));
            tooltipGroup.attr(
              "transform",
              `translate(${currentX}, ${currentY + 20})`,
            );
          }
        }
      });

    svg.call(zoom);

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

      // Update tooltip position if it's visible
      if (tooltipGroup.style("opacity") > 0) {
        const hoveredNode = node.filter(function (d) {
          return (
            d3.select(this).attr("r") == calculateNodeRadius(d.citationCount)
          );
        });

        if (!hoveredNode.empty()) {
          const currentX = parseFloat(hoveredNode.attr("cx"));
          const currentY = parseFloat(hoveredNode.attr("cy"));
          tooltipGroup.attr(
            "transform",
            `translate(${currentX}, ${currentY + 30})`,
          );
        }
      }
    });

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      isDragging = true;
      if (!event.active) simulation.alphaTarget(0.1).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;

      const draggedNode = d3.select(event.subject);
      updateTooltipPosition(draggedNode, tooltipGroup);
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;

      const draggedNode = d3.select(event.subject);
      updateTooltipPosition(draggedNode, tooltipGroup);
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it's no longer being dragged.
    function dragended(event) {
      isDragging = false;
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;

      const draggedNode = d3.select(event.subject);
      updateTooltipPosition(draggedNode, tooltipGroup);
    }

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, []);

  // Separate useEffect for handling hover state
  useEffect(() => {
    if (!svgRef.current) return;

    if (selectedPaperCitationNumber) {
      highlightNode(selectedPaperCitationNumber);
    } else {
      resetNode();
    }
  }, [selectedPaperCitationNumber]);
  return <svg ref={svgRef} className="h-full w-full"></svg>;
};

export default KnowledgeGraph;
