import React, { useState, useMemo } from 'react';
import { Grid, Button, CircularProgress, Typography,Popover } from '@mui/material';
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
import { Box, Drawer, Table, TableBody, TableCell, TableHead, TableRow,MenuItem,InputLabel , Autocomplete,TextField,FormControl,FormHelperText ,Select   } from '@mui/material';
import UploadImg from 'assets/images/UploadImg.jpg';
import AnimateButton from 'components/@extended/AnimateButton';
import { borderRadius, fontSize, textAlign, width } from '@mui/system';
import { UploadOutlined } from '@ant-design/icons';

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
import { SmileOutlined, UserOutlined, ClockCircleOutlined, PictureOutlined ,PlusCircleOutlined} from '@ant-design/icons'; // Assuming you use Ant Design icons
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
      action:'1'
    },
    {
      file_name: 'Transaction_002.pdf',
      classification_type: 'Remittance',
      batch_date: '2024-09-28',
      payer: 'XYZ Insurance',
      payment_amount: 800.75,
      state_name: 'AZ',
      action:'1'
    },
    {
      file_name: 'Transaction_003.pdf',
      classification_type: 'Patient Payment',
      batch_date: '2024-10-03',
      payer: 'John Doe',
      payment_amount: 120.00,
      state_name: 'AZ',
      action:'1'
    },
    {
      file_name: 'Transaction_004.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-30',
      payer: 'DEF Healthcare',
      payment_amount: 2000.00,
      state_name: 'TX',
      action:'1'
    },
    {
      file_name: 'Transaction_005.pdf',
      classification_type: 'Remittance',
      batch_date: '2024-10-02',
      payer: 'MNO Insurance',
      payment_amount: 500.00,
      state_name: 'CA',
      action:'1'
    },
    {
      file_name: 'Transaction_006.pdf',
      classification_type: 'Patient Payment',
      batch_date: '2024-09-29',
      payer: 'Jane Smith',
      payment_amount: 250.50,
      state_name: 'TX',
      action:'1'
    },
    {
      file_name: 'Transaction_007.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-09-25',
      payer: 'GHI Medical',
      payment_amount: 1750.20,
      state_name: 'AZ',
      action:'1'
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the clicked element as the anchor
};

const handleClose = () => {
    setAnchorEl(null); // Close the popover
};

const open = Boolean(anchorEl); // Check if popover is open
const id = open ? 'simple-popover' : undefined; // Give id if open

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container className='main-bg'>
        {/* Pannel 1 */}
        <Grid item xs={12} md={2} lg={2} sm={2} marginTop={13}>
            <Grid sx={{ textAlign: 'center', marginBottom:'40px' }}>
              <Button className='depositbox' onClick={handleDepositClick}>
                <img src={DepositIcon} alt="DepositIcon" style={{ width: '20px', height: 'auto' }} />
                <Typography level="h3" className='depositbox-text'>Deposit</Typography>
              </Button>
            </Grid>
            <Grid sx={{ textAlign: 'center', marginBottom:'40px' }}>
              <Button className='depositbox depositbox-blue' 
                onClick={() => {
                  setTableData([
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "ALA PREVOS",
                      "Billed Amount": 490,
                      "Allowed Amount": 222.12,
                      "Patient Amount": 25.0,
                      "Paid Amount": 197.12,
                      "Start DOS": "2024-05-10 00:00:00",
                      "End DOS": "2024-05-10 00:00:00",
                      "CPT Code": [
                        90792
                      ],
                      "Ln Claimed": [
                        490
                      ],
                      "Ln Allowed": [
                        222.12
                      ],
                      "Ln Paid": [
                        197.12
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        25.0
                      ],
                      "Ln Denied": [
                        267.88
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "ALEX G NESE",
                      "Billed Amount": 233,
                      "Allowed Amount": 127.61,
                      "Patient Amount": 10.0,
                      "Paid Amount": 117.61,
                      "Start DOS": "2024-07-24 00:00:00",
                      "End DOS": "2024-07-24 00:00:00",
                      "CPT Code": [
                        99213
                      ],
                      "Ln Claimed": [
                        233
                      ],
                      "Ln Allowed": [
                        127.61
                      ],
                      "Ln Paid": [
                        117.61
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        10.0
                      ],
                      "Ln Denied": [
                        105.39
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "ALEX PIT",
                      "Billed Amount": 366,
                      "Allowed Amount": 131.59,
                      "Patient Amount": 30.0,
                      "Paid Amount": 101.59,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        90837
                      ],
                      "Ln Claimed": [
                        366
                      ],
                      "Ln Allowed": [
                        131.59
                      ],
                      "Ln Paid": [
                        101.59
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        30.0
                      ],
                      "Ln Denied": [
                        234.41
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "AMAN FIN",
                      "Billed Amount": 661,
                      "Allowed Amount": 203.38,
                      "Patient Amount": 15.0,
                      "Paid Amount": 184.61,
                      "Start DOS": "2024-09-17 00:00:00",
                      "End DOS": "2024-09-17 00:00:00",
                      "CPT Code": [
                        99214,
                        90838
                      ],
                      "Ln Claimed": [
                        329,
                        332
                      ],
                      "Ln Allowed": [
                        103.86,
                        99.52
                      ],
                      "Ln Paid": [
                        87.08,
                        97.53
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0,
                        ""
                      ],
                      "Ln Denied": [
                        225.14,
                        232.48
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "AND MER",
                      "Billed Amount": 366,
                      "Allowed Amount": 131.59,
                      "Patient Amount": 26.32,
                      "Paid Amount": 105.27,
                      "Start DOS": "2024-09-04 00:00:00",
                      "End DOS": "2024-09-04 00:00:00",
                      "CPT Code": [
                        90837
                      ],
                      "Ln Claimed": [
                        366
                      ],
                      "Ln Allowed": [
                        131.59
                      ],
                      "Ln Paid": [
                        105.27
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        26.32
                      ],
                      "Ln Co-Pay": [
                        ""
                      ],
                      "Ln Denied": [
                        234.41
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "AND MER",
                      "Billed Amount": 661,
                      "Allowed Amount": 302.97,
                      "Patient Amount": 60.59,
                      "Paid Amount": 242.38,
                      "Start DOS": "2024-09-10 00:00:00",
                      "End DOS": "2024-09-10 00:00:00",
                      "CPT Code": [
                        90838,
                        99214
                      ],
                      "Ln Claimed": [
                        332,
                        329
                      ],
                      "Ln Allowed": [
                        149.72,
                        153.25
                      ],
                      "Ln Paid": [
                        119.78,
                        122.6
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        29.94,
                        30.65
                      ],
                      "Ln Co-Pay": [
                        "",
                        ""
                      ],
                      "Ln Denied": [
                        182.28,
                        175.75
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "ANN ELIS",
                      "Billed Amount": 530,
                      "Allowed Amount": 242.56,
                      "Patient Amount": 10.0,
                      "Paid Amount": 232.56,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        153.25,
                        89.31
                      ],
                      "Ln Paid": [
                        143.25,
                        89.31
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        10.0,
                        ""
                      ],
                      "Ln Denied": [
                        175.75,
                        111.69
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "BENN WILL",
                      "Billed Amount": 329,
                      "Allowed Amount": 153.25,
                      "Patient Amount": 30.0,
                      "Paid Amount": 123.25,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        99214
                      ],
                      "Ln Claimed": [
                        329
                      ],
                      "Ln Allowed": [
                        153.25
                      ],
                      "Ln Paid": [
                        123.25
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        30.0
                      ],
                      "Ln Denied": [
                        175.75
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "BET PIN",
                      "Billed Amount": 530,
                      "Allowed Amount": 269.6,
                      "Patient Amount": 269.6,
                      "Paid Amount": 0.0,
                      "Start DOS": "2024-09-11 00:00:00",
                      "End DOS": "2024-09-11 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        180.29,
                        89.31
                      ],
                      "Ln Paid": [
                        0.0,
                        0.0
                      ],
                      "Ln Deductible": [
                        180.29,
                        89.31
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        "",
                        ""
                      ],
                      "Ln Denied": [
                        148.71,
                        111.69
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "BLAK FORD",
                      "Billed Amount": 233,
                      "Allowed Amount": 108.47,
                      "Patient Amount": 108.47,
                      "Paid Amount": 0.0,
                      "Start DOS": "2024-09-05 00:00:00",
                      "End DOS": "2024-09-05 00:00:00",
                      "CPT Code": [
                        99213
                      ],
                      "Ln Claimed": [
                        233
                      ],
                      "Ln Allowed": [
                        108.47
                      ],
                      "Ln Paid": [
                        0.0
                      ],
                      "Ln Deductible": [
                        108.47
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        ""
                      ],
                      "Ln Denied": [
                        124.53
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "CAMRY PAJ",
                      "Billed Amount": 530,
                      "Allowed Amount": 242.56,
                      "Patient Amount": 48.51,
                      "Paid Amount": 194.05,
                      "Start DOS": "2024-09-04 00:00:00",
                      "End DOS": "2024-09-04 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        153.25,
                        89.31
                      ],
                      "Ln Paid": [
                        122.6,
                        71.45
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        30.65,
                        17.86
                      ],
                      "Ln Co-Pay": [
                        "",
                        ""
  
                      ],
                      "Ln Denied": [
                        175.75,
                        111.69
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "CATH KIT",
                      "Billed Amount": 329,
                      "Allowed Amount": 153.25,
                      "Patient Amount": 15.0,
                      "Paid Amount": 138.25,
                      "Start DOS": "2024-09-11 00:00:00",
                      "End DOS": "2024-09-11 00:00:00",
                      "CPT Code": [
                        99214
                      ],
                      "Ln Claimed": [
                        329
                      ],
                      "Ln Allowed": [
                        153.25
                      ],
                      "Ln Paid": [
                        138.25
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0
                      ],
                      "Ln Denied": [
                        175.75
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "CHRISTI L PON",
                      "Billed Amount": 366,
                      "Allowed Amount": 111.47,
                      "Patient Amount": 25.0,
                      "Paid Amount": 84.74,
                      "Start DOS": "2024-09-20 00:00:00",
                      "End DOS": "2024-09-20 00:00:00",
                      "CPT Code": [
                        90837
                      ],
                      "Ln Claimed": [
                        366
                      ],
                      "Ln Allowed": [
                        111.47
                      ],
                      "Ln Paid": [
                        84.74
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        25.0
                      ],
                      "Ln Denied": [
                        254.53
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "DAR H BART",
                      "Billed Amount": 250,
                      "Allowed Amount": 75.62,
                      "Patient Amount": 15.0,
                      "Paid Amount": 59.41,
                      "Start DOS": "2024-09-18 00:00:00",
                      "End DOS": "2024-09-18 00:00:00",
                      "CPT Code": [
                        90834
                      ],
                      "Ln Claimed": [
                        250
                      ],
                      "Ln Allowed": [
                        75.62
                      ],
                      "Ln Paid": [
                        59.41
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0
                      ],
                      "Ln Denied": [
                        174.38
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "DUST W JOHN",
                      "Billed Amount": 329,
                      "Allowed Amount": 153.25,
                      "Patient Amount": 35.0,
                      "Paid Amount": 118.25,
                      "Start DOS": "2024-08-30 00:00:00",
                      "End DOS": "2024-08-30 00:00:00",
                      "CPT Code": [
                        99214
                      ],
                      "Ln Claimed": [
                        329
                      ],
                      "Ln Allowed": [
                        153.25
                      ],
                      "Ln Paid": [
                        118.25
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        35.0
                      ],
                      "Ln Denied": [
                        175.75
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "ELY MAN",
                      "Billed Amount": 530,
                      "Allowed Amount": 242.56,
                      "Patient Amount": 48.51,
                      "Paid Amount": 194.05,
                      "Start DOS": "2024-09-05 00:00:00",
                      "End DOS": "2024-09-05 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        153.25,
                        89.31
                      ],
                      "Ln Paid": [
                        122.6,
                        71.45
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        30.65,
                        17.86
                      ],
                      "Ln Co-Pay": [
                        "",
                        ""
                      ],
                      "Ln Denied": [
                        175.75,
                        111.69
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "EVIN CALL",
                      "Billed Amount": 434,
                      "Allowed Amount": 197.78,
                      "Patient Amount": 10.0,
                      "Paid Amount": 187.78,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        90833,
                        99213
                      ],
                      "Ln Claimed": [
                        201,
                        233
                      ],
                      "Ln Allowed": [
                        89.31,
                        108.47
                      ],
                      "Ln Paid": [
                        79.31,
                        108.47
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        10.0,
                        ""
                      ],
                      "Ln Denied": [
                        111.69,
                        124.53
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "GILL C NES",
                      "Billed Amount": 366,
                      "Allowed Amount": 131.59,
                      "Patient Amount": 10.0,
                      "Paid Amount": 121.59,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        90837
                      ],
                      "Ln Claimed": [
                        366
                      ],
                      "Ln Allowed": [
                        131.59
                      ],
                      "Ln Paid": [
                        121.59
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        10.0
                      ],
                      "Ln Denied": [
                        234.41
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "HANA G ROS",
                      "Billed Amount": 329,
                      "Allowed Amount": 153.25,
                      "Patient Amount": 55.0,
                      "Paid Amount": 98.25,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        99214
                      ],
                      "Ln Claimed": [
                        329
                      ],
                      "Ln Allowed": [
                        153.25
                      ],
                      "Ln Paid": [
                        98.25
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        55.0
                      ],
                      "Ln Denied": [
                        175.75
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "JAME S FRANC",
                      "Billed Amount": 366,
                      "Allowed Amount": 111.47,
                      "Patient Amount": 15.0,
                      "Paid Amount": 94.54,
                      "Start DOS": "2024-09-20 00:00:00",
                      "End DOS": "2024-09-20 00:00:00",
                      "CPT Code": [
                        90837
                      ],
                      "Ln Claimed": [
                        366
                      ],
                      "Ln Allowed": [
                        111.47
                      ],
                      "Ln Paid": [
                        94.54
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0
                      ],
                      "Ln Denied": [
                        254.53
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "JENNI HAR",
                      "Billed Amount": 329,
                      "Allowed Amount": 180.29,
                      "Patient Amount": 30.0,
                      "Paid Amount": 150.29,
                      "Start DOS": "2024-07-24 00:00:00",
                      "End DOS": "2024-07-24 00:00:00",
                      "CPT Code": [
                        99214
                      ],
                      "Ln Claimed": [
                        329
                      ],
                      "Ln Allowed": [
                        180.29
                      ],
                      "Ln Paid": [
                        150.29
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        30.0
                      ],
                      "Ln Denied": [
                        148.71
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "KAIT A CROS",
                      "Billed Amount": 530,
                      "Allowed Amount": 242.56,
                      "Patient Amount": 242.56,
                      "Paid Amount": 0.0,
                      "Start DOS": "2024-09-05 00:00:00",
                      "End DOS": "2024-09-05 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        153.25,
                        89.31
                      ],
                      "Ln Paid": [
                        0.0,
                        0.0
                      ],
                      "Ln Deductible": [
                        153.25,
                        89.31
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        "",
                        ""
                      ],
                      "Ln Denied": [
                        175.75,
                        111.69
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "KAY TON",
                      "Billed Amount": 329,
                      "Allowed Amount": 153.25,
                      "Patient Amount": 25.0,
                      "Paid Amount": 128.25,
                      "Start DOS": "2024-09-11 00:00:00",
                      "End DOS": "2024-09-11 00:00:00",
                      "CPT Code": [
                        99214
                      ],
                      "Ln Claimed": [
                        329
                      ],
                      "Ln Allowed": [
                        153.25
                      ],
                      "Ln Paid": [
                        128.25
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        25.0
                      ],
                      "Ln Denied": [
                        175.75
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "KEL J MISCH",
                      "Billed Amount": 366,
                      "Allowed Amount": 131.59,
                      "Patient Amount": 10.0,
                      "Paid Amount": 121.59,
                      "Start DOS": "2024-09-20 00:00:00",
                      "End DOS": "2024-09-20 00:00:00",
                      "CPT Code": [
                        90837
                      ],
                      "Ln Claimed": [
                        366
                      ],
                      "Ln Allowed": [
                        131.59
                      ],
                      "Ln Paid": [
                        121.59
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        10.0
                      ],
                      "Ln Denied": [
                        234.41
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "KELY BRIDE",
                      "Billed Amount": 329,
                      "Allowed Amount": 153.25,
                      "Patient Amount": 30.0,
                      "Paid Amount": 123.25,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        99214
                      ],
                      "Ln Claimed": [
                        329
                      ],
                      "Ln Allowed": [
                        153.25
                      ],
                      "Ln Paid": [
                        123.25
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        30.0
                      ],
                      "Ln Denied": [
                        175.75
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "KRISTI MAN",
                      "Billed Amount": 490,
                      "Allowed Amount": 240.63,
                      "Patient Amount": 35.0,
                      "Paid Amount": 205.63,
                      "Start DOS": "2024-08-23 00:00:00",
                      "End DOS": "2024-08-23 00:00:00",
                      "CPT Code": [
                        90792
                      ],
                      "Ln Claimed": [
                        490
                      ],
                      "Ln Allowed": [
                        240.63
                      ],
                      "Ln Paid": [
                        205.63
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        35.0
                      ],
                      "Ln Denied": [
                        249.37
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "LINDSY T EAG",
                      "Billed Amount": 250,
                      "Allowed Amount": 100.82,
                      "Patient Amount": 15.0,
                      "Paid Amount": 84.1,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        90834
                      ],
                      "Ln Claimed": [
                        250
                      ],
                      "Ln Allowed": [
                        100.82
                      ],
                      "Ln Paid": [
                        84.1
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0
                      ],
                      "Ln Denied": [
                        149.18
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "LIS HUGS",
                      "Billed Amount": 530,
                      "Allowed Amount": 242.56,
                      "Patient Amount": 242.56,
                      "Paid Amount": 0.0,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        153.25,
                        89.31
                      ],
                      "Ln Paid": [
                        0.0,
                        0.0
                      ],
                      "Ln Deductible": [
                        153.25,
                        89.31
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        "",
                        ""
                      ],
                      "Ln Denied": [
                        175.75,
                        111.69
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "LYN HOB",
                      "Billed Amount": 583,
                      "Allowed Amount": 210.55,
                      "Patient Amount": 15.0,
                      "Paid Amount": 191.64,
                      "Start DOS": "2024-09-19 00:00:00",
                      "End DOS": "2024-09-19 00:00:00",
                      "CPT Code": [
                        90836,
                        99214
                      ],
                      "Ln Claimed": [
                        254,
                        329
                      ],
                      "Ln Allowed": [
                        88.36,
                        122.19
                      ],
                      "Ln Paid": [
                        71.89,
                        119.75
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0,
                        ""
                      ],
                      "Ln Denied": [
                        165.64,
                        206.81
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "MARTH F RUBEN",
                      "Billed Amount": 530,
                      "Allowed Amount": 163.22,
                      "Patient Amount": 15.0,
                      "Paid Amount": 145.25,
                      "Start DOS": "2024-09-19 00:00:00",
                      "End DOS": "2024-09-19 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        103.86,
                        59.36
                      ],
                      "Ln Paid": [
                        87.08,
                        58.17
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0,
                        ""
                      ],
                      "Ln Denied": [
                        225.14,
                        141.64
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "MAY P HICK",
                      "Billed Amount": 530,
                      "Allowed Amount": 163.22,
                      "Patient Amount": 15.0,
                      "Paid Amount": 145.25,
                      "Start DOS": "2024-09-16 00:00:00",
                      "End DOS": "2024-09-16 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        103.86,
                        59.36
                      ],
                      "Ln Paid": [
                        87.08,
                        58.17
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0,
                        ""
                      ],
                      "Ln Denied": [
                        225.14,
                        141.64
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "MEG LIVING",
                      "Billed Amount": 490,
                      "Allowed Amount": 240.63,
                      "Patient Amount": 40.0,
                      "Paid Amount": 200.63,
                      "Start DOS": "2024-09-11 00:00:00",
                      "End DOS": "2024-09-11 00:00:00",
                      "CPT Code": [
                        90792
                      ],
                      "Ln Claimed": [
                        490
                      ],
                      "Ln Allowed": [
                        240.63
                      ],
                      "Ln Paid": [
                        200.63
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        40.0
                      ],
                      "Ln Denied": [
                        249.37
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "MERI WATER",
                      "Billed Amount": 233,
                      "Allowed Amount": 108.47,
                      "Patient Amount": 25.0,
                      "Paid Amount": 83.47,
                      "Start DOS": "2024-09-06 00:00:00",
                      "End DOS": "2024-09-06 00:00:00",
                      "CPT Code": [
                        99213
                      ],
                      "Ln Claimed": [
                        233
                      ],
                      "Ln Allowed": [
                        108.47
                      ],
                      "Ln Paid": [
                        83.47
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        25.0
                      ],
                      "Ln Denied": [
                        124.53
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "RICH J KREISE III",
                      "Billed Amount": 329,
                      "Allowed Amount": 122.19,
                      "Patient Amount": 15.0,
                      "Paid Amount": 105.05,
                      "Start DOS": "2024-09-13 00:00:00",
                      "End DOS": "2024-09-13 00:00:00",
                      "CPT Code": [
                        99214
                      ],
                      "Ln Claimed": [
                        329
                      ],
                      "Ln Allowed": [
                        122.19
                      ],
                      "Ln Paid": [
                        105.05
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0
                      ],
                      "Ln Denied": [
                        206.81
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "RIKA BRET",
                      "Billed Amount": 433,
                      "Allowed Amount": 125.96,
                      "Patient Amount": 15.0,
                      "Paid Amount": 108.74,
                      "Start DOS": "2024-09-17 00:00:00",
                      "End DOS": "2024-09-17 00:00:00",
                      "CPT Code": [
                        90791
                      ],
                      "Ln Claimed": [
                        433
                      ],
                      "Ln Allowed": [
                        125.96
                      ],
                      "Ln Paid": [
                        108.74
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0
                      ],
                      "Ln Denied": [
                        307.04
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "SARAH SHELEY",
                      "Billed Amount": 250,
                      "Allowed Amount": 89.26,
                      "Patient Amount": 10.0,
                      "Paid Amount": 79.26,
                      "Start DOS": "2024-09-05 00:00:00",
                      "End DOS": "2024-09-05 00:00:00",
                      "CPT Code": [
                        90834
                      ],
                      "Ln Claimed": [
                        250
                      ],
                      "Ln Allowed": [
                        89.26
                      ],
                      "Ln Paid": [
                        79.26
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        10.0
                      ],
                      "Ln Denied": [
                        160.74
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "STEPHAN H TIN",
                      "Billed Amount": 530,
                      "Allowed Amount": 242.56,
                      "Patient Amount": 184.1,
                      "Paid Amount": 58.46,
                      "Start DOS": "2024-09-10 00:00:00",
                      "End DOS": "2024-09-10 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        153.25,
                        89.31
                      ],
                      "Ln Paid": [
                        0.0,
                        58.46
                      ],
                      "Ln Deductible": [
                        153.25,
                        16.23
                      ],
                      "Ln Co-Ins": [
                        "",
                        14.62
                      ],
                      "Ln Co-Pay": [
                        "",
                        ""
                      ],
                      "Ln Denied": [
                        175.75,
                        111.69
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "STEVE CRAG HOLLOW",
                      "Billed Amount": 250,
                      "Allowed Amount": 75.62,
                      "Patient Amount": 15.0,
                      "Paid Amount": 59.41,
                      "Start DOS": "2024-09-18 00:00:00",
                      "End DOS": "2024-09-18 00:00:00",
                      "CPT Code": [
                        90834
                      ],
                      "Ln Claimed": [
                        250
                      ],
                      "Ln Allowed": [
                        75.62
                      ],
                      "Ln Paid": [
                        59.41
                      ],
                      "Ln Deductible": [
                        ""
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0
                      ],
                      "Ln Denied": [
                        174.38
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "SUSA J TON",
                      "Billed Amount": 530,
                      "Allowed Amount": 163.22,
                      "Patient Amount": 15.0,
                      "Paid Amount": 145.25,
                      "Start DOS": "2024-07-25 00:00:00",
                      "End DOS": "2024-07-25 00:00:00",
                      "CPT Code": [
                        99214,
                        90833
                      ],
                      "Ln Claimed": [
                        329,
                        201
                      ],
                      "Ln Allowed": [
                        103.86,
                        59.36
                      ],
                      "Ln Paid": [
                        87.08,
                        58.17
                      ],
                      "Ln Deductible": [
                        "",
                        ""
                      ],
                      "Ln Co-Ins": [
                        "",
                        ""
                      ],
                      "Ln Co-Pay": [
                        15.0,
                        ""
                      ],
                      "Ln Denied": [
                        225.14,
                        141.64
                      ]
                    },
                    {
                      "Transaction number": "24270B100001263100",
                      "Payor": "BCBS",
                      "Deposit Date": "2024-09-30",
                      "Amount": 5308.81,
                      "Patient Name": "ZIN LED EDRAZE",
                      "Billed Amount": 250,
                      "Allowed Amount": 89.26,
                      "Patient Amount": 89.26,
                      "Paid Amount": 0.0,
                      "Start DOS": "2024-09-12 00:00:00",
                      "End DOS": "2024-09-12 00:00:00",
                      "CPT Code": [
                        90834
                      ],
                      "Ln Claimed": [
                        250
                      ],
                      "Ln Allowed": [
                        89.26
                      ],
                      "Ln Paid": [
                        0.0
                      ],
                      "Ln Deductible": [
                        89.26
                      ],
                      "Ln Co-Ins": [
                        ""
                      ],
                      "Ln Co-Pay": [
                        ""
                      ],
                      "Ln Denied": [
                        160.74
                      ]
                    }
                  ])
                  setFirstRemmitenceDrawerOpen(true)
                }}
              >
                <img src={RemitIcon} alt="RemitIcon" style={{ width: '20px', height: 'auto' }} />
                <Typography level="h3" className='depositbox-text'>Remittance</Typography>
              </Button>
            </Grid>
            <Grid sx={{ textAlign: 'center', marginBottom:'40px' }}>
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
        </Grid>
        {/* Pannel 2 */}
        <Grid item xs={12} md={2} lg={2} sm={2} marginTop={13} sx={{marginLeft:'-15px'}}>
          <div style={{ display: 'flex' }}>
            <img src={DotLine1} alt="DotLine1"  style={{ height:'8px', marginTop:'25px'}}/>
            <Button 
            // onClick={() => { setDepositDialogOpen(true) }}
            onClick = {handleNavigateDeposit}
            >
              <img src={iCanImg} alt="iCanImg" className="w-100h-100 ican-bg" />
            </Button>
          </div>
          <div style={{ marginTop: '25px', display: 'flex' }} >
            <img src={DotLine1} alt="DotLine1"  style={{ height:'8px',marginTop:'28px' }}/>
            <Button>
              <img src={iCanImg} alt="iCanImg" className="w-100h-100 ican-bg" />
            </Button>
          </div>
          <div style={{display: 'flex', marginTop: '28px' }}>
            <img src={DotLine1} alt="DotLine1"  style={{ height:'8px',marginTop:'28px'  }}/>
            <Button 
            // onClick={() => {setPatientPaymentDialogOpen(true)}}
            onClick={() => navigate('/patient/payment/patientpayment')}
            >
              <img src={iCanImg} alt='iCanImg' className='w-100h-100 ican-bg' />
            </Button>
          </div>
        </Grid>
        {/* Pannel 3 */}
        <Grid item xs={12} md={1} lg={1} sm={1} className='dotarrow2'>
          <img src={DotLine2} alt="DotLine2" style={{ marginTop: '25px',maxWidth: '119px' }} />
          <div>
            <img src={DotLine1} alt="DotLine1" style={{ position:'relative', top:'-5px'}} />
          </div>
          <img src={DotLine3} alt="DotLine3" style={{ marginTop: '0px',maxWidth: '119px' }} />
        </Grid>
        {/* Pannel 4 */}
        <Grid item xs={12} md={2} lg={2} sm={2} marginTop={11} style={{position:'relative', left:'-30px'}}>
          <img src={DotLine4} alt="DotLine4" style={{maxWidth: '209px', position:'relative', left:'130px' }} />
          <img src={DataBaseIcon} alt="DataBaseIcon" style={{maxWidth: '200px' }} />
          <img src={DotLine5} alt="DotLine5" style={{display:'flex', margin:'0 auto'}} />
          <Grid sx={{ textAlign: 'center', marginBottom:'40px' }}>
            <Button className='depositbox depositbox-green'>
              <img src={PostingIcon} alt="PostingIcon" style={{ width: '20px', height: 'auto' }} />
              <Typography level="h3" className='depositbox-text'>Posting Reports </Typography>
            </Button>
          </Grid>
        </Grid>
        {/* Pannel 5 */}
        <Grid item xs={12} md={3} lg={3} sm={3} marginTop={8} marginLeft={6}>
            <Grid sx={{ textAlign: 'center', marginBottom:'40px' }}>
              <Button className='depositbox deposit-recon'>
                <img src={Recon} alt="Recon" style={{ width: '20px', height: 'auto' }} />
                <Typography level="h3" className='depositbox-text'>Reconciliation</Typography>
              </Button>
            </Grid>
            <Grid sx={{ textAlign: 'center',position:'relative' }}>
              <Button className='depositbox deposit-cashpost' onClick={handleMovePatientMovement}>
                <img src={CashPostingIcon} alt="CashPostingIcon" style={{ width: '20px', height: 'auto' }} />
                <Typography level="h3" className='depositbox-text'>Cash Posting Queue</Typography>
              </Button>
              <div style={{ position:'absolute', left:'-80px', top:'17px'}}>
                <img src={DotLine1} alt="DotLine1" style={{ maxWidth:'140px'}}/>
              </div>
            </Grid>
            <Grid sx={{ textAlign: 'center', marginBottom:'40px' }}>
              <div>
                <img src={DotLine6} alt="DotLine6" style={{ maxWidth:'110px'}}/>
                <img src={DotLine7} alt="DotLine7" style={{ maxWidth:'110px'}}/>
              </div>
            </Grid>
            <Grid style={{display:'flex', justifyContent:'space-between', marginTop:'-40px'}}>
              <img src={iCanImg} alt="iCanImg" className="w-100h-100 ican-bg" style={{left:'30px'}}/>
              <img src={iCanImg} alt="iCanImg" className="w-100h-100 ican-bg" style={{position:'relative', left:'-28px'}}/>
            </Grid>
            <Grid>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <img src={DotLine8} alt="DotLine8" style={{ maxWidth:'90px', paddingLeft:'60px'}}/>
                <img src={DotLine8} alt="DotLine8" style={{ maxWidth:'90px', position:'relative', left:'-50px'}}/>
              </div>
            </Grid> 
            <Grid container marginTop={2} position={'relative'}>
              {/* AdvancedMd Logo */}
              <Grid item className='bottom-logo' xs={12} md={5} lg={5} sm={5} onClick={handleClick}>
                  <img src={AdvancedMd} alt="AdvancedMd" style={{ maxWidth: '100px' }} />
              </Grid>

              {/* NexGen Logo */}
              <Grid item className='bottom-logo' xs={12} md={5} lg={5} sm={5} style={{ position: 'relative', left: '50px' }}>
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
                      vertical: 'top',
                      horizontal: 'center',
                  }}
              >
                  <Typography sx={{ p: 2 }}>Choose an Option:</Typography>
                  <Button onClick={() => alert('Option 1 Selected')}>Option 1</Button>
                  <Button onClick={() => alert('Option 2 Selected')}>Option 2</Button>
                  <Button onClick={() => alert('Option 3 Selected')}>Option 3</Button>
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
        title="Deposit"
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
                  <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}
                    sx={{ backgroundColor: '#fff', borderRadius:'10px', marginBottom:'10px', }}
                  >
                    <AccordionSummary aria-controls="panel4d-content" id="panel4d-header"
                    sx={{ borderRadius:'10px',  minHeight:'40px', borderBottom: '1px solid #ddd', }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="h6" className='accordian-btn'>Properties</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                        <Box>
                        <FormControl sx={{ m: 0,width:'100%', marginBottom:'10px'}}>
                          <FormHelperText sx={{ color:'#000', fontSize:'11px'}}>File Type </FormHelperText>
                          <Select sx={{ background:'#fff', fontSize:'12px',height:'30px'}}>
                            <MenuItem value="Select" sx={{ color: 'text.secondary' }}></MenuItem>
                            <MenuItem value={10}>Excel</MenuItem>
                            <MenuItem value={20}>CSV</MenuItem>
                            <MenuItem value={30}>BAI</MenuItem>
                            <MenuItem value={40}>TXT</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 0,width:'100%', marginBottom:'10px' }}>
                          <Stack spacing={3}>
                          <InputLabel sx={{ color:'#000', fontSize:'15px', padding:'0px'}} shrink htmlFor="with-label-input">File Path</InputLabel>
                            <TextField class='input-height'  id="with-label-input" placeholder="File Path" />
                          </Stack>
                        </FormControl>
                         
                          <Button variant="outlined" color="warning" sx={{marginTop:'10px', float:'right', borderRadius:'45px',padding:'0px'}} startIcon={<PlusCircleOutlined />}>Path</Button>
                        </Box>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>



                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                    sx={{ borderRadius:'10px',  minHeight:'40px',  marginBottom:'10px' }}
                  >
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                    sx={{ borderRadius:'10px',  minHeight:'40px', borderBottom: '1px solid #ddd', }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="h6"  className='accordian-btn'>Scheduling</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                        <Box sx={{border:'1px solid #ddd', background:'#f9f9f9', borderRadius:'8px',padding:'8px'}}>
                          <Typography variant="h5" sx={{ fontSize:'14px'}}>Scheduled</Typography>
                          <ul style={{paddingLeft:'20px'}}>
                              <li><Typography variant="h6" sx={{fontSize:'14px' }}>Scheduled Daily at 8AM EST</Typography></li>
                            </ul>
                         
                          <Button variant="outlined" color="warning" sx={{marginTop:'10px'}} startIcon={<PlusCircleOutlined />}>Add Schedule</Button>
                        </Box>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
                   sx={{ borderRadius:'10px',  minHeight:'40px',  marginBottom:'10px',}}
                  >
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"
                     sx={{ borderRadius:'10px',  minHeight:'40px', borderBottom: '1px solid #ddd', }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="h6"  className='accordian-btn'>Rules</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                          <Box sx={{border:'1px solid #ddd', background:'#f9f9f9', borderRadius:'8px',padding:'8px'}}>
                            <Typography variant="h5" sx={{fontSize:'14px' }}>Configured Rules</Typography>
                            <ul style={{paddingLeft:'20px'}}>
                              <li><Typography variant="h6" sx={{fontSize:'14px' }}>Capture only Transactions with BAI code 165</Typography></li>
                              <li><Typography variant="h6" sx={{fontSize:'14px' }}>Ignore all duplicate Transactions</Typography></li>
                            </ul>
                          <Divider/>
                            <Typography variant="h5" sx={{ marginTop:'10px', fontSize:'14px'}}>Add Rules</Typography>
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
                              <Button variant="outlined" color="warning" sx={{marginTop:'10px', float:'right', padding:'2px 10px'}} startIcon={<PlusCircleOutlined />}>Rule</Button>


                          </Box>
                        </Stack>
                    </AccordionDetails>
                  </Accordion>

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
                  </Accordion>
                </Box>
                
               
                

              {/* <CustomTable data={filteredPatinetPaymentData} /> */}
             <AnimateButton type="slide">
              <Button variant="contained" color="success" component="label"    onClick={() => setDepositDrawerOpen(false)}  sx={{ borderRadius: '40px', marginTop: '20px', padding:'10px 30px', float:'right' }}>Cancel</Button>
            </AnimateButton>
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
