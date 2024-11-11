import React, { useState, useMemo, useEffect } from 'react';
import { Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { json, useNavigate } from 'react-router-dom';
import CustomTable from 'components/payments/CustomTable';
import CustomDialog from 'components/payments/CustomDialog';
import * as XLSX from 'xlsx'; 
import { UploadOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import { Box } from '@mui/system';
import AnimatedProcess from './AnimatedProcess';
import CustomExpandableTableColumn from 'components/payments/CustomExpandableTableColumn';
import moment from 'moment';
import AnimatedProcessNew from './AnimatedProcessNew';
import { BASE_PATH } from 'config';

const initialStaticData = [
  {
    "File Process Date": "28-01-2024",
    "# files received": "3",
    "# files processed": "3",
    "# Total Transactions": "1100",
    "# transactions recorded": "636",
    "subRows": [
      {
        "File Name": "CSV1",
        "# total transactions": "356",
        "# total transactions recorded": "203",
        "File Status": "Processed",
      },
      {
        "File Name": "CSV2",
        "# total transactions": "370",
        "# total transactions recorded": "215",
        "File Status": "Processed",
      },
      {
        "File Name": "CSV3",
        "# total transactions": "374",
        "# total transactions recorded": "218",
        "File Status": "Processed",
      },
    ],
  },
  {
    "File Process Date": "27-01-2024",
    "# files received": "4",
    "# files processed": "4",
    "# Total Transactions": "1454",
    "# transactions recorded": "636",
    "subRows": [
      {
        "File Name": "CSV1",
        "# total transactions": "356",
        "# total transactions recorded": "203",
        "File Status": "Processed",
      },
      {
        "File Name": "CSV2",
        "# total transactions": "370",
        "# total transactions recorded": "215",
        "File Status": "Processed",
      },
      {
        "File Name": "CSV3",
        "# total transactions": "374",
        "# total transactions recorded": "218",
        "File Status": "Processed",
      },
      {
        "File Name": "CSV3",
        "# total transactions": "354",
        "# total transactions recorded": "208",
        "File Status": "Processed",
      },
    ],
  },
  {
    "File Process Date": "28-01-2024",
    "# files received": "5",
    "# files processed": "5",
    "# Total Transactions": "1100",
    "# transactions recorded": "636",
    "subRows": [
      {
        "File Name": "CSV1",
        "# total transactions": "356",
        "# total transactions recorded": "203",
        "File Status": "Processed",
      },
      {
        "File Name": "CSV2",
        "# total transactions": "370",
        "# total transactions recorded": "215",
        "File Status": "Processed",
      },
      {
        "File Name": "CSV3",
        "# total transactions": "374",
        "# total transactions recorded": "218",
        "File Status": "Processed",
      },
    ],
  },
];

function PatientPaymentData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(initialStaticData);
  const [patientPaymentDataDialogOpen, setPatientPaymentDataDialogOpen] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [showFileContent, setShowFileContent] = useState(false);
  const [value, setValue] = React.useState(0);
  const [step, setStep] = useState("1");
  const [countFiles, setCountFiles] = useState([]);
  const [fileMessage, setFileMessage] = useState("File Available to Process");
  const [transactionsCount, setTransactionsCount] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(()=>{
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
    // setTableColumns(columns);
  }, [])

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
            case "2.3": setStep("4"); return;
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
            case "5": setStep("5.1"); transactionsCount.length > 0 ? f.push(transactionsCount[0]) : f.push(756); console.log(f); console.log(f); setCountFiles([...f]); return;
            case "5.1": setStep("5.2"); transactionsCount.length > 0 ? f.push(transactionsCount[0]) : f.push(756); console.log(f); console.log(f); setCountFiles([...f]); return;
            case "5.3": setStep("6.1"); transactionsCount.length > 0 ? f.push(transactionsCount[0]) : f.push(756); console.log(f); console.log(f); setCountFiles([...f]); return;
          }
        }
        waitLoad();
        setStep("6.1");
        return;
      }, 1000)
    }
  }, [step, loading])

  const waitLoad = () => {
    setTimeout(()=>setLoading(false), 5000);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePatientPaymentDataDataDialogClose = () => {
    navigate('/patient/payment');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setOpenAlert(false);
      const reader = new FileReader();
      reader.onload = async function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the sheet to JSON format
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        setFileContent(jsonData); // Save parsed data for displaying
        setParsedData(jsonData); // Save parsed data for the dialog
        let columns = [
          { header: 'Payment ID', accessorKey: 'Payment ID' },
          { header: 'Transaction Number', accessorKey: 'Transaction Number' },
          { header: 'Patient ID', accessorKey: 'Patient ID' },
          { header: 'Amount', accessorKey: 'Amount' },
          { header: 'State Name', accessorKey: 'State Name' },
        ];
        
        console.log("Columns", columns);
        setTableColumns(columns);
        // setLoading(false);
        setShowFileContent(true); // Show uploaded content
        const t = [ jsonData.length, jsonData.length, jsonData.length ];
        setTransactionsCount(t);
        await saveFileToDb({
          total: jsonData.length,
          recorded: jsonData.length,
          fileName: `${(new Date().toJSON().slice(0,10))}_patient_payment.xlsx`,
          files: "1",
          filesProcessed: "1"
        });
        console.log({
          total: jsonData.length,
          recorded: jsonData.length,
          fileName: `${(new Date().toJSON().slice(0,10))}_patient_payment.xlsx`,
          files: "1",
          filesProcessed: "1"
        });
      };
      reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
      
    }
  };

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
        {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
      </div>
    );
  }

  const fetchInitial = async () => {
    console.log("Fetch Called");
    const data = await fetch(`${BASE_PATH}/getPatientPaymentDataForLastWeek/1`);
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
    setTableColumns(columns);
  }

  const saveFileToDb = async (transaction) => {
    var today = new Date();
    const data = {
      "file_process_date": moment(today).format("YYYY-MM-DD"),
      "filesReceived": transaction.files,
      "filesProcessed": transaction.filesProcessed,
      "totalTransactions": transaction.total,
      "transactionsRecorded": transaction.recorded,
      "subRows": [
          {
              "file_name": transaction.fileName,
              "total_transactions": transaction.total,
              "total_transactions_recorded": transaction.recorded,
              "file_status": "Processed"
          }        
      ]
    }
    const rawResponse = await fetch(`${BASE_PATH}/saveRemitFileInfo`, {
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

  return (
    <div>
      <Grid mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid >
          <Typography variant="h4">Patient Payments</Typography>
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
            component="label"sx={{ borderRadius: '40px', marginTop: '0px', padding: '0px 0 0px 30px' }}
            >
              Get File
            <input type="file" hidden onChange={handleFileUpload} sx={{ padding: '0px 10px 10px 0px' }}/>
            <UploadOutlined style={{ fontSize: '20px',padding: '12px', marginLeft: '15px', borderRadius: '100%', background: 'rgb(85 145 243)' }} />
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ width: '100%' }}>
          <AnimatedProcessNew currentStep={step} countFiles={countFiles} />
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
              <Grid container spacing={2} sx={{padding:'0', marginTop: '20px', margin: 'auto' }}>
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
                  {JSON.stringify(fileContent)}
                </pre>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <CustomExpandableTableColumn data={parsedData} datacolumns={tableColumns} />
            </CustomTabPanel>
          </Box>
        : 
          <Box>
            <CustomExpandableTableColumn data={parsedData} datacolumns={tableColumns} />
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
                <div style={{
                  backgroundColor: '#f0f0f0',
                  padding: '10px',
                  borderRadius: '8px',
                  width: "70%",
                  fontSize: "20px",
                  overflow: 'auto',
                  height: '400px',
                  overflowY: 'auto',
                  margin: "auto"
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Payment ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Transaction Number</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Patient ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>State Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileContent.map((row, index) => (
                        <tr key={index}>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['Payment ID']}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['Transaction Number']}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['Patient ID']}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['Amount']}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['State Name']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Grid>
              <Button
                variant="contained"
                color="success"
                component="label"
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
                onClick={() => setPatientPaymentDataDialogOpen(true)}
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
        open={patientPaymentDataDialogOpen}
        onClose={handlePatientPaymentDataDataDialogClose}
        title={"Patient Payments Data"}
      >
        <CustomExpandableTableColumn data={parsedData} datacolumns={tableColumns} />
      </CustomDialog>
    </div>
  );
}

export default PatientPaymentData;