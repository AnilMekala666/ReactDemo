// import { useState } from 'react';

// // material-ui
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project import
// import MainCard from 'components/MainCard';
// import IncomeAreaChart from './IncomeAreaChart';

// // ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

// export default function UniqueVisitorCard() {
//   const [view, setView] = useState('monthly'); // 'monthly' or 'weekly'

//   return (
//     <>
//       <Grid container alignItems="center" justifyContent="space-between">
//         <Grid item>
//           <Typography variant="h5">Unique Visitor</Typography>
//         </Grid>
//         <Grid item>
//           <Stack direction="row" alignItems="center" spacing={0}>
//             <Button
//               size="small"
//               onClick={() => setView('monthly')}
//               color={view === 'monthly' ? 'primary' : 'secondary'}
//               variant={view === 'monthly' ? 'outlined' : 'text'}
//             >
//               Month
//             </Button>
//             <Button
//               size="small"
//               onClick={() => setView('weekly')}
//               color={view === 'weekly' ? 'primary' : 'secondary'}
//               variant={view === 'weekly' ? 'outlined' : 'text'}
//             >
//               Week
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       <MainCard content={false} sx={{ mt: 1.5 }}>
//         <Box sx={{ pt: 1, pr: 2 }}>
//           <IncomeAreaChart view={view} />
//         </Box>
//       </MainCard>
//     </>
//   );
// }
import * as React from 'react';
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
import CedarPosting from './CedarPosting';
import NonPaymentPosting from './NonPaymentPosting';
import CashReconciliationTable from './CashReconciliationTable';
import BasicHeatMap from 'pages/KPIs/Charts/HeatMap';
import ReusableBarChart from 'pages/KPIs/Charts/barChart';
import { rem } from '@mantine/core';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Download />
        <ReusableBarChart
        graphData={remittanceSummaryBarChart}
        xAxisKey="month"
        seriesKeys={[
          { key: 'totalClaims', label: 'Total Claims', color: '#3A63D2' },
          { key: 'totalRemittances', label: 'Total Remittance', color: '#EB7724' },
          { key: 'reconciliationRate', label: 'Reconciliation Rate', color: 'yellow' },
        ]}
        checkboxes={[
          { label: 'Monthly', key: 'showMonthly' },
          { label: 'Today', key: 'showToday' },
        ]}
      />
        {/* <SaleReportCard /> */}
      </CustomTabPanel>


      <CustomTabPanel value={value} index={1}>
        <Download />
        <MonthlyBarChart />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Download />
        <BasicHeatMap scatterData={scatterData} xStep={5} yStep={500000} />
        {/* <CashReconciliationTable /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Download />
        <ReusableBarChart
        graphData={denialManagementChart}
        xAxisKey="reason"
        seriesKeys={[
          { key: 'revenueLoss', label: 'Revenue Loss', color: '#3A63D2' },
        ]}
        // checkboxes={[
        //   { label: 'Monthly', key: 'showMonthly' },
        //   { label: 'Today', key: 'showToday' },
        // ]}
      />
        {/* <EFTPosting /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Download />
        <CedarPosting />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Download />
        <NonPaymentPosting />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <Download />
        <NonPaymentPosting />
      </CustomTabPanel>
    </Box>
  );
}
