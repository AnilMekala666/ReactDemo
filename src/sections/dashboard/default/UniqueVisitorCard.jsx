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
import OrderTable from './OrdersTable';
import ReportAreaChart from './ReportAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import { Grid, Switch, Typography } from '@mui/material';
import Download from './Download';
import EFTPosting from './EFTPosting';
import CedarPosting from './CedarPosting';
import NonPaymentPosting from './NonPaymentPosting';

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

export default function UniqueVisitorCard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Total Transactions" {...a11yProps(0)} />
          <Tab label="Not Reconciled Transactions" {...a11yProps(1)} />
          <Tab label="Cash Reconciliation" {...a11yProps(2)} />
          <Tab label="EFT Posting" {...a11yProps(3)} />
          <Tab label="Cedar Posting" {...a11yProps(4)} />
          <Tab label="Non Payment Posting" {...a11yProps(5)} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={0.5}>
            <Typography variant="h5">Chart</Typography>
          </Grid>
          <Grid item xs={0.5}>
            <Typography variant="h5"><Switch></Switch></Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5">Table</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography style={{ border: 1, borderColor: '#c5c5c5', borderStyle: 'solid', textAlign: 'center', padding: 5, marginRight: 10, borderRadius: 5, color: '#656565' }} variant="h5">Export</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography style={{ border: 1, borderColor: '#c5c5c5', borderStyle: 'solid', textAlign: 'center', padding: 5, borderRadius: 5, color: '#656565' }} variant="h5">Settings</Typography>
          </Grid>
        </Grid> */}
        <Download />
        <SaleReportCard />
      </CustomTabPanel>


      <CustomTabPanel value={value} index={1}>
        <Download />
        <MonthlyBarChart />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Download />
        <OrderTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Download />
        <EFTPosting />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Download />
        <CedarPosting />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Download />
        <NonPaymentPosting />
      </CustomTabPanel>
    </Box>
  );
}
