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
  IconButton
} from '@mui/material';
// import LinearProgress from '@mui/material';
import LinearWithLabel from 'components/correspndence/LinearWithLabel';
import axios from 'axios';


import { useTheme } from '@mui/material/styles';


import { TableWidgetCard1, TableWidgetCard2 } from 'components/correspndence/TableWidgetCard';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import CustomDialog from 'components/correspndence/CustomDialog';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';


import MainCard from 'components/MainCard';
import {
  FilterOutlined,
  SearchOutlined,
  FileOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import { getMarginRight } from 'react-table-sticky';


import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';
const DashBoard = () => {
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
    console.log(`Clicked on column: ${columnId}, data:`, rowData)
    navigate(`/correspndence/documentsList/${toUrlFormat(rowData.name)}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await axios.get(CORRESPONDENCE_ENDPOINTS.fetchConfScoreInfo);
      const data = response.data;

      console.log('API response:', data); // Log full API response

      if (data) {
        setOverViewData(data);
        console.log(OverviewData)

        setWidgetData1([
          {
            title: 'Total Document',
            count: data.totalDoc.toString(),
            percentage: 20.3,
            isLoss: false,
            invoice: '30% has been last week',
            color: theme.palette.success
          },
          {
            title: 'Processed Document',
            count: data.processedDoc.toString(),
            percentage: -8.73,
            isLoss: true,
            invoice: '80% Previous week',
            color: theme.palette.error
          }
        ]);

        // Ensure documentMetrics exists and is correctly mapped
        if (data.documentMetrics) {
          console.log(data.documentMetrics.metricsProcessed)
          setStatusValues({
            processed: data.documentMetrics.metricsProcessed || 0,
            inProgress: data.documentMetrics.metricsInProgress || 0,
            needAttention: data.documentMetrics.metricsAttention || 0
          });
          console.log(statusValues)

          setWidgetData2([
            {
              title: 'Document Metrics',
              count: data.totalDoc.toString(),
              percentage: 1.73,
              isLoss: true,
              invoice: '89% Previous week',
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


  return (
    <>
      <Grid container style={{ marginBottom: '20px', padding: '0px' }}  >
        <Grid xs={12} sx={{ bgcolor: "#ffffff", display: "flex", padding: 2 }} alignItems="center">
          <Grid item xs={6}  >
            <Typography variant="h3">Overview</Typography>
          </Grid>

          {/* Button Group Section */}
          <Grid item xs={12} sm={6}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-end' },
              alignItems: 'center',
              mt: { xs: 2, sm: 0 },
            }}
          >
            <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              sx={{ mr: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
            >
              <Button>Week</Button>
              <Button>Month</Button>
              <Button>3 Months</Button>
              <Button>Custom</Button>
            </ButtonGroup>
            <Button variant="outlined" sx={{ display: 'flex', alignItems: 'center' }}>
              <FilterOutlined />
              <span style={{ marginLeft: 5 }}>Filter</span>
            </Button>
          </Grid>
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
                  isLoss={data.isLoss}
                  invoice={data.invoice}
                  color={data.color.main}
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
                  isLoss={data.isLoss}
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
                  {/* <Button variant='outlined' startIcon={<FileOutlined />}>Document Type</Button>
                  <IconButton
                    sx={{ color: "#1677ff" }}
                    onClick={handleRefresh}
                  >
                    <RefreshOutlinedIcon />
                  </IconButton> */}
                </Grid>
              </Grid>

              <ReUsableTable
                columns={columns}
                rows={filteredData}
                clickableColumns={['name']}
                onClickHandler={handleClick}
              // onClickHandler={(row) => handleClick(row)}
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
        maxWidth="md"
      >
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            {/* Multi-File Choose File */}
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" style={{ color: '#1677ff' }}>Choose Files:</Typography>
              <input type="file" multiple onChange={handleFileChange} />
            </Grid>

            {/* Dropdown */}
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
                sx={{ mt: 2, width: '100%' }}
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