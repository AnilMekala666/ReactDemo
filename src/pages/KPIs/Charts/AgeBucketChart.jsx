import React from 'react';
import Chart from 'react-apexcharts';

const data = [
    { ageBucket: "0-30 Days", claimsCount: 2500, remittanceAmount: 2000000 },
    { ageBucket: "31-60 Days", claimsCount: 1500, remittanceAmount: 1200000 },
    { ageBucket: "61-90 Days", claimsCount: 800, remittanceAmount: 600000 },
    { ageBucket: "91+ Days", claimsCount: 500, remittanceAmount: 400000 },
    { ageBucket: "120+ Days", claimsCount: 300, remittanceAmount: 200000 },
    { ageBucket: "180+ Days", claimsCount: 100, remittanceAmount: 100000 },
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
      categories: data.map((item) => item.ageBucket), // Setting x-axis labels
      title: {
        text: 'Age Bucket',
      },
    },
    yaxis:[
        {
            title:{
                text:"Remittance Amount"
            }
        },
        {
            opposite:true,
            title:{
                text:"Claims Count"
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
      text: 'Age Bucket Analysis',
      align: 'center',
    },
  };

  const chartSeries = [
    {
      name: 'Remittance Amount',
      type: 'bar',
      data: data.map((item) => item.remittanceAmount), // Setting the data for the series
    },
    {
        name: 'Claims Count',
        type: 'line',
        data: data.map((item) => item.claimsCount),
      },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <Chart options={chartOptions} series={chartSeries}  height={500} width={1500} />
    </div>
  );
}
