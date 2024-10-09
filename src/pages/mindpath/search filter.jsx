/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useMemo,useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, TextField, Grid, Stack, Button, Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Autocomplete, Checkbox } from '@mui/material';
import MainCard from 'components/MainCard';
import { MoneyCollectOutlined, CalendarOutlined } from '@ant-design/icons';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ReusableTable from 'components/tableComponent/Table';
import ReactTable from 'components/tableComponent/Table';
import OutlinedInput from 'themes/overrides/OutlinedInput';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { ClearIcon } from '@mui/x-date-pickers';
import { CheckSquareOutlined, HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { border, borderRadius, fontSize, padding } from '@mui/system';
import { color } from 'framer-motion';




function SearchFilter(){
    const [selectedView, setSelectedView] = useState('today');
    const [today, setToday] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [week, setWeek] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [gender, setGender] = useState('Payments');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDropdownView, setSelectedDropdownView] = useState([]);
    const [availableWeeks, setAvailableWeeks] = useState([]);
    const [availableMonths, setAvailableMonths] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [feedback, setFeedback] = useState('Appeal/Grievances');
    const [comments, setComments] = useState('');
    const [value, setValue] = useState('AZ'); 
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [selectedClassification, setSelectedClassification] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('');

  // Update this function to handle year change
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    setMonth(''); // Reset month when year changes

    if (selectedView === 'month') {
      updateAvailableMonths(selectedYear);
    } else if (selectedView === 'week') {
      setWeek(''); // Reset week when year changes
      setAvailableWeeks([]); // Reset available weeks
    }
  };

  // Update this function to handle month change
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setWeek(''); // Reset week when month changes
    updateAvailableWeeks(year, e.target.value);
  };


    const handleSearch = async () => {
        // Prepare the payload based on selected values
        const payload = {
          classification: selectedDropdownView,
          period: selectedView,
          state: value
        };
    
        // Add additional fields based on the selected period
        switch (selectedView) {
          case 'today':
            payload.date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
            break;
          case 'week':
            payload.year = year;
            payload.month = month;
            payload.week = week;
            break;
          case 'month':
            payload.year = year;
            payload.month = month;
            break;
          case 'year':
            payload.year = year;
            break;
          case 'customDate':
            payload.fromDate = fromDate ? fromDate.toISOString().split('T')[0] : null;
            payload.toDate = toDate ? toDate.toISOString().split('T')[0] : null;
            break;
        }
        try {
          const response = await axios.post('YOUR_API_ENDPOINT', payload);
          console.log('API Response:', response.data);
          // Handle the response data here, e.g., update the table data
          // You might want to create a new state variable for the API response data
          // setApiData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle errors here, e.g., show an error message to the user
        }
      };


      const handleChange = (event) => {
        const {
          target: { value }
        } = event;
        setSelectedDropdownView(
          // On autofill we get a stringified value, so we need to handle that
          typeof value === 'string' ? value.split(',') : value
        );
      };
    
    


  // New function to update available weeks based on year and month
  const updateAvailableWeeks = (selectedYear, selectedMonth) => {
    if (selectedYear && selectedMonth) {
      const date = new Date(selectedYear, parseInt(selectedMonth) - 1, 1);
      const weeks = [];
      while (date.getMonth() === parseInt(selectedMonth) - 1) {
        weeks.push(`Week ${Math.ceil(date.getDate() / 7)}`);
        date.setDate(date.getDate() + 7);
      }
      setAvailableWeeks(weeks);
    } else {
      setAvailableWeeks([]);
    }
  };

  const handleViewChange = (e) => {
    setSelectedView(e.target.value);
  };


  // New function to update available months based on year
  const updateAvailableMonths = (selectedYear) => {
    if (selectedYear) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();

      let months = [];
      if (parseInt(selectedYear) === currentYear) {
        // If it's the current year, only show months up to the current month
        for (let i = 0; i <= currentMonth; i++) {
          months.push({
            value: String(i + 1).padStart(2, '0'),
            label: new Date(0, i).toLocaleString('default', { month: 'long' })
          });
        }
      } else {
        // For past years, show all months
        for (let i = 0; i < 12; i++) {
          months.push({
            value: String(i + 1).padStart(2, '0'),
            label: new Date(0, i).toLocaleString('default', { month: 'long' })
          });
        }
      }
      setAvailableMonths(months);
    } else {
      setAvailableMonths([]);
    }
  };

  // Handle change for DatePickers
  const handleFromChange = (newDate) => {
    setFromDate(newDate);
  };

  const handleToChange = (newDate) => {
    setToDate(newDate);
  };


return(
<MainCard className="bdr-radius">
<Box>
  <Grid container alignItems="center" sx={{ gap: 1 }}>
    <Grid item xs={12} sm={5} md={2} lg={2} sx={{ gap: 2, display: 'flex', marginRight: '20px' }}>
      <Grid className="payment-icon">
        <MoneyCollectOutlined style={{ color: '#004dff', fontSize: '18px' }} />
      </Grid>
      <FormControl variant="standard" fullWidth sx={{ backgroundColor: 'white' }}>
        <InputLabel id="multi-select-label">Select Classification</InputLabel>
        <Select labelId="multi-select-label" value={selectedDropdownView} onChange={handleChange} label="Select multi" multiple>
          <MenuItem value="Payment">Payment</MenuItem>
          <MenuItem value="Correspondence">Correspondence</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Divider orientation="vertical" flexItem />

    <Grid item xs={12} sm={6} md={2} lg={2} sx={{ gap: 2, display: 'flex', marginLeft: '20px' }}>
      <Grid className="payment-icon calender-icon">
        <CalendarOutlined style={{ color: '#32bb68', fontSize: '18px' }} />
      </Grid>
      <FormControl variant="standard" fullWidth sx={{ backgroundColor: 'white' }}>
        <InputLabel id="view-select-label">Select Period</InputLabel>
        <Select labelId="view-select-label" value={selectedView} onChange={handleViewChange} label="Select View">
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="week">Week</MenuItem>
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="year">Year</MenuItem>
          <MenuItem value="customDate">Custom Date</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid xs={12} sm={6} md={6} lg={6}>
      <Grid container sx={{ display: 'flex', gap: 1 }}>
        {selectedView === 'week' && (
          <>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <FormControl variant="outlined" fullWidth sx={{ backgroundColor: 'white' }}>
                <InputLabel id="view-select-label">Select Year</InputLabel>
                <Select labelId="view-select-label" value={year} onChange={handleYearChange} label="Select Year">
                  <MenuItem value="">Select Year</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <FormControl variant="outlined" fullWidth sx={{ backgroundColor: 'white' }}>
                <InputLabel id="month-select-label">Select Month</InputLabel>
                <Select
                  labelId="month-select-label"
                  value={month}
                  onChange={handleMonthChange}
                  label="Select Month"
                  disabled={!year}
                >
                  <MenuItem value="">Select Month</MenuItem>
                  {[...Array(12)].map((_, i) => (
                    <MenuItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <FormControl variant="outlined" fullWidth sx={{ backgroundColor: 'white' }}>
                <InputLabel id="week-select-label">Select Week</InputLabel>
                <Select
                  labelId="week-select-label"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                  label="Select Week"
                  disabled={!month}
                >
                  <MenuItem value="">Select Week</MenuItem>
                  {availableWeeks.map((weekOption) => (
                    <MenuItem key={weekOption} value={weekOption}>
                      {weekOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        {selectedView === 'month' && (
          <>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <FormControl variant="outlined" fullWidth sx={{ backgroundColor: 'white' }}>
                <InputLabel id="year-select-label">Select Year</InputLabel>
                <Select labelId="year-select-label" value={year} onChange={handleYearChange} label="Select Year">
                  <MenuItem value="">Select Year</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <FormControl variant="outlined" fullWidth sx={{ backgroundColor: 'white' }}>
                <InputLabel id="month-select-label">Select Month</InputLabel>
                <Select
                  labelId="month-select-label"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  label="Select Month"
                  disabled={!year}
                >
                  <MenuItem value="">Select Month</MenuItem>
                  {availableMonths.map((monthOption) => (
                    <MenuItem key={monthOption.value} value={monthOption.value}>
                      {monthOption.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        {selectedView === 'year' && (
          <>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <FormControl variant="outlined" fullWidth sx={{ backgroundColor: 'white' }}>
                <InputLabel id="view-select-label">Select Year</InputLabel>
                <Select labelId="view-select-label" value={year} onChange={(e) => setYear(e.target.value)} label="Select Year">
                  <MenuItem value="">Select Year</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        {selectedView === 'customDate' && (
          <>
            <DesktopDatePicker
              label="From Date"
              inputFormat="MM/dd/yyyy"
              value={fromDate}
              onChange={handleFromChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <DesktopDatePicker
              label="To Date"
              inputFormat="MM/dd/yyyy"
              value={toDate}
              onChange={handleToChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </>
        )}
      </Grid>
    </Grid>
    <Grid item xs={12} sm={1} md={1} lg={1} display="flex" justifyContent="flex-end">
      <Button variant="contained" color="success" onClick={handleSearch}>
        Search
      </Button>
    </Grid>
  </Grid>
</Box>
</MainCard>

);
}


export default SearchFilter;