// material-ui
import { useState,useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Popover } from '@mui/material';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import MonthYearPicker from 'components/KPI/MonthYearPicker';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import KpiCard from 'components/KPI/KpiCard';
import KpiTabs from 'components/KPI/KpiTabs';
import useAxios from 'hooks/useAxios';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
//import OrdersTable from 'sections/dashboard/default/OrdersTable';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { KPI_ENDPOINTS } from 'pages/rest/api';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [activeTab, setActiveTab] = useState('last30days'); // Manage active state
  const [anchorEl, setAnchorEl] = useState(null); // Manage popover state
  const config = useMemo(() => ({
    url: KPI_ENDPOINTS.GET_WIDGET_DATA,
    method: "POST",
    data: {
      monthId: 3,
      year: 2023,
    },
  }), [])
  const { data:kpiWidgetsData, loading:kpiWidgetLoading, error:kpiWidgetError } = useAxios(config, true); 

  console.log({kpiWidgetsData},"kpiData");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'custom') {
      setAnchorEl(anchorEl); // Open popover when "Custom" is clicked
    }
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <>
      <div style={{ backgroundColor: '#F5F5F5' }}>
       
        <Box sx={{ padding: '20px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" fontWeight={600}>
            Cognitive Health Claim Reconciliation Dashboard
          </Typography>
          <Box sx={{ padding: '4px', border: '1px solid #ECECEC', borderRadius: '.5rem' }}>
            <Button
              onClick={() => handleTabClick('last30days')}
              sx={{
                padding: '.75rem 1.5rem',
                borderRadius: '6px',
                marginRight: '8px',
                backgroundColor: activeTab === 'last30days' ? '#3A63D2' : 'transparent',
                color: activeTab === 'last30days' ? 'white' : '#656565'
              }}
            >
              Last 30 days
            </Button>
            <Button
              onClick={(event) => {
                handleTabClick('custom');
                handlePopoverOpen(event);
              }}
              sx={{
                padding: '.75rem 1.5rem',
                borderRadius: '6px',
                backgroundColor: activeTab === 'custom' ? '#3A63D2' : 'transparent',
                color: activeTab === 'custom' ? 'white' : '#656565'
              }}
            >
              Custom
            </Button>
          </Box>
        </Box>
        {/* Popover for Date Selection */}
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Box sx={{ padding: 2, width: '300px' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Select Year and Month
            </Typography>
            <MonthYearPicker
              value={selectedDate}
              onChange={(newValue) => {
                const monthId = newValue.month() + 1; // 1-based month
                const year = newValue.year();
                console.log({ monthId, year }, 'inside datepicker');
                setSelectedDate(newValue);
              }}
              label="Choose a Month and Year"
              inputStyles={{
                width: '200px',
                color: '#555',
                fontSize: '16px'
              }}
              containerStyles={{
                margin: '20px 0'
              }}
            />

            {/* Cancel and Apply Buttons */}
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  handlePopoverClose();
                  setActiveTab('last30days'); // Reset active tab
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handlePopoverClose();
                  console.log('Selected Date:', selectedDate.format('DD/MM/YYYY'));
                }}
                sx={{ backgroundColor: '#3A63D2', color: 'white' }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Popover>
        <Box sx={{padding:"20px",}}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75} >
          {/* row 1 */}
          <Grid item xs={9}>
            <Typography variant="h5" sx={{margin:"1rem 4px",fontSize:"1.2rem"}}>Overall Metrics</Typography>
          </Grid>

          <Grid container rowSpacing={4.5} columnSpacing={0}  ml={3} sx={{marginBottom:"1.5rem"}}>

           {kpiWidgetsData && kpiWidgetsData.widgetsList.length>0 && kpiWidgetsData.widgetsList.map(item=>(
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <KpiCard title={item.name} count={item.value} percentage={1212} extra="#0" />
          </Grid>
           ))} 
           
           
            
          
          </Grid>
          <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
          <Grid container mt={1} ml={3} style={{ backgroundColor: '#fff' }}>
            <KpiTabs />
          </Grid>

        </Grid>
        </Box>
      </div>
    </>
  );
}
