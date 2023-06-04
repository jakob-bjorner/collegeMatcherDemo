import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({
  indexName,
  barProportions = { Semantics: 5, Structure: 2, Story: 4, Character: 7 },
  maxY = 10,
}) => {
  const getColor = (rating) => {
    const colors = [
        "#8B0000",
        "#A52A2A",
        "#CD5C5C",
        "#FFA000",
        "#ffe100",
        "#FFFF00",
        "#eaff00",
        "#c6e440",
        "#97cd47",
        "#00b000",
        "#008000",
    ];
    // get the color based on the increment that the rating is from 0 to maxY, there are 11 increments becasue of the colors.
    return colors[Math.trunc((rating / maxY) * 10)]; 
  };
  const categories = ["tone", "style", "structure", "hook", "anecdotes & imagery", "creativity of format"];

  const [data, setData] = useState(categories.map((category, index) => {
    return { name: category, value: barProportions[category], color: getColor(barProportions[category]) };
  }));

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 296 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;
    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const cat_labels = d3.scaleBand().range([0, width]).padding(0.1);
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
        let cat_name = d.name; 
        return cat_name;
      })
    );
    cat_labels.domain(
      data.map(function (d) {
        let cat_name = d.name;
        if (cat_name.length > 8) {
          cat_name = cat_name.substring(0, 7) + "-";
        }
        return cat_name;
      })
    );

    y.domain([
      0,
      maxY,
      // d3.max(data, function (d) {
      //   return d.value;
      // }),
    ]);
    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip-donut")
      .style("position", "absolute")
      .style("text-align", "center")
      .style("padding", ".5rem")
      .style("background", "#FFFFFF")
      .style("color", "#313639")
      .style("border", "1px solid #313639")
      .style("border-radius", "8px")
      .style("pointer-events", "none")
      .style("font-size", "1.3rem")
      .style("opacity", 0);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        let cat_name = x(d.name);
        return cat_name;
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
      })
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration("50").attr("opacity", ".85");
        div.transition().duration(50).style("opacity", 1);
        div.html("" + d.name + ": " + d.value)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 15 + "px");
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration("50").attr("opacity", "1");
        div.transition().duration("50").style("opacity", 0);
      });

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(cat_labels));

    svg.append("g").call(d3.axisLeft(y));
  }, [data]);

  return;
};
export default BarChart;
