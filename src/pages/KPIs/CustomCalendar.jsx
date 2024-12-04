import React, { useState, useRef } from 'react';
import { TextField, MenuItem, Button, Popper, Paper, CardContent, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import YearPicker from 'components/KPI/YearPicker';
import dayjs from 'dayjs';
import Transitions from 'components/@extended/Transitions';
import { useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MainCard from 'components/MainCard';
import {
    FilterOutlined,
} from '@ant-design/icons';

const CustomCalendar = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = React.useState(null)
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedQOption, setSelectedQOption] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme()

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleCalendarDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleQuartelyDropdownChange = (e) => {
        setSelectedQOption(e.target.value)
    }
    return (
        <div>
            <Button variant="outlined"
                sx={{ padding: "7px", marginTop: "4px" }}
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true" type="button" onClick={handleToggle}
            >
                <FilterOutlined />
                <span style={{ marginLeft: 5 }}>Filter</span>
            </Button>
            <Popper
            sx={{position:"absolute", zIndex:"9999"}}
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
                        <Paper sx={{ boxShadow: theme.customShadows.z1, width: 290, minWidth: 240, maxWidth: { xs: 250, md: 290 } }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard elevation={0} border={false} content={false}>
                                    <CardContent sx={{ px: 2.5, pt: 3 }}>
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
                                                    // sx={{ minWidth: '200px', marginTop: "5px" }}
                                                    onChange={(newValue) => setSelectedMonth(newValue)}
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
                                                    // fullWidth
                                                    margin="normal"
                                                    className='header-input-border  custom-select'
                                                >
                                                    <MenuItem value="q1">Q1</MenuItem>
                                                    <MenuItem value="q2">Q2</MenuItem>
                                                    <MenuItem value="q3">Q3</MenuItem>
                                                    <MenuItem value="q4">Q4 </MenuItem>
                                                </TextField>
                                            )}

                                            {(selectedOption === 'year' || selectedOption === 'quarterly') && (
                                                <Box className='header-input-border  custom-select' sx={{ marginTop: "5px" }}>
                                                    {/* <TextField label="Year" sx={{ width: "150px" }} margin="normal" /> */}
                                                    <YearPicker

                                                        value={selectedYear}
                                                        onChange={(newYear) => {
                                                            setSelectedYear(newYear);
                                                            setSelectedDate(null); // Clear Month-Year field
                                                        }}
                                                        label="Choose a Year"
                                                    />
                                                </Box>
                                            )}

                                            {selectedOption === 'customDate' && (
                                                <Box sx={{ display: "flex", gap: "5px" }}>
                                                    <TextField
                                                        className='header-input-border custom-select'
                                                        label="From Date"
                                                        type="date"
                                                        value={fromDate}
                                                        onChange={(e) => setFromDate(e.target.value)}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    <TextField
                                                        className='header-input-border custom-select'
                                                        label="To Date"
                                                        type="date"
                                                        value={toDate}
                                                        onChange={(e) => setToDate(e.target.value)}

                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Box>
                                            )}


                                        </LocalizationProvider>
                                    </CardContent>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>



        </div>
    )
}

export default CustomCalendar