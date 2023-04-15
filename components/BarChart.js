import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ indexName, barProportions = [5, 2, 4, 7], maxY = 7 }) => {
  const getColor = (rating) => {
    const colors = [
      "#8B0000",
      "#A52A2A",
      "#CD5C5C",
      "#FFA000",
      "#FFFF00",
      "#aFD700",
      "#00b000",
      "#008000",
    ];
    return colors[Math.trunc((rating / maxY) * 7)];
  };
  const [data, setData] = useState([
    {
      name: "Semantics",
      value: barProportions[0],
      color: getColor(barProportions[0]),
    },
    {
      name: "Structure",
      value: barProportions[1],
      color: getColor(barProportions[1]),
    },
    {
      name: "Story",
      value: barProportions[2],
      color: getColor(barProportions[2]),
    },
    {
      name: "Character",
      value: barProportions[3],
      color: getColor(barProportions[3]),
    },
  ]);

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 296 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]).nice();
    const svg = d3
      .select(".bar-chart" + indexName)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(
      data.map(function (d) {
        return d.name;
      })
    );
    y.domain([
      0,
      maxY,
      // d3.max(data, function (d) {
      //   return d.value;
      // }),
    ]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.name);
      })
      .attr("width", x.bandwidth())
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .style("fill", function (d) {
        return d.color;
      });

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));
  }, [data]);

  return;
};
export default BarChart;
