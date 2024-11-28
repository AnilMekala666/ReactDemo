import React, {useMemo} from 'react';
import Chart from 'react-apexcharts';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import Download from 'components/KPI/Download';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import { denialKpiColumns } from '../kpiTableHeaderData';

const data = [
  { reason: 'Eligibility Issues', count: 150, percentage: 30, revenueLoss: 300000 },
  { reason: 'Coding Errors', count: 100, percentage: 20, revenueLoss: 200000 },
  { reason: 'Authorization Required', count: 75, percentage: 15, revenueLoss: 150000 },
  { reason: 'Duplicate Claim', count: 50, percentage: 10, revenueLoss: 100000 },
  { reason: 'Documentation Missing', count: 60, percentage: 12, revenueLoss: 120000 },
  { reason: 'Service Not Covered', count: 65, percentage: 13, revenueLoss: 130000 },
];



export default function ApexBarChart() {
  const {showTable,payloadDate} = useSelector(state=>state.kpi);
    const denialKpiConfig = useMemo(() => ({
        url: KPI_ENDPOINTS.GET_DENIAL_KPI,
        method: "POST",
        data: payloadDate,
      }), [payloadDate])
    const { data:denialKpiData, loading:denialKpiLoading, error:denialKpiisError } = useAxios(denialKpiConfig, true); 
    const denialChartData=denialKpiData?.kpiResponse;

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
      categories: denialChartData?.map((item) => item.denialReason), // Setting x-axis labels
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
      data: denialChartData?.map((item) => item.potentialRevenueLoss), // Setting the data for the series
    },
    {
        name: 'Percentage',
        type: 'line',
        data: denialChartData?.map((item) => item.percentage),
      },
  ];

  return (
    <div style={{ padding: '10px' }}>
      {!showTable && denialChartData ?  <Chart options={chartOptions} series={chartSeries}  height={500} width={1500} />:showTable && denialChartData ?<ReUsableTable columns={denialKpiColumns} rows={denialChartData}/>:<h5>Loading...</h5>}
    </div>
  );
}
