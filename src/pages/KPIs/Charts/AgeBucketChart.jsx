import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import { ageBucketColumns } from '../kpiTableHeaderData';

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
      height: 500,
    },
    plotOptions: {
      bar: {
        vertical: true,
      },
    },
    xaxis: {
      categories: ageBucketChartData.map((item) => item.ageBucket || 'N/A'), // Set x-axis labels
      title: {
        text: 'Age Bucket',
      },
      labels: {
        rotate: -45, // Rotate labels 45 degrees
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Remittance Amount",
        },
        labels: {
          formatter: (val) => Math.round(val), // Round off values on y-axis
        },
      },
      {
        opposite: true,
        title: {
          text: "Claims Count",
        },
        labels: {
          formatter: (val) => val.toFixed(2), // Round off values on y-axis
        },
      },
    ],
    dataLabels: {
      enabled: false, // Hide data labels
    },
    tooltip: {
      y: {
        formatter: (val) => val.toFixed(2), // Format tooltip value
      },
    },
    title: {
      text: 'Age Bucket Analysis',
      align: 'center',
    },
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
    <div style={{ padding: '10px', minHeight: "20rem", width: `${!showTable ? "80%" : "50%"}`, margin: "auto" }}>
      {ageBucketLoading && (
        <Box width={'100%'} sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {!showTable && ageBucketChartData.length > 0 ? (
        <Chart options={chartOptions} series={chartSeries} height={500} />
      ) : showTable && ageBucketChartData.length > 0 ? (
        <ReUsableTable columns={ageBucketColumns} rows={ageBucketChartData} />
      ) : null}
    </div>
  );
}
