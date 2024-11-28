import React from 'react';
import ReactApexChart from 'react-apexcharts';

// Reusable HeatMap Component
const HeatMap = ({ data, xCategories, yCategories, chartTitle }) => {
  // Sorting and processing data
  const sortedData = [...data].sort((a, b) => a.processingTime - b.processingTime);
  const seriesData = yCategories.map(amount => ({
    name: `$${amount.toLocaleString()}`,
    data: xCategories.map(processingTime => {
      const dataPoint = sortedData.find(
        item => item.processingTime === processingTime && item.totalAmount === amount
      );
      return dataPoint ? dataPoint.totalAmount : null;
    }),
  }));

  const minValue = Math.min(...data.map(item => item.totalAmount));
  const maxValue = Math.max(...data.map(item => item.totalAmount));

  // HeatMap options
  const options = {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: chartTitle,
    },
    xaxis: {
      categories: xCategories,
      title: {
        text: 'Processing Time (Days)',
      },
    },
    yaxis: {
      categories: yCategories.map(amount => `$${amount.toLocaleString()}`),
      title: {
        text: 'Total Amount ($)',
      },
    },
    tooltip: {
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const payer = sortedData.find(
          item => item.processingTime === xCategories[dataPointIndex] && item.totalAmount === yCategories[seriesIndex]
        );
        return `
          <div>
            <strong>Payer:</strong> ${payer ? payer.payer : '-'} <br>
            <strong>Processing Time:</strong> ${payer ? payer.processingTime : '-'} Days <br>
            <strong>Total Amount:</strong> $${payer ? payer.totalAmount.toLocaleString() : '-'}
          </div>
        `;
      },
    },
    colorScale: {
      min: minValue,
      max: maxValue,
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#FF0000'],
        inverseColors: false,
        stops: [0, 100],
        colorStops: [
          { offset: 0, color: '#00FF00', opacity: 1 },
          { offset: 50, color: '#808000', opacity: 1 },
          { offset: 100, color: '#FF0000', opacity: 1 },
        ],
      },
    },
  };

  return (
    <div id="heatmap-chart">
      <ReactApexChart options={options} series={seriesData} type="heatmap" height={350} />
    </div>
  );
};

export default HeatMap;