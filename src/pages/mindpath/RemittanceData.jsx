import React, { useState, useMemo, useEffect } from 'react';
import { Grid, Button, Typography, Tabs, Tab, TableCell } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import CustomDialog from 'components/payments/CustomDialog';
import CustomTable from 'components/payments/CustomTable';
import { useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';
import { Box } from '@mui/system';
import CustomExpandableTableColumn from 'components/payments/CustomExpandableTableColumn';
import { currencyFormat } from 'components/mindpath';
import AnimatedProcess from './AnimatedProcess';
import { flexRender } from '@tanstack/react-table';
import moment from 'moment';
import { MemoryOutlined } from '@mui/icons-material';
import { BASE_PATH } from 'config';
import { randomIntFromInterval } from 'utils/axios';
import AnimatedProcessNew from './AnimatedProcessNew';

// const remittance = new URL('src/assets/data/remittance1.csv', import.meta.url).href;
// const remittanceDemo = new URL('src/assets/data/remittance.demo.csv', import.meta.url).href;

const initialStaticData = [
  {
    "File Process Date": "28-01-2024",
    "# files received": "3",
    "# files processed": "3",
    "# Total Transactions": "1100",
    "# transactions recorded": "636",
    "subRows": [
      {
        "File Name": "EDI3.edi",
        "# total transactions": "356",
        "# total transactions recorded": "203",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI2.edi",
        "# total transactions": "370",
        "# total transactions recorded": "215",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI1.edi",
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
        "File Name": "EDI4.edi",
        "# total transactions": "356",
        "# total transactions recorded": "203",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI3.edi",
        "# total transactions": "370",
        "# total transactions recorded": "215",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI2.edi",
        "# total transactions": "374",
        "# total transactions recorded": "218",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI1.edi",
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
        "File Name": "EDI3.edi",
        "# total transactions": "356",
        "# total transactions recorded": "203",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI2.edi",
        "# total transactions": "370",
        "# total transactions recorded": "215",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI1.edi",
        "# total transactions": "374",
        "# total transactions recorded": "218",
        "File Status": "Processed",
      },
    ],
  },
];

const claimEnum = {
  1: "Processed as Primary",
  2: "Processed as Secondary",
  3: "Processed as Tertiary",
  4: "Denied",
  19: "Processed as Primary, Forwarded to Additional Payer",
  20: "Processed as Secondary, Forwarded to Additional Payer",
  21: "Processed as Tertiary, Forwarded to Additional Payer",
  22: "Reversal of Previous Payment",
  23: "Not our Claim, Forwarded to Additional Payer",
  25: "Predetmination Pricing only - No Payment"
}

function RemittanceData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [RemittanceDataDialogOpen, setRemittanceDataDialogOpen] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [showFileContent, setShowFileContent] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [value, setValue] = React.useState(0);
  const [step, setStep] = useState("1");
  const [countFiles, setCountFiles] = useState([]);
  const [outsideData, setOutsideData] = useState([]);
  const [fileMessage, setFileMessage] = useState("File Available to Process");
  const [transactionsCount, setTransactionsCount] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

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
            case "5": setStep("5.1"); transactionsCount.length > 0 ? f.push(transactionsCount[0]) : f.push(3); console.log(f); setCountFiles([...f]); return;
            case "5.1": setStep("5.4"); transactionsCount.length > 1 ? f.push(transactionsCount[1]) : f.push(3); console.log(f); setCountFiles([...f]); return;
            case "5.4": setStep("6.1"); transactionsCount.length > 2 ? f.push(transactionsCount[2]) : f.push(3); console.log(f); setCountFiles([...f]); return;
          }
        }
        waitLoad();
        setStep("6.1");
        return;
      }, 2000)
    }
  }, [step, loading])

  const waitLoad = () => {
    setTimeout(()=>setLoading(false), 5000);
  }

  useEffect(()=>{
    fetchInitial()
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

  const fetchInitial = async () => {
    console.log("Fetch Called");
    const data = await fetch(`${BASE_PATH}/getRemitDataForLastWeek/1`);
    const staticData = await data.json();
    setParsedData(staticData);
    staticData.map((s, i) => {
      const today = moment().toDate();
      var inputDate = moment(s["file_process_date"], "YYYY-MM-DD").toDate();
      // console.log(s, inputDate);
      if(inputDate.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
        setFileMessage("No file available to process");
        setDisableBtn(true);
      }
    })
    const sData = staticData.length > 0 ? staticData : initialStaticData;
    const headerKeys = Object.keys(Object.assign({}, ...sData));
    let columns = [];
    columns = headerKeys.map((header, index) => {
      if(header != "subRows" && header != "id") {
        let o = {
          id: index + 1,
          header: header.replaceAll("_", " ").replaceAll("\r", "").replace(/([A-Z])/g, ' $1').trim().toUpperCase(),
          accessorKey: header.replace("\r", "")
        }
        return o;
      }
    }).filter((key) => key != "subRows" && key != undefined)
    console.log("Columns", columns);
    setTableColumns(columns);
    setOpenAlert(true);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(()=>{
  //   const headerKeys = Object.keys(Object.assign({}, ...initialStaticData));
  //   let columns = [];
  //   columns = headerKeys.map((header, index) => {
  //     let o = {
  //       id: index + 1,
  //       header: header.replace("_", " ").replace("\r", "").toUpperCase(),
  //       accessorKey: header.replace("\r", "")
  //     }
  //     return o;
  //   })
  //   console.log("Columns", columns);
  //   setTableColumns(columns);
  // }, [])

  const handleRemittanceDataDialogClose = () => {
    setRemittanceDataDialogOpen(false);
  };

  const fetchCSV = async(url) => {
    setTableColumns([]);
    // Set the parsed data to the state or return it
    setParsedData([]);
    const file = await fetch(url ?? remittance).then(res => res.text());
    console.log(file)
    if (file) {
        // setLoading(true);
        const text = file;
        parseBaiFile(text);
    }
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
  

  const handleFileUpload = async (event) => {
    const remittance = `/data/newData/remittance${randomIntFromInterval(1, 2)}.csv`;
    const remittanceTxt = `/data/newData/remittance${randomIntFromInterval(1, 2)}.txt`;
    const file = await fetch(remittance).then(res => res.text());
    const fileTxt = await fetch(remittanceTxt).then(res => res.text());
    if (file) {
      setFileContent(fileTxt);
      parseBaiFile(file);
      setShowFileContent(true);
      setLoading(true);
      setOpenAlert(false)
      setFileMessage("No File Available to Process");
    }
  };


  function splitCSVButIgnoreCommasInDoublequotes(str) {
    //split the str first  
    //then merge the elments between two double quotes  
    var delimiter = ',';
    var quotes = '"';
    var elements = str.split(delimiter);
    var newElements = [];
    for (var i = 0; i < elements.length; ++i) {
      if (elements[i].indexOf(quotes) >= 0) {//the left double quotes is found  
        var indexOfRightQuotes = -1;
        var tmp = elements[i];
        //find the right double quotes  
        for (var j = i + 1; j < elements.length; ++j) {
          if (elements[j].indexOf(quotes) >= 0) {
            indexOfRightQuotes = j;
            break;
          }
        }
        //found the right double quotes  
        //merge all the elements between double quotes  
        if (-1 != indexOfRightQuotes) {
          for (var j = i + 1; j <= indexOfRightQuotes; ++j) {
            tmp = tmp + delimiter + elements[j];
          }
          newElements.push(tmp);
          i = indexOfRightQuotes;
        }
        else { //right double quotes is not found  
          newElements.push(elements[i]);
        }
      }
      else {//no left double quotes is found  
        newElements.push(elements[i]);
      }
    }

    return newElements;
  }
  const parseBaiFile = async (content) => {
    const csvHeader = content.slice(0, content.indexOf("\n")).split(",");
    const csvRows = content.slice(content.indexOf("\n") + 1).split("\n");
    const array = csvRows.map((i, x) => {
      const values = splitCSVButIgnoreCommasInDoublequotes(i);
      // console.log(x, values);
      // let object = {
      //   id: x
      // }
      const obj = csvHeader.reduce((object, header, index) => {
        if (object !== undefined) {
          if (object["id"] == undefined) {
            object["id"] = x + 1;
          }
          if (values[index]) {
            if(header.replace(" ", "_").replace("\r", "").toLowerCase() == "claim_status") {
              object[header.replace(" ", "_").replace("\r", "").toLowerCase()] = claimEnum[values[index]] || "";
            }
            else {
              object[header.replace(" ", "_").replace("\r", "").toLowerCase()] = values[index] || "";
            }
            return object;
          }
        }
        return object;
      }, {});
      return obj;
    }).filter((val) => val != undefined);
    const arr = [];
    let out = {};
    array.map((x, i)=>{
      if(i == 0) {
        out={
          "Transaction Number": x['check/eft_no'],
          'Deposit Date': x['chk_date'],
          'Amount': currencyFormat(parseFloat(x["chk_amount"]) || 0),
          'Payer': x['payer']
        }
      }
      arr.push({
        "id": x["id"],
        'Patient Name': x['patient_name'],
        'Patient Id': x['patient_control'],
        'Claim Status': x['claim_status'],
        'Billed Amount': currencyFormat(parseFloat(x["ln_claimed"]) || 0),
        'Allowed Amount': currencyFormat(parseFloat(x["ln_allowed"]) || 0),
        'Patient Amount': currencyFormat(parseFloat(x['patient_amt']) || 0),
        'Paid Amount': currencyFormat(parseFloat(x["ln_paid"]) || 0),
        'Start DOS': x['svc_start'],
        'End DOS': x['svc_end'],
        "subRows": [
          {
            'HCPCS': x['hcpcs'],
            'Modifiers': x['modifiers'],
            'Ln Claimed': currencyFormat(parseFloat(x["ln_claimed"]) || 0),
            'Ln Allowed': currencyFormat(parseFloat(x["ln_allowed"]) || 0),
            'Ln Paid': currencyFormat(parseFloat(x["ln_paid"]) || 0),
            'Ln Deductible': currencyFormat(parseFloat(x["ln_deductible"]) || 0),
            'Ln Co-Ins': currencyFormat(parseFloat(x["ln_co-ins"]) || 0),
            'Ln Co-Pay': currencyFormat(parseFloat(x["ln_co-pay"]) || 0),
            'Ln Denied': currencyFormat(parseFloat(x["ln_denied"]) || 0),
            'Ln More Adjustments': x['ln_more adjustments']
          }
        ]
      })
    })
    setOutsideData(out);
    const headerKeys = Object.keys(Object.assign({}, ...arr));
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
    setTableColumns(columns);
    // Set the parsed data to the state or return it
    setParsedData(arr.filter(k=>k["Patient Name"] != null));
    setFileMessage("No File Available to Process");
    const t = [ arr.filter(k=>k["Patient Name"] != null).length, arr.filter(k=>k["Patient Name"] != null).length, arr.filter(k=>k["Patient Name"] != null).length ];
    setTransactionsCount(t);
    await saveFileToDb({
      total: arr.length,
      recorded: arr.length,
      fileName: `${(new Date().toJSON().slice(0,10))}_remits.edi`,
      files: "1",
      filesProcessed: "1"
    });
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

  // const tableColumns = useMemo(
  //   () => [
  //     { header: 'Transaction Number', accessorKey: 'transaction_number' },
  //     // { header: 'EFT', accessorKey: 'account_name' },
  //     { header: 'Bank Name', accessorKey: 'bank_name' },
  //     { header: 'Payment Type', accessorKey: 'payment_type' },
  //     { header: 'Payer', accessorKey: 'payer' },
  //     { header: 'Deposit Date', accessorKey: 'deposit_date' },
  //     { header: 'Amount', accessorKey: 'amounts' },
  //   ],
  //   []
  // );



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
          <Typography variant="h4">Remittance</Typography>
        </Grid>
        {openAlert &&
          <Grid>
            <Typography className='blink_me' color={ disableBtn ? "#800" : "#080"} variant="h4">{fileMessage}</Typography>
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
            disabled={showFileContent || disableBtn}
            onClick={handleFileUpload}
            sx={{ borderRadius: '40px', marginTop: '0px', padding: '12px 30px 12px 30px' }}
          >
            Process
            {/* {openAlert ? "Process" : fileMessage} */}
            {/* <input type="file" multiple hidden onChange={handleFileUpload} sx={{ padding: '0px 10px 10px 0px' }} /> */}
            {!showFileContent &&
              <MemoryOutlined style={{ fontSize: '20px', marginLeft: '15px', borderRadius: '100%', background: 'transparent' }} />
            }
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
            {Object.keys(outsideData).map((cell, i) => (
              <TableCell onClick={() => handleClick(index)} key={i}>
                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: 16 }}>{flexRender(cell)}: {flexRender(outsideData[cell])}</Typography>
              </TableCell>
            ))}
            <CustomExpandableTableColumn data={parsedData} datacolumns={tableColumns} />
          </CustomTabPanel>
        </Box>
        : 
        <Box>
          {Object.keys(outsideData).map((cell, i) => (
            <TableCell key={i}>
              <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: 16 }}>{flexRender(cell)}: {flexRender(outsideData[cell])}</Typography>
            </TableCell>
          ))}
          <CustomExpandableTableColumn data={parsedData} datacolumns={tableColumns} />
        </Box>
      )}
       
      <CustomDialog
        open={RemittanceDataDialogOpen}
        onClose={handleRemittanceDataDialogClose}
        title={"Remittance Data"}
      >
        <CustomExpandableTableColumn data={parsedData} datacolumns={tableColumns} />
      </CustomDialog>
    </div>
  );
}

export default RemittanceData;
