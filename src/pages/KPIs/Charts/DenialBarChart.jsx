import React from 'react';
import Chart from 'react-apexcharts';

const data = [
  { reason: 'Eligibility Issues', count: 150, percentage: 30, revenueLoss: 300000 },
  { reason: 'Coding Errors', count: 100, percentage: 20, revenueLoss: 200000 },
  { reason: 'Authorization Required', count: 75, percentage: 15, revenueLoss: 150000 },
  { reason: 'Duplicate Claim', count: 50, percentage: 10, revenueLoss: 100000 },
  { reason: 'Documentation Missing', count: 60, percentage: 12, revenueLoss: 120000 },
  { reason: 'Service Not Covered', count: 65, percentage: 13, revenueLoss: 130000 },
];

export default function ApexBarChart() {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 500,
    },
    plotOptions: {
      bar: {
        vertical:true,
        //horizontal: true, // Makes the chart horizontal
      },
    },
    xaxis: {
      categories: data.map((item) => item.reason), // Setting x-axis labels
      title: {
        text: 'Revenue Loss',
      },
    },
    yaxis:[
        {
            title:{
                text:"Revenue Loss"
            }
        },
        {
            opposite:true,
            title:{
                text:"Percentage %"
            }
        }
    ],
    dataLabels: {
      enabled: false, // Hide data labels
    },
    tooltip: {
      y: {
        //formatter: (val: number) => val, // Format tooltip value as currency
      },
    },
    title: {
      text: 'Revenue Loss by Reason and its Percentage',
      align: 'center',
    },
  };

  const chartSeries = [
    {
      name: 'Revenue Loss',
      type: 'bar',
      data: data.map((item) => item.revenueLoss), // Setting the data for the series
    },
    {
        name: 'Percentage',
        type: 'line',
        data: data.map((item) => item.percentage),
      },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <Chart options={chartOptions} series={chartSeries}  height={500} width={1500} />
    </div>
  );
}
