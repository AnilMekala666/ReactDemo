// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable prettier/prettier */
// /* eslint-disable no-unused-vars */
// import React, { useState, useMemo,useEffect } from 'react';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { Box, TextField, Grid, Stack, Button, Typography, IconButton, Dialog } from '@mui/material';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Autocomplete, Checkbox, CircularProgress } from '@mui/material';
// import MainCard from 'components/MainCard';
// import { MoneyCollectOutlined, CalendarOutlined, FilterOutlined } from '@ant-design/icons';
// import Divider, { dividerClasses } from '@mui/material/Divider';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import ReusableTable from 'components/tableComponent/Table';
// import ReactTable from 'components/tableComponent/Table';
// import OutlinedInput from 'themes/overrides/OutlinedInput';
// import Chip from '@mui/material/Chip';
// import axios from 'axios';
// import { ClearIcon } from '@mui/x-date-pickers';
// import { CheckSquareOutlined, HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';
// import { border, borderRadius, fontSize, padding } from '@mui/system';
// import { color } from 'framer-motion';
// import SearchFilter from './search filter';
// import DialogTitle from '@mui/material/DialogTitle'; 
// import DialogContent from '@mui/material/DialogContent'; 
// import DialogActions from '@mui/material/DialogActions';
// import Menu from '@mui/material/Menu';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import {Card} from '@mui/material';
// import Deposit from 'assets/images/Deposits.png';
// import Remmitence from 'assets/images/Remmitence.png';
// import PatientPayment from 'assets/images/PatientPayment.png';
// import Slide from '@mui/material/Slide';
// import DialogContentText from '@mui/material/DialogContentText';

// // import CloudUploadIcon from '@mui/icons-material/CloudUpload';


// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="left" ref={ref} {...props} />;
// });

// // const VisuallyHiddenInput = styled('input')({
// //   clip: 'rect(0 0 0 0)',
// //   clipPath: 'inset(50%)',
// //   height: 1,
// //   overflow: 'hidden',
// //   position: 'absolute',
// //   bottom: 0,
// //   left: 0,
// //   whiteSpace: 'nowrap',
// //   width: 1,
// // });


// function MindPathPage() {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [value, setValue] = useState('AZ'); 
//   const [showTable, setShowTable] = useState(false);
//   const [showSpinner, setShowSpinner] = useState(false);

//       // State to show the table

//      // Handle file upload
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Show spinner for 4 seconds after file upload
//       setShowSpinner(true);
//       setShowTable(false);

//       setTimeout(() => {
//         setShowSpinner(false);
//         setShowTable(true); // Show table after spinner
//       }, 4000); // 4 seconds delay
//     }
//   };

//   useEffect(() => {
//     if (open) {
//       setShowSpinner(false); // Reset spinner when dialog opens
//       setShowTable(false);   // Initially show file upload
//     }
//   }, [open]);



//   const handleClickOpen = () => {
//     setLoading(true); // Show spinner

//     // Delay the popup opening by 2 seconds (2000 ms)
//     setTimeout(() => {
//       setLoading(false); // Hide spinner
//       setOpen(true); // Show the popup
//     }, 2000);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const jsonData = [
//     {
//       state_name: 'AZ',
//       batch_date: '2024-01-02',
//       payer: 'Unknown or Mixed',
//       payment_amount: 0.0,
//       file_name: 'United Health',
//       classification_type: 'Correspondence'
//     },
//     {
//       state_name: 'AZ',
//       batch_date: '2024-01-02',
//       payer: 'HealthEquity Inc',
//       payment_amount: 52.76,
//       file_name: 'Obama Health',
//       classification_type: 'Payments'
//     },
//     {
//       state_name: 'CA',
//       batch_date: '2024-01-15',
//       payer: 'Blue Cross',
//       payment_amount: 150.0,
//       file_name: 'California Health',
//       classification_type: 'Payments'
//     },
//     {
//       state_name: 'AZ',
//       batch_date: '2024-01-02',
//       payer: 'Unknown or Mixed',
//       payment_amount: 0.0,
//       file_name: 'United Health',
//       classification_type: 'Correspondence'
//     },
//     {
//       state_name: 'AZ',
//       batch_date: '2024-01-02',
//       payer: 'Unknown or Mixed',
//       payment_amount: 0.0,
//       file_name: 'United Health',
//       classification_type: 'Correspondence'
//     },
//     {
//       state_name: 'AZ',
//       batch_date: '2024-01-02',
//       payer: 'HealthEquity Inc',
//       payment_amount: 52.76,
//       file_name: 'Obama Health',
//       classification_type: 'Payments'
//     },
//     {
//       state_name: 'CA',
//       batch_date: '2024-01-15',
//       payer: 'Blue Cross',
//       payment_amount: 150.0,
//       file_name: 'California Health',
//       classification_type: 'Payments'
//     },
//     {
//       state_name: 'AZ',
//       batch_date: '2024-01-02',
//       payer: 'Unknown or Mixed',
//       payment_amount: 0.0,
//       file_name: 'United Health',
//       classification_type: 'Correspondence'
//     },
//     {
//       state_name: 'AZ',
//       batch_date: '2024-01-02',
//       payer: 'HealthEquity Inc',
//       payment_amount: 52.76,
//       file_name: 'Obama Health',
//       classification_type: 'Payments'
//     },
//     {
//       state_name: 'CA',
//       batch_date: '2024-01-15',
//       payer: 'Blue Cross',
//       payment_amount: 150.0,
//       file_name: 'SanFrancisco Health',
//       classification_type: 'Payments'
//     },
//     {
//       state_name: 'AZ',
//       batch_date: '2024-01-02',
//       payer: 'Unknown or Mixed',
//       payment_amount: 0.0,
//       file_name: 'Diego Health',
//       classification_type: 'Correspondence'
//     },      
//     {
//       state_name: 'AZ',
//       batch_date: '2024-01-02',
//       payer: 'HealthEquity Inc',
//       payment_amount: 1252.76,
//       file_name: 'Bay Health',
//       classification_type: 'Payments'
//     },
//   ];
//   const filteredData = useMemo(() => {
//     return jsonData.filter((item) => item.state_name === value);
//   }, [jsonData, value]);


//   const columns = useMemo(
//     () => [
//       {
//         header: 'File Name',
//         accessorKey: 'file_name',
//         cell: ({ getValue }) => (
//           <Button style={{ color: 'black' }} onClick={() => handleFileClick(getValue())}>
//             {getValue()}
//           </Button>
//         )
//       },
//       {
//         header: 'Classification Type',
//         accessorKey: 'classification_type'
//       },
//       {
//         header: 'Batch Date',
//         accessorKey: 'batch_date'
//       },
//       {
//         header: 'Payor',
//         accessorKey: 'payer'
//       },
//       {
//         header: 'Payment Amount',
//         accessorKey: 'payment_amount',
//         cell: ({ getValue }) => `$${getValue().toFixed(2)}`
//       },
//     ],
//     []
//   );


//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Grid container>

//           <Grid item xs={12} md={1} lg={1} sm={1} marginTop={2}>
//             <MainCard>
//               <Grid sx={{ textAlign:'center'}}>
//                 <Button className='button-proper' onClick={handleClickOpen}>
//                   <img src={Deposit} alt="Deposit" style={{ width: '100%', height: 'auto' }} />
//                   <Typography level='h3'>Deposit</Typography>
//                   {loading && (
//                     <Grid sx={{ textAlign: 'center', marginTop: '0px' }}>
//                       <CircularProgress size={15}/> 
//                     </Grid>
//                   )}
//                 </Button>
//               </Grid>
//               <Divider sx={{margin:'20px 0'}}/>
//               <Grid sx={{ textAlign:'center'}}>
//                 <img src={Remmitence} alt="Deposit" style={{ width: '100%', height: 'auto' }} />
//                 <Typography level='h3'>Remitence</Typography>
//               </Grid>
//               <Divider sx={{margin:'20px 0'}}/>
//               <Grid sx={{ textAlign:'center'}}>
//                 <img src={PatientPayment} alt="PatientPayment" style={{ width: '100%', height: 'auto' }} />
//                 <Typography level='h3'>Patient <br/> Payments </Typography>
//               </Grid>
//             </MainCard>
//           </Grid>

//       </Grid>

//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={handleClose}
//         aria-describedby="alert-dialog-slide-description"
//         fullWidth
//         maxWidth="lg" // You can set this to 'xs', 'sm', 'md', 'lg', or 'xl'
//         sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: 'none' } }}
//       >
//         <DialogTitle>{"Deposits"}</DialogTitle>
//         <DialogContent>
//         <DialogContentText id="alert-dialog-slide-description">
//           {/* Show file upload and spinner/table based on the state */}
//           <div>
//             <p>Please upload a file to proceed.</p>
//             <input type="file" onChange={handleFileUpload} />
//             {showSpinner && (
//               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
//                 <CircularProgress size={24} /> {/* Display spinner while processing */}
//                 <p style={{ marginLeft: '10px' }}>Processing...</p>
//               </div>
//             )}
//             {showTable && <ReusableTable data={filteredData} columns={columns} />}
//           </div>
//         </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           {/* <Button onClick={handleClose}>Save</Button> */}
//           <Button variant='contained' onClick={handleClose}>Cancel</Button>
//         </DialogActions>
//       </Dialog>
//     </LocalizationProvider>
//   );
// }



// export default MindPathPage;


// pages/MindPathPage.js
import React, { useState, useMemo } from 'react';
import { Grid, Button, CircularProgress, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import FileUploader from 'components/payments/FileUploader';
import CustomTable from 'components/payments/CustomTable';
import CustomDialog from 'components/payments/CustomDialog';
import Deposit from 'assets/images/Deposits.png';
import Remittance from 'assets/images/Remmitence.png';
import PatientPayment from 'assets/images/PatientPayment.png';
import Slide from '@mui/material/Slide';
import DialogContentText from '@mui/material/DialogContentText';
import { styled } from '@mui/material/styles';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowRight from 'assets/images/ArrowRight.png';
import iCanImg from 'assets/images/iCanImg.png';
import ThreelineArrow from 'assets/images/ThreelineArrow.png';
import CashPosting from 'assets/images/CashPosting.jpg';
import PostingRecords from 'assets/images/PostingRecords.png';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Divider, { dividerClasses } from '@mui/material/Divider';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


function MindPathPage() {
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


  const depositData = [
    {
      file_name: 'Transaction_001.pdf',
      classification_type: 'Deposit',
      batch_date: '2024-10-01',
      payer: 'ABC Health',
      payment_amount: 1500.50,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_002.pdf',
      classification_type: 'Remittance',
      batch_date: '2024-09-28',
      payer: 'XYZ Insurance',
      payment_amount: 800.75,
      state_name: 'AZ'
    },
    {
      file_name: 'Transaction_003.pdf',
      classification_type: 'Patient Payment',
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


  const handleClickDepositOpen = () => {
    setDepositLoading(true);
    setTimeout(() => {
      setDepositLoading(false);
      setDepositOpen(true);
    }, 2000);
  };

  const handleClickremitenceOpen = () => {
    setRemittanceLoading(true);
    setTimeout(() => {
      setRemittanceLoading(false);
      setRemittancetOpen(true);
    }, 2000);
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

  const handleDepositFileUpload = () => {
    setShowDepositTable(true);
  };

  const handleRemmitenceFileUpload = () => {
    setShowRemittanceTable(true);
  };

  const handlePatinetPaymentFileUpload = () => {
    setShowPatinetPaymentTable(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container>
        <Grid item xs={12} md={1} lg={1} sm={1} marginTop={2}>
          <MainCard>
            <Grid sx={{ textAlign: 'center' }}>
              <Button className='button-proper' onClick={handleClickDepositOpen}>
                <img src={Deposit} alt="Deposit" style={{ width: '100%', height: 'auto' }} />
                <Typography level='h3'>Deposit</Typography>
                {depositLoading && (
                  <Grid sx={{ textAlign: 'center', marginTop: '0px' }}>
                    <CircularProgress size={15} />
                  </Grid>
                )}
              </Button>
            </Grid>
            <Divider sx={{ margin: '20px 0' }} />
            <Grid sx={{ textAlign: 'center' }}>
              <img src={Remittance} alt="Deposit" style={{ width: '100%', height: 'auto' }} />
              <Typography level='h3'>Remitence</Typography>
            </Grid>
            <Divider sx={{ margin: '20px 0' }} />
            <Grid sx={{ textAlign: 'center' }}>
              <img src={PatientPayment} alt="PatientPayment" style={{ width: '100%', height: 'auto' }} />
              <Typography level='h3'>Patient <br /> Payments </Typography>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={1} lg={1} sm={1} style={{ maxWidth: '4%', marginTop: '4%', marginLeft: '10px' }}>
          <div style={{ display: 'flex' }}>
            <img src={ArrowRight} alt="ArrowRight" className='w-100h-100' style={{ marginTop: '20px', marginRight: '10px' }} />
            <img src={iCanImg} alt='iCanImg' className='w-100h-100' />
          </div>
          <div style={{ marginTop: '80px', display: 'flex' }}>
            <img src={ArrowRight} alt="ArrowRight" className='w-100h-100' style={{ marginRight: '10px', marginTop: '20px' }} />
            <img src={iCanImg} alt='iCanImg' className='w-100h-100' />
          </div>
          <div style={{ marginTop: '80px', display: 'flex' }}>
            <img src={ArrowRight} alt="ArrowRight" className='w-100h-100' style={{ marginRight: '10px', marginTop: '20px' }} />
            <img src={iCanImg} alt='iCanImg' className='w-100h-100' />
          </div>
        </Grid>
        <Grid item xs={12} md={2} lg={2} sm={2} style={{ marginLeft: '70px' }}>
          <img src={ThreelineArrow} alt='ThreelineArrow' className='w-100h-100' />
        </Grid>
        <Grid item xs={12} md={2} lg={2} sm={2} style={{ marginLeft: '40px', maxWidth: '100px', marginTop: '140px', textAlign: 'center' }}>
          <img src={CashPosting} alt='CashPosting' style={{ width: '100%', height: 'auto' }} />
          <Typography level='h3'>Cash Posting Queue </Typography>
        </Grid>
        <Grid item xs={12} md={2} lg={2} sm={2} style={{ marginLeft: '70px', width: '90px', maxWidth: '90px', textAlign: 'center', marginTop: '150px', }}>
          <img src={PostingRecords} alt='PostingRecords' style={{ width: '100%', height: 'auto' }} />
          <Typography level='h3'>Posting Records </Typography>
        </Grid>
      </Grid>
          {/* deposit dialog */}
          <CustomDialog open={depositeOpen} onClose={handleDepositClose} title="Deposit">
            {!showDepositTable ? (
              <FileUploader onFileUpload={handleDepositFileUpload} />
            ) : (
              <CustomTable data={filteredDepositData} />
            )}
          </CustomDialog>

          {/* Remmitence dialog */}
          <CustomDialog open={remittanceOpen} onClose={handleremmitenceClose} title="Remittance">
            {!showRemittanceTable ? (
              <FileUploader onFileUpload={handleRemmitenceFileUpload} />
            ) : (
              <CustomTable data={filteredremmitenceData} />
            )}
          </CustomDialog>

          {/* Patient payment dialog */}
          <CustomDialog open={patinetPaymentOpen} onClose={handlePatinetPaymentClose} title="Remittance">
            {!showPatinetPaymentTable ? (
              <FileUploader onFileUpload={handlePatinetPaymentFileUpload} />
            ) : (
              <CustomTable data={filteredPatinetPaymentData} />
            )}
          </CustomDialog>
        </LocalizationProvider>
  );
     

}

export default MindPathPage;
