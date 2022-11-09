const gaugeScript = document.createElement("script");
gaugeScript.setAttribute(
  "src",
  "https://bernii.github.io/gauge.js/dist/gauge.min.js"
);
document.head.appendChild(gaugeScript);

// show plots
window.onload = function () {
  const gaugeChartData = JSON.parse(
    document.getElementById("predicted_class_proba").textContent
  );

  //============================================================================
  //# gauge chart
  //============================================================================
  const opts = {
    angle: -0.01, // The span of the gauge arc
    lineWidth: 0.3, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.62, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: "#000000", // Fill color
    },
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    generateGradient: true,
    highDpiSupport: true, // High resolution support
    staticZones: [
      { strokeStyle: "#B0171F", min: 0, max: 10, height: 0.1 }, // Red from 100 to 130
      { strokeStyle: "#DC143C", min: 10, max: 20, height: 0.2 }, // Red from 100 to 130
      { strokeStyle: "#EE4000", min: 20, max: 30, height: 0.3 }, // Red from 100 to 130
      { strokeStyle: "#EE7600", min: 30, max: 40, height: 0.4 }, // Yellow
      { strokeStyle: "#FFC125", min: 40, max: 50, height: 0.5 }, // Yellow
      { strokeStyle: "#FFD700", min: 50, max: 60, height: 0.6 }, // Yellow
      { strokeStyle: "#FFFF00", min: 60, max: 70, height: 0.7 }, // Green
      { strokeStyle: "#ADFF2F", min: 70, max: 80, height: 0.8 }, // Green
      { strokeStyle: "#76EE00", min: 80, max: 90, height: 0.9 }, // Green
      { strokeStyle: "#00CD00", min: 90, max: 100, height: 1 }, // Green
    ],
    renderTicks: {
      divisions: 10,
      divWidth: 0.5,
      divLength: 0.1,
      divColor: "#666666",
    },
  };
  const target = document.getElementById("canvasGauge"); // your canvas element
  const gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.maxValue = 100; // set max gauge value
  gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 15; // set animation speed (32 is default value)
  gauge.set(gaugeChartData); // set actual value

  //============================================================================
  //# bar chart
  //============================================================================
  const barChartData = JSON.parse(
    document.getElementById("features_importance").textContent
  );

  const values = [];
  const labels = [];
  for (let i = 0; i < barChartData.length; i++) {
    values.push(barChartData[i].importance);
    labels.push(barChartData[i].feature);
  }

  const ctxBar = $("#canvasBar");

  // chartjs config
  const dataBar = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "",
        data: values,
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "horizontalBar",
    data: dataBar,
    options: {
      indexAxis: "y",
      legend: {
        display: false,
      },
    },
  };

  const resultsChart = new Chart(ctxBar, config);
};
