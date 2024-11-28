import { Box } from '@mui/material';
import React,{useMemo} from 'react';
import { useSelector } from 'react-redux';
import ReusableBarChart from '../KPIs/Charts/BarChart';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import Download from 'components/KPI/Download';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import { remittanceSummaryColumns } from './kpiTableHeaderData';

const RemmitanceSummary = () => {
    const {showTable,payloadDate} = useSelector(state=>state.kpi);
    const remmitanceConfig = useMemo(() => ({
        url: `${KPI_ENDPOINTS.GET_REMMITTANCE_SUMMARY}?year=2024`,
        method: "GET",
      }), [payloadDate])
    const { data:kpiWidgetsData, loading:kpiWidgetLoading, error:kpiWidgetError } = useAxios(remmitanceConfig, true); 
    console.log(kpiWidgetsData,"inside the remmitance summary")
    const remittanceSummaryBarChart = kpiWidgetsData?.kpiResponse?.monthlyData;

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
      {!showTable && remittanceSummaryBarChart?.length>0 ? (
        <div style={{ width: '100%' }}>
          <ReusableBarChart
            graphData={remittanceSummaryBarChart}
            xAxisKey="month"
            seriesKeys={[
              { key: 'totalClaims', label: 'Total Claims', color: '#3A63D2' },
              { key: 'totalRemittances', label: 'Total Remittance', color: '#EB7724' },
              { key: 'reconciliationRate', label: 'Reconciliation Rate', color: 'yellow' }
            ]}
            checkboxes={[
              { label: 'Monthly', key: 'showMonthly' },
              { label: 'Today', key: 'showToday' }
            ]}
          />
        </div>
      ) : showTable && remittanceSummaryBarChart ? (
        <ReUsableTable columns={remittanceSummaryColumns} rows={remittanceSummaryBarChart} />
      ): <h5>Loading...</h5>}
    </Box>
  );
};

export default RemmitanceSummary;
