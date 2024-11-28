/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, TextField, Grid, Stack, CircularProgress, Button, Typography, IconButton, Dialog } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Checkbox, Tabs } from '@mui/material';
import MainCard from 'components/MainCard';
import { FilterOutlined } from '@ant-design/icons';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ReusableTable from 'components/tableComponent/Table';
import QaReusableTable from './qaTable';
import axios from 'axios';
import moment from 'moment'; // Import Moment.js
import { ClearIcon } from '@mui/x-date-pickers';
import { CheckSquareOutlined, HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { border, borderRadius, fontSize, padding } from '@mui/system';
import { color } from 'framer-motion';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar
import MuiAlert from '@mui/material/Alert'; // Import Alert for Snackbar
import Menu from '@mui/material/Menu';
import { ENDPOINTS } from '../rest/api';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import pdfFile from 'assets/third-party/296_1.pdf'; // Adjust the path as necessary
// const getStyles = (name, selectedView, theme) => {
//   return {
//     fontWeight: selectedView.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
//   };
// };

// import * as pdfjs from 'pdfjs-dist/build/pdf'; // Import pdfjs from pdfjs-dist
// import { Worker, Viewer } from '@react-pdf-viewer/core'; // Import Worker and Viewer

// // Set the workerSrc to the path of the PDF worker
// // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`; // Update to match the API version 

function QaMindPathPage() {
  // const [selectedView, setSelectedView] = useState('');
  const [today, setToday] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [week, setWeek] = useState('');
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState('Payments');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDropdownView, setSelectedDropdownView] = useState(['Payments', 'Correspondence']); // Initialize with default values
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [comments, setComments] = useState('');
  const [value, setValue] = useState('AZ');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [modalOpen, setMOdalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const [states, setStates] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingClassifications, setLoadingClassifications] = useState(true);
  const [loadingPredictions, setLoadingPredictions] = useState(true);
  const [loadingTableData, setLoadingTableData] = useState(true);
  // const [fromDate, setFromDate] = useState(null);
  // const [toDate, setToDate] = useState(null);
  const [customFromDate, setCustomFromDate] = useState(null);
  const [customToDate, setCustomToDate] = useState(null);
  const [selectedStates, setSelectedStates] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('ALL'); // Default tab
  const [selectedState, setSelectedState] = useState('NC'); // Default state
  const [classificationFilesList, setClassificationFilesList] = useState([]); // State to hold API response data
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [pageIndex, setPageIndex] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [totalCount, setTotalCount] = useState(0); // State to hold total count
  const [isSearchApplied, setIsSearchApplied] = useState(false); // New state to track search application
  const [pageCount, setPageCount] = useState(0); // Define pageCount state
  // const [pdfUrl, setPdfUrl] = useState(''); // State to hold the PDF URL
  const [pdfUrl, setPdfUrl] = useState('https://ican-manage-chit-dem.cognitivehealthit.com/Correspondence/showLabelingpdf?id=125658'); // Set the initial PDF URL
  const [refreshPage, setRefreshPage] = useState(false); // State to hold the PDF URL
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar open
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // State for snackbar severity
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false); // State to track save success
  const [labelStatus, setLabelStatus] = useState(''); // State to hold the label status
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedView, setSelectedView] = useState('today'); // Set initial view to 'today'
  const [fromDate, setFromDate] = useState(moment().subtract(1, 'days').format('YYYY-MM-DD')); // Set fromDate to yesterday
  const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD')); // Set toDate to today



  const breadcrumbLinks = [
    { title: 'Home', to: '/dashboard/analytics' },
    { title: 'Mindpath', to: '/patient/mindpath' }
  ];


  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_STATE_LIST);
        setStates(response.data);
      } catch (err) {
        setError('Error fetching states');
      } finally {
        setLoadingStates(false);
      }
    };

    const fetchClassifications = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_CLASSIFICATION_LIST);

        setClassifications(response.data); // Assuming response.data is an array of classifications
      } catch (err) {
        setError('Error fetching classifications');
      } finally {
        setLoadingClassifications(false);
      }
    };

    const fetchPredictions = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_PREDICTION_LIST);

        setPredictions(response.data); // Assuming response.data is an array of classifications
      } catch (err) {
        setError('Error fetching Predictions');
      } finally {
        setLoadingPredictions(false);
      }
    };


    fetchStates();
    fetchClassifications();
    fetchPredictions();
  }, []);


  const handleViewChange = (event) => {
    const view = event.target.value;
    setSelectedView(view);

    // Log the type of year and month to see if they're strings or numbers
    console.log("Year type:", typeof year, "Year value:", year);
    console.log("Month type:", typeof month, "Month value:", month);


    // Reset other dropdowns based on the selected view
    setYear(''); // Reset year
    setMonth(''); // Reset month
    setWeek(''); // Reset week
    //  setFromDate(null); // Reset from date
    //  setToDate(null); // Reset to date
    //  setCustomFromDate(null); // Reset custom from date
    //  setCustomToDate(null); // Reset custom to date

    // Only reset the from and to dates if the selected view is not customDate
    if (view !== 'customDate') {
      setFromDate(null); // Reset from date
      setToDate(null); // Reset to date
      setCustomFromDate(null); // Reset custom from date
      setCustomToDate(null); // Reset custom to date
    }



    const today = new Date();

    if (view === 'today') {
      const todayString = today.toISOString().split('T')[0];
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];
      setFromDate(yesterdayString);
      setToDate(todayString);
    } else if (view === 'week') {
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const endOfWeek = new Date(today.setDate(today.getDate() + 6));
      setFromDate(startOfWeek.toISOString().split('T')[0]);
      setToDate(endOfWeek.toISOString().split('T')[0]);
    } else if (view === 'month') {
      // const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      // const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      // setFromDate(startOfMonth.toISOString().split('T')[0]);
      // setToDate(endOfMonth.toISOString().split('T')[0]);

      // Set the fromDate to the first day of the selected month
      const startOfMonth = new Date(year, month - 1, 1); // First day of the month
      // Set the toDate to the last day of the selected month
      const endOfMonth = new Date(year, month, 0); // Last day of the month
      setFromDate(startOfMonth.toISOString().split('T')[0]);
      setToDate(endOfMonth.toISOString().split('T')[0]);
      console.log(fromDate);
      console.log(toDate);
    } else if (view === 'year') {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31);
      setFromDate(startOfYear.toISOString().split('T')[0]);
      setToDate(endOfYear.toISOString().split('T')[0]);
    }
  };



  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
    setPageIndex(0); // Reset page index when tab changes
    setPageSize(10); // Reset page size to initial value
    setRefreshPage(!refreshPage);
    // fetchData(0, 10); // Call fetchData with reset pagination parameters
    setLoading(true); // Set loading state to true
  };

  const theme = {
    typography: {
      fontWeightRegular: 400,
      fontWeightMedium: 500
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


  const columns = useMemo(() => [
    {
      header: 'File Name',
      accessorKey: 'filename',
      cell: ({ row }) => ( // Use row to access the entire row data
        <Button style={{ color: 'black' }} onClick={() => handleFileClick(row.original)}> {/* Pass the entire row data */}
          {row.original.filename}.pdf {/* Display the filename */}
        </Button>
      ),
      meta: {
        className: 'cell-center' // Center align the column
      }
    },
    {
      header: 'Classification Type',
      accessorKey: 'classificationType',
      meta: {
        className: 'cell-center' // Center align the column
      }
    },
    {
      header: 'Document Type',
      accessorKey: 'ican_prediction', // Ensure this matches the data structure
      meta: {
        className: 'cell-center' // Center align the column
      }
    },
    {
      header: 'Confidence Score',
      accessorKey: 'conf_score', // Ensure this matches the data structure
      cell: ({ getValue }) => getValue().toFixed(1), // Format to 3 decimal places
      meta: {
        className: 'cell-center' // Center align the column
      }
    },
    {
      header: 'Labelling Status',
      accessorKey: 'labelling_status',
      cell: ({ getValue }) => {
        const status = getValue();
        return status === 'Non Labeled' ? (
          <Button size='small' variant="contained" color="warning" sx={{ backgroundColor: 'orange', color: 'white' }}>
            {status}
          </Button>
        ) : (
          <span>{status}</span>
        );
      },
      meta: {
        className: 'cell-center' // Center align the column
      }
    },
    {
      header: 'Batch Date',
      accessorKey: 'batchDate',
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(), // Format date
      meta: {
        className: 'cell-center' // Center align the column
      }
    },
    {
      header: 'Payment Amount',
      accessorKey: 'amount',
      cell: ({ getValue }) => `$${getValue().toFixed(1)}`, // Format amount
      meta: {
        className: 'cell-center' // Center align the column
      }
    }
  ], []);


  const handleFileClick = async (rowData) => {
    console.log('Selected File Data:', rowData); // Log the entire clicked row data
    setSelectedFile(rowData); // Store the entire clicked row data
    setFeedback(rowData?.prediction || ''); // Set feedback to the prediction value
    setDrawerOpen(true);

    // Determine the label status based on the comparison of ican_prediction and prediction
    const status = rowData?.ican_prediction === rowData?.prediction ? 'Non Labeled' : 'Labeled';
    setLabelStatus(status); // Set the label status in state
    console.log(status)


    const originalFilename = rowData?.filename || "default_filename.pdf"; // Get the original filename
    const filenameWithoutDate = originalFilename.replace(/_\d{2}-\d{2}-\d{4}/, ''); // Remove the date part
    const pdfUrl = ENDPOINTS.SHOW_QA_PDF(filenameWithoutDate); // Use the SHOW_QA_PDF endpoint to construct the URL

    try {
      // Call the SHOW_QA_FILE endpoint using GET
      const response = await axios.get(pdfUrl);
      console.log('Response from SHOW_QA_FILE:', response.data);

      // Assuming the response contains the URL for the PDF
      if (response.data && response.data.pdfUrl) {
        setPdfUrl(response.data.pdfUrl); // Set the PDF URL from the response
      } else {
        console.error('No PDF URL returned in response');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error fetching PDF:', error.response.data);
        console.error('Status Code:', error.response.status);
        // Show a user-friendly message based on the status code
        if (error.response.status === 404) {
          setSnackbarMessage('PDF not found. Please check the filename.'); // Inform the user
        } else {
          setSnackbarMessage('Error fetching PDF: ' + error.response.data.message);
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error fetching PDF:', error.message);
        setSnackbarMessage('Error fetching PDF: ' + error.message);
      }
    }

  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setFeedback(''); // Reset feedback state
  };



  // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckCircleOutlined fontSize="small" />;
  const names = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];



  // const handleSubmit = async () => {
  //   console.log('Submitted');



  //    if (!feedback) {

  //     setSnackbarMessage('Please select a feedback option.'); 
  //     setSnackbarSeverity('error'); 
  //     setSnackbarOpen(true); 
  //     return; 
  // }


  //   const originalFilename = selectedFile?.filename || "default_filename.pdf"; 
  //   const filenameWithoutDate = originalFilename.replace(/_\d{2}-\d{2}-\d{4}/, ''); 

  //   const payload = {
  //     filename: `${filenameWithoutDate}.pdf`, 
  //     labeling: feedback 
  //   };

  //   try {

  //       const response =  await axios.post(ENDPOINTS.VIEW_QA_FILE, payload);
  //       console.log('File saved successfully:', payload);

  //       setSnackbarMessage('Saved successfully'); 
  //       setSnackbarOpen(true); // Open the snackbar
  //       setSnackbarSeverity('success'); // Set severity to error

  //     if (response.data === true) { // Adjust this condition based on your API response structure
  //       setIsSaveSuccessful(!isSaveSuccessful); // Set save success state


  //    // Call LOCKBOX FILES API after successful save
  //    fetchClassificationFiles(pageIndex, pageSize); // Ensure this function is called to fetch data
  //   }

  //   } catch (error) {
  //       console.error('Error saving file:', error);

  //        // Show snackbar on error
  //        setSnackbarMessage('Error saving file: ' + (error.response?.data?.message || 'Unknown error')); // Set the snackbar message
  //        setSnackbarSeverity('error'); // Set severity to error
  //        setSnackbarOpen(true); // Open the snackbar
  //   }
  // };



  const handleSubmit = async (actionType) => {
    console.log('Submitted');

    // Check if feedback is selected
    if (!feedback) {
      // Show snackbar error if no feedback is selected
      setSnackbarMessage('Please select a feedback option.'); // Set the snackbar message
      setSnackbarSeverity('error'); // Set severity to error
      setSnackbarOpen(true); // Open the snackbar
      return; // Exit the function early
    }

    // Prepare the payload for the API call
    const { fromDate, toDate } = calculateDates(); // Get the calculated dates
    const originalFilename = selectedFile?.filename || "default_filename.pdf"; // Get the original filename
    const filenameWithoutDate = originalFilename.replace(/_\d{2}-\d{2}-\d{4}/, ''); // Remove the date part

    const payload = {
      fromDate: fromDate, // Use the calculated fromDate
      toDate: toDate, // Use the calculated toDate
      states: selectedTab === 'ALL' ? states : [selectedTab], // Use selected tab for states
      classType: selectedDropdownView, // Use selected classifications
      filename: `${filenameWithoutDate}.pdf`, // Append .pdf extension to the filename without the date
      labeling: feedback, // Use the selected feedback as labeling
      fileIndex: selectedFile?.customIndex || 0, // Assuming fileIndex is part of the selected file data
      type: actionType // Set the type based on the action
    };

    try {
      // Trigger the SAVE-QA_FILE endpoint
      const response = await axios.post(ENDPOINTS.VIEW_QA_FILE, payload);
      console.log('File saved successfully:', payload);
      // Show snackbar on successful save
      setSnackbarMessage('Saved successfully'); // Set the snackbar message
      setSnackbarOpen(true); // Open the snackbar
      setSnackbarSeverity('success'); // Set severity to success

      // // Check if the response is true
      // if (response.data === true) { // Adjust this condition based on your API response structure
      //   setIsSaveSuccessful(!isSaveSuccessful); // Set save success state

      //   // Call LOCKBOX FILES API after successful save
      //   fetchClassificationFiles(pageIndex, pageSize); // Ensure this function is called to fetch data
      // }

      // Check if the response contains classification files
      if (response.data.classificationFilesList && response.data.classificationFilesList.length > 0) {
        const nextFile = response.data.classificationFilesList[0]; // Get the first file from the response

        // Update the selected file state with the next file's data
        setSelectedFile(nextFile); // Set the selected file to the next file
        setFeedback(nextFile.prediction || ''); // Set feedback to the prediction value
        setDrawerOpen(true); // Open the drawer to show the next file's details
        setIsSaveSuccessful(!isSaveSuccessful); // Set save success state
        // Optionally, you can also set the label status based on the next file
        const status = nextFile.ican_prediction === nextFile.prediction ? 'Non Labeled' : 'Labeled';
        setLabelStatus(status); // Set the label status in state

        // Call LOCKBOX FILES API after successful save
        fetchClassificationFiles(pageIndex, pageSize); // Ensure this function is called to fetch data

      }


    } catch (error) {
      console.error('Error saving file:', error);

      // Show snackbar on error
      setSnackbarMessage('Error saving file: ' + (error.response?.data?.message || 'Unknown error')); // Set the snackbar message
      setSnackbarSeverity('error'); // Set severity to error
      setSnackbarOpen(true); // Open the snackbar
    }
  };


  const handleNextFile = async () => {
    if (!selectedFile) {
      console.error('No file selected for next action.');
      return;
    }
    // Prepare the payload for the API call
    const { fromDate, toDate } = calculateDates(); // Get the calculated dates
    const originalFilename = selectedFile?.filename || "default_filename.pdf"; // Get the original filename
    const filenameWithoutDate = originalFilename.replace(/_\d{2}-\d{2}-\d{4}/, ''); // Remove the date part

    const payload = {
      fromDate: fromDate, // Use the calculated fromDate
      toDate: toDate, // Use the calculated toDate
      states: selectedTab === 'ALL' ? states : [selectedTab], // Use selected tab for states
      classType: selectedDropdownView, // Use selected classifications
      filename: `${filenameWithoutDate}.pdf`, // Append .pdf extension to the filename without the date
      labeling: selectedFile.prediction, // Use the selected feedback as labeling
      fileIndex: selectedFile?.customIndex || 0, // Assuming fileIndex is part of the selected file data
      type: 3 // Set the type based on the action
    };

    try {
      // Trigger the SAVE-QA_FILE endpoint
      const response = await axios.post(ENDPOINTS.VIEW_QA_FILE, payload);

      // Check if the response contains classification files
      if (response.data.classificationFilesList && response.data.classificationFilesList.length > 0) {
        const nextFile = response.data.classificationFilesList[0]; // Get the first file from the response

        // Update the selected file state with the next file's data
        setSelectedFile(nextFile); // Set the selected file to the next file
        setFeedback(nextFile.prediction || ''); // Set feedback to the prediction value
        setDrawerOpen(true); // Open the drawer to show the next file's details

        // Optionally, you can also set the label status based on the next file
        const status = nextFile.ican_prediction === nextFile.prediction ? 'Non Labeled' : 'Labeled';
        setLabelStatus(status); // Set the label status in state

        // Call SHOW_QA_FILE endpoint with the updated filename
        const updatedPdfUrl = ENDPOINTS.SHOW_QA_PDF(nextFile.filename); // Construct the URL for the updated file
        const pdfResponse = await axios.get(updatedPdfUrl); // Call the SHOW_QA_FILE endpoint

        // Assuming the response contains the URL for the PDF
        if (pdfResponse.data && pdfResponse.data.pdfUrl) {
          setPdfUrl(pdfResponse.data.pdfUrl); // Set the PDF URL from the response
        } else {
          console.error('No PDF URL returned in response');
        }

        // Call LOCKBOX FILES API after successful save
        fetchClassificationFiles(pageIndex, pageSize); // Ensure this function is called to fetch data

      }


    } catch (error) {
      console.error('Error fetching file:', error);

      // Show snackbar on error
      setSnackbarMessage('Error fetching file: ' + (error.response?.data?.message || 'Unknown error')); // Set the snackbar message
      setSnackbarSeverity('error'); // Set severity to error
      setSnackbarOpen(true); // Open the snackbar
    }

  };

  const handlePreviousFile = async () => {
    if (!selectedFile) {
      console.error('No file selected for previous action.');
      return;
    }

    // Prepare the payload for the API call
    const { fromDate, toDate } = calculateDates(); // Get the calculated dates
    const originalFilename = selectedFile?.filename || "default_filename.pdf"; // Get the original filename
    const filenameWithoutDate = originalFilename.replace(/_\d{2}-\d{2}-\d{4}/, ''); // Remove the date part

    const payload = {
      fromDate: fromDate, // Use the calculated fromDate
      toDate: toDate, // Use the calculated toDate
      states: selectedTab === 'ALL' ? states : [selectedTab], // Use selected tab for states
      classType: selectedDropdownView, // Use selected classifications
      filename: `${filenameWithoutDate}.pdf`, // Append .pdf extension to the filename without the date
      labeling: selectedFile.prediction, // Use the selected feedback as labeling
      fileIndex: selectedFile?.customIndex || 0, // Assuming fileIndex is part of the selected file data
      type: 2 // Set the type based on the action
    };

    try {
      // Trigger the SAVE-QA_FILE endpoint
      const response = await axios.post(ENDPOINTS.VIEW_QA_FILE, payload);

      // Check if the response contains classification files
      if (response.data.classificationFilesList && response.data.classificationFilesList.length > 0) {
        const nextFile = response.data.classificationFilesList[0]; // Get the first file from the response

        // Update the selected file state with the next file's data
        setSelectedFile(nextFile); // Set the selected file to the next file
        setFeedback(nextFile.prediction || ''); // Set feedback to the prediction value
        setDrawerOpen(true); // Open the drawer to show the next file's details
        // Optionally, you can also set the label status based on the next file
        const status = nextFile.ican_prediction === nextFile.prediction ? 'Non Labeled' : 'Labeled';
        setLabelStatus(status); // Set the label status in state

        // Call SHOW_QA_FILE endpoint with the updated filename
        const updatedPdfUrl = ENDPOINTS.SHOW_QA_PDF(previousFile.filename); // Construct the URL for the updated file
        const pdfResponse = await axios.get(updatedPdfUrl); // Call the SHOW_QA_FILE endpoint

        // Assuming the response contains the URL for the PDF
        if (pdfResponse.data && pdfResponse.data.pdfUrl) {
          setPdfUrl(pdfResponse.data.pdfUrl); // Set the PDF URL from the response
        } else {
          console.error('No PDF URL returned in response');
        }


        // Call LOCKBOX FILES API after successful save
        fetchClassificationFiles(pageIndex, pageSize); // Ensure this function is called to fetch data

      }


    } catch (error) {
      console.error('Error fetching file:', error);

      // Show snackbar on error
      setSnackbarMessage('Error fetching file: ' + (error.response?.data?.message || 'Unknown error')); // Set the snackbar message
      setSnackbarSeverity('error'); // Set severity to error
      setSnackbarOpen(true); // Open the snackbar
    }

  };




  // Snackbar close handler
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  // Update this function to handle month change
  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    setWeek(''); // Reset week when month changes
    updateAvailableWeeks(year, e.target.value);
    console.log("Month selected:", selectedMonth); // Add this log to see the value
  };



  // New useEffect to fetch classification files only after states are loaded
  useEffect(() => {
    if (states.length > 0 && classifications.length > 0) { // Check if states are available
      fetchClassificationFiles(pageIndex, pageSize);
    }
  }, [states, classifications, selectedTab, pageIndex, pageSize,]); // Dependency on states




  const fetchClassificationFiles = async (paginationIndex, pageSize, fromDateParam, toDateParam) => {
    let fromDate, toDate;

    if (isSearchApplied) {
      // If search has been applied, use the calculated dates
      ({ fromDate, toDate } = calculateDates());
    } else {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1); // Set yesterday's date
      const fromDateString = yesterday.toISOString().split('T')[0];

      // Use provided fromDate or default to yesterday
      fromDate = fromDateParam || fromDateString;
      // Use provided toDate or default to today
      toDate = toDateParam || todayString;
    }

    const payload = {
      fromDate: fromDate, // Use the correctly defined fromDate
      toDate: toDate,     // Use the correctly defined toDate
      // states: states,
      states: selectedTab === 'ALL' ? states : [selectedTab], // Use selected tab for states
      classType: classifications,
      paginationIndex: paginationIndex + 1, // Send current page (1-based index)
      pageSize: pageSize // Send page size
    };

    try {
      const response = await axios.post(ENDPOINTS.LOCKBOX_FILES_LIST, payload);
      setClassificationFilesList(response.data.classificationFilesList || []);
      setTotalCount(response.data.totCount || 0); // Set total count from response
      setPageCount(response.data.pageCount || 0); // Set total pages from response
    } catch (error) {
      console.error('Error fetching classification files:', error);
    }
    finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    updateAvailableWeeks(year, month);
    updateAvailableMonths(year);
  }, [year, month]);

  const updateAvailableWeeks = (selectedYear, selectedMonth) => {
    if (selectedYear && selectedMonth) {
      const date = new Date(selectedYear, parseInt(selectedMonth) - 1, 1);
      const weeks = [];
      while (date.getMonth() === parseInt(selectedMonth) - 1) {
        const weekNumber = Math.ceil(date.getDate() / 7);
        if (!weeks.includes(`Week ${weekNumber}`)) {
          weeks.push(`Week ${weekNumber}`);
        }
        date.setDate(date.getDate() + 7);
      }
      setAvailableWeeks(weeks);
    } else {
      setAvailableWeeks([]);
    }
  };

  const updateAvailableMonths = (selectedYear) => {
    if (selectedYear) {
      const currentYear = new Date().getFullYear();
      let months = [];
      if (parseInt(selectedYear) === currentYear) {
        for (let i = 0; i <= new Date().getMonth(); i++) {
          months.push({
            value: String(i + 1).padStart(2, '0'),
            label: new Date(0, i).toLocaleString('default', { month: 'long' })
          });
        }
      } else {
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


  const handleWeekChange = (e) => {
    setWeek(e.target.value);
  };

  // const handleFromChange = (newDate) => {
  //   setCustomFromDate(newDate); // Update the custom from date

  // };


  // const handleToChange = (newDate) => {
  //   setCustomToDate(newDate); // Update the custom to date
  // };


  const handleFromChange = (selectedFromDate) => {
    if (selectedFromDate) {
      setCustomFromDate(selectedFromDate);
      console.log("Custom From Date:", selectedFromDate.format('YYYY-MM-DD'));  // Log formatted date
    } else {
      console.log("Invalid From Date");
    }
  };

  console.log(customFromDate);

  const handleToChange = (selectedToDate) => {
    if (selectedToDate) {
      setCustomToDate(selectedToDate); // Correctly set customToDate
      console.log("Custom To Date:", selectedToDate.format('YYYY-MM-DD')); // Log formatted date
    } else {
      console.log("Invalid To Date");
    }
  };

  console.log(customToDate);

  const calculateDates = () => {
    let calculatedFromDate = null;
    let calculatedToDate = null;

    if (selectedView === 'today') {
      const today = moment();
      calculatedFromDate = today.clone().subtract(1, 'days'); // Set fromDate to yesterday
      calculatedToDate = today; // Set toDate to today
    } else if (selectedView === 'week' && year && month && week) {
      const weekNumber = parseInt(week.split(' ')[1]);
      const startOfMonth = moment(new Date(year, month - 1, 1));
      calculatedFromDate = startOfMonth.clone().add((weekNumber - 1) * 7, 'days'); // Start of the week
      calculatedToDate = calculatedFromDate.clone().add(6, 'days'); // End of the week
    } else if (selectedView === 'month' && year && month) {
      calculatedFromDate = moment(new Date(year, month - 1, 1)); // First day of the month
      calculatedToDate = moment(new Date(year, month, 0)); // Last day of the month
    } else if (selectedView === 'year' && year) {
      calculatedFromDate = moment(new Date(year, 0, 1)); // First day of the year (January 1st)
      calculatedToDate = moment(new Date(year, 11, 31)); // Last day of the year (December 31st)
    } else if (selectedView === 'customDate') {
      if (customFromDate && customToDate) {
        console.log("Custom From Date:", customFromDate);
        console.log("Custom To Date:", customToDate);
        calculatedFromDate = customFromDate; // Use the selected fromDate from the date picker
        calculatedToDate = customToDate; // Use the selected toDate from the date picker
        // calculatedFromDate = moment(customFromDate); // Use the selected fromDate from the date picker
        // calculatedToDate = moment(customToDate); // Use the selected toDate from the date picker
      }
    }

    return {
      fromDate: calculatedFromDate ? calculatedFromDate.format('YYYY-MM-DD') : null,
      toDate: calculatedToDate ? calculatedToDate.format('YYYY-MM-DD') : null,
    };
  };


  const handleSearchClick = async () => {

    // Validate required fields
    if (!selectedDropdownView.length || !selectedView) {
      setErrorMessage('Please fill in all required fields.'); // Set error message
      return; // Prevent submission
    }

    // Validate required fields
    if (!selectedView) {
      setErrorMessage('Please select a time period.'); // Set error message if no view is selected
      return; // Prevent submission
    }

    if (selectedView === 'week' && (!year || !month || !week)) {
      setErrorMessage('Please select a year and a month and a week.'); // Set error message for week
      return; // Prevent submission
    }

    if (selectedView === 'month' && (!year || !month)) {
      setErrorMessage('Please select both year and month for the month view.'); // Set error message for month
      return; // Prevent submission
    }

    if (selectedView === 'year' && !year) {
      setErrorMessage('Please select a year.'); // Set error message for year
      return; // Prevent submission
    }

    if (selectedView === 'customDate') {
      if (!customFromDate || !customToDate) {
        setErrorMessage('Please select both from and to dates for the custom date view.'); // Set error message for custom dates
        return; // Prevent submission
      }
    }

    // Clear error message if validation passes
    setErrorMessage('');


    const { fromDate, toDate } = calculateDates();

    // Log the dates to verify
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);

    const payload = {
      fromDate,
      toDate,
      states: selectedTab === 'ALL' ? states : [selectedTab],
      classType: selectedDropdownView,
      paginationIndex: pageIndex + 1, // Send current page (1-based index)
      pageSize: pageSize // Send page size
    };

    // Set loading state to true
    setLoading(true);

    try {
      const response = await axios.post(ENDPOINTS.LOCKBOX_FILES_LIST, payload);
      setClassificationFilesList(response.data.classificationFilesList);
      setTotalCount(response.data.totCount || 0); // Set total count from response
      setIsSearchApplied(true); // Mark that search has been applied
      setPageCount(response.data.pageCount || 0); // Set total pages from response
      // Handle the response data here
      setRefreshPage(!refreshPage);
      // setIsSaveSuccessful(!isSaveSuccessful);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }

    handleMenuClose(); // Close the menu
    // handleClear(); 

  };


  // Ensure that the year is set correctly when the year dropdown changes
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    setMonth(''); // Reset month when year changes
    setWeek(''); // Reset week when year changes
    setAvailableWeeks([]); // Reset available weeks
    updateAvailableMonths(selectedYear); // Update available months based on the selected year
    console.log("Year selected:", selectedYear); // Add this log to see the value
  };

  // Call calculateDates when the selected view changes
  useEffect(() => {
    if (selectedView) {
      const { fromDate, toDate } = calculateDates();
      setFromDate(fromDate);
      setToDate(toDate);
    }
  }, [selectedView, year, month, week]); // Add dependencies to ensure it recalculates when these change



  const filteredData = useMemo(() => {
    if (selectedTab === 'ALL') {
      return classificationFilesList; // Show all data when "ALL" tab is selected
    }
    return classificationFilesList.filter(item => item.state === selectedTab);
  }, [classificationFilesList, selectedTab]);



  const handleClear = () => {
    setSelectedView('');
    setYear('');
    setMonth('');
    setWeek('');
    setFromDate(null);
    setToDate(null);
    setSelectedDropdownView([]);
    setErrorMessage('');

    // Reset any other state variables as needed
  };



  const handlePaginationChange = (newPageIndex, newPageSize) => {
    setLoading(true); // Set loading state to true
    setPageIndex(newPageIndex);
    setPageSize(newPageSize);

    // Get the current fromDate and toDate based on the selected view
    const { fromDate, toDate } = calculateDates(); // Ensure this function returns the correct dates

    // Fetch classification files with the updated pagination and date range
    fetchClassificationFiles(newPageIndex, newPageSize, fromDate, toDate);
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background with slight transparency
            // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: semi-transparent background
            zIndex: 2000, // Ensure it appears above other components
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <Breadcrumbs custom heading="" links={breadcrumbLinks} />
        <IconButton sx={{ color: '#009965' }} size="large" onClick={handleMenuOpen}>
          <FilterOutlined />
        </IconButton>
      </Box>
      <MainCard>
        <Grid>
          <SwipeableDrawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerClose}
            // sx={{ '& .MuiDrawer-paper': { width: '90%', height: '90%', top: 50 } }}
            sx={{ '& .MuiDrawer-paper': { width: '90%', height: '100vh', top: 0 } }} // Set height to 100vh
          >
            <Box sx={{ display: 'flex', width: '100%', height: '100%', padding: 2 }}>
              {/* Left side: Feedback Form */}
              <Box sx={{ width: '50%', padding: 2, borderRight: '1px solid #ddd' }}>
                {/* Row for iCAN Prediction and Confidence Score */}
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      iCAN Prediction
                    </Typography>
                    <Button variant="contained" color="success" sx={{ width: '100%' }}>
                      {selectedFile?.ican_prediction}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      Confidence Score
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ width: '100%' }}>
                      {selectedFile?.conf_score.toFixed(1)}
                    </Button>
                  </Grid>
                </Grid>

                {/* Row for Label Status and Letter Split Error */}
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  {/* <Grid item xs={6}>
              <Typography variant="subtitle1">Label Status:</Typography>
              <Button variant="contained" color="warning" sx={{ width: '100%' }}>
                {selectedFile?.labelling_status} 
              </Button>
            </Grid> */}
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Label Status:</Typography>
                    <Button
                      variant="contained"
                      sx={{
                        width: '100%',
                        backgroundColor: labelStatus === 'Non Labeled' ? 'orange' : 'green', // Change color based on status
                        color: 'white',
                        '&:hover': {
                          backgroundColor: labelStatus === 'Non Labeled' ? 'orange' : 'darkgreen', // Darker shade on hover
                          // Prevent default blue hover color
                          boxShadow: 'none', // Remove box shadow on hover
                        }
                      }}
                    >
                      {selectedFile?.ican_prediction === selectedFile?.prediction ? "Non Labeled" : 'Labeled'}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Letter Split Error:</Typography>
                    <Button variant="contained" color="error" sx={{ width: '100%' }}>
                      {selectedFile?.split_error ? 'Letter Split Error' : 'No Split Error'}
                    </Button>
                  </Grid>
                </Grid>

                {/* Feedback Section */}
                <Typography
                  variant="h4"
                  sx={{
                    marginTop: 2,
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                >
                  Feedback
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        border: '1px solid #ddd', // Border color
                        borderRadius: '6px', // Rounded corners
                        padding: 2, // Padding inside the box
                        marginTop: 2 // Margin on top
                      }}
                    >
                      <Grid container spacing={2}>
                        {predictions.map((prediction) => (
                          <Grid item xs={6} key={prediction}> {/* Each item takes half the width */}
                            <FormControlLabel
                              control={<Radio checked={feedback === prediction} />}
                              label={prediction}
                              value={prediction}
                              // checked={feedback === prediction}
                              onChange={(e) => setFeedback(e.target.value)}
                            />
                          </Grid>
                        ))}
                        {/* Checkbox for Incorrect Splitting */}
                        <Grid item xs={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedFile?.split_error === true} // Check if split_error is true sx={{ marginTop: 2 }}
                                onChange={(e) => {
                                  // Optional: Handle change if you want to allow user interaction
                                  // setSplitError(e.target.checked); // Example of handling state change
                                }}
                              // Remove the disabled prop if you want it to be editable
                              />
                            }
                            label="Incorrect Splitting"
                          />
                        </Grid>
                      </Grid>

                    </Box>
                  </Grid>
                </Grid>

                {/* Comments Section */}
                <Typography
                  variant="h4"
                  sx={{
                    marginTop: 2,
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                >
                  Comments
                </Typography>
                <TextField
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                // sx={{ marginTop: 1 }}
                />
                <Grid container sx={{ marginTop: 2, justifyContent: 'center' }}>
                  <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'space between', paddingRight: 1 }}>
                    <Grid container>
                      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 1 }}>
                        <Button variant="contained" color="primary" onClick={() => {
                          setShowReport(!showReport);
                        }} sx={{ width: '100%' }}>
                          {showReport ? "Pdf" : "Report"}
                        </Button>
                      </Grid>
                      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 1 }}>
                        <Button variant="contained" color="secondary" onClick={handlePreviousFile} sx={{ width: '100%' }}>
                          Previous
                        </Button>
                      </Grid>
                      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 1 }}>
                        <Button variant="contained" color="secondary" onClick={handleNextFile} sx={{ width: '100%' }}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 1 }}>
                    <Grid container>
                      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 1 }}>
                        <Button variant="contained" color="primary" onClick={() => handleSubmit(1)} sx={{ width: '100%' }}>
                          Save & Next
                        </Button>
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 1 }}>
                        <Button variant="contained" color="primary" onClick={handleDrawerClose} sx={{ width: '100%' }}>
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              {/* Right side: PDF Viewer */}
              <Box sx={{ width: '50%', padding: 2, position: 'relative' }}>
                {/* {fileData.pdfUrl && <iframe src={fileData.pdfUrl} width="100%" height="100%" title="PDF Viewer" />} */}
                {/* {pdfUrl && <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />}  */}
                <Typography variant="h5" align="center">
                  {!showReport ? `${selectedFile?.filename}.pdf` : "Heading of the Report"}
                </Typography>
                <div
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '580px',
                    // width: '100%', 
                    overflowY: 'auto', // Enable vertical scrolling
                    // overflowX: 'auto', 

                  }}
                >
                  {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"> 
 <Viewer
  fileUrl={pdfUrl}
  onPageChange={({ currentPage }) => setCurrentPage(currentPage)} 
/>
                  </Worker> */}
                  {showReport && <h4>rendering the report text</h4>}
                  {!showReport && pdfUrl && <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />}
                </div>
                <ClearIcon style={{ cursor: 'pointer', position: 'absolute', top: '-10px', right: '-10px' }} onClick={handleDrawerClose} />
              </Box>
            </Box>
          </SwipeableDrawer>

          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)}> */}
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  {states.map((state) => (
                    <Tab key={state} label={state} value={state} />
                  ))}
                  <Tab label="ALL" value="ALL" />
                </Tabs>
              </Box>
              {states.map((state) => (
                <TabPanel key={state} value={state}>
                  <QaReusableTable
                    data={filteredData}
                    columns={columns}
                    pageCount={pageCount} // Pass pageCount here 
                    fetchData={fetchClassificationFiles}
                    pageIndex={pageIndex} // Pass pageIndex
                    setPageIndex={setPageIndex} // Pass setPageIndex
                    onPaginationChange={handlePaginationChange} // Use the updated pagination change handler
                    refreshTable={refreshPage}
                    saveFile={isSaveSuccessful}
                  />
                </TabPanel>
              ))}
            </TabContext>
          </Box>

        </Grid>
      </MainCard>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiMenu-paper': {
            width: '500px', // Set the desired width
            maxHeight: '400px', // Set the desired max height
            border: '1px solid #ddd',
            borderRadius: '4px',
          },

        }}
      >

        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', padding: '8px' }}>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="multi-select-label">Select Classification</InputLabel>
              <Select
                labelId="multi-select-label"
                value={selectedDropdownView}
                onChange={(e) => setSelectedDropdownView(e.target.value)}
                label="Select Classification"
                multiple
              >
                {classifications.map((classification, index) => (
                  <MenuItem key={index} value={classification}>
                    {classification}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            {/* <MenuItem
            sx={{
              '&:hover': {
                  backgroundColor: 'transparent', 
              }
          }}
          > */}
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="view-select-label">Select Period</InputLabel>
              <Select labelId="view-select-label" value={selectedView} onChange={handleViewChange} label="Select Period">
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
                <MenuItem value="customDate">Custom Date</MenuItem>
              </Select>
            </FormControl>

            {/* </MenuItem> */}
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Grid sx={{ display: 'flex', gap: 1, padding: '10px 15px 10px 25px' }}>
              {selectedView === 'week' && (
                <>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="view-select-label">Select Year</InputLabel>
                      <Select labelId="view-select-label" value={year} onChange={handleYearChange} label="Select Year">
                        <MenuItem value="">Select Year</MenuItem>
                        <MenuItem value="2024">2024</MenuItem>
                        <MenuItem value="2023">2023</MenuItem>
                        <MenuItem value="2022">2022</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
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
                  <Grid item xs={12} sm={4} md={4} lg={4}>
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
                  <Grid item xs={12} sm={4} md={4} lg={4}>
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
                  <Grid item xs={12} sm={4} md={4} lg={4}>
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
                  <Grid item xs={12} sm={4} md={4} lg={4}>
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
                    value={customFromDate}
                    onChange={handleFromChange}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                  <DesktopDatePicker
                    label="To Date"
                    inputFormat="MM/dd/yyyy"
                    value={customToDate}
                    onChange={handleToChange}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </>
              )}
            </Grid>
          </Grid>
          <Grid sx={{ marginLeft: '30px' }}>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          </Grid>
          <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>

            <Grid item xs={12} sm={3} md={3} lg={3}>
              <MenuItem
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent', // Remove hover background color
                  }
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSearchClick}
                  fullWidth
                  sx={{ marginTop: 2 }} // Optional: Add margin for spacing
                >
                  Apply
                </Button>
              </MenuItem>
            </Grid>


            <Grid item xs={12} sm={3} md={3} lg={3}>
              <MenuItem
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent', // Remove hover background color
                  }
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleClear}
                  sx={{ marginTop: 2 }} // Optional: Add margin for spacing
                >
                  Clear
                </Button>
              </MenuItem>
            </Grid>

          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            {/* <Typography variant="body1">
      Date Range: {fromDate && toDate ? `${fromDate.replace(/-/g, '/')} - ${toDate.replace(/-/g, '/')}` : 'No Dates Selected'}
      </Typography> */}
            <Typography variant="body1">
              Date Range: {selectedView === 'customDate'
                ? (customFromDate && customToDate
                  ? `${customFromDate.format('YYYY/MM/DD')} - ${customToDate.format('YYYY/MM/DD')}`
                  : 'No Dates Selected')
                : (fromDate && toDate
                  ? `${fromDate.replace(/-/g, '/')} - ${toDate.replace(/-/g, '/')}`
                  : 'No Dates Selected')}
            </Typography>
          </Grid>
        </Grid>
      </Menu>
      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </LocalizationProvider>
  );
}



export default QaMindPathPage;