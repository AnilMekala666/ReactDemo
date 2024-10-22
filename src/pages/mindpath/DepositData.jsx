import React, { useState, useMemo } from 'react';
import { Grid, Button, Typography, Tabs, Tab } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import CustomDialog from 'components/payments/CustomDialog';
import CustomTable from 'components/payments/CustomTable';
import { useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';
import { Box } from '@mui/system';


const initialStaticData = [
  {
    transaction_number: "1017382",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ANTHEM BCBS OF C",
    deposit_date: "2024-10-01",
    amounts: "1000.00",
    indn: "Static INDN 1",
    des: "Static DES 1",
    additional_info: "Static additional info 1",
  },
  {
    transaction_number: "16815",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ELEVANCE HLTH AP",
    deposit_date: "2024-10-02",
    amounts: "2000.00",
    indn: "Static INDN 2",
    des: "Static DES 2",
    additional_info: "Static additional info 2",
  },
  {
    transaction_number: "1017382",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ANTHEM BCBS OF C",
    deposit_date: "2024-10-01",
    amounts: "1000.00",
    indn: "Static INDN 1",
    des: "Static DES 1",
    additional_info: "Static additional info 1",
  },
  {
    transaction_number: "16815",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ELEVANCE HLTH AP",
    deposit_date: "2024-10-02",
    amounts: "2000.00",
    indn: "Static INDN 2",
    des: "Static DES 2",
    additional_info: "Static additional info 2",
  },
  {
    transaction_number: "1017382",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ANTHEM BCBS OF C",
    deposit_date: "2024-10-01",
    amounts: "1000.00",
    indn: "Static INDN 1",
    des: "Static DES 1",
    additional_info: "Static additional info 1",
  },
  {
    transaction_number: "16815",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ELEVANCE HLTH AP",
    deposit_date: "2024-10-02",
    amounts: "2000.00",
    indn: "Static INDN 2",
    des: "Static DES 2",
    additional_info: "Static additional info 2",
  },
  {
    transaction_number: "1017382",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ANTHEM BCBS OF C",
    deposit_date: "2024-10-01",
    amounts: "1000.00",
    indn: "Static INDN 1",
    des: "Static DES 1",
    additional_info: "Static additional info 1",
  },
  {
    transaction_number: "16815",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ELEVANCE HLTH AP",
    deposit_date: "2024-10-02",
    amounts: "2000.00",
    indn: "Static INDN 2",
    des: "Static DES 2",
    additional_info: "Static additional info 2",
  },
  {
    transaction_number: "1017382",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ANTHEM BCBS OF C",
    deposit_date: "2024-10-01",
    amounts: "1000.00",
    indn: "Static INDN 1",
    des: "Static DES 1",
    additional_info: "Static additional info 1",
  },
  {
    transaction_number: "16815",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ELEVANCE HLTH AP",
    deposit_date: "2024-10-02",
    amounts: "2000.00",
    indn: "Static INDN 2",
    des: "Static DES 2",
    additional_info: "Static additional info 2",
  },
  {
    transaction_number: "1017382",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ANTHEM BCBS OF C",
    deposit_date: "2024-10-01",
    amounts: "1000.00",
    indn: "Static INDN 1",
    des: "Static DES 1",
    additional_info: "Static additional info 1",
  },
  {
    transaction_number: "16815",
    bank_name: "Bank of America",
    payment_type: "	EFT credit",
    payer: "ELEVANCE HLTH AP",
    deposit_date: "2024-10-02",
    amounts: "2000.00",
    indn: "Static INDN 2",
    des: "Static DES 2",
    additional_info: "Static additional info 2",
  },
];

function DepositData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(initialStaticData);
  const [depositDataDialogOpen, setDepositDataDialogOpen] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [showFileContent, setShowFileContent] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDepositDataDialogClose = () => {
    setDepositDataDialogOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;

        setTimeout(() => {
          setFileContent(text);
          parseBaiFile(text);
          setLoading(false);
          setShowFileContent(true);
        }, 2000);
      };
      reader.readAsText(file);
    }
  };



  const parseBaiFile = (content) => {
    const lines = content.split('\n');
    const newParsedData = [];
    let currentTransaction = null;
    let bankName = '';

    lines.forEach((line) => {
      const parts = line.split(',');

      // Bank Name (from line starting with '01')
      if (parts[0].trim() === '01') {
        bankName = parts[1] ? parts[1].trim() : '';
      }

      // Transaction line (starting with '16')
      if (parts[0].trim() === '16') {
        const transactionDate = parts[4] ? parts[4].trim() : '';

        // Format transactionDate as YY/MM/DD
        let formattedDate = 'Invalid Date';
        if (transactionDate.length === 6) {
          const year = `20${transactionDate.slice(0, 2)}`; // '24' -> '2024'
          const month = transactionDate.slice(2, 4); // '03' -> March
          const day = transactionDate.slice(4, 6); // '28' -> 28th day
          formattedDate = `${year}/${month}/${day}`; // Final format: YYYY/MM/DD
        }

        // Extract and format amount (e.g., 99860168 -> 998601.68)
        let amount = parts[2] ? parts[2].trim() : '0';
        if (amount.length > 2) {
          const dollars = amount.slice(0, -2);
          const cents = amount.slice(-2);
          amount = `${dollars}.${cents}`;
        }

        // Check payment type: 164 -> '', 165 -> 'EFT credit'
        let paymentType = parts[1] ? parts[1].trim() : '';
        let formattedPaymentType = '';
        if (paymentType === '165') {
          formattedPaymentType = 'EFT credit'; // Show 'EFT credit' for 165
        } else if (paymentType === '164') {
          formattedPaymentType = ''; // Show empty for 164
        }

        currentTransaction = {
          transaction_number: parts[2] ? parts[2].trim() : '',
          bank_name: bankName || 'Unknown Bank', // Use bank name from line '01'
          payment_type: formattedPaymentType,
          payer: '', // To be filled from '88' line
          deposit_date: formattedDate,
          amounts: amount, // Formatted amount
          additional_info: '',
          indn: '',
          des: '',
        };

        newParsedData.push(currentTransaction);
      }

      // Additional information line (starting with '88')
      if (parts[0].trim() === '88' && currentTransaction) {
        // Extract Payer (from line starting with '88')
        const payerMatch = line.match(/^(?:88,)?(.*?)(?: DES:|$)/);
        if (payerMatch) {
          currentTransaction.payer = payerMatch[1].trim(); // Set payer name
        }

        // Extract INDN (Payer) and DES (Description)
        const indnMatch = line.match(/INDN:([^ ]+)/);
        if (indnMatch) {
          currentTransaction.indn = indnMatch[1].trim();
        }

        const desMatch = line.match(/DES:([^ ]+)/);
        if (desMatch) {
          currentTransaction.des = desMatch[1].trim();
        }

        // Append additional info
        currentTransaction.additional_info += parts.slice(1).join(',').trim() + ' ';
      }
    });

    console.log("Parsed Data: ", newParsedData);
    // Set the parsed data to the state or return it
    setParsedData(newParsedData);
  };




  const tableColumns = useMemo(
    () => [
      { header: 'Transaction Number', accessorKey: 'transaction_number' },
      // { header: 'EFT', accessorKey: 'account_name' },
      { header: 'Bank Name', accessorKey: 'bank_name' },
      { header: 'Payment Type', accessorKey: 'payment_type' },
      { header: 'Payer', accessorKey: 'payer' },
      { header: 'Deposit Date', accessorKey: 'deposit_date' },
      { header: 'Amount', accessorKey: 'amounts' },
    ],
    []
  );

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p:0 }}>{children}</Box>}
      </div>
    );
  }

  return (
    // <div>
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     component="label"
    //     sx={{ borderRadius: '40px', marginTop: '20px', padding: '0px 0 0px 30px' }}
    //   >
    //     Get File
    //     <input type="file" multiple hidden onChange={handleFileUpload} sx={{ padding: '0px 10px 10px 0px' }} />
    //     <UploadOutlined style={{ fontSize: '20px', padding: '12px', marginLeft: '15px', borderRadius: '100%', background: 'rgb(85 145 243)' }} />
    //   </Button>

    //   {loading ? (
    //     <div style={{ position: 'absolute', top: '10%', left: '50%' }}>
    //       <h3 style={{ margin: 'auto' }}>Loading...</h3>
    //     </div>
    //   ) : (
    //     showFileContent && (
    //       <>
    //       <Grid container spacing={2} sx={{ marginTop: '20px', margin: 'auto' }}>
    //         <pre
    //           style={{
    //             whiteSpace: 'pre-wrap',
    //             wordWrap: 'break-word',
    //             height: '330px',
    //             overflowY: 'auto',
    //             backgroundColor: '#f0f0f0',
    //             padding: '10px',
    //             borderRadius: '15px',
    //             margin: 'auto',
    //             padding: '25px',
    //             borderRadius: '8px',
    //             width: "70%",
    //             fontSize: "16px",
    //             marginTop: '30px',
    //             border: '1px solid #ddd'

    //           }}
    //         >
    //           {fileContent}
    //         </pre>
    //       </Grid>
    //       <Button
    //       variant="contained"
    //       color="primary"
    //       component="label"
    //       className='btn-border'
    //       onClick={() => setDepositDataDialogOpen(true)}
    //     >
    //       Processing
    //     </Button>
    //     </>
    //     )
    //     : (

    //       <CustomTable data={parsedData} datacolumns={tableColumns} />
    //     )
    //   )}

    //   <Button
    //     variant="contained"
    //     component="label"
    //     className='back-btn'
    //     color='success'
    //     onClick={() => navigate('/patient/payment')}> <LeftOutlined style={{ fontSize: '17px', padding: '12px', marginRight: '15px', borderRadius: '100%', background: 'rgb(174 219 152 / 55%)' }} />Cancel</Button>
    //   {/* {fileContent && */}
    //   {/* } */}



    //   <CustomDialog
    //     open={depositDataDialogOpen}
    //     onClose={handleDepositDataDialogClose}
    //     title={"Deposit Data"}
    //   >
    //     <CustomTable data={parsedData} datacolumns={tableColumns} />
    //   </CustomDialog>
    // </div>

    <div>
      <Grid mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid >
          <Typography variant="h4">Deposit</Typography>
        </Grid>
        <Grid >
        <Button
          variant="contained"
          color="success"
          className='back-btn'
          onClick={() => navigate('/patient/payment')}
          style={{ margin: '0px 0 0px 20px' }}
        >
          <LeftOutlined style={{ fontSize: '17px', padding: '12px', marginRight: '15px', borderRadius: '100%', background: 'rgb(174 219 152 / 55%)' }} />Back
        </Button>
          <Button
            variant="contained"
            color="primary"
            component="label"
            sx={{ borderRadius: '40px', marginTop: '0px', padding: '0px 0 0px 30px' }}
          >
            Get File
            <input type="file" multiple hidden onChange={handleFileUpload} sx={{ padding: '0px 10px 10px 0px' }} />
            <UploadOutlined style={{ fontSize: '20px', padding: '12px', marginLeft: '15px', borderRadius: '100%', background: 'rgb(85 145 243)' }} />
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <div style={{ position: 'absolute', top: '10%', left: '50%' }}>
          <h3 style={{ margin: 'auto' }}>Loading...</h3>
        </div>
      ) : (
        showFileContent ?
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Raw Data" {...a11yProps(0)} />
              <Tab label="Parsed Data" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={2} sx={{ marginTop: '20px', margin: 'auto' }}>
              <pre
                style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  height: '400px',
                  overflowY: 'auto',
                  backgroundColor: '#f0f0f0',
                  margin: 'auto',
                  padding: '25px',
                  borderRadius: '8px',
                  width: "70%",
                  fontSize: "20px"
                }}
              >
                {fileContent}
              </pre>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CustomTable data={parsedData} datacolumns={tableColumns} />
          </CustomTabPanel>
          
        </Box>
        : 
        <Box>
          <CustomTable data={parsedData} datacolumns={tableColumns} />
        </Box>
      )}
     
      {/* {loading ? (
        <div style={{ position: 'absolute', top: '10%', left: '50%' }}>
          <h3 style={{ margin: 'auto' }}>Loading...</h3>
        </div>
      ) : (
        <>
          {showFileContent ? (
            <>
              <Grid container spacing={2} sx={{ marginTop: '20px', margin: 'auto' }}>
                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    height: '400px',
                    overflowY: 'auto',
                    backgroundColor: '#f0f0f0',
                    margin: 'auto',
                    padding: '25px',
                    borderRadius: '8px',
                    width: "70%",
                    fontSize: "20px"
                  }}
                >
                  {fileContent}
                </pre>
              </Grid>
              <Button
                variant="contained"
                color="success"
                className='back-btn'
                onClick={() => navigate('/patient/payment')}
                style={{ margin: '20px 0 10px 20px' }}
              >
                <LeftOutlined style={{ fontSize: '17px', padding: '12px', marginRight: '15px', borderRadius: '100%', background: 'rgb(174 219 152 / 55%)' }} />Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                className='btn-border'
                onClick={() => setDepositDataDialogOpen(true)}
              >
                Process
              </Button>
            </>
          ) : (

            <CustomTable data={parsedData} datacolumns={tableColumns} />
          )}
        </>
      )} */}

      <CustomDialog
        open={depositDataDialogOpen}
        onClose={handleDepositDataDialogClose}
        title={"Deposit Data"}
      >
        <CustomTable data={parsedData} datacolumns={tableColumns} />
      </CustomDialog>
    </div>
  );
}

export default DepositData;
