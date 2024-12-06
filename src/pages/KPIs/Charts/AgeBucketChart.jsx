import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import ReUsableTable from './KpiTable';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import { ageBucketColumns } from '../kpiTableHeaderData';
import { formatAmount } from '../kpiHelpers';
import { positions } from '@mui/system';


export default function ApexBarChart() {
  const { showTable, payloadDate } = useSelector((state) => state.kpi);

  const ageBucketConfig = useMemo(() => ({
    url: KPI_ENDPOINTS.GET_AGING_ANALYSIS,
    method: "POST",
    data: payloadDate,
  }), [payloadDate]);

  const { data: ageBucketData, loading: ageBucketLoading } = useAxios(ageBucketConfig, true);
  const ageBucketChartData = ageBucketData?.kpiResponse || []; // Default to an empty array

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ["#008FFB", "#FF5733"],
    plotOptions: {
      
      bar: {
        vertical: true,
        columnWidth: '50%', // Adjust this to control the width of the bars
        barHeight: '50%',  
      },
    },
    xaxis: {
      categories: ageBucketChartData.map((item) => item.ageBucket || 'N/A'), // Set x-axis labels
      title: {
        text: 'Age Bucket',
        style:{
          fontSize:"0.8rem"
        }
      },
      labels: {
        rotate: -45, // Rotate labels 45 degrees
        style: {
          fontSize: '0.8rem',
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Remittance Amount",
          style:{
            fontSize:"0.8rem",
            fontWeight:"600"
          }
        },
        labels: {
          formatter: (val) => formatAmount(val,0),
          style:{
            fontSize:"0.8rem",
            fontWeight:"600"
          } // Round off values on y-axis
        },
      },
      {
        opposite: true,
        title: {
          text: "Claims Count",
          style:{
            fontSize:"0.8rem",
            fontWeight:"600"
          }
        },
        labels: {
          formatter: (val) => formatAmount(val,0), // Round off values on y-axis
          style:{
            fontSize:"0.8rem",
            fontWeight:"600"
          }
        },
      },
    ],
    dataLabels: {
      enabled: false, // Hide data labels
    },
    tooltip: {
      y: {
        formatter: (val,{seriesIndex})=>{
          if(seriesIndex==0){
            return `$${val.toFixed(2)}`;
          }else{
            return val.toFixed(0)
          }
        } , // Format tooltip value
      },
    },
    title: {
      text: 'Age Bucket Analysis',
      align: 'center',
    },
    legend : {
      show: true,
      position:'top'
    }
  };

  // Chart series
  const chartSeries = [
    {
      name: 'Remittance Amount',
      type: 'bar',
      data: ageBucketChartData.map((item) => Math.round(item.remittanceAmount || 0)), // Ensure valid data
    },
    {
      name: 'Claims Count',
      type: 'line',
      data: ageBucketChartData.map((item) =>{
        return Math.round(item.claimCount)
      } ), // Ensure valid data
    },
  ];

  return (
    <div style={{ padding: '10px', minHeight: "20rem", width: `100%`, margin: "auto" }}>
      {ageBucketLoading && (
        <Box width={'100%'} sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {!showTable && ageBucketChartData.length > 0 ? (
        <Chart options={chartOptions} series={chartSeries} height={350} />
      ) : showTable && ageBucketChartData.length > 0 ? (
        <ReUsableTable columns={ageBucketColumns} rows={ageBucketChartData} />
      ) : null}
    </div>
  );
}
