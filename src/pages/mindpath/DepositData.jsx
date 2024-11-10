import React, { useState, useMemo, useEffect } from 'react';
import { Grid, Button, Typography, Tabs, Tab, Snackbar, IconButton } from '@mui/material';
import { CloseCircleOutlined, UploadOutlined } from '@ant-design/icons';
import CustomDialog from 'components/payments/CustomDialog';
import CustomTable from 'components/payments/CustomTable';
import { useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';
import { Box } from '@mui/system';
import { currencyFormat } from 'components/mindpath';
import AnimatedProcess from './AnimatedProcess';
import Slide from '@mui/material/Slide';
import moment from 'moment';
import { MemoryOutlined } from '@mui/icons-material';
import { BASE_PATH } from 'config';
import { randomIntFromInterval } from 'utils/axios';
import AnimatedProcessNew from './AnimatedProcessNew';

const initialStaticData = [
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI10.bai",
    "# Total Transactions": "43",
    "# Transactions after applying rules": "41",
    "# Transactions recorded": "41",
    "File Status": "Processed",
  },
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI9.bai",
    "# Total Transactions": "46",
    "# Transactions after applying rules": "42",
    "# Transactions recorded": "42",
    "File Status": "Processed",
  },
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI8.bai",
    "# Total Transactions": "49",
    "# Transactions after applying rules": "45",
    "# Transactions recorded": "45",
    "File Status": "Processed",
  },
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI7.bai",
    "# Total Transactions": "46",
    "# Transactions after applying rules": "42",
    "# Transactions recorded": "42",
    "File Status": "Processed",
  },
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI6.bai",
    "# Total Transactions": "54",
    "# Transactions after applying rules": "49",
    "# Transactions recorded": "49",
    "File Status": "Processed",
  },
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI5.bai",
    "# Total Transactions": "56",
    "# Transactions after applying rules": "48",
    "# Transactions recorded": "48",
    "File Status": "Processed",
  },
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI4.bai",
    "# Total Transactions": "65",
    "# Transactions after applying rules": "58",
    "# Transactions recorded": "58",
    "File Status": "Processed",
  },
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI3.bai",
    "# Total Transactions": "41",
    "# Transactions after applying rules": "33",
    "# Transactions recorded": "33",
    "File Status": "Processed",
  },
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI2.bai",
    "# Total Transactions": "38",
    "# Transactions after applying rules": "34",
    "# Transactions recorded": "34",
    "File Status": "Processed",
  },
  {
    "File Process Date": "29-01-2024",
    "File Name": "BAI1.bai",
    "# Total Transactions": "39",
    "# Transactions after applying rules": "36",
    "# Transactions recorded": "36",
    "File Status": "Processed",
  },
];

function DepositData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [parsedData, setParsedData] = useState(initialStaticData);
  const [tablecColumns, setTablecColumns] = useState([]);
  const [depositDataDialogOpen, setDepositDataDialogOpen] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [showFileContent, setShowFileContent] = useState(false);
  const [value, setValue] = React.useState(0);
  const [step, setStep] = useState("1");
  const [countFiles, setCountFiles] = useState([]);
  const [fileMessage, setFileMessage] = useState("File Available to Process");
  const [transactionsCount, setTransactionsCount] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    fetchInitial();
    // const staticData = initialStaticData.map((x, i) => {
    //   var today = new Date();
    //   today.setDate(today.getDate() - (i + 1));
      
    //   x["File Process Date"] = moment(today).format("DD-MM-YYYY");
    //   return x;
    // })
    // setParsedData(staticData);
    // const headerKeys = Object.keys(Object.assign({}, ...staticData));
    // let columns = [];
    // columns = headerKeys.map((header, index) => {
    //   if(header != "subRows" && header != "id") {
    //     let o = {
    //       id: index + 1,
    //       header: header.replace("_", " ").replace("\r", "").toUpperCase(),
    //       accessorKey: header.replace("\r", "")
    //     }
    //     return o;
    //   }
    // }).filter((key) => key != "subRows" && key != undefined)
    // console.log("Columns", columns);
    // setTablecColumns(columns);
    setOpenAlert(true)
  }, [])

  const fetchInitial = async () => {
    console.log("Fetch Called");
    const data = await fetch(`${BASE_PATH}/getLastWeekFilesData/1`);
    // console.log("Data API", await data.json());
    const staticData = await data.json();
    setParsedData(staticData);
    const headerKeys = Object.keys(Object.assign({}, ...staticData));
    let columns = [];
    columns = headerKeys.map((header, index) => {
      if(header != "subRows" && header != "id") {
        let o = {
          id: index + 1,
          header: header.replace("_", " ").replace("\r", "").replace(/([A-Z])/g, ' $1').trim().toUpperCase(),
          accessorKey: header.replace("\r", "")
        }
        return o;
      }
    }).filter((key) => key != "subRows" && key != undefined)
    console.log("Columns", columns);
    setTablecColumns(columns);
  }

  const handleClose = () => {
    console.log("Close called")
    setOpenAlert(false)
  }

  useEffect(() =>  {
    if(loading) {
      setTimeout(() => {
        if(step.startsWith("1")) {
          switch(step) {
            case "1": setStep("1.1"); return;
            case "1.1": setStep("1.2"); return;
            case "1.2": setStep("2"); return;
          }
        }
        if(step.startsWith("2")) {
          switch(step) {
            case "2": setStep("2.1"); return;
            case "2.1": setStep("2.2"); return;
            case "2.2": setStep("2.3"); return;
            case "2.3": setStep("3"); return;
          }
        }
        if(step.startsWith("3")) {
          switch(step) {
            case "3": setStep("3.1"); return;
            case "3.1": setStep("3.2"); return;
            case "3.2": setStep("3.3"); return;
            case "3.3": setStep("4"); return;
          }
        }
        if(step.startsWith("4")) {
          switch(step) {
            case "4": setStep("4.1"); return;
            case "4.1": setStep("4.2"); return;
            case "4.2": setStep("4.3"); return;
            case "4.3": setStep("5"); return;
          }
        }
        if(step.startsWith("5")) {
          let f = [...countFiles];
          switch(step) {
            case "5": setStep("5.1"); transactionsCount.length > 0 ? f.push(transactionsCount[0]) : f.push(40); console.log(f); setCountFiles([...f]); return;
            case "5.1": setStep("5.2"); transactionsCount.length > 1 ? f.push(transactionsCount[1]) : f.push(38); console.log(f); setCountFiles([...f]); return;
            case "5.2": setStep("5.3"); transactionsCount.length > 2 ? f.push(transactionsCount[2]) : f.push(38); console.log(f); setCountFiles([...f]); return;
            case "5.3": setStep("5.4"); transactionsCount.length > 3 ? f.push(transactionsCount[3]) : f.push(380); console.log(f); setCountFiles([...f]); return;
            case "5.4": setStep("6.1"); return;
          }
        }
        waitLoad();
        setStep("6.1");
        return;
      }, 1000)
    }
  }, [step, loading])

  const waitLoad = () => {
    // setTimeout(()=>setLoading(false), 5000);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDepositDataDialogClose = () => {
    setDepositDataDialogOpen(false);
  };

  const handleFileUpload = async(event) => {
    const depositDataBai = `/src/assets/data/deposit${randomIntFromInterval(1, 4)}.bai`;
    const file = await fetch(depositDataBai).then(res => res.text());
    console.log(file);
    if (file) {
      setFileContent(file);
      parseBaiFile(file);
      setShowFileContent(true);
      setLoading(true);
      setOpenAlert(false);
      setFileMessage("No File Available to Process");
    }
  };

  const saveFileToDb = async (transaction) => {
    var today = new Date();
    const data = {
      "file_process_date":moment(today).format("YYYY-MM-DD"),
      "total_transactions" : transaction.total,
      "transactions_after_rules" : transaction.rules,
      "transactions_recorded": transaction.recorded,
      "fileName" : transaction.fileName,
      "file_status": "Processed"
    }
    const rawResponse = await fetch(`${BASE_PATH}/saveFileData`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const content = await rawResponse.text();
  
    console.log("Save Response", content);
    return content;
  }

  function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

  const parseBaiFile = async (content) => {
    const lines = content.split('\n');
    const newParsedData = [];
    let currentTransaction = null;
    let bankName = '';
    let formattedDate = 'Invalid Date';
    let transactionNumber = "";
    let amt = 0;
    lines.forEach((line) => {
      const parts = line.split(',');

      // Bank Name (from line starting with '01')
      if (parts[0].trim() === '01') {
        bankName = parts[1] ? parts[1].trim() : '';
      }
      
      if (parts[0].trim() === '02') {
        const transactionDate = parts[4] ? parts[4].trim() : ''
        // Format transactionDate as YY/MM/DD
        if (transactionDate.length === 6) {
          const year = `20${transactionDate.slice(0, 2)}`; // '24' -> '2024'
          const month = transactionDate.slice(2, 4); // '03' -> March
          const day = transactionDate.slice(4, 6); // '28' -> 28th day
          formattedDate = `${month}/${day}/${year}`; // Final format: MM/DD/YYYY
        }
      }
      if((parts[0].trim() === '88' && parts[1].trim().includes("PMT INFO:TRN*1*"))) {
        let trn = parts[1].trim().split("*");
        transactionNumber = trn.length > 2 ? trn[2] : "";
      }
      // Transaction line (starting with '16')
      if (parts[0].trim() === '16') {
        const transactionDate = parts[4] ? parts[4].trim() : '';
        // console.log("Date", transactionDate);
        // Extract and format amount (e.g., 99860168 -> 998601.68)
        let amount = parts[2] ? parts[2].trim() : '0';
        if (amount.length > 2) {
          const dollars = amount.slice(0, -2);
          const cents = amount.slice(-2);
          amount = currencyFormat(parseFloat(`${dollars}.${cents}`));
        }

        // Check payment type: 164 -> '', 165 -> 'EFT credit'
        let paymentType = parts[1] ? parts[1].trim() : '';
        let formattedPaymentType = '';
        let a = parts[2] ? parts[2].trim() : '0';
        if (paymentType === '165') {
          formattedPaymentType = 'EFT credit'; // Show 'EFT credit' for 165
          if (a.length > 2) {
            amt += parseFloat(`${a.slice(0, -2)}.${a.slice(-2)}`);
          }
        } else if (paymentType === '164') {
          formattedPaymentType = ''; // Show empty for 164
        }

        currentTransaction = {
          transaction_number: transactionNumber ? transactionNumber : '',
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
    const t = [ newParsedData.length, newParsedData.filter((x) => x["payment_type"] == "EFT credit").length, amt.toFixed(2), newParsedData.filter((x) => x["payment_type"] == "EFT credit").length ];
    setTransactionsCount(t);
    console.log("trnx", t);    
    // Set the parsed data to the state or return it
    setParsedData(newParsedData);
    const headerKeys = Object.keys(Object.assign({}, ...newParsedData));
    let columns = [];
    columns = headerKeys.map((header, index) => {
      if(header != "subRows" && header != "id") {
        let o = {
          id: index + 1,
          header: header.replace("_", " ").replace("\r", "").toUpperCase(),
          accessorKey: header.replace("\r", "")
        }
        return o;
      }
    }).filter((key) => key != "subRows" && key != undefined)
    console.log("Columns", columns);
    setTablecColumns(columns);
    await saveFileToDb({
      total: newParsedData.length,
      rules: newParsedData.filter((x) => x["payment_type"] == "EFT credit").length,
      recorded: newParsedData.filter((x) => x["payment_type"] == "EFT credit").length,
      fileName: `${(new Date().toJSON().slice(0,10))}_deposit.bai`
    });
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

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        CLOSE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseCircleOutlined fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
        {openAlert &&
          <Grid>
            <Typography className='blink_me' color="#080" variant="h4">{fileMessage}</Typography>
          </Grid>
        }
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
            disabled={showFileContent}
            onClick={handleFileUpload}
            sx={{ borderRadius: '40px', marginTop: '0px', padding: '12px 30px 12px 30px' }}
          >
            {openAlert ? "Process" : fileMessage}
            {/* <input type="file" multiple hidden onChange={handleFileUpload} sx={{ padding: '0px 10px 10px 0px' }} /> */}
            {!showFileContent &&
             <MemoryOutlined style={{ fontSize: '20px', marginLeft: '15px', borderRadius: '100%', background: 'transparent' }} />
            }
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Box sx={{ width: '100%' }}>
          <AnimatedProcessNew currentStep={step} countFiles={countFiles} type="deposit" />
        </Box>
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
          <CustomTable data={parsedData} datacolumns={tablecColumns} />
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
        <CustomTable data={parsedData} datacolumns={tablecColumns} />
      </CustomDialog>
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAlert}
        onClose={handleClose}
        message={fileMessage}
        TransitionComponent={SlideTransition}
        action={action}
        sx={{ backgroundColor: 'teal', color: 'coral' }}
      /> */}
    </div>
  );
}

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default DepositData;
