import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, TextField, Grid, Card, CardContent, Button, MenuItem, ButtonGroup } from '@mui/material';
import axios from 'axios';
import useSWR from 'swr';

import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FilterDrawer = ({ isDrawerOpen, toggleDrawer }) => {



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        top: '20px',
                        width: '400px',
                        height: "95%",
                        right: '20px',
                        borderRadius: "10px"
                    },
                }}
            >
                <Box p={2} role="presentation">
                    <Typography variant="h4">Global Filter</Typography>
                    <Grid sx={{ marginTop: "20px" }}>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{ fontWeight: "600" }}>Period</Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                select
                                minRows={10}
                                maxRows={10}
                                defaultValue="todays"
                                sx={{ marginBottom: 2 }}
                            >
                                <MenuItem value="todays">Todays</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: 2 }}>
                            <Typography variant='h6' sx={{ fontWeight: "600" }}>From Date</Typography>
                            <DatePicker sx={{ width: '100%' }} value={dayjs()} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: 2 }}>
                            <Typography variant='h6' sx={{ fontWeight: "600" }}>To Date</Typography>
                            <DatePicker sx={{ width: '100%' }} value={dayjs()} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: 2 }}>
                            <Typography variant='h6' sx={{ fontWeight: "400", color: "#808080", fontStyle: 'italic' }}>
                                Date Range: <Typography variant='span' sx={{ fontWeight: "600", color: "#808080", fontStyle: 'italic' }}>
                                    {dayjs().format("DD/MM/YYYY")} - {dayjs().format("DD/MM/YYYY")}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{ fontWeight: "600" }}>Location</Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                select
                                minRows={10}
                                maxRows={10}
                                defaultValue="all"
                                sx={{ marginBottom: 2 }}
                            >
                                <MenuItem value="all">All Locations</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{ fontWeight: "600" }}>Payor</Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                select
                                minRows={10}
                                maxRows={10}
                                defaultValue="all"
                                sx={{ marginBottom: 2 }}
                            >
                                <MenuItem value="all">All Payers Selected</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Box pt={1} pb={1} sx={{ width: '100%', background: '#fff', borderRadius: "10px",  textAlign: 'right', border: "1px #E5E5E5 solid", position: 'absolute', bottom: 0, right: 1 }}>
                    <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                        sx={{ mr: 2, border: 0, p: 1, borderRadius: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
                        >
                        <Button onClick={()=>setActiveFilter("today")} className={["filter-btn"].join(" ")}>Clear</Button>
                        <Button onClick={()=>setActiveFilter("week")} className={["filter-btn", "active"].join(" ")}>Apply</Button>
                    </ButtonGroup>
                </Box>
            </Drawer>
        </LocalizationProvider>

    );
}

export default FilterDrawer