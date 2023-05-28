import React, { useEffect, useState } from "react";
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, RadialLinearScale, RadarController, Filler } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, Title, RadialLinearScale, RadarController, Filler);


export default function RadarChart({id, relatedness, maxY=100}) {
    // create a radar chart by first creating the element to mount the chart 
    // on, and running code to attach to this element
    const categories = ["full essay", "tone", "style", "structure", "hook", "anecdotes & imagery", "creativity of format"];

    function hexToRgbA(hex, a){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+a+')';
        }
        throw new Error('Bad Hex');
    };
    function getColor(rating){
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
        return colors[Math.trunc((rating / maxY) * 11)]; 
    };

    // choose the color based on the median value
    const values = categories.map((cat) => relatedness[cat]);
    const medianValue = [...values].sort()[Math.floor((values.length + 1) / 2)]
    const colorForData = getColor(medianValue);

    const data = {
        labels: categories,
        datasets: [{
          label: 'Accepted Essay Alignment',
          data: values,
          min: 0,
          fill: true,
          backgroundColor: hexToRgbA(colorForData, 0.2),
          borderColor: colorForData,
          pointBackgroundColor: colorForData,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colorForData
        }]
      };

    const config = {
        type: 'radar',
        data: data,
        options: {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                }
            },
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        },
    };
    
    return (<Radar {...config} />);
}
