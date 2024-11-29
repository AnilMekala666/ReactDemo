import * as React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SaleReportCard from './SaleReportCard';
import ReportAreaChart from './ReportAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import { Grid, Switch, Typography } from '@mui/material';
import Download from './Download';
import EFTPosting from './EFTPosting';
import RevenueCycleKpi from './RevenueCycleKpi';
import NonPaymentPosting from './NonPaymentPosting';
import CashReconciliationTable from './CashReconciliationTable';
import HeatMap from 'pages/KPIs/Charts/HeatMap';
import ReusableBarChart from 'pages/KPIs/Charts/barChart';
import DenialBarChart from 'pages/KPIs/Charts/DenialBarChart';
import AgeBucketChart from 'pages/KPIs/Charts/AgeBucketChart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateShowTable } from 'store/reducers/kpiSlice';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import RemmitanceSummary from 'pages/KPIs/RemmitanceSummary';
import RemmitanceAnalysis from 'pages/KPIs/RemmitanceAnalysis';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const scatterData = [
    { x: 15, y: 2500000, label: 'Medicare' },
    { x: 10, y: 1800000, label: 'Blue Cross' },
    { x: 20, y: 1200000, label: 'Aetna' },
    { x: 12, y: 200000, label: 'United Health' },
    { x: 18, y: 1500000, label: 'Cigna' },
    { x: 14, y: 1700000, label: 'Humana' },
  ];

const remittanceSummaryBarChart = [
    { month: 'Jan', totalClaims: 150, totalRemittances: 120, reconciliationRate: 80 },
    { month: 'Feb', totalClaims: 180, totalRemittances: 140, reconciliationRate: 85 },
    { month: 'Mar', totalClaims: 200, totalRemittances: 170, reconciliationRate: 90 },
    { month: 'Apr', totalClaims: 220, totalRemittances: 180, reconciliationRate: 95 },
    { month: 'May', totalClaims: 250, totalRemittances: 200, reconciliationRate: 88 },
  ];

const denialManagementChart = [
    { reason: 'Eligibility Issues', count: 150, percentage: 30, revenueLoss: 300000 },
    { reason: 'Coding Errors', count: 100, percentage: 20, revenueLoss: 200000 },
    { reason: 'Authorization Required', count: 75, percentage: 15, revenueLoss: 150000 },
    { reason: 'Duplicate Claim', count: 50, percentage: 10, revenueLoss: 100000 },
    { reason: 'Documentation Missing', count: 60, percentage: 12, revenueLoss: 120000 },
    { reason: 'Service Not Covered', count: 65, percentage: 13, revenueLoss: 130000 },
  ];
  

export default function UniqueVisitorCard() {
  const [value, setValue] = React.useState(0);
  const {showTable,payloadDate} = useSelector(state=>state.kpi);
  const dispatch = useDispatch();
  const remmitanceConfig = useMemo(() => ({
    url: `${KPI_ENDPOINTS.GET_REMMITTANCE_SUMMARY}?year=2024`,
    method: "GET",
  }), [payloadDate])
  const { data:remmitanceData, loading:remmitanceDataLoading, error:remmitanceDataError } = useAxios(remmitanceConfig, true); 

  const handleChange = (event, newValue) => {
    dispatch(updateShowTable(false));
    setValue(newValue);
  };

  const heatMapdata = [
    { payer: 'Medicare', processingTime: 15, totalAmount: 2500000 },
    { payer: 'Blue Cross', processingTime: 10, totalAmount: 1800000 },
    { payer: 'Aetna', processingTime: 20, totalAmount: 1200000 },
    { payer: 'UnitedHealth', processingTime: 12, totalAmount: 2000000 },
    { payer: 'Cigna', processingTime: 18, totalAmount: 1500000 },
    { payer: 'Humana', processingTime: 14, totalAmount: 1700000 },
  ];

  const xCategories = heatMapdata.map(item => item.processingTime);
  const yCategories = [...new Set(heatMapdata.map(item => item.totalAmount))].sort((a, b) => a - b);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overall Claims & Remittances Summary" {...a11yProps(0)} />
          <Tab label=" Claim Status Overview" {...a11yProps(1)} />
          <Tab label="Remittance Analysis" {...a11yProps(2)} />
          <Tab label="Denial Management" {...a11yProps(3)} />
          <Tab label="Revenue Cycle KPIs" {...a11yProps(4)} />
          <Tab label="Reconciliation Status" {...a11yProps(5)} />
          <Tab label="Aging Analysis" {...a11yProps(6)} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RemmitanceSummary/>
        {/* <SaleReportCard /> */}
      </CustomTabPanel>

    {/* CLAIMS OVERVIEW */}
      <CustomTabPanel value={value} index={1}>
        <Download />
        <MonthlyBarChart />
      </CustomTabPanel>
      {/* REMITTANCE ANALYSIS */}
      <CustomTabPanel value={value} index={2}>
        <RemmitanceAnalysis/>
        {/* <CashReconciliationTable /> */}
      </CustomTabPanel>
      {/* DENIAL MANAGEMENT */}
      <CustomTabPanel value={value} index={3}>
        <Download />
        <DenialBarChart />
        {/* <EFTPosting /> */}
      </CustomTabPanel>
      {/* REVENUE CYCLE KPI */}
      <CustomTabPanel value={value} index={4}>
        <Download />
        <RevenueCycleKpi />
      </CustomTabPanel>
      {/* RECONCILLIATION STATUS */}
      <CustomTabPanel value={value} index={5}>
        <Download />
        <NonPaymentPosting />
      </CustomTabPanel>
      {/* AGING ANALYSIS */}
      <CustomTabPanel value={value} index={6}>
        <Download />
        <AgeBucketChart/>
        {/* <NonPaymentPosting /> */}
      </CustomTabPanel>
    </Box>
  );
}
