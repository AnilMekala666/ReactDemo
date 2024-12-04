import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Download from 'components/KPI/Download';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import { remittanceSummaryColumns } from './kpiTableHeaderData';
import MultiAxisChart from './Charts/MultiAxisBarChart';
import {Skeleton,CircularProgress} from '@mui/material';
import ReUsableTable from './Charts/KpiTable';

const RemmitanceSummary = () => {
  const { showTable, payloadDate } = useSelector((state) => state.kpi);
  const remmitanceConfig = useMemo(
    () => ({
      url: `${KPI_ENDPOINTS.GET_REMMITTANCE_SUMMARY}?year=${payloadDate.year}`,
      method: 'GET'
    }),
    [payloadDate]
  );
  const { data: kpiWidgetsData, loading: kpiWidgetLoading, error: kpiWidgetError } = useAxios(remmitanceConfig, true);
  const remittanceSummaryBarChart = kpiWidgetsData?.kpiResponse?.monthlyData;

  function addSummaryRow(data) {
    // Calculate the total claims, total remittances, and average reconciliation rate
    if(data){
    const totalClaims = data.reduce((sum, row) => sum + row.totalClaims, 0);
    const totalRemittances = data.reduce((sum, row) => sum + row.totalRemittances, 0);
    const avgReconciliationRate = 
        data.reduce((sum, row) => sum + row.reconciliationRate, 0) / data.length;

    // Create the summary object
    const summaryRow = {
        additionalStyles:{fontWeight:"900"},
        type: "summary",
        totalClaims,
        totalRemittances,
        reconciliationRate: parseFloat(avgReconciliationRate.toFixed(4)), // Ensures consistent decimal places
    };

    // Return a new array with the summary row appended
    return [...data, summaryRow];
  }
}

  // const remittanceSummaryBarChart = [
  //     { month: 'Jan', totalClaims: 150, totalRemittances: 120, reconciliationRate: 80 },
  //     { month: 'Feb', totalClaims: 180, totalRemittances: 140, reconciliationRate: 85 },
  //     { month: 'Mar', totalClaims: 200, totalRemittances: 170, reconciliationRate: 90 },
  //     { month: 'Apr', totalClaims: 220, totalRemittances: 180, reconciliationRate: 95 },
  //     { month: 'May', totalClaims: 250, totalRemittances: 200, reconciliationRate: 88 },
  //   ];

  // const remittanceSummaryBarChart=[
  //     {
  //         "month": "January",
  //         "totalClaims": 21733,
  //         "totalRemittances": 249,
  //         "reconciliationRate": 27
  //     },
  //     {
  //         "month": "February",
  //         "totalClaims": 217,
  //         "totalRemittances": 247,
  //         "reconciliationRate": 26
  //     },
  //     {
  //         "month": "March",
  //         "totalClaims": 37,
  //         "totalRemittances": 321,
  //         "reconciliationRate": 23
  //     },
  //     {
  //         "month": "April",
  //         "totalClaims": 60,
  //         "totalRemittances": 637,
  //         "reconciliationRate": 22
  //     },
  //     {
  //         "month": "May",
  //         "totalClaims": 721,
  //         "totalRemittances": 769,
  //         "reconciliationRate": 23
  //     },
  //     {
  //         "month": "June",
  //         "totalClaims": 67,
  //         "totalRemittances": 629,
  //         "reconciliationRate": 19
  //     },
  //     {
  //         "month": "July",
  //         "totalClaims": 412,
  //         "totalRemittances": 383,
  //         "reconciliationRate": 18
  //     },
  //     {
  //         "month": "August",
  //         "totalClaims": 170,
  //         "totalRemittances": 149,
  //         "reconciliationRate": 17
  //     }
  // ]

  return (
    <Box>
      <Download />
      {kpiWidgetLoading && (
        <Box width={'100%'} height={'20rem'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress width={'100%'} />
        </Box>
      )}
      {!kpiWidgetLoading&&<Box style={{ width: `100%`, margin: 'auto', minHeight: '20rem' }}>
        {!showTable && remittanceSummaryBarChart?.length > 0 ? (
          <div>
            <MultiAxisChart data={remittanceSummaryBarChart} />
          </div>
        ) : showTable && remittanceSummaryBarChart ? (
          <ReUsableTable columns={remittanceSummaryColumns} rows={remittanceSummaryBarChart} />
        ) : (
          null
        )}
      </Box>}
    </Box>
  );
};

export default RemmitanceSummary;
