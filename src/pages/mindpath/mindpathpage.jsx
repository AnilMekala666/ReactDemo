import React, { useState, useMemo } from 'react';
import { Grid, Button, CircularProgress, Typography, } from '@mui/material';
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
import { Box, Drawer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import UploadImg from 'assets/images/UploadImg.jpg';
import AnimateButton from 'components/@extended/AnimateButton';
import { borderRadius, fontSize, textAlign } from '@mui/system';
import { UploadOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router';




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
  const [patientPaymentUploadedFile, setPatientPaymentUploadedFile] = useState([]);



const [depositDrawerOpen, setDepositDrawerOpen] = useState(false)

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container>
        <Grid item xs={12} md={1} lg={1} sm={1} marginTop={2}>

          <MainCard>
            <Grid sx={{ textAlign: 'center' }}>
              <Button className='button-proper' 
              onClick={() => setDepositDrawerOpen(true)}>
                <img src={Deposit} alt="Deposit" style={{ width: '100%', height: 'auto' }} />
                <Typography level='h3'>Deposit</Typography>
                {showSpinner && (
                  <Grid sx={{ textAlign: 'center', marginTop: '0px' }}>
                    <CircularProgress size={15} />
                  </Grid>
                )}
              </Button>
            </Grid>
            <Divider sx={{ margin: '20px 0' }} />

            <Grid sx={{ textAlign: 'center' }}>
              <Button className='button-proper' onClick={() => setFirstRemmitenceDrawerOpen(true)}>
                <img src={Remittance} alt="Deposit" style={{ width: '100%', height: 'auto' }} />
                <Typography level='h3'>Remitence</Typography>
                {showRemmitenceSpinner && (
                  <Grid sx={{ textAlign: 'center', marginTop: '0px' }}>
                    <CircularProgress size={15} />
                  </Grid>
                )}
              </Button>
            </Grid>

            <Divider sx={{ margin: '20px 0' }} />

            <Grid sx={{ textAlign: 'center' }}>
              <Button className='button-proper' onClick={() => setFirstPatientPaymentDrawerOpen(true)}>
                <img src={PatientPayment} alt="PatientPayment" style={{ width: '100%', height: 'auto' }} />
                <Typography level='h3'>Patient <br /> Payments </Typography>
                {showPatientPaymentSpinner && (
                  <Grid sx={{ textAlign: 'center', marginTop: '0px' }}>
                    <CircularProgress size={15} />
                  </Grid>
                )}
              </Button>
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
          <Button style={{ display: "block", color: "black", padding: "0px" }} onClick={handleMovePatientMovement}>
            <img src={CashPosting} alt='CashPosting' style={{ width: '100%', height: 'auto' }} />
            <Typography level='h3'>Cash Posting Queue </Typography>
          </Button>

        </Grid>
        <Grid item xs={12} md={1} lg={1} sm={1} style={{ maxWidth: '4%', marginTop: '0%', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <img src={ArrowRight} alt="ArrowRight" className='w-100h-100' style={{ marginLeft: '30px' }} />
          </div>
        </Grid>
        <Grid item xs={12} md={2} lg={2} sm={2} style={{ marginLeft: '70px', width: '90px', maxWidth: '90px', textAlign: 'center', marginTop: '150px', }}>
          <img src={PostingRecords} alt='PostingRecords' style={{ width: '100%', height: 'auto' }} />
          <Typography level='h3'>Posting Records </Typography>
        </Grid>
        <Grid item xs={12} md={1} lg={1} sm={1} style={{ maxWidth: '4%', marginTop: '0%', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <img src={ArrowRight} alt="ArrowRight" className='w-100h-100' style={{ marginLeft: '30px' }} />
          </div>
        </Grid>
        <Grid item xs={12} md={2} lg={2} sm={2} style={{ marginLeft: '70px', width: '110px', maxWidth: '110px', textAlign: 'center', marginTop: '140px', }}>
          <img src={Reconsilation} alt='Reconsilation' style={{ width: '100%', height: 'auto' }} />
          <Typography level='h3'>Reconsilation </Typography>
        </Grid>

      </Grid>


      {/* deposit dialog */}
      {/* <CustomDialog open={depositeOpen} onClose={handleDepositClose} title="Deposit">
        {!showDepositTable ? (
          <FileUploader onFileUpload={handleDepositFileUpload} />
        ) : (
          <CustomTable data={filteredDepositData} />
        )}
      </CustomDialog> */}

      {/* Remmitence dialog */}
      {/* <CustomDialog open={remittanceOpen} onClose={handleremmitenceClose} title="Remittance">
        {!showRemittanceTable ? (
          <FileUploader onFileUpload={handleRemmitenceFileUpload} />
        ) : (
          <CustomTable data={filteredremmitenceData} />
        )}
      </CustomDialog> */}

      {/* Patient payment dialog */}
      {/* <CustomDialog open={patinetPaymentOpen} onClose={handlePatinetPaymentClose} title="Remittance">
        {!showPatinetPaymentTable ? (
          <FileUploader onFileUpload={handlePatinetPaymentFileUpload} />
        ) : (
          <CustomTable data={filteredPatinetPaymentData} />
        )}
          
      </CustomDialog> */}




      {/* Deposite drawers */}


      <CustomDrawer
        open={firstDrawerDepositOpen}
        onClose={() => setFirstDrawerDepositOpen(false)}
        //title="Upload a File"
        width={300}
        borderRadius={8}
        leftOffset={secondDrawerDepositOpen ? 910 : 0}
        top={150}
        content={
          firstDrawerDepositContent
        }
      >
        {/* {firstDrawerDepositContent} */}
      </CustomDrawer>

      {/* Second Drawer (appears on the right side of the first drawer) */}
      <CustomDrawer
        open={secondDrawerDepositOpen}
        onClose={handleCloseDepositDrawer}
        anchor="right"
        width={900}
        borderRadius={8}
        top={100}
        leftOffset={firstDrawerDepositOpen ? 0 : 410}
        title="Deposit Data"
        content={
          <>
              <CustomTable data={filteredDepositData} />
             <AnimateButton type="slide">
              <Button variant="contained" color="success" component="label"  onClick={handleCloseDepositDrawer}  sx={{ borderRadius: '40px', marginTop: '20px', padding:'10px 30px', float:'right' }}>Back</Button>
            </AnimateButton>
          </>
          
        }
        
      >
        {/* {secondDrawerDepositContent} */}
      </CustomDrawer>



      {/* Remmitence drawers */}

      <CustomDrawer
        open={firstRemmitenceDrawerOpen}
        onClose={() => setFirstRemmitenceDrawerOpen(false)}
        //title="Upload a Remitence File"
        width={300}
        borderRadius={8}
        leftOffset={secondRemmitenceDrawerOpen ? 910 : 0}
        top={150}
        content={
          firstDrawerRemmitenceContent
        }
      >
        {/* {firstDrawerDepositContent} */}
      </CustomDrawer>

      {/* Second Drawer (appears on the right side of the first drawer) */}
      <CustomDrawer
        open={secondRemmitenceDrawerOpen}
        onClose={handleCloseRemmitenceDrawer}
        anchor="right"
        width={900}
        top={100}
        borderRadius={8}
        leftOffset={firstRemmitenceDrawerOpen ? 0 : 410}
        title="Remitence"
        content={
          <>
              <CustomTable data={filteredremmitenceData} />
             <AnimateButton type="slide">
              <Button variant="contained" color="success" component="label"  onClick={handleCloseRemmitenceDrawer}  sx={{ borderRadius: '40px', marginTop: '20px', padding:'10px 30px', float:'right' }}>Back</Button>
            </AnimateButton>
          </>
          
        }
      >
      </CustomDrawer>


      {/* Patient payment drawers */}

      <CustomDrawer
        open={firstPatientPaymentDrawerOpen}
        onClose={() => setFirstPatientPaymentDrawerOpen(false)}
        //title="Upload a Patient payment File"
        width={300}
        leftOffset={secondPatientPaymentDrawerOpen ? 910 : 0}
        top={150}
        borderRadius={8}
        content={
          firstDrawerPatientPaymentContent
        }
      >
      </CustomDrawer>

      <CustomDrawer
        open={secondPatientPaymentDrawerOpen}
        onClose={handleClosePatientPaymentDrawer}
        anchor="right"
        width={900}
        top={100}
        borderRadius={8}
        leftOffset={firstPatientPaymentDrawerOpen ? 0 : 410}
        title="Patient Payment"
        content={
          <>
              <CustomTable data={filteredPatinetPaymentData} />
             <AnimateButton type="slide">
              <Button variant="contained" color="success" component="label"  onClick={handleClosePatientPaymentDrawer}  sx={{ borderRadius: '40px', marginTop: '20px', padding:'10px 30px', float:'right' }}>Back</Button>
            </AnimateButton>
          </>
          
        }
      >
      </CustomDrawer>




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
        title="Patient Payment"
        content={
          <>
              {/* <CustomTable data={filteredPatinetPaymentData} /> */}
             <AnimateButton type="slide">
              <Button variant="contained" color="success" component="label"  onClick={handleDepositDrawerClose}  sx={{ borderRadius: '40px', marginTop: '20px', padding:'10px 30px', float:'right' }}>Back</Button>
            </AnimateButton>
          </>
          
        }
      >
      </CustomDrawer>

    </LocalizationProvider>
  );


}

export default MindPathPage;
