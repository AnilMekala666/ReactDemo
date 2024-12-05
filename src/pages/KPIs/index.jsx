// material-ui
import { useState, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Popover, Skeleton,TextField,MenuItem } from '@mui/material';
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
import { CircularProgress } from '@mui/material';
import Slider from "react-slick";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
// import dayjs from 'dayjs';
import {
  FilterOutlined,
} from '@ant-design/icons';


import CustomCalendar from './CustomCalendar';
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



import AvgRemICon from '../../assets/icons/Average Remittance Time.png'
import CleanClaimRateICon from '../../assets/icons/Clean claim rate.png';
import daysInAccountReceivableICon from '../../assets/icons/Days in Accounts Receivable (AR).png';
import denialRateICon from '../../assets/icons/Denial Rate.png';
import netCollectionRateICon from '../../assets/icons/Net collection rate.png';
import pendingClaimsICon from '../../assets/icons/Pending claims.png';
import reconciliationRateICon from '../../assets/icons/Reconciliation Rate.png';
import topPayerICon from '../../assets/icons/Top Payer.png';
import totalClaimsSubmittedICon from '../../assets/icons/Total claims submitted.png';
import totalRemittanceAmountICon from '../../assets/icons/Total Remittance Amount.png';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const { payloadDate } = useSelector(state => state.kpi)
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(null); // For Year-only picker
  const [activeTab, setActiveTab] = useState('last30days'); // Manage active state
  const [anchorEl, setAnchorEl] = useState(null); // Manage popover state
  const [isExpand, setISExpand] = useState(false)
  const [selectedOption, setSelectedOption] = useState(''); 
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState(''); 
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedQOption, setSelectedQOption] = useState('')



  const iconMapping = {
    'Average Remittance Processing Time': AvgRemICon,
    'Total Pending Claims': pendingClaimsICon,
    'Clean Claim Rate': CleanClaimRateICon,
    'Net Collection Rate': netCollectionRateICon,
    'Days in Accounts Receivable': daysInAccountReceivableICon,
    'Denial Rate': denialRateICon,
    'Reconciliation Rate': reconciliationRateICon,
    'Total Claims Submitted': totalClaimsSubmittedICon,
    'Total Remittance Amount': totalRemittanceAmountICon,
    'Top Payer': topPayerICon,
  };
  const handleCalendarDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleQuartelyDropdownChange = (e) => {
    setSelectedQOption(e.target.value)
  }

  const config = useMemo(() => ({
    url: KPI_ENDPOINTS.GET_WIDGET_DATA,
    method: "POST",
    data: payloadDate,
  }), [payloadDate])
  const { data: kpiWidgetsData, loading: kpiWidgetLoading, error: kpiWidgetError } = useAxios(config, true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Shows 4 cards per row on large screens
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200, // Large screens
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768, // Medium screens (tablets)
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480, // Small screens (phones)
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'custom') {
      setAnchorEl(anchorEl); // Open popover when "Custom" is clicked
    }
    if (tabName === 'last30days') {
      const currentDate = dayjs();
      const initialMonthId = currentDate.month() + 1; // Day.js month is 0-based, so add 1
      const initialYear = currentDate.year();
      dispatch(updatePayloadDate({ monthId: initialMonthId, year: initialYear }))
    }
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const usCurrencyFormat = (value) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  const formatValue = (item) => {
    const { value, name } = item;
    if (name == 'Total Claims Submitted' || name == 'Total Pending Claims') {
      return value;
    } else if (name == 'Days in Accounts Receivable' || name == 'Average Remittance Processing Time') {
      let formattedValue = value.toFixed(0);
      return `${formattedValue} ${formattedValue > 1 ? 'days' : formattedValue == 0 ? '' : 'day'}`;
    } else if (name == 'Total Remittance Amount' || name == 'Top Payer') {
      return `$${usCurrencyFormat(item.value)}`;
    } else {
      return value.toFixed(2);
    }
  };

console.log(kpiWidgetsData)

  return (
    <>
      <div style={{ backgroundColor: '#F5F5F5', marginTop: "10px" }}>
        <Box sx={{ padding: '20px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" fontWeight={600}>
            Claim Reconciliation Dashboard
          </Typography>
          <Button
            variant="outlined"
            onClick={(event) => {
              handleTabClick('custom');
              handlePopoverOpen(event);
            }}
          >
            <FilterOutlined />
            <span style={{ marginLeft: 5 }}>Filter</span>
          </Button>
          {/* <Box>
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
          </Box> */}
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
          <Box sx={{ padding: 3, width: '350px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TextField
                select
                label="Select Calendar"
                value={selectedOption}
                onChange={handleCalendarDropdownChange}
                fullWidth
                margin="normal"
                // className='header-input-border custom-select'
              >
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="year">Year</MenuItem>
                <MenuItem value="customDate">Custom Date</MenuItem>
              </TextField>



              {selectedOption === 'month' && (
                <DatePicker
                  views={['year', 'month']} // Show only year and month selection
                  label="Select Month"
                  value={selectedMonth}
                  fullWidth
                  sx={{ marginTop: '5px' }}
                  onChange={(newValue) => {
                    setSelectedMonth(newValue);
                    setSelectedYear(null);
                  }}
                  renderInput={(params) => <TextField {...params} margin="normal" />}
                  // className='header-input-border custom-select'
                />


              )}

              {selectedOption === 'quarterly' && (
                <TextField
                  select
                  label="Select Months"
                  value={selectedQOption}
                  onChange={handleQuartelyDropdownChange}
                  fullWidth
                  margin="normal"
                  // className='header-input-border  custom-select'
                >
                  <MenuItem value="q1">Q1</MenuItem>
                  <MenuItem value="q2">Q2</MenuItem>
                  <MenuItem value="q3">Q3</MenuItem>
                  <MenuItem value="q4">Q4 </MenuItem>
                </TextField>
              )}

              {(selectedOption === 'year' || selectedOption === 'quarterly') && (
                <Box>
                  {/* <TextField label="Year" sx={{ width: "150px" }} margin="normal" /> */}
                  <YearPicker
                    fullWidth
                    value={selectedYear}
                    onChange={(newYear) => {
                      setSelectedYear(newYear);
                      setSelectedDate(null);
                      setSelectedMonth(null); // Clear Month-Year field
                    }}
                    label="Choose a Year"
                  />
                </Box>
              )}

              {selectedOption === 'customDate' && (
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <TextField
                    // className='header-input-border custom-select'
                    fullWidth
                    label="From Date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    fullWidth
                    // className='header-input-border custom-select'
                    label="To Date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Box>
              )}

              <Button
                sx={{ margin: '10px 0px', float: 'right' }}
                variant="contained"
                onClick={() => {
                  if (selectedMonth) {
                    let date = new Date(selectedMonth);
                    let monthId = date.getMonth() + 1;
                    let year = date.getFullYear();
                    dispatch(updatePayloadDate({ monthId, year }));
                  }
                  if (selectedYear) {
                    let year = selectedYear;
                    dispatch(updatePayloadDate({ monthId: 0, year }));
                  }

                  // if (selectedDate) {
                  //   const monthId = selectedDate.month() + 1; // 1-based month
                  //   const year = selectedDate.year();
                  //   dispatch(updatePayloadDate({ monthId, year }));
                  // } else if (selectedYear) {
                  //   const year = selectedYear;
                  //   dispatch(updatePayloadDate({ monthId: 0, year }));
                  // }
                  handlePopoverClose();
                }}
              >
                Apply
              </Button>
            </LocalizationProvider>
          </Box>
        </Popover>


        {/* <Grid container style={{ padding: '0px' }}  >
          <Grid xs={12} sx={{ bgcolor: "#ffffff", display: "flex", padding: 3, mt: 1 }} alignItems="center">
            <Grid item xs={5} sx={{ display: "flex" }}>
              <Typography variant="h4">Claim Reconciliation Dashboard</Typography>
            </Grid>

          
            <Grid item xs={7} sm={12}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-end', gap: 3 },
                alignItems: 'center',
                // mt: { xs: 2, sm: 0 },
              }}
            >
              <CustomCalendar/>
            </Grid>
          </Grid>
        </Grid> */}

        <Box sx={{ padding: '20px', marginTop: "30px" }}>
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            {/* <Grid item xs={9}>
              <Typography variant="h5" sx={{ margin: '1rem 4px', fontSize: '1.2rem' }}>
                Claim Reconciliation
              </Typography>
            </Grid> */}
            {/*             
            <Grid container rowSpacing={2} columnSpacing={2} ml={"1rem"} sx={{ marginBottom: '1.5rem' }}>
              {!kpiWidgetLoading &&
                kpiWidgetsData &&
                kpiWidgetsData.widgetsList.length > 0 &&
                kpiWidgetsData.widgetsList.filter(item=>(item.name)).map((item) => (

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <KpiCard title={item.name} count={formatValue(item)} percentage={1212} payor={item.payor || ""} extra="#0" />
                  </Grid>
                ))}

              {kpiWidgetLoading &&<Box width={'100%'} height={'40vh'} sx={{display:'flex',alignItems:"center",justifyContent:"center"}}>
                <CircularProgress width={"100%"}/>
              </Box> }
              {kpiWidgetsData?.length == 0 && <h6>No Data Available</h6>}
            </Grid> */}

            <Grid container spacing={2} sx={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
              {!kpiWidgetLoading && kpiWidgetsData?.widgetsList?.length > 0 ? (
                <Grid item xs={12}>
                  <Box sx={{ overflow: 'hidden', padding: '0 16px' }}>
                    <Slider {...settings}>
                      {kpiWidgetsData.widgetsList.map((item) => (
                        <Box key={item.id} px={1}>
                          {/* <KpiCard
                            title={item.name}
                            count={formatValue(item)}
                            percentage={1212}  // Example value
                            payor={item.payor || ""}
                            icon={iconMapping[item.name] || ''} 
                            extra="#0"
                          /> */}
                          {item.name && (
                            <KpiCard
                              title={item.name}
                              count={formatValue(item)}
                              percentage={1212}  // Example value
                              payor={item.payor || ""}
                              icon={iconMapping[item.name] || ""}
                              extra="#0"
                            />
                          )}
                        </Box>
                      ))}
                    </Slider>
                  </Box>
                </Grid>
              ) : kpiWidgetLoading ? (
                <Box
                  width="100%"
                  height="40vh"
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <h6>No Data Available</h6>
              )}
            </Grid>

            {/* <Grid container columnSpacing={2} ml={3} sx={{ marginBottom: '1.5rem' }}>
              <div className="slider-container caurosel-width" style={{width:"100%"}}>
                <Slider  >
                  {kpiWidgetsData.widgetsList.map((item, index) => (
                    <div key={index}  className="carousel-slide">
                      <KpiCard
                        title={item.name}
                        count={formatValue(item.value)}
                        // percentage={1212}
                        extra="#0"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </Grid> */}
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
            <Grid container ml={3} style={{ backgroundColor: '#fff' }}>
              <KpiTabs />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}