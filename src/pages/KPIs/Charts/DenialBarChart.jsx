import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import { denialKpiColumns } from '../kpiTableHeaderData';

export default function ApexBarChart() {
  const { showTable, payloadDate } = useSelector((state) => state.kpi);

  const denialKpiConfig = useMemo(
    () => ({
      url: KPI_ENDPOINTS.GET_DENIAL_KPI,
      method: 'POST',
      data: payloadDate,
    }),
    [payloadDate]
  );

  const {
    data: denialKpiData,
    loading: denialKpiLoading,
    error: denialKpiisError,
  } = useAxios(denialKpiConfig, true);

  const denialChartData = denialKpiData?.kpiResponse;

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
      categories: denialChartData?.map((item) => item.denialReason), // Setting x-axis labels
      title: {
        text: 'Revenue Loss',
      },
      labels: {
        rotate: -45, // Rotate labels by -45 degrees for better readability
      },
    },
    yaxis: [
      {
        title: {
          text: 'Revenue Loss',
        },
        labels: {
          formatter: (value) => Math.round(value), // Round off y-axis labels
        },
      },
      {
        opposite: true,
        title: {
          text: 'Percentage %',
        },
        labels: {
          formatter: (value) => value.toFixed(2), // Limit to 2 decimal places
        },
      },
    ],
    dataLabels: {
      enabled: false, // Hide data labels
    },
    tooltip: {
      y: {
        formatter: (val) => val.toFixed(2), // Format tooltip value to 2 decimal places
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
      data: denialChartData?.map((item) => Math.round(item.potentialRevenueLoss)), // Round off data
    },
    {
      name: 'Percentage',
      type: 'line',
      data: denialChartData?.map((item) => parseFloat(item.percentage.toFixed(2))), // Format to 2 decimal places
    },
  ];

  return (
    <div style={{ padding: '10px', minHeight: '20rem',width:`${!showTable?"80%":"60%"}`,margin:"auto" }}>
      {denialKpiLoading && (
        <Box
          width={'100%'}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <CircularProgress />
        </Box>
      )}
      {!showTable && denialChartData ? (
        <Chart options={chartOptions} series={chartSeries} height={500} />
      ) : showTable && denialChartData ? (
        <ReUsableTable columns={denialKpiColumns} rows={denialChartData} />
      ) : (
        null
      )}
    </div>
  );
}
