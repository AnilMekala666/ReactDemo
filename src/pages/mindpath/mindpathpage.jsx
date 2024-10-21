import React, { useState, useMemo } from 'react';
import { Grid, Button, CircularProgress, Typography, Popover, Modal } from '@mui/material';
import MainCard from 'components/MainCard';
import FileUploader from 'components/payments/FileUploader';
import CustomTable from 'components/payments/CustomTable';
import CustomDialog from 'components/payments/CustomDialog';
import Deposit from 'assets/images/Deposits.png';
import Remittance from 'assets/images/Remmitence.png';
import PatientPayment from 'assets/images/PatientPayment.png';
import ArrowRight from 'assets/images/ArrowRight.png';
import iCanImg from 'assets/images/iCanImg.png';
import ThreelineArrow from 'assets/images/ThreelineArrow.png';
import CashPosting from 'assets/images/CashPosting.jpg';
import PostingRecords from 'assets/images/PostingRecords.png';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Reconsilation from 'assets/images/Reconsilation.png';
import CustomDrawer from 'components/payments/CustomDrawer';
import { Box, Drawer, Table, TableBody, TableCell, TableHead, TableRow, MenuItem, InputLabel, Autocomplete, TextField, FormControl, FormHelperText, Select } from '@mui/material';
import UploadImg from 'assets/images/UploadImg.jpg';
import AnimateButton from 'components/@extended/AnimateButton';
import { borderRadius, fontSize, height, margin, textAlign, width } from '@mui/system';
import { UploadOutlined } from '@ant-design/icons';
import { CaretUpOutlined } from '@ant-design/icons';
import { DownOutlined, RightOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router';
import RightArrow from 'assets/images/right-arrow.gif';
import RightArrowStatic from 'assets/images/RightArrowStatic.png';
import DownRightArrowSlide from 'assets/images/DownRightArrowSlide.gif';
import UpArrowSlide from 'assets/images/UpArrowSlide.gif';
import DataBase from 'assets/images/DataBase.gif'
import DataBaseLined from 'assets/images/DataBaseLined.png';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import { SmileOutlined, UserOutlined, ClockCircleOutlined, PictureOutlined, PlusCircleOutlined } from '@ant-design/icons'; // Assuming you use Ant Design icons
import { openSnackbar } from 'api/snackbar';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import UpRightArrow from 'assets/images/UpRightArrow.png';
import DownRightArrow from 'assets/images/DownRightArrow.png';

import DepositIcon from 'assets/images/new-images/DepositIcon.png';
import RemitIcon from 'assets/images/new-images/RemitIcon.png';
import PatientIcon from 'assets/images/new-images/PatientIcon.png';
import DotLine1 from 'assets/images/new-images/DotLine1.png';
import DotLine2 from 'assets/images/new-images/DotLine2.png';
import DotLine3 from 'assets/images/new-images/DotLine3.png';
import DotLine4 from 'assets/images/new-images/DotLine4.png';
import DotLine5 from 'assets/images/new-images/DotLine5.png';
import DotLine6 from 'assets/images/new-images/DotLine6.png';
import DotLine7 from 'assets/images/new-images/DotLine7.png';
import DotLine8 from 'assets/images/new-images/DotLine8.png';
import DotLine9 from 'assets/images/new-images/DotLine9.png';
import DataBaseIcon from 'assets/images/new-images/DataBaseIcon.png';
import PostingIcon from 'assets/images/new-images/PostingIcon.png';
import Recon from 'assets/images/new-images/Recon.png';
import CashPostingIcon from 'assets/images/new-images/CashPostingIcon.png';
import AdvancedMd from 'assets/images/new-images/AdvancedMd.png';
import NexGen from 'assets/images/new-images/NexGen.png';



function MindPathPage() {
  const navigate = useNavigate();

  const [depositeOpen, setDepositOpen] = useState(false);
  const [showDepositTable, setShowDepositTable] = useState(false);
  const [remittanceOpen, setRemittancetOpen] = useState(false);
  const [showRemittanceTable, setShowRemittanceTable] = useState(false);
  const [depositLoading, setDepositLoading] = useState(false);
  const [remittanceLoading, setRemittanceLoading] = useState(false);
  const [patinetPaymentOpen, setPatinetPaymentOpen] = useState(false);
  const [showPatinetPaymentTable, setShowPatinetPaymentTable] = useState(false);
  const [patinetPaymentLoading, setPatinetPaymentLoading] = useState(false);
  const [value] = useState('AZ');

  const [uploadedFileName, setUploadedFileName] = useState('');



  const [firstDrawerDepositOpen, setFirstDrawerDepositOpen] = useState(false);
  const [secondDrawerDepositOpen, setSecondDrawerDepositOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [depositUploadedFile, setDepositUploadedFile] = useState([]);

  const [firstRemmitenceDrawerOpen, setFirstRemmitenceDrawerOpen] = useState(false);
  const [secondRemmitenceDrawerOpen, setSecondRemmitenceDrawerOpen] = useState(false);
  const [showRemmitenceSpinner, setShowRemmitenceSpinner] = useState(false);
  const [RemmitenceUploadedFile, setRemmitenceUploadedFile] = useState([]);

  const [firstPatientPaymentDrawerOpen, setFirstPatientPaymentDrawerOpen] = useState(false);
  const [secondPatientPaymentDrawerOpen, setSecondPatientPaymentDrawerOpen] = useState(false);
  const [showPatientPaymentSpinner, setShowPatientPaymentSpinner] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);


  // Add the initial state for the image
  const [isRightArrowActive, setIsRightArrowActive] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const data = [
    { label: 'Ignore all Duplicate files' },
    { label: 'Ignore transaction with Fees as comments' },
    // Add more options as needed
  ];

  const [patientPaymentDrawerOpen, setPatientPaymentDrawerOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState("Upload File");
  const [patientPaymentUploadedFile, setPatientPaymentUploadedFile] = useState("Upload File");
  const [patientPaymentloading, setPatientPaymentLoading] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientPaymentDialogOpen, setPatientPaymentDialogOpen] = useState(false);




  const [depositDrawerOpen, setDepositDrawerOpen] = useState(false)
  const handleDepositClick = () => {
    setIsRightArrowActive(true); // Show RightArrow image immediately
    setShowSpinner(true); // Optionally, you can start showing the spinner

    // After 3 seconds, revert back to the static RightArrow image
    setTimeout(() => {
      setIsRightArrowActive(false);
      setShowSpinner(false);
      setDepositDrawerOpen(true)
    }, 500);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const depositData = [
    {
      file_name: 'Transaction_001.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-10-01',
      payer: 'ABC Health',
      payment_amount: 1500.50,
      state_name: 'AZ',
      action: '1'
    },
    {
      file_name: 'Transaction_002.pdf',
      classification_type: 'Remittance',
      batch_date: '2024-09-28',
      payer: 'XYZ Insurance',
      payment_amount: 800.75,
      state_name: 'AZ',
      action: '1'
    },
    {
      file_name: 'Transaction_003.pdf',
      classification_type: 'Patient Payment',
      batch_date: '2024-10-03',
      payer: 'John Doe',
      payment_amount: 120.00,
      state_name: 'AZ',
      action: '1'
    },
    {
      file_name: 'Transaction_004.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-30',
      payer: 'DEF Healthcare',
      payment_amount: 2000.00,
      state_name: 'TX',
      action: '1'
    },
    {
      file_name: 'Transaction_005.pdf',
      classification_type: 'Remittance',
      batch_date: '2024-10-02',
      payer: 'MNO Insurance',
      payment_amount: 500.00,
      state_name: 'CA',
      action: '1'
    },
    {
      file_name: 'Transaction_006.pdf',
      classification_type: 'Patient Payment',
      batch_date: '2024-09-29',
      payer: 'Jane Smith',
      payment_amount: 250.50,
      state_name: 'TX',
      action: '1'
    },
    {
      file_name: 'Transaction_007.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-25',
      payer: 'GHI Medical',
      payment_amount: 1750.20,
      state_name: 'AZ',
      action: '1'
    }
  ];

  const remmitenceData = [
    {
      file_name: 'Transaction_001.pdf',
      classification_type: 'remittance1',
      batch_date: '2024-10-01',
      payer: 'ABC Health',
      payment_amount: 1500.50,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_002.pdf',
      classification_type: 'Remittance 2',
      batch_date: '2024-09-28',
      payer: 'XYZ Insurance',
      payment_amount: 800.75,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_003.pdf',
      classification_type: 'remittance 3',
      batch_date: '2024-10-03',
      payer: 'John Doe',
      payment_amount: 120.00,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_004.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-30',
      payer: 'DEF Healthcare',
      payment_amount: 2000.00,
      state_name: 'TX'
    },
    {
      file_name: 'Transaction_005.pdf',
      classification_type: 'Remittance',
      batch_date: '2024-10-02',
      payer: 'MNO Insurance',
      payment_amount: 500.00,
      state_name: 'CA'
    },
    {
      file_name: 'Transaction_006.pdf',
      classification_type: 'Patient Payment',
      batch_date: '2024-09-29',
      payer: 'Jane Smith',
      payment_amount: 250.50,
      state_name: 'TX'
    },
    {
      file_name: 'Transaction_007.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-25',
      payer: 'GHI Medical',
      payment_amount: 1750.20,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_008.pdf',
      classification_type: 'Remittance',
      batch_date: '2024-10-01',
      payer: 'LMN Health Plan',
      payment_amount: 600.90,
      state_name: 'CA'
    },
    {
      file_name: 'Transaction_009.pdf',
      classification_type: 'Patient Payment',
      batch_date: '2024-09-26',
      payer: 'Mark Johnson',
      payment_amount: 300.00,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_010.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-28',
      payer: 'OPQ Healthcare',
      payment_amount: 1800.75,
      state_name: 'TX'
    }
  ];


  const patinetPaymentData = [
    {
      file_name: 'Transaction_001.pdf',
      classification_type: 'patinetPaymentData',
      batch_date: '2024-10-01',
      payer: 'ABC Health',
      payment_amount: 1500.50,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_002.pdf',
      classification_type: 'patinetPaymentData 2',
      batch_date: '2024-09-28',
      payer: 'XYZ Insurance',
      payment_amount: 800.75,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_003.pdf',
      classification_type: 'remittance 3',
      batch_date: '2024-10-03',
      payer: 'John Doe',
      payment_amount: 120.00,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_004.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-30',
      payer: 'DEF Healthcare',
      payment_amount: 2000.00,
      state_name: 'TX'
    },
    {
      file_name: 'Transaction_005.pdf',
      classification_type: 'Remittance',
      batch_date: '2024-10-02',
      payer: 'MNO Insurance',
      payment_amount: 500.00,
      state_name: 'CA'
    },
    {
      file_name: 'Transaction_006.pdf',
      classification_type: 'Patient Payment',
      batch_date: '2024-09-29',
      payer: 'Jane Smith',
      payment_amount: 250.50,
      state_name: 'TX'
    },
    {
      file_name: 'Transaction_007.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-25',
      payer: 'GHI Medical',
      payment_amount: 1750.20,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_008.pdf',
      classification_type: 'Remittance',
      batch_date: '2024-10-01',
      payer: 'LMN Health Plan',
      payment_amount: 600.90,
      state_name: 'CA'
    },
    {
      file_name: 'Transaction_009.pdf',
      classification_type: 'Patient Payment',
      batch_date: '2024-09-26',
      payer: 'Mark Johnson',
      payment_amount: 300.00,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_010.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-28',
      payer: 'OPQ Healthcare',
      payment_amount: 1800.75,
      state_name: 'TX'
    }
  ];


  const filteredDepositData = useMemo(() => depositData.filter((item) => item.state_name === value), [depositData, value]);
  const filteredremmitenceData = useMemo(() => remmitenceData.filter((item) => item.state_name === value), [remittanceOpen, value]);
  const filteredPatinetPaymentData = useMemo(() => patinetPaymentData.filter((item) => item.state_name === value), [patinetPaymentData, value]);


  const handleDepositDrawerClose = () => {
    console.log("click")
    setDepositDrawerOpen(False)
  }


  //Deposit drawer
  const handleCloseDepositDrawer = () => {
    setFirstDrawerDepositOpen(false);
    setSecondDrawerDepositOpen(false)
    console.log('click')
  }



  const handleDepositFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name); // Capture file name
      setShowSpinner(true); // Show spinner on upload
      // Simulate an upload process
      setTimeout(() => {
        setShowSpinner(false);
        setSecondDrawerDepositOpen(true);
      }, 2000);
    }
  };

  //Remitence drawer
  const handleCloseRemmitenceDrawer = () => {
    setFirstRemmitenceDrawerOpen(false);
    setSecondRemmitenceDrawerOpen(false)
    console.log('click')
  }

  const handleRemmitenceFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRemmitenceUploadedFile(file.name); // Capture file name
      setShowRemmitenceSpinner(true); // Show spinner on upload
      // Simulate an upload process
      setTimeout(() => {
        setShowRemmitenceSpinner(false);
        setSecondRemmitenceDrawerOpen(true);
      }, 2000);
    }

  };


  //PatientPayment drawer

  const handleClosePatientPaymentDrawer = () => {
    setFirstPatientPaymentDrawerOpen(false);
    setSecondPatientPaymentDrawerOpen(false)
    console.log('click')
  }

  const handlePatientPaymentFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPatientPaymentUploadedFile(file.name); // Capture file name
      setShowPatientPaymentSpinner(true); // Show spinner on upload
      // Simulate an upload process
      setTimeout(() => {
        setShowPatientPaymentSpinner(false);
        setSecondPatientPaymentDrawerOpen(true);
      }, 2000);
    }
  };




  const handleClickDepositOpen = () => {
    setDepositLoading(true);
    setTimeout(() => {
      setDepositLoading(false);
      setDepositOpen(true);
    }, 5000);
  };

  const handleClickremitenceOpen = () => {
    setRemittanceLoading(true);
    setTimeout(() => {
      setRemittanceLoading(false);
      setRemittancetOpen(true);
    }, 5000);
  }

  const handleClickPatientPaymentOpen = () => {
    setPatinetPaymentLoading(true);
    setTimeout(() => {
      setPatinetPaymentLoading(false);
      setPatinetPaymentOpen(true);
    }, 2000);
  }

  const handleDepositClose = () => {
    setDepositOpen(false);
    setShowDepositTable(false);
  };

  const handleremmitenceClose = () => {
    setRemittancetOpen(false);
    setShowRemittanceTable(false);
  };

  const handlePatinetPaymentClose = () => {
    setPatinetPaymentOpen(false);
    setShowPatinetPaymentTable(false);
  };


  const firstDrawerDepositContent = (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      {/* File Upload Image and Button */}
      <img src={UploadImg} alt='UploadImg' className='w-100h-100' />
      <AnimateButton type="slide">
        <Button variant="contained" color="success" component="label" sx={{ borderRadius: '40px', marginTop: '20px' }}>
          Upload File
          <input type="file" multiple hidden onChange={handleDepositFileUpload} />
          <UploadOutlined style={{ fontSize: '20px', paddingLeft: '10px' }} />
        </Button>
      </AnimateButton>

      {/* Show Spinner if Upload is in Progress */}
      {showSpinner && (

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Show Uploaded File Name */}
      {uploadedFileName && !showSpinner && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Uploaded File: {uploadedFileName}
        </Typography>
      )}
    </Box>
  );

  const firstDrawerRemmitenceContent = (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      {/* File Upload Image and Button */}
      <img src={UploadImg} alt='UploadImg' className='w-100h-100' />
      <AnimateButton type="slide">
        <Button variant="contained" color="success" component="label" sx={{ borderRadius: '40px', marginTop: '20px' }}>
          Upload File
          <input type="file" multiple hidden onChange={handleRemmitenceFileUpload} />
          <UploadOutlined style={{ fontSize: '20px', paddingLeft: '10px' }} />
        </Button>
      </AnimateButton>

      {/* Show Spinner if Upload is in Progress */}
      {showRemmitenceSpinner && (

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Show Uploaded File Name */}
      {RemmitenceUploadedFile && !showRemmitenceSpinner && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Uploaded File: {RemmitenceUploadedFile}
        </Typography>
      )}
    </Box>
  );

  const firstDrawerPatientPaymentContent = (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      {/* File Upload Image and Button */}
      <img src={UploadImg} alt='UploadImg' className='w-100h-100' />
      <AnimateButton type="slide">
        <Button variant="contained" color="success" component="label" sx={{ borderRadius: '40px', marginTop: '20px' }}>
          Upload File
          <input type="file" multiple hidden onChange={handlePatientPaymentFileUpload} />
          <UploadOutlined style={{ fontSize: '20px', paddingLeft: '10px' }} />
        </Button>
      </AnimateButton>

      {/* Show Spinner if Upload is in Progress */}
      {showPatientPaymentSpinner && (

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Show Uploaded File Name */}
      {patientPaymentUploadedFile && !showPatientPaymentSpinner && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Uploaded File: {patientPaymentUploadedFile}
        </Typography>
      )}
    </Box>
  );

  const handleMovePatientMovement = () => {
    console.log("click")
    navigate('/patient/cash/posting')
  }

  const handleMoveReconcileMovement = () => {
    console.log("click")
    navigate('/patient/reconcile')
  }

  const handleMovePostingReportMovement = () => {
    console.log("click")
    navigate('/patient/posting_report')
  }


  const handleDepositFilesUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setLoading(true); // Set loading to true when file is selected

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);


        const formatDate = (excelDate) => {
          if (!excelDate) return ''; // Handle empty or invalid dates
          const dateObject = new Date((excelDate - (25567 + 2)) * 86400 * 1000); // Convert Excel serial number to JS date
          return format(dateObject, 'MM-dd-yyyy'); // Using 'date-fns' for formatting (optional)
        };

        // deposit_date: formatDate(row['Deposit Date']),

        // Map Excel data to table data structure
        const formattedData = jsonData.map((row) => ({
          deposit_date: formatDate(row['Deposit Date']),
          transaction_number: row['Transaction No'],
          account_name: row['ACCOUNT NAME'],
          bank_name: row['Bank Name'],
          payment_type: row['DESCRIPTION'],
          payer: row['Payer Name'],
          amounts: row['AMOUNT'],
        }));
        console.log("formattedData", formattedData)
        setTableData(formattedData); // Update table data
        setLoading(false); // Set loading to false when processing is done

        // Show Snackbar message after successful processing
        setSnackbarMessage('File uploaded and data processed successfully!');
        setSnackbarOpen(true); // Open Snackbar
      };

      reader.readAsArrayBuffer(file);

      setUploadFile("File Uploaded")
      openSnackbar({
        open: true,
        message: 'File Uploaded Successfully!',
        variant: 'alert'
      })
      setDepositDrawerOpen(false)

    }
  };


  const handlePatientPAymentFilesUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setLoading(true); // Set loading to true when file is selected

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log('jsonData', jsonData)
        // Map Excel data to table data structure
        const formattedData = jsonData.map((row) => ({
          payment_id: row['Payment ID'],
          transaction_numbers: row['Transaction Number'],
          patient_id: row['Patient ID'],
          amounts: row['Amount'],
          state_name: row['State Name'],

        }));
        console.log("formattedData", formattedData)
        setTableData(formattedData); // Update table data
        setPatinetPaymentLoading(false); // Set loading to false when processing is done

        // Show Snackbar message after successful processing
        setSnackbarMessage('File uploaded and data processed successfully!');
        setSnackbarOpen(true); // Open Snackbar
      };

      reader.readAsArrayBuffer(file);

      setPatientPaymentUploadedFile("File Uploaded")
      openSnackbar({
        open: true,
        message: 'File uploaded successfully!',
        variant: 'alert'
      })
      setPatientPaymentDrawerOpen(false)

    }
  };

  const depositColumns = useMemo(
    () => [
      { header: 'Transaction Number', accessorKey: 'transaction_number' },
      { header: 'State', accessorKey: 'account_name' },
      { header: 'Bank Name', accessorKey: 'bank_name' },
      { header: 'Payment Type', accessorKey: 'payment_type' },
      { header: 'Payer', accessorKey: 'payer' },
      { header: 'Deposit Date', accessorKey: 'deposit_date' },
      { header: 'Amount', accessorKey: 'amounts' },
    ],
    []
  );
  const handleRemmitenceDialogClose = () => {
    setFirstRemmitenceDrawerOpen(false)

  };
  const remColumns = useMemo(
    () => [
      { header: 'Transaction Number', accessorKey: 'Transaction number' },
      { header: 'Payor', accessorKey: 'Payor' },
      { header: 'Deposit Date', accessorKey: 'Deposit Date' },
      { header: 'Amount', accessorKey: 'Amount' },
      { header: 'Patient Name', accessorKey: 'Patient Name' },
      { header: 'Billed Amount', accessorKey: 'Billed Amount' },
      { header: 'Allowed Amount', accessorKey: 'Allowed Amount' },
      { header: 'Patient Amount', accessorKey: 'Patient Amount' },
      { header: 'Paid Amount', accessorKey: 'Paid Amount' },
      { header: 'Start DOS', accessorKey: 'Start DOS' },
      { header: 'End DOS', accessorKey: 'End DOS' },

    ],
    []
  );
  const patientPaymentColumns = useMemo(
    () => [
      { header: 'Payment ID', accessorKey: 'payment_id' },
      { header: 'Transaction Number', accessorKey: 'transaction_numbers' },
      { header: 'Patient ID', accessorKey: 'patient_id' },
      { header: 'Amount', accessorKey: 'amounts' },
      { header: 'State Name', accessorKey: 'state_name' },
    ],
    []
  );
  const handlePatientPaymentDrawerClose = () => {
    console.log("click")
    setPatientPaymentDrawerOpen(false)
  };
  const handleDeposiDialogClose = () => {
    setDepositDialogOpen(false)

  };
  const handlePatientPaymentDialogClose = () => {
    setPatientPaymentDialogOpen(false)

  }


  const handleNavigateDeposit = () => {
    navigate('/patient/payment/deposit')
  }
  const handleNavigateRemittance = () => {
    navigate('/patient/payment/remittance')
  }
  const [popType, setPopType] = useState("")
  const handleClick = (event, type) => {
    setAnchorEl(event.currentTarget); // Set the clicked element as the anchor
    setPopType(type);
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the popover
  };

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'transparent',
    boxShadow: 24,
    p: 1,
    border: 0,
    borderRadius: 3,
  };

  const renderVideoModal = () => {
    return (
      <Modal
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ width: '100vw', height: '100vh', margin: '0 auto' }}

      >
        <Box sx={style} >
          <video
            src={videoUrl}
            controls
            autoPlay
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      </Modal>
    )
  }

  const open = Boolean(anchorEl); // Check if popover is open
  const id = open ? 'simple-popover' : undefined; // Give id if open
  const videoModal = (type) => {
    let videosUrl = "";
    switch (type?.toLowerCase()) {
      case "deposit": videosUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; break;
      case "patient": videosUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"; break;
      case "payment": videosUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"; break;
    }
    setVideoUrl(videosUrl);
    setVideoModalOpen(true);
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container className='main-bg'>
        {/* Pannel 1 */}
        <Grid item xs={12} md={2} lg={2} sm={2} marginTop={9}>
          <Grid sx={{ textAlign: 'center', marginBottom: '40px' }}>
            <Button className='depositbox' onClick={handleDepositClick}>
              <img src={DepositIcon} alt="DepositIcon" style={{ width: '20px', height: 'auto' }} />
              <Typography level="h3" className='depositbox-text'>Deposit</Typography>
            </Button>
          </Grid>
          <Grid sx={{ textAlign: 'center', marginBottom: '40px' }}>
            <Button className='depositbox depositbox-blue'
              onClick={() => {
                handleDepositClick()
              }}
            >
              <img src={RemitIcon} alt="RemitIcon" style={{ width: '20px', height: 'auto' }} />
              <Typography level="h3" className='depositbox-text'>Remittance</Typography>
            </Button>
          </Grid>
          <Grid sx={{ textAlign: 'center', marginBottom: '40px' }}>
            <Button className='depositbox depositbox-green' onClick={() => setPatientPaymentDrawerOpen(true)}>
              <img src={PatientIcon} alt="PatientIcon" style={{ width: '20px', height: 'auto' }} />
              <Typography level="h3" className='depositbox-text'>Patient Payments </Typography>
              {showPatientPaymentSpinner && (
                <Grid sx={{ textAlign: 'center', marginTop: '0px' }}>
                  <CircularProgress size={15} />
                </Grid>
              )}
            </Button>
          </Grid>
          <Grid sx={{ textAlign: 'center', marginBottom: '40px' }}>
            <Button className='depositbox depositbox-green' onClick={() => setPatientPaymentDrawerOpen(true)}>
              <img src={PatientIcon} alt="PatientIcon" style={{ width: '20px', height: 'auto' }} />
              <Typography level="h3" className='depositbox-text'>Claims </Typography>
              {showPatientPaymentSpinner && (
                <Grid sx={{ textAlign: 'center', marginTop: '0px' }}>
                  <CircularProgress size={15} />
                </Grid>
              )}
            </Button>
          </Grid>
        </Grid>
        {/* Pannel 2 */}
        <Grid item xs={12} md={2} lg={2} sm={2} marginTop={9} sx={{ marginLeft: '-15px' }}>
          <div style={{ display: 'flex' }}>
            <img src={DotLine1} alt="DotLine1" style={{ height: '8px', marginTop: '25px' }} />
            <Button
              // onClick={() => { setDepositDialogOpen(true) }}
              onClick={handleNavigateDeposit}
            >
              <img src={iCanImg} alt="iCanImg" className="w-100h-100 ican-bg" />
            </Button>
          </div>
          <div style={{ marginTop: '25px', display: 'flex' }} >
            <img src={DotLine1} alt="DotLine1" style={{ height: '8px', marginTop: '28px' }} />
            <Button
              onClick={handleNavigateRemittance}>
              <img src={iCanImg} alt="iCanImg" className="w-100h-100 ican-bg" />
            </Button>
          </div>
          <div style={{ display: 'flex', marginTop: '28px' }}>
            <img src={DotLine1} alt="DotLine1" style={{ height: '8px', marginTop: '28px' }} />
            <Button
              // onClick={() => {setPatientPaymentDialogOpen(true)}}
              onClick={() => navigate('/patient/payment/patientpayment')}
            >
              <img src={iCanImg} alt='iCanImg' className='w-100h-100 ican-bg' />
            </Button>
          </div>
          <div style={{ display: 'flex', marginTop: '28px' }}>
            <img src={DotLine1} alt="DotLine1" style={{ height: '8px', marginTop: '28px' }} />
            <Button
              // onClick={() => {setPatientPaymentDialogOpen(true)}}
              onClick={() => navigate('/patient/payment/claims')}
            >
              <img src={iCanImg} alt='iCanImg' className='w-100h-100 ican-bg' />
            </Button>
          </div>
        </Grid>
        {/* Pannel 3 */}
        <Grid item xs={12} md={1} lg={1} sm={1} className='dotarrow2'>
          <img src={DotLine2} alt="DotLine2" style={{ maxWidth: '119px' }} />
          <div>
            <img src={DotLine1} alt="DotLine1" style={{ position: 'relative', top: '-5px' }} />
          </div>
          <img src={DotLine3} alt="DotLine3" style={{ maxWidth: '119px' }} />
          <img src={DotLine3} alt="DotLine4" style={{position: 'relative', top: '-13px', maxWidth: '119px' }} />
        </Grid>
        {/* Pannel 4 */}
        <Grid item xs={12} md={2} lg={2} sm={2} marginTop={13} style={{ position: 'relative', left: '-30px' }}>
          <img src={DotLine4} alt="DotLine4" style={{ maxWidth: '209px', position: 'relative', left: '130px' }} />
          <img src={DataBaseIcon} alt="DataBaseIcon" style={{ maxWidth: '200px' }} />
          <img src={DotLine5} alt="DotLine5" style={{ display: 'flex', margin: '0 auto' }} />
          <Grid sx={{ textAlign: 'center', marginBottom: '40px' }}>
            <Button className='depositbox depositbox-green' onClick={handleMovePostingReportMovement}>
              <img src={PostingIcon} alt="PostingIcon" style={{ width: '20px', height: 'auto' }} />
              <Typography level="h3" className='depositbox-text'>Posting Reports </Typography>
            </Button>
          </Grid>
        </Grid>
        {/* Pannel 5 */}
        <Grid item xs={12} md={3} lg={3} sm={3} marginTop={10} marginLeft={6}>
          <Grid sx={{ textAlign: 'center', marginBottom: '40px' }}>
            <Button className='depositbox deposit-recon' onClick={handleMoveReconcileMovement}>
              <img src={Recon} alt="Recon" style={{ width: '20px', height: 'auto' }} />
              <Typography level="h3" className='depositbox-text'>Reconciliation</Typography>
            </Button>
          </Grid>
          <Grid sx={{ textAlign: 'center', position: 'relative' }}>
            <Button className='depositbox deposit-cashpost' onClick={handleMovePatientMovement}>
              <img src={CashPostingIcon} alt="CashPostingIcon" style={{ width: '20px', height: 'auto' }} />
              <Typography level="h3" className='depositbox-text'>Cash Posting Queue</Typography>
            </Button>
            <div style={{ position: 'absolute', left: '-80px', top: '17px' }}>
              <img src={DotLine1} alt="DotLine1" style={{ maxWidth: '140px' }} />
            </div>
          </Grid>
          <Grid sx={{ textAlign: 'center', marginBottom: '40px' }}>
            <div>
              <img src={DotLine6} alt="DotLine6" style={{ maxWidth: '110px' }} />
              <img src={DotLine7} alt="DotLine7" style={{ maxWidth: '110px' }} />
            </div>
          </Grid>
          <Grid style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-40px' }}>
            <img src={iCanImg} alt="iCanImg" className="w-100h-100 ican-bg" style={{ left: '30px' }} />
            <img src={iCanImg} alt="iCanImg" className="w-100h-100 ican-bg" style={{ position: 'relative', left: '-28px' }} />
          </Grid>
          <Grid>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <img src={DotLine8} alt="DotLine8" style={{ maxWidth: '90px', paddingLeft: '60px' }} />
              <img src={DotLine8} alt="DotLine8" style={{ maxWidth: '90px', position: 'relative', left: '-50px' }} />
            </div>
          </Grid>
          <Grid container marginTop={2} position={'relative'}>
            {/* AdvancedMd Logo */}
            <Grid item className='bottom-logo' xs={12} md={5} lg={5} sm={5} onClick={(evt)=>handleClick(evt, "advanced")}>
              <img src={AdvancedMd} alt="AdvancedMd" style={{ maxWidth: '100px' }} />
            </Grid>

            {/* NexGen Logo */}
            <Grid item className='bottom-logo'  onClick={(evt)=>handleClick(evt, "nexgen")} xs={12} md={5} lg={5} sm={5} style={{ position: 'relative', left: '50px' }}>
              <img src={NexGen} alt="NexGen" style={{ maxWidth: '100px' }} />
            </Grid>

            <Grid>
              <img src={DotLine9} alt="DotLine9" className='rightbottomarrow' />
            </Grid>

            {/* Popover for tooltip */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'left',
                horizontal: 'center',
              }}
              className="popover"
            >
              {/* <Typography sx={{ p: 1 }}>Choose an Option:</Typography> */}
              <div style={{ textAlign: 'left', marginBottom: '-10px' }}>
                <CaretUpOutlined style={{ fontSize: '18px', marginLeft: '20px', color: 'rgb(119 171 73)' }} />
              </div>
              <div class="popover_in">
                <Button onClick={() => videoModal("deposit")}>Deposit Posting</Button>
                <Button onClick={() => videoModal('patient')}>Patient Posting</Button>
                {popType == "advanced" &&
                  <Button onClick={() => videoModal('payment')}>Zero Payment Posting</Button>
                }
              </div>
            </Popover>
          </Grid>
        </Grid>




      </Grid>






      {/* Deposit drawer */}

      <CustomDrawer
        open={depositDrawerOpen}
        onClose={handleDepositDrawerClose}
        anchor="right"
        // width={900}
        // top={100}
        // borderRadius={8}
        // leftOffset={firstPatientPaymentDrawerOpen ? 0 : 410}
        // height={'100%'}
        title="Setting"
        content={
          <>
            {/* <img src={UploadImg} alt='UploadImg' className='w-100h-100' />
            <AnimateButton type="slide">
              <Button variant="contained" color="success" component="label" sx={{ borderRadius: '40px',position:'relative',top:'-57px', left:'100px' }}>
                {uploadFile}
                <input type="file" multiple hidden onChange={handleDepositFilesUpload} />
              <UploadOutlined style={{ fontSize: '20px', paddingLeft: '10px' }} /> 
              </Button>
            </AnimateButton> */}
            {loading && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <CircularProgress /> {/* Spinner */}
                <p>Processing...</p>
              </div>
            )}

            <Box
            // sx={{
            //   '& .MuiAccordion-root': {
            //     borderColor: theme.palette.divider,
            //     '& .MuiAccordionSummary-root': {
            //       bgcolor: 'transparent',
            //       flexDirection: 'row'
            //     },
            //     '& .MuiAccordionDetails-root': {
            //       borderColor: theme.palette.divider
            //     },
            //     '& .Mui-expanded': {
            //       color: theme.palette.primary.main
            //     }
            //   }
            // }}
            >
              <Accordion
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
                sx={{ backgroundColor: '#fff', borderRadius: '10px', marginBottom: '10px', padding:'0px' }}
              >
                <AccordionSummary
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                  sx={{
                    borderRadius: '10px',
                    minHeight: '40px',
                    borderBottom: '1px solid #ddd',
                    '& .MuiAccordionSummary-expandIconWrapper': { display: 'none' } // Hide the default arrow
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    justifyContent="space-between" // Align icon to the right
                    sx={{ width: '100%' }}
                  >
                    <Typography variant="h6" className="accordian-btn">
                      Properties
                    </Typography>
                    {expanded === 'panel4' ? <DownOutlined style={{ fontSize: '12px' }}/> : <RightOutlined style={{ fontSize: '12px' }}/>} {/* Arrow icon */}
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    <Box>
                      <FormControl sx={{ m: 0, width: '100%', marginBottom: '10px' }}>
                        <FormHelperText sx={{ color: '#000', fontSize: '11px' }}>
                          File Type
                        </FormHelperText>
                        <Select sx={{ background: '#fff', fontSize: '12px', height: '30px' }}>
                          <MenuItem value="Select" sx={{ color: 'text.secondary' }}></MenuItem>
                          <MenuItem value={10}>Excel</MenuItem>
                          <MenuItem value={20}>CSV</MenuItem>
                          <MenuItem value={30}>BAI</MenuItem>
                          <MenuItem value={40}>TXT</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl
                        variant="standard"
                        sx={{ m: 0, width: '100%', marginBottom: '10px' }}
                      >
                        <Stack spacing={3}>
                          <InputLabel
                            sx={{ color: '#000', fontSize: '15px', padding: '0px' }}
                            shrink
                            htmlFor="with-label-input"
                          >
                            File Path
                          </InputLabel>
                          <TextField
                            className="input-height"
                            id="with-label-input"
                            placeholder="File Path"
                          />
                        </Stack>
                      </FormControl>

                      <Button
                        variant="outlined"
                        color="warning"
                        sx={{
                          marginTop: '10px',
                          float: 'right',
                          borderRadius: '45px',
                          padding: '2px 14px',fontSize:'12px'
                        }}
                        startIcon={<PlusCircleOutlined />}
                      >
                        Path
                      </Button>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>



              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                sx={{ borderRadius: '10px', minHeight: '40px', marginBottom: '10px' }}
              >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                  sx={{ borderRadius: '10px', minHeight: '40px', borderBottom: '1px solid #ddd', 
                    '& .MuiAccordionSummary-expandIconWrapper': { display: 'none' }
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between" sx={{ width: '100%' }} >
                    <Typography variant="h6" className='accordian-btn'>Scheduling</Typography>
                    {expanded === 'panel4' ? <DownOutlined style={{ fontSize: '12px' }}/> : <RightOutlined style={{ fontSize: '12px' }}/>} {/* Arrow icon */}
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    <Box sx={{ border: '1px solid #ddd', background: '#f9f9f9', borderRadius: '8px', padding: '8px' }}>
                      <Typography variant="h5" sx={{ fontSize: '12px' }}>Scheduled</Typography>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li><Typography variant="h6" sx={{ fontSize: '13px' }}>Scheduled Daily at 8AM EST</Typography></li>
                      </ul>

                      <Button variant="outlined" color="warning" sx={{ padding:'2px 13px', fontSize:'12px',float: 'right',
                          borderRadius: '45px', }} startIcon={<PlusCircleOutlined />}>Add Schedule</Button>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
                sx={{ borderRadius: '10px', minHeight: '40px', marginBottom: '10px', }}
              >
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"
                  sx={{ borderRadius: '10px', minHeight: '40px', borderBottom: '1px solid #ddd', 
                    '& .MuiAccordionSummary-expandIconWrapper': { display: 'none' }
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
                    <Typography variant="h6" className='accordian-btn'>Rules</Typography>
                    {expanded === 'panel4' ? <DownOutlined style={{ fontSize: '12px' }}/> : <RightOutlined style={{ fontSize: '12px' }}/>} {/* Arrow icon */}
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Box sx={{ border: '1px solid #ddd', background: '#f9f9f9', borderRadius: '8px', padding: '8px' }}>
                      <Typography variant="h5" sx={{ fontSize: '12px' }}>Configured Rules</Typography>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li><Typography variant="h6" sx={{ fontSize: '12px' }}>Capture only Transactions with BAI code 165</Typography></li>
                        <li><Typography variant="h6" sx={{ fontSize: '12px' }}>Ignore all duplicate Transactions</Typography></li>
                      </ul>
                      <Divider />
                      <Typography variant="h5" sx={{ marginTop: '10px', fontSize: '12px', borderRadius: '45px' }}>Add Rules</Typography>
                      <Autocomplete
                        id="size-small-outlined"
                        multiple // Enable multi-select
                        size="small"
                        options={data}
                        getOptionLabel={(option) => option.label || ''} // Ensure the label is valid
                        defaultValue={[data[0], data[1]]} // Select default multiple values
                        renderInput={(params) => <TextField {...params} placeholder="Select Rule" />}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            p: 1, // padding for the input box
                          },
                          '& .MuiAutocomplete-tag': {
                            bgcolor: 'primary.lighter', // Ensure these colors exist in your theme
                            border: '1px solid',
                            borderColor: 'primary.light',
                            '& .MuiSvgIcon-root': {
                              color: 'primary.main',
                              '&:hover': {
                                color: 'primary.dark',
                              },
                            },
                          },
                        }}
                      />
                      <Button variant="outlined" color="warning" sx={{ marginTop: '10px', float: 'right', padding: '2px 10px', fontSize: '12px',
                          borderRadius: '45px', }} startIcon={<PlusCircleOutlined />}>Rule</Button>


                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>
              {/* 
                  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}
                    sx={{ borderRadius:'10px',  minHeight:'40px',  marginBottom:'10px',}}
                  >
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header"
                    sx={{ borderRadius:'10px',  minHeight:'40px', borderBottom: '1px solid #ddd', }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="h6"  className='accordian-btn'>Statistics</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                      <Box>
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th>Agent Last Run</th>
                                      <td>10-01-2024 15:00PM</td>
                                    </tr>
                                    <tr>
                                      <th>Average time file</th>
                                      <td>15sec</td>
                                    </tr>
                                    <tr>
                                      <th>Total file Processed</th>
                                      <td>100</td>
                                    </tr>
                                    <tr>
                                      <th>File Successfully Processed</th>
                                      <td>90</td>
                                    </tr>
                                    <tr>
                                      <th>Files Failed to process</th>
                                      <td>10</td>
                                    </tr>
                                    
                                  </thead>
                                </table>
                            </Box>
                        </Stack>
                    </AccordionDetails>
                  </Accordion> */}
            </Box>




            {/* <CustomTable data={filteredPatinetPaymentData} /> */}
            
              <Button variant="contained" color="success" component="label" onClick={() => setDepositDrawerOpen(false)} sx={{ borderRadius: '40px', marginTop: '20px', padding: '8px 20px', float: 'right' }}>Cancel</Button>
           
          </>

        }
      >
      </CustomDrawer>


      <CustomDrawer
        open={patientPaymentDrawerOpen}
        onClose={handlePatientPaymentDrawerClose}
        anchor="right"
        title="Patient Payment"
        content={
          <>

            <div>
              <img src={UploadImg} alt='UploadImg' className='w-100h-100' />
              <AnimateButton type="slide">
                <Button
                  variant="contained"
                  color="success"
                  component="label"
                  sx={{ borderRadius: '40px', position: 'relative', top: '-57px', left: '100px' }}
                >
                  {patientPaymentUploadedFile}
                  <input type="file" multiple hidden onChange={handlePatientPAymentFilesUpload} />
                </Button>
              </AnimateButton>

              {/* Show Processing button or spinner while loading */}
              {patientPaymentloading && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <CircularProgress /> {/* Spinner */}
                  <p>Processing...</p>
                </div>
              )}
            </div>

            <Box>
              <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '10px', borderBottom: '1px solid #ddd' }}
              >
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header"
                  sx={{ backgroundColor: '#fff', borderRadius: '8px', borderBottom: '1px solid #ddd' }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: '600' }}>Properties</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Box>
                      <FormControl sx={{ m: 0, width: '100%', marginBottom: '10px' }}>
                        <FormHelperText sx={{ color: '#000' }}>File Type </FormHelperText>
                        <Select sx={{ background: '#fff' }}>
                          <MenuItem value="Select" sx={{ color: 'text.secondary' }}></MenuItem>
                          <MenuItem value={10}>Excel</MenuItem>
                          <MenuItem value={20}>CSV</MenuItem>
                          <MenuItem value={30}>BAI</MenuItem>
                          <MenuItem value={40}>TXT</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="standard" sx={{ m: 0, width: '100%', marginBottom: '10px' }}>
                        <Stack spacing={3}>
                          <InputLabel sx={{ color: '#000', fontSize: '16px' }} shrink htmlFor="with-label-input">File Path</InputLabel>
                          <TextField id="with-label-input" placeholder="File Path" />
                        </Stack>
                      </FormControl>

                      <Button variant="outlined" color="warning" sx={{ marginTop: '10px', float: 'right' }} startIcon={<PlusCircleOutlined />}>Path</Button>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>



              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '10px', borderBottom: '1px solid #ddd' }}
              >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                  sx={{ backgroundColor: '#fff', borderRadius: '8px', borderBottom: '1px solid #ddd' }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: '600' }}>Scheduling</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Box sx={{ border: '1px solid #ddd', background: '#f9f9f9', borderRadius: '8px', padding: '8px' }}>
                      <Typography variant="h5" sx={{ fontSize: '14px' }}>Scheduled</Typography>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li><Typography variant="h6" sx={{ fontSize: '14px' }}>Scheduled Daily at 8AM EST</Typography></li>
                      </ul>

                      <Button variant="outlined" color="warning" sx={{ marginTop: '10px' }} startIcon={<PlusCircleOutlined />}>Add Schedule</Button>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '10px', }}
              >
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"
                  sx={{ backgroundColor: '#fff', borderRadius: '8px', borderBottom: '1px solid #ddd' }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: '600' }}>Rules</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Box sx={{ border: '1px solid #ddd', background: '#f9f9f9', borderRadius: '8px', padding: '8px' }}>
                      <Typography variant="h5" sx={{ fontSize: '14px' }}>Configured Rules</Typography>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li><Typography variant="h6" sx={{ fontSize: '14px' }}>Capture only Transactions with BAI code 165</Typography></li>
                        <li><Typography variant="h6" sx={{ fontSize: '14px' }}>Ignore all duplicate Transactions</Typography></li>
                      </ul>
                      <Divider />
                      <Typography variant="h5" sx={{ marginTop: '10px', fontSize: '14px' }}>Add Rules</Typography>
                      <Autocomplete
                        id="size-small-outlined"
                        multiple // Enable multi-select
                        size="small"
                        options={data}
                        getOptionLabel={(option) => option.label || ''} // Ensure the label is valid
                        defaultValue={[data[0], data[1]]} // Select default multiple values
                        renderInput={(params) => <TextField {...params} placeholder="Select Rule" />}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            p: 1, // padding for the input box
                          },
                          '& .MuiAutocomplete-tag': {
                            bgcolor: 'primary.lighter', // Ensure these colors exist in your theme
                            border: '1px solid',
                            borderColor: 'primary.light',
                            '& .MuiSvgIcon-root': {
                              color: 'primary.main',
                              '&:hover': {
                                color: 'primary.dark',
                              },
                            },
                          },
                        }}
                      />
                      <Button variant="outlined" color="warning" sx={{ marginTop: '10px', float: 'right', padding: '2px 10px' }} startIcon={<PlusCircleOutlined />}>Rule</Button>


                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}
                sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
              >
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header"
                  sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: '600' }}>Statistics</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Box>
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Agent Last Run</th>
                            <td>10-01-2024 15:00PM</td>
                          </tr>
                          <tr>
                            <th>Average time file</th>
                            <td>15sec</td>
                          </tr>
                          <tr>
                            <th>Total file Processed</th>
                            <td>100</td>
                          </tr>
                          <tr>
                            <th>File Successfully Processed</th>
                            <td>90</td>
                          </tr>
                          <tr>
                            <th>Files Failed to process</th>
                            <td>10</td>
                          </tr>

                        </thead>
                      </table>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>


            {/* <CustomTable data={filteredPatinetPaymentData} /> */}
            <AnimateButton type="slide">
              <Button variant="contained" color="success" component="label" onClick={() => setDepositDrawerOpen(false)} sx={{ borderRadius: '40px', marginTop: '20px', padding: '10px 30px', float: 'right' }}>Back</Button>
            </AnimateButton>
          </>

        }
      >
      </CustomDrawer>
      {renderVideoModal()}

      <CustomDialog
        open={depositDialogOpen}
        onClose={handleDeposiDialogClose}
        title={"Deposit"}
      >
        <CustomTable data={tableData} datacolumns={depositColumns} />

      </CustomDialog>

      <CustomDialog
        open={firstRemmitenceDrawerOpen}
        onClose={handleRemmitenceDialogClose}
        title={"Remittance"}
      >
        <CustomTable data={tableData} datacolumns={remColumns} />

      </CustomDialog>

      <CustomDialog
        open={patientPaymentDialogOpen}
        onClose={handlePatientPaymentDialogClose}
        title={"Patient Payment"}
      >
        <CustomTable data={tableData} datacolumns={patientPaymentColumns} />

      </CustomDialog>

    </LocalizationProvider>
  );


}

export default MindPathPage;
