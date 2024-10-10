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



  const [firstDrawerDepositOpen, setFirstDrawerDepositOpen] = useState(false);
  const [secondDrawerDepositOpen, setSecondDrawerDepositOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [depositUploadedFile, setDepositUploadedFile] = useState([]);





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


  const handleCloseDepositDrawer = () => {
    setFirstDrawerDepositOpen(false);
    setSecondDrawerDepositOpen(false)
    console.log('click')
  }

  const handleDepositFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setShowSpinner(true);
      setTimeout(() => {
        setDepositUploadedFile(files);
        setShowSpinner(false);
        setSecondDrawerDepositOpen(true); // Open the second drawer
      }, 1000);
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

  // const handleDepositFileUpload = () => {
  //   setShowDepositTable(true);
  // };

  const handleRemmitenceFileUpload = () => {
    setShowRemittanceTable(true);
  };

  const handlePatinetPaymentFileUpload = () => {
    setShowPatinetPaymentTable(true);
  };


  const firstDrawerDepositContent = (
    <Box sx={{ p: 2 }}>
      {!showSpinner ? (
        <Button variant="contained" component="label">
          Upload File
          <input type="file" multiple hidden onChange={handleDepositFileUpload} />
        </Button>
        
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );

  const secondDrawerDepositContent = (
    <>
      <Typography>Deposit data</Typography>
      <CustomTable data={filteredDepositData} />
      <Button onClick={handleCloseDepositDrawer}>Back</Button>
    </>
  );


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container>
        <Grid item xs={12} md={1} lg={1} sm={1} marginTop={2}>

          <MainCard>
            <Grid sx={{ textAlign: 'center' }}>
              <Button className='button-proper' onClick={() => setFirstDrawerDepositOpen(true)}>
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
              <Button className='button-proper' onClick={handleClickremitenceOpen}>
                <img src={Remittance} alt="Deposit" style={{ width: '100%', height: 'auto' }} />
                <Typography level='h3'>Remitence</Typography>
                {remittanceLoading && (
                  <Grid sx={{ textAlign: 'center', marginTop: '0px' }}>
                    <CircularProgress size={15} />
                  </Grid>
                )}
              </Button>
            </Grid>

            <Divider sx={{ margin: '20px 0' }} />

            <Grid sx={{ textAlign: 'center' }}>
              <Button className='button-proper' onClick={handleClickPatientPaymentOpen}>
                <img src={PatientPayment} alt="PatientPayment" style={{ width: '100%', height: 'auto' }} />
                <Typography level='h3'>Patient <br /> Payments </Typography>
                {patinetPaymentLoading && (
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
          <img src={CashPosting} alt='CashPosting' style={{ width: '100%', height: 'auto' }} />
          <Typography level='h3'>Cash Posting Queue </Typography>
        </Grid>
        <Grid item xs={12} md={1} lg={1} sm={1} style={{ maxWidth: '4%', marginTop: '0%', marginLeft: '10px',display:'flex', alignItems:'center' }}>
          <div style={{ display: 'flex' }}>
            <img src={ArrowRight} alt="ArrowRight" className='w-100h-100' style={{marginLeft: '30px' }} />
          </div>
        </Grid>
        <Grid item xs={12} md={2} lg={2} sm={2} style={{ marginLeft: '70px', width: '90px', maxWidth: '90px', textAlign: 'center', marginTop: '150px', }}>
          <img src={PostingRecords} alt='PostingRecords' style={{ width: '100%', height: 'auto' }} />
          <Typography level='h3'>Posting Records </Typography>
        </Grid>
        <Grid item xs={12} md={1} lg={1} sm={1} style={{ maxWidth: '4%', marginTop: '0%', marginLeft: '10px',display:'flex', alignItems:'center' }}>
          <div style={{ display: 'flex' }}>
            <img src={ArrowRight} alt="ArrowRight" className='w-100h-100' style={{marginLeft: '30px' }} />
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
        title="Upload a File"
        width={300}
        leftOffset={secondDrawerDepositOpen ? 705 : 0}
        top={250}
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
        width={700}
        top={100}
        leftOffset={firstDrawerDepositOpen ? 0 : 410}
        title="Upload a File"
        content={
          <CustomTable data={filteredDepositData} />
        }
        button={
          <Button onClick={handleCloseDepositDrawer}>Back</Button>
        }
      >
        {/* {secondDrawerDepositContent} */}
      </CustomDrawer>
    </LocalizationProvider>
  );


}

export default MindPathPage;
