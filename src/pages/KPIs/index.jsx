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
import YearPicker from 'components/KPI/YearPicker';

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
import { useSelector } from 'react-redux';
import { updatePayloadDate } from 'store/reducers/kpiSlice';
import { useDispatch } from 'react-redux';
import Slider from "react-slick";


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

function getMonthName(monthId) {
  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  // Ensure the monthId is valid (1 to 12)
  if (monthId < 1 || monthId > 12) {
      return "Invalid month ID. Please provide a number between 1 and 12.";
  }

  // Return the month name (monthId - 1 because array indices start at 0)
  return months[monthId - 1];
}

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const {payloadDate} = useSelector(state=>state.kpi)
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(null); // For Year-only picker
  const [activeTab, setActiveTab] = useState('last30days'); // Manage active state
  const [anchorEl, setAnchorEl] = useState(null); // Manage popover state
  const config = useMemo(() => ({
    url: KPI_ENDPOINTS.GET_WIDGET_DATA,
    method: "POST",
    data: payloadDate,
  }), [payloadDate])
  const { data:kpiWidgetsData, loading:kpiWidgetLoading, error:kpiWidgetError } = useAxios(config, true); 



  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'custom') {
      setAnchorEl(anchorEl); // Open popover when "Custom" is clicked
    }
    if(tabName === 'last30days'){
      const currentDate = dayjs();
      const initialMonthId = currentDate.month() + 1; // Day.js month is 0-based, so add 1
      const initialYear = currentDate.year();
      dispatch(updatePayloadDate({monthId:initialMonthId,year:initialYear})) 
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
          <Box>
            <Box sx={{ padding: '4px', border: '1px solid #ECECEC', borderRadius: '.5rem' }}>
              <Button
                disableRipple
                onClick={() => handleTabClick('last30days')}
                sx={{
                  padding: '.75rem 1.5rem',

                  borderRadius: '6px',
                  marginRight: '8px',
                  backgroundColor: activeTab === 'last30days' ? '#3A63D2' : 'transparent',
                  color: activeTab === 'last30days' ? 'white' : '#656565',
                  '&:hover': {
                    backgroundColor: activeTab === 'last30days' ? '#3A63D2' : 'transparent', // Keep the same background color on hover
                    color: activeTab === 'last30days' ? 'white' : '#656565',
                    cursor: 'pointer' // Keep the same text color on hover
                  }
                }}
              >
                Current Month
              </Button>
              <Button
                disableRipple
                onClick={(event) => {
                  handleTabClick('custom');
                  handlePopoverOpen(event);
                }}
                sx={{
                  padding: '.75rem 1.5rem',
                  borderRadius: '6px',
                  backgroundColor: activeTab === 'custom' ? '#3A63D2' : 'transparent',
                  color: activeTab === 'custom' ? 'white' : '#656565',
                  '&:hover': {
                    backgroundColor: activeTab === 'custom' ? '#3A63D2' : 'transparent', // Keep the same background color on hover
                    color: activeTab === 'custom' ? 'white' : '#656565',
                    cursor: 'pointer' // Keep the same text color on hover
                  }
                }}
              >
                Custom
              </Button>
            </Box>
            <Typography sx={{ marginTop: '.5rem' }} variant="h6">
              {payloadDate.monthId != 0 ? (
                <span style={{ fontWeight: '600', display: 'inline-block', marginRight: '.4rem' }}>
                  Month: {getMonthName(payloadDate.monthId)}
                </span>
              ) : null}
              <span style={{ fontWeight: '600' }}>Year: </span>
              {payloadDate.year}
            </Typography>
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
          <Box sx={{ padding: 3, width: '320px' }}>
            <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center' }}>
              choose <span sx={{ fontSize: '20px', fontWeight: '800' }}>Month/Year</span> or <span>Year</span>
            </Typography>

            {/* Month and Year Picker */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                Month and Year
              </Typography>
              <MonthYearPicker
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setSelectedYear(null); // Clear Year-only field
                }}
                label="Choose a Month and Year"
                inputStyles={{
                  width: '280px',
                  color: '#555',
                  fontSize: '16px'
                }}
                containerStyles={{
                  margin: '0 auto'
                }}
              />
            </Box>

            {/* Horizontal Separator */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
              <Box sx={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></Box>
              <Typography
                variant="body2"
                sx={{
                  padding: '0 10px',
                  color: '#888',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                OR
              </Typography>
              <Box sx={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></Box>
            </Box>

            {/* Year Picker */}
            <Box>
              <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                Year
              </Typography>
              <YearPicker
                value={selectedYear}
                onChange={(newYear) => {
                  setSelectedYear(newYear);
                  setSelectedDate(null); // Clear Month-Year field
                }}
                label="Choose a Year"
                inputStyles={{
                  width: '280px',
                  color: '#555',
                  fontSize: '16px'
                }}
                containerStyles={{
                  margin: '0 auto'
                }}
              />
            </Box>

            {/* Cancel and Apply Buttons */}
            <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
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
                  console.log(selectedYear, 'inside the apply');
                  if (selectedDate) {
                    const monthId = selectedDate.month() + 1; // 1-based month
                    const year = selectedDate.year();
                    dispatch(updatePayloadDate({ monthId, year }));
                  } else if (selectedYear) {
                    const year = selectedYear;
                    dispatch(updatePayloadDate({ monthId: 0, year }));
                  }
                  handlePopoverClose();
                }}
                sx={{ backgroundColor: '#3A63D2', color: 'white' }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Popover>

        <Box sx={{ padding: '20px' }}>
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={9}>
              <Typography variant="h5" sx={{ margin: '1rem 4px', fontSize: '1.2rem' }}>
                Overall Metrics
              </Typography>
            </Grid>

            <Grid container rowSpacing={2} columnSpacing={2} ml={3} sx={{ marginBottom: '1.5rem' }}>
              {!kpiWidgetLoading &&
                kpiWidgetsData &&
                kpiWidgetsData.widgetsList.length > 0 &&
                kpiWidgetsData.widgetsList.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <KpiCard title={item.name} count={item.value} percentage={1212} extra="#0" />
                  </Grid>
                ))}

              {kpiWidgetLoading && <h1>Loading</h1>}
              {kpiWidgetsData?.length == 0 && <h6>No Data Available</h6>}
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
