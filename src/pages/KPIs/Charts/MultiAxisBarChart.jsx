import React from "react";
import Chart from "react-apexcharts";

const MultiAxisBarLineChart = ({ data }) => {
  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    stroke: {
      width: [0, 0, 2], // Line width for the reconciliation rate
      curve: "smooth",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [2], // Enable data labels only on the reconciliation line chart
      formatter: (val) => (typeof val === "number" ? val.toFixed(2) : val),
    },
    xaxis: {
      categories: data.map((item) => item.month),
      title: {
        text: "Months",
        style: {
          fontSize: "1rem", // Increase this value to make labels larger
          fontWeight: "bold", // Optional, for making labels bold
          colors: ["#333"], // Customize label color if needed
        },
      },
      labels:{
        style: {
          fontSize: "0.8rem", // Increase this value to make labels larger
          fontWeight: "bold", // Optional, for making labels bold
          colors: ["#333"], // Customize label color if needed
        },
      }
    },
    colors: ["#008FFB", "#00E396", "#FF5733"],
    yaxis: [
      {
        seriesName: "Total Claims",
        title: {
          text: "Total Claims",
          style: {
            fontSize: "1rem", // Increase this value to make labels larger
            fontWeight: "bold", // Optional, for making labels bold
            colors: ["#333"], // Customize label color if needed
          },
        },
        labels: {
          style: {
            fontSize: "0.8rem", // Increase this value to make labels larger
            fontWeight: "bold", // Optional, for making labels bold
            colors: ["#333"], // Customize label color if needed
          },
          formatter: (val) => formatLargeNumber(val),
        },
      },
      {
        seriesName: "Total Remittances",
        opposite: true,
        title: {
          text: "Total Remittances",
          style: {
            fontSize: "1rem", // Increase this value to make labels larger
            fontWeight: "bold", // Optional, for making labels bold
            colors: ["#333"], // Customize label color if needed
          },
        },
        labels: {
          style: {
            fontSize: "0.8rem", // Increase this value to make labels larger
            fontWeight: "bold", // Optional, for making labels bold
            colors: ["#333"], // Customize label color if needed
          },
          formatter: (val) => formatLargeNumber(val),
        },
      },
      // {
      //   seriesName: "Reconciliation Rate",
      //   opposite: true,
      //   title: {
      //     text: "Reconciliation Rate (%)",
      //     style: {
      //       fontSize: "1rem", // Increase this value to make labels larger
      //       fontWeight: "bold", // Optional, for making labels bold
      //       colors: ["#333"], // Customize label color if needed
      //     },
      //   },
      //   labels: {
      //     style: {
      //       fontSize: "0.8rem", // Increase this value to make labels larger
      //       fontWeight: "bold", // Optional, for making labels bold
      //       colors: ["#333"], // Customize label color if needed
      //     },
      //     formatter: (val) => val.toFixed(0),
      //   },
      //   max: 100, // Optional: Adjust max value based on your dataset
      // },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: (val) => formatLargeNumber(val,2),
        },
        {
          formatter: (val) => formatLargeNumber(val,2),
        },
        {
          formatter: (val) => val.toFixed(2) + "%",
        },
      ],
    },
    legend: {
      position: "top",
    },
  };

  const chartSeries = [
    {
      name: "Total Claims",
      type: "bar",
      data: data.map((item) => item.totalClaims),
    },
    {
      name: "Total Remittances",
      type: "bar",
      data: data.map((item) => item.totalRemittances),
    },
    {
      name: "Reconciliation Rate",
      type: "line",
      data: data.map((item) => item.reconciliationRate),
    },
  ];

  // Function to format large numbers (e.g., K, M)
  const formatLargeNumber = (num,fixed=0) => {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(fixed) + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(fixed) + "K";
    }
    return num.toFixed(fixed);
  };

  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default MultiAxisBarLineChart;
