import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Button, Grid, Tab, TableCell, Tabs, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomExpandableTable from 'components/payments/CustomExpandableTable';
import CustomDialog from 'components/payments/CustomDialog';
import * as XLSX from 'xlsx'; 
import { UploadOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import { Box } from '@mui/system';
import { currencyFormat } from 'components/mindpath';
import CustomExpandableTableColumn from 'components/payments/CustomExpandableTableColumn';
import AnimatedProcess from './AnimatedProcess';
import { flexRender } from '@tanstack/react-table';
import moment from 'moment';
import { MemoryOutlined } from '@mui/icons-material';
import { BASE_PATH } from 'config';
import { randomIntFromInterval } from 'utils/axios';
import AnimatedProcessNew from './AnimatedProcessNew';



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

function ClaimsData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [claimsDataDialogOpen, setclaimsDataDialogOpen] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [showFileContent, setShowFileContent] = useState(false);
  const [value, setValue] = React.useState(0);
  const [tableColumns, setTableColumns] = useState([]);
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
            case "5": setStep("5.1"); transactionsCount.length > 0 ? f.push(transactionsCount[0]) : f.push(756); console.log(f); setCountFiles([...f]); return;
            case "5.1": setStep("5.4"); transactionsCount.length > 1 ? f.push(transactionsCount[1]) : f.push(756); setCountFiles([...f]); return;
            case "5.4": setStep("6.1"); transactionsCount.length > 2 ? f.push(transactionsCount[2]) : f.push(443); console.log(f); return;
          }
        }
        waitLoad();
        setStep("6.1");
        return;
      }, 2000)
    }
  }, [step, loading])

  const waitLoad = () => {
    setTimeout(()=>setLoading(false), 2000);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const tableColumns = useMemo(
  //   () => [
  //     { header: 'Patient Name', accessorKey: 'Patient Name' },
  //     { header: 'Policy Number', accessorKey: 'Policy Number' },
  //     { header: 'Payer', accessorKey: 'Payer' },
  //     { header: 'Billed Amount', accessorKey: 'Billed Amount' },
  //     { header: 'Encounter Number', accessorKey: 'Encounter Number' },
  //     { header: 'Diagnosis 1', accessorKey: 'Diagnosis 1' },
  //     { header: 'Diagnosis 2', accessorKey: 'Diagnosis 2' },
  //     { header: 'Diagnosis 3', accessorKey: 'Diagnosis 3' },
  //     { header: 'Diagnosis 4', accessorKey: 'Diagnosis 4' },
  //     { header: 'Diagnosis 5', accessorKey: 'Diagnosis 5' },
  //   ],
  //   []
  // );

  // const expandedColumns = useMemo(
  //   () => [
  //     { header: 'Procedure  Code', accessorKey: 'Procedure  Code' },
  //     { header: 'Amount', accessorKey: 'Amount' }
  //   ],
  //   []
  // );

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
    // console.log("Columns", columns);
    // setTableColumns(columns);
  }, [])

  const fetchInitial = async () => {
    console.log("Fetch Called");
    const data = await fetch(`${BASE_PATH}/getClaimsDataForLastWeek/1`);
    // console.log("Data API", await data.json());
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
          header: header.replace("_", " ").replace("\r", "").replace(/([A-Z])/g, ' $1').trim().toUpperCase(),
          accessorKey: header.replace("\r", "")
        }
        return o;
      }
    }).filter((key) => key != "subRows" && key != undefined)
    console.log("Columns", columns);
    setTableColumns(columns);
    setOpenAlert(true);
  }

  const handleclaimsDataDataDialogClose = () => {
    navigate('/patient/payment');
  };

  const fetchCSV = async () => {
    // Set the parsed data to the state or return it
    setParsedData([]);
    const file = await fetch(claimsCsv).then(res => res.text());
    console.log(file)
    if (file) {
        setLoading(true);
        const text = file;
        setTimeout(() => {
            parseCsvFile(text);
            setLoading(false);
        }, 18000);
    }
  }

  const handleFileUpload = async (event) => {
    const claimsCsv = `/data/newData/claims${randomIntFromInterval(1, 2)}.csv`;
    const claimsTxt = `/data/newData/claims${randomIntFromInterval(1, 2)}.txt`;
    const file = await fetch(claimsCsv).then(res => res.text());
    const fileTxt = await fetch(claimsTxt).then(res => res.text());
    if (file) {
      setFileContent(fileTxt);
      parseCsvFile(file);
      setShowFileContent(true);
      setLoading(true);
      setOpenAlert(false);
      setFileMessage("No File Available to Process");
    }
  };

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
    const rawResponse = await fetch(`${BASE_PATH}/saveClaimsFileInfo`, {
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

  const parseCsvFile = async (content) => {
    const csvHeader = content.slice(0, content.indexOf("\n")).split(",");
    const csvRows = content.slice(content.indexOf("\n") + 1).split("\n");
    // console.log(csvHeader)
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
            object[header.trim()] = values[index] || "";
            return object;
          }
        }
        return object;
      }, {});
      return obj;
    }).filter((val) => val != undefined);
    // const headerKeys = Object.keys(Object.assign({}, ...array));
    // let columns = [];
    // columns = headerKeys.map((header, index) => {
    //   let o = {
    //     id: index + 1,
    //     header: header.trim(),
    //     accessorKey: header
    //   }
    //   return o;
    // })
    // console.log("Columns", columns);
    // console.log("Parsed Data: ", array);
    const arr = [];
    let out = {};
    array.map((x, i)=>{
      if(i == 0) {
        out={
          'Payer': x['Payer'],
          'Billing Provider Name': x['Billing Provider'],
          'Submitter Name': x['submitter_name']
        }
      }
      let formattedDate = '';
      if(x['Patient Name']) {
        if (x['date_file_received'].length === 8) {
          const year = `${x['date_file_received'].slice(0, 4)}`; // '24' -> '2024'
          const month = x['date_file_received'].slice(4, 6); // '03' -> March
          const day = x['date_file_received'].slice(6, 8); // '28' -> 28th day
          formattedDate = `${month}/${day}/${year}`; // Final format: MM/DD/YYYY
        }
        console.log(x['date_file_received'], formattedDate);
      
        arr.push({
          "id": x["id"],
          'Patient Name': x['Patient Name'],
          'Billed Amount': currencyFormat(parseFloat(x['Billed Amount']) || 0),
          'Encounter Number': x['Encounter Number'],
          'Date of submission': formattedDate,
          'Start DOS': x['Service Start'],
          'End DOS': x['Service End'] || x['Service Start'],
          "subRows": [
            {
              'Procedure  Code': x['Procedure  Code'],
              "Amount": currencyFormat(parseFloat(x["Amount"]) || 0),
              'Diagnosis 1': x['Diagnosis 1'],
              'Diagnosis 2': x['Diagnosis 2'],
              'Diagnosis 3': x['Diagnosis 3'],
              'Diagnosis 4': x['Diagnosis 4'],
              'Diagnosis 5': x['Diagnosis 5'],
            }
          ]
        })
      }
    })
    setOutsideData(out);
    const result = [];
    for (var i = 0; i < arr.length; i++) {
      var found = false;
      for (var j = 0; j < result.length; j++) {
        if (result[j]["Patient Name"] == arr[i]["Patient Name"] && result[j]['Policy Number'] == arr[i]['Policy Number']) {
          found = true;
          result[j].subRows = result[j].subRows.concat(arr[i].subRows);
          break;
        }
      }
      if (!found) {
        result.push(arr[i]);
      }
    }
    const t = [ arr.length, arr.length, arr.length ];
    setTransactionsCount(t);
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
    setParsedData(result);
    setFileMessage("No File Available to Process");
    console.log(arr);
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

  

  return (
    <div>
      <Grid mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid >
          <Typography variant="h4">Claims</Typography>
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
            disabled={showFileContent || disableBtn}
            onClick={handleFileUpload}
            component="label"sx={{ borderRadius: '40px', marginTop: '0px', padding: '12px 30px 12px 30px' }}
            >
               Process
               {/* {openAlert ? "Process" : fileMessage} */}
            {/* <input type="file" hidden onChange={handleFileUpload} sx={{ padding: '0px 10px 10px 0px' }}/> */}
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
              <TableCell key={i}>
                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: 16 }}>{flexRender(cell)}: {flexRender(outsideData[cell])}</Typography>
              </TableCell>
            ))}
            <CustomExpandableTableColumn data={parsedData} datacolumns={tableColumns} />
          </CustomTabPanel>
        </Box>
        : 
        <Box>
          <CustomExpandableTableColumn data={parsedData} datacolumns={tableColumns} />
        </Box>
      )}
     
      <CustomDialog
        open={claimsDataDialogOpen}
        onClose={handleclaimsDataDataDialogClose}
        title={"Patient Payments Data"}
      >
        <CustomExpandableTableColumn data={parsedData} datacolumns={tableColumns} />
      </CustomDialog>
    </div>
  );
}

export default ClaimsData;