const plotlyScript = document.createElement("script");
plotlyScript.setAttribute("src", "https://cdn.plot.ly/plotly-2.14.0.min.js");
document.head.appendChild(plotlyScript);
//plotly.com/javascript/gauge-charts/

//============================================================================
//# gauge chart #1
//============================================================================
https: console.log(`gaugeChartData ${gaugeChartData}`);
console.log(typeof gaugeChartData);
const dataGauge = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: gaugeChartData,
    title: { text: "" },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      bar: { color: "black" },
      axis: { range: [null, 100] },
      steps: [
        { range: [0, 25], color: "red" },
        { range: [25, 50], color: "goldenrod" },
        { range: [50, 75], color: "lightgreen" },
        { range: [75, 100], color: "green" },
      ],
    },
  },
];

const layout = { margin: { t: 0, b: 0 } };
Plotly.newPlot("canvasGauge", dataGauge, layout, {
  displaylogo: false,
  displayModeBar: false,
});

// altro
[
  { strokeStyle: "rgba(176, 23, 31, 0.7)", min: 0, max: 10, height: 0.1 }, //#B0171F
  { strokeStyle: "rgba(220, 20, 60, 0.7)", min: 10, max: 20, height: 0.2 }, //#DC143C
  { strokeStyle: "rgba(238, 64, 0, 0.7)", min: 20, max: 30, height: 0.3 }, //#EE4000
  { strokeStyle: "rgba(238, 118, 0, 0.7)", min: 30, max: 40, height: 0.4 }, //#EE7600
  { strokeStyle: "rgba(255, 193, 37, 0.7)", min: 40, max: 50, height: 0.5 }, //#FFC125
  { strokeStyle: "rgba(255, 215, 0, 0.7)", min: 50, max: 60, height: 0.6 }, //#FFD700
  { strokeStyle: "rgba(255, 255, 0, 0.7)", min: 60, max: 70, height: 0.7 }, //#FFFF00
  { strokeStyle: "rgba(173, 255, 47, 0.7)", min: 70, max: 80, height: 0.8 }, //#ADFF2F
  { strokeStyle: "rgba(118, 238, 0, 0.7)", min: 80, max: 90, height: 0.9 }, //#76EE00
  { strokeStyle: "rgba(0, 205, 0, 0.7)", min: 90, max: 100, height: 1 }, //#00CD00
];
