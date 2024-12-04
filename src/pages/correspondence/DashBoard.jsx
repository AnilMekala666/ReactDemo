/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Grid,
  Typography, Box, Button, ButtonGroup, InputAdornment, TextField, Select, MenuItem, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Popover
} from '@mui/material';
// import LinearProgress from '@mui/material';
import LinearWithLabel from 'components/correspndence/LinearWithLabel';
import axios from 'axios';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useTheme } from '@mui/material/styles';


import { TableWidgetCard1, TableWidgetCard2 } from 'components/correspndence/TableWidgetCard';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import CustomDialog from 'components/correspndence/CustomDialog';
import NavigateToHome from './correspondenceAuth/NavigateToHome';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import YearPicker from 'components/KPI/YearPicker';
import dayjs from 'dayjs';


import MainCard from 'components/MainCard';
import {
  FilterOutlined,
  SearchOutlined,
  FileOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import { getMarginRight } from 'react-table-sticky';
import { useSelector, useDispatch } from 'react-redux';

import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';
import { setIsCDAdataCleared, setIsRCMdataCleared } from 'store/reducers/userSlice';
import { format } from 'date-fns';

const DashBoard = () => {
  const isCDAdataCleared = useSelector((state) => state.user.isCDAdataCleared);
  const isRCMdataCleared = useSelector((state) => state.user.isRCMdataCleared);
  const token = localStorage.getItem("correspondenceAutToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectModalDropdown, SetSelectModalDropdown] = useState('Option1');
  const [tableData, setTableData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [OverviewData, setOverViewData] = useState(null)
  const [widgetData1, setWidgetData1] = useState([]);
  const [widgetData2, setWidgetData2] = useState([]);
  const [statusValues, setStatusValues] = useState({
    processed: 0,
    inProgress: 0,
    needAttention: 0
  });
  const [overviewTableData, setOverviewTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedFiles] = useState(null);
  const [fileNames, setFileNames] = useState([]);


  //calendar
  const [selectedOption, setSelectedOption] = useState(''); // Tracks the dropdown value
  const [fromDate, setFromDate] = useState(''); // Tracks From Date
  const [toDate, setToDate] = useState(''); // Tracks To Date
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [selectedYear, setSelectedYear] = React.useState(null)
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedQOption, setSelectedQOption] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCalendarDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleQuartelyDropdownChange = (e) => {
    setSelectedQOption(e.target.value)
  }
  // const handleFileChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   setFiles(selectedFiles);
  // };

  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   setFileNames(files.map((file) => file.name));
  // };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };
  const handleDropdownChange = (e) => {
    SetSelectModalDropdown(e.target.value)
  }

  const handleRunPrediction = async () => {
    console.log(files)
    const fileNames = files.map((file) => file.name.replace(/\.pdf$/i, ''));

    try {
      const payload = { fileNames: fileNames };
      console.log(payload);
      console.log(payload)
      const response = await axios.post('https://ican-manage-chit-dem.cognitivehealthit.com/Correspondence/fetchQAFileData', payload)
      console.log(response)
      const fileData = response.data.map((item) => ({
        fileName: item.filename || "Unknown File",
        arborDocumentType: item.documentType || "Unknown Document Type",
        arborConfidenceScore: item.configScore ? parseFloat(item.configScore).toFixed(2) : "0.00",
      }));
      setTableData(fileData);

      fetchData();
      setFiles([])

    } catch (error) {
      console.log(error)
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate data
  const paginatedData = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);



  const columns = [
    { id: 'name', label: 'Document Name' },
    { id: 'totalDocument', label: 'Total Document' },
    {
      id: 'processed',
      label: 'Processed',
      // minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString(),
    },
    {
      id: 'inProgress',
      label: 'Waiting for User Validation',
      // minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString(),
    },
    {
      id: 'needAttention',
      label: 'Ready to Process',
      // minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString(2),
    },
  ];

  function toUrlFormat(str) {
    return str.replace(/\s+/g, '-'); // Replace spaces with hyphens
  }


  const handleClick = (columnId, rowData) => {
    if (rowData.name !== 'EOB' && rowData.name !== 'Medical records request') {
      console.log("Document is not clickable due to prediction status.");
      return; // Prevent navigation if the prediction is not EOB or MEDICAL RECORDS REQUEST
    }
    console.log(`Clicked on column: ${columnId}, data:`, rowData);
    navigate(`/correspndence/documentsList/${toUrlFormat(rowData.name)}`);
  };

  useEffect(() => {
    if (isCDAdataCleared || isRCMdataCleared) {
      fetchData();
    }
  }, [isCDAdataCleared, isRCMdataCleared]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await axios.get(CORRESPONDENCE_ENDPOINTS.fetchConfScoreInfo);
      const data = response.data;
      if (data) {
        setOverViewData(data);
        dispatch(setIsCDAdataCleared(false));
        dispatch(setIsRCMdataCleared(false));
        console.log(OverviewData)
        setWidgetData1([
          {
            title: 'Total Document',
            count: data.totalDoc.toString(),
            percentage: 20.3,
            // isLoss: false,
            invoice: '',
            // color: theme.palette.success
          },
          {
            title: 'Processed Document',
            count: data.processedDoc.toString(),
            percentage: -8.73,
            // isLoss: true,
            invoice: '',
            // color: theme.palette.error
          }
        ]);

        // Ensure documentMetrics exists and is correctly mapped
        if (data.documentMetrics) {
          console.log(data.documentMetrics.metricsProcessed)
          setStatusValues({
            processed: data.documentMetrics.metricsProcessed || 0,
            inProgress: data.documentMetrics.metricsReadyToProcess || 0,
            needAttention: data.documentMetrics.metricsWaitingforUserValidation || 0
          });
          console.log(statusValues)

          setWidgetData2([
            {
              title: 'Document Metrics',
              count: data.totalDoc.toString(),
              percentage: 1.73,
              // isLoss: true,
              invoice: '',
              color: theme.palette.error,
              status: 'processed',
              value: statusValues || 0,
              statusValues: statusValues

            }
          ]);
        }

        //table data

        if (data.predictionDetails) {
          console.log(data.predictionDetails)
          const tableViewdata = data.predictionDetails
          const formattedData = tableViewdata.map((item, index) => ({
            index: index + 1,
            name: item.prediction,
            totalDocument: item.totalDoc,
            processed: item.processed,
            inProgress: item.waitingforUserValidation,
            needAttention: item.readyToProcess,
          }))
          setOverviewTableData(formattedData);
        }
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoader(false);
    }
  };

  const filteredData = overviewTableData.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRefresh = () => {
    console.log("clcik")
  }

  const formattedDate = format(new Date(), 'yyyy-MM-dd');

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <>
      <Grid container style={{ marginBottom: '20px', padding: '0px' }}  >
        <Grid xs={12} sx={{ bgcolor: "#ffffff", display: "flex", padding: 1, mt: 1 }} alignItems="center">
          <Grid item xs={4} sx={{ display: "flex" }}>
            {token && <NavigateToHome />}
            <Typography variant="h3">Overview</Typography>
          </Grid>

          {/* Button Group Section */}
          <Grid item xs={8} sm={12}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-end', gap: 3 },
              alignItems: 'center',
              // mt: { xs: 2, sm: 0 },
            }}
          >
            {/* <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              sx={{ mr: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
            >
              <Button>Week</Button>
              <Button>Month</Button>
              <Button>3 Months</Button>
              <Button>Custom</Button>
            </ButtonGroup> */}
          <Button variant="outlined"
              onClick={(event) => {
                handlePopoverOpen(event);
              }}
            >
              <FilterOutlined />
              <span style={{ marginLeft: 5 }}>Filter</span>
            </Button>
          </Grid>
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
            {/* <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center' }}>
              choose <span sx={{ fontSize: '20px', fontWeight: '800' }}>Month/Year</span> or <span>Year</span>
            </Typography>

           
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
            </Box> */}

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
                  sx={{ marginTop: "5px" }}
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
                <Box >
                  {/* <TextField label="Year" sx={{ width: "150px" }} margin="normal" /> */}
                  <YearPicker
                    fullWidth
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
                    // className='header-input-border custom-select'
                    fullWidth
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
                    fullWidth
                    // className='header-input-border custom-select'
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

              <Button
                sx={{ margin: "10px 0px", float: "right" }}
                variant="contained"
              // onClick={() => {
              //   if (selectedDate) {
              //     const monthId = selectedDate.month() + 1; // 1-based month
              //     const year = selectedDate.year();
              //     dispatch(updatePayloadDate({ monthId, year }));
              //   } else if (selectedYear) {
              //     const year = selectedYear;
              //     dispatch(updatePayloadDate({ monthId: 0, year }));
              //   }
              //   handlePopoverClose();
              // }}

              >
                Apply
              </Button>
            </LocalizationProvider>
          </Box>
        </Popover>
        </Grid>
      </Grid>



      {loader ? (
        <div className='loading'>
          <span className="loading-text">Loading</span>
        </div>
      ) :
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {widgetData1.map((data, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box>
                <TableWidgetCard1
                  title={data.title}
                  count={data.count}
                  percentage={data.percentage}
                  // isLoss={data.isLoss}
                  invoice={data.invoice}
                // color={data.color.main}
                // isActive={index === activeChart}
                />
              </Box>
            </Grid>
          ))}
          {widgetData2.map((data, index) => (
            <Grid item xs={12} sm={6} md={6} key={index} >
              <Box>
                <TableWidgetCard2
                  title={data.title}
                  count={data.count}
                  percentage={data.percentage}
                  // isLoss={data.isLoss}
                  invoice={data.invoice}
                  color={data.color.main}
                  status={data.status}  // Pass the status
                  // value={Math.min(data.statusValues[data.status], 100)}
                  statusValues={statusValues}
                // isActive={index === activeChart}
                />
              </Box>
            </Grid>
          ))}


          {/* <MainCard sx={{ m: "20px" }}> */}
          <Grid container xs={12} sx={{ bgcolor: "#ffffff", m: "20px 0px 0px 20px", padding: "20px" }} >
            <Grid item xs={12}>
              <Grid container sx={{ marginBottom: "20px" }}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    size="medium"
                    placeholder="Search by Document Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ mr: 2, width: '320px' }}  // Adjust width and margin as needed
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Button variant='outlined' sx={{ mr: 2 }} onClick={() => setDialogOpen(true)}>Upload document</Button>
                </Grid>
              </Grid>

              <ReUsableTable
                columns={columns}
                rows={filteredData}
                clickableColumns={['name']}
                onClickHandler={handleClick}
              />
            </Grid>
          </Grid>
        </Grid>
      }


      {/* </MainCard> */}
      <CustomDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setFiles([])
        }}
        title="Upload Document"
        maxWidth="sm"
      >
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="top" sx={{ flexDirection: { xs: 'column', sm: 'row' }, paddingTop: '0px' }}>
            {/* Multi-File Choose File */}
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" style={{ color: '#1677ff' }}>Choose Files:</Typography>
              <input type="file" multiple onChange={handleFileChange} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="body1" style={{ color: '#1677ff' }}>Select Option:</Typography>
              <Select
                value={selectModalDropdown}
                onChange={handleDropdownChange}
                displayEmpty
                fullWidth
              >
                <MenuItem value="Option1">iCAN Classifier-Arbor</MenuItem>
                <MenuItem value="Option2">iCAN Classifier-Aptus</MenuItem>
              </Select>
            </Grid>

            {/* Run Prediction Button */}
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                onClick={handleRunPrediction}
                sx={{ mt: 3, width: '100%' }}
                startIcon={<ShareAltOutlined />}
              >
                Run Prediction
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Display table with uploaded file information after Run Prediction */}
        {tableData.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 300 }}>
            <Table stickyHeader>
              {/* Table Head */}
              <TableHead>
                <TableRow>
                  <TableCell rowSpan={2} align="center">File Name</TableCell>
                  <TableCell colSpan={2} align="center">Ican-classifier-Arbor</TableCell>
                  <TableCell colSpan={2} align="center">Ican-classifier-Aptus</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Document Type</TableCell>
                  <TableCell align="center">Confidence Score</TableCell>
                  <TableCell align="center">Document Type</TableCell>
                  <TableCell align="center">Confidence Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => {
                  console.log(paginatedData)
                  const arborConfidenceScore = parseFloat(row.arborConfidenceScore);

                  return (
                    <TableRow key={index}>
                      <TableCell>{row.fileName}</TableCell>
                      <TableCell align="center">{row.arborDocumentType}</TableCell>
                      <TableCell align="center">
                        {/* Confidence Score with Progress Bar */}
                        <LinearWithLabel
                          variant="determinate"
                          // value={arborProgress}
                          value={parseFloat(row.arborConfidenceScore) * 100 / 100}
                          sx={{ height: 18 }}
                        />

                      </TableCell>
                      <TableCell align="center">{row.arborDocumentType}</TableCell>
                      <TableCell align="center">

                        <LinearWithLabel
                          variant="determinate"
                          value={parseFloat(((row.arborConfidenceScore) * 100 / 100)) - 7}
                          sx={{ height: 18 }}
                        />

                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={tableData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
        ) : (
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            No data available
          </Typography>
        )}
      </CustomDialog>

    </>
  )
}

export default DashBoard