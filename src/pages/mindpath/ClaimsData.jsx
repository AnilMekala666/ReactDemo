import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Button, Grid, Tab, Tabs, Typography } from '@mui/material';
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

const claimsCsv = new URL('src/assets/data/claims.csv', import.meta.url).href;

const initialStaticData = [
  {
    "Patient Name": "JAY RILL",
    "Dob": "10/23/2001",
    "Sex": "F",
    "Address": "243 NW 110TH AVENUE, SUNRISE, FL 33322",
    "Relation": 19,
    "Insured Name": "GAL-LYN MER",
    "Policy Number": "XJBH89019956",
    "Ins Dob": "",
    "Ins Sex": "",
    "Insured Address": "",
    "Payer": "BCBS OF FLORIDA",
    "Payer ID": "PI:1414",
    "Other Insured": "",
    "Other Policy": "",
    "Other Plan": "",
    "Billing Provider": "XYZ Health",
    "BP NPI": 1467477377,
    "Encounter Number": "4796555A",
    "Billed Amount": 530,
    "TOB": 101,
    "Rendering Provider": "VEY TIVA",
    "RP NPI": 1366616688,
    "Ill Onset": "",
    "Initial Treatment": "",
    "Accident": "",
    "First Contact": "",
    "Not Work Start": "",
    "Not Work End": "",
    "Hospital Start": "",
    "Hospital End": "",
    "Lab": "N",
    "Lab Charge": "",
    "Payer Ctrl No": "",
    "Autho Code": "",
    "Diagnosis 1": "F331",
    "Diagnosis 2": "F411",
    "Diagnosis 3": "F4010",
    "Diagnosis 4": "",
    "Diagnosis 5": "",
    "ICD F": "",
    "ICD G": "",
    "ICD H": "",
    "ICD I": "",
    "ICD J": "",
    "ICD K": "",
    "ICD L": "",
    "Line #": 1,
    "Service Start": "10/9/2024",
    "Service End": "",
    "POS": "",
    "EMG": "",
    "Procedure  Code": 99214,
    "Modifiers 1-4": 95,
    "Amount": 329,
    "Quantity": 1,
    "DC Pointers": "1,2,3",
    "Family": "",
    "Line RP NPI": "",
    "Drug": "",
    "bp_tax_identification_number": 650836419,
    "functional_id_gp": "HC",
    "app_send_code": "007454760333",
    "app_rec_code": "ECGCLAIMS",
    "date_file_received": 20241013,
    "time_file_received": 2212,
    "grp_control_no": 646533554,
    "responsible_agency_code": "X",
    "realease_id_code": "005010X213A1",
    "hierachical_start_code": "0019",
    "tc_purpose_code": "00",
    "ref_ident": 646533550,
    "trancation_type_code": "CH",
    "submitter_name": "MCK GRP",
    "submitter_edi_contact_no": 3213298716,
    "submitter_edi_name": "JENNY LEN",
    "receiver_name": "HEALTH",
    "recevier_claim": "CLAIM"
  },
  {
    "Patient Name": "MIRI MATAL",
    "Dob": "12/27/1997",
    "Sex": "F",
    "Address": "2541 NE 10TH AVE, POMPANO BEACH, FL 33064",
    "Relation": 19,
    "Insured Name": "TOM MATAL",
    "Policy Number": "VMYH37234984",
    "Ins Dob": "",
    "Ins Sex": "",
    "Insured Address": "",
    "Payer": "BCBS OF FLORIDA",
    "Payer ID": "PI:1414",
    "Other Insured": "",
    "Other Policy": "",
    "Other Plan": "",
    "Billing Provider": "XYZ Health",
    "BP NPI": 1467477377,
    "Encounter Number": "4886185A",
    "Billed Amount": 250,
    "TOB": 101,
    "Rendering Provider": "SCOT LIN",
    "RP NPI": 1326154562,
    "Ill Onset": "",
    "Initial Treatment": "",
    "Accident": "",
    "First Contact": "",
    "Not Work Start": "",
    "Not Work End": "",
    "Hospital Start": "",
    "Hospital End": "",
    "Lab": "N",
    "Lab Charge": "",
    "Payer Ctrl No": "",
    "Autho Code": "",
    "Diagnosis 1": "F411",
    "Diagnosis 2": "",
    "Diagnosis 3": "",
    "Diagnosis 4": "",
    "Diagnosis 5": "",
    "ICD F": "",
    "ICD G": "",
    "ICD H": "",
    "ICD I": "",
    "ICD J": "",
    "ICD K": "",
    "ICD L": "",
    "Line #": 1,
    "Service Start": "10/12/2024",
    "Service End": "",
    "POS": "",
    "EMG": "",
    "Procedure  Code": 90834,
    "Modifiers 1-4": 95,
    "Amount": 250,
    "Quantity": 1,
    "DC Pointers": 1,
    "Family": "",
    "Line RP NPI": "",
    "Drug": "",
    "bp_tax_identification_number": 650836419,
    "functional_id_gp": "HC",
    "app_send_code": "007454760333",
    "app_rec_code": "ECGCLAIMS",
    "date_file_received": 20241013,
    "time_file_received": 2212,
    "grp_control_no": 646533554,
    "responsible_agency_code": "X",
    "realease_id_code": "005010X213A1",
    "hierachical_start_code": "0019",
    "tc_purpose_code": "00",
    "ref_ident": 646533550,
    "trancation_type_code": "CH",
    "submitter_name": "MCK GRP",
    "submitter_edi_contact_no": 3213298716,
    "submitter_edi_name": "JENNY LEN",
    "receiver_name": "HEALTH",
    "recevier_claim": "CLAIM"
  },
  {
    "Patient Name": "JAY RILL",
    "Dob": "10/23/2001",
    "Sex": "F",
    "Address": "243 NW 110TH AVENUE, SUNRISE, FL 33322",
    "Relation": 19,
    "Insured Name": "GAL-LYN MER",
    "Policy Number": "XJBH89019956",
    "Ins Dob": "",
    "Ins Sex": "",
    "Insured Address": "",
    "Payer": "BCBS OF FLORIDA",
    "Payer ID": "PI:1414",
    "Other Insured": "",
    "Other Policy": "",
    "Other Plan": "",
    "Billing Provider": "XYZ Health",
    "BP NPI": 1467477377,
    "Encounter Number": "4796555A",
    "Billed Amount": 530,
    "TOB": 101,
    "Rendering Provider": "VEY TIVA",
    "RP NPI": 1366616688,
    "Ill Onset": "",
    "Initial Treatment": "",
    "Accident": "",
    "First Contact": "",
    "Not Work Start": "",
    "Not Work End": "",
    "Hospital Start": "",
    "Hospital End": "",
    "Lab": "N",
    "Lab Charge": "",
    "Payer Ctrl No": "",
    "Autho Code": "",
    "Diagnosis 1": "F331",
    "Diagnosis 2": "F411",
    "Diagnosis 3": "F4010",
    "Diagnosis 4": "",
    "Diagnosis 5": "",
    "ICD F": "",
    "ICD G": "",
    "ICD H": "",
    "ICD I": "",
    "ICD J": "",
    "ICD K": "",
    "ICD L": "",
    "Line #": 2,
    "Service Start": "10/9/2024",
    "Service End": "",
    "POS": "",
    "EMG": "",
    "Procedure  Code": 90833,
    "Modifiers 1-4": 95,
    "Amount": 201,
    "Quantity": 1,
    "DC Pointers": "1,2,3",
    "Family": "",
    "Line RP NPI": "",
    "Drug": "",
    "bp_tax_identification_number": 650836419,
    "functional_id_gp": "HC",
    "app_send_code": "007454760333",
    "app_rec_code": "ECGCLAIMS",
    "date_file_received": 20241013,
    "time_file_received": 2212,
    "grp_control_no": 646533554,
    "responsible_agency_code": "X",
    "realease_id_code": "005010X213A1",
    "hierachical_start_code": "0019",
    "tc_purpose_code": "00",
    "ref_ident": 646533550,
    "trancation_type_code": "CH",
    "submitter_name": "MCK GRP",
    "submitter_edi_contact_no": 3213298716,
    "submitter_edi_name": "JENNY LEN",
    "receiver_name": "HEALTH",
    "recevier_claim": "CLAIM"
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
            case "5": setStep("5.1"); f.push(5000); console.log(f); setCountFiles([...f]); return;
            case "5.1": setStep("5.2"); f.push(3030); console.log(f); setCountFiles([...f]); return;
            case "5.2": setStep("5.3"); f.push(3030); console.log(f); setCountFiles([...f]); return;
            case "5.3": setStep("6.1"); return;
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
    const arr = [];
    initialStaticData.map((x, index)=>{
      arr.push({
        "id": index,
        'Patient Name': x['Patient Name'],
        'Policy Number': x['Policy Number'],
        'Payer': x['Payer'],
        'Billed Amount': currencyFormat(x['Billed Amount'] || 0),
        'Encounter Number': x['Encounter Number'],
        "subRows": [
          {
            'Procedure  Code': x['Procedure  Code'],
            "Amount": currencyFormat(x["Amount"] || "0"),
            'Diagnosis 1': x['Diagnosis 1'],
            'Diagnosis 2': x['Diagnosis 2'],
            'Diagnosis 3': x['Diagnosis 3'],
            'Diagnosis 4': x['Diagnosis 4'],
            'Diagnosis 5': x['Diagnosis 5'],
          }
        ]
      })
    })
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
    const headerKeys = Object.keys(Object.assign({}, ...result));
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
    setTableColumns(columns);
    setParsedData(result);
  }, [])

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;

        setTimeout(() => {
          setFileContent(text);
          fetchCSV();
          // setLoading(false);
          setShowFileContent(true);
        }, 2000);
      };
      reader.readAsText(file);
      // reader.onload = function (e) {
      //   const data = new Uint8Array(e.target.result);
      //   const workbook = XLSX.read(data, { type: 'array' });
      //   const firstSheetName = workbook.SheetNames[0];
      //   const worksheet = workbook.Sheets[firstSheetName];

      //   // Convert the sheet to JSON format
      //   const jsonData = XLSX.utils.sheet_to_json(worksheet);

      //   setFileContent(jsonData); // Save parsed data for displaying
      //   const arr = [];
      //   jsonData.map((x)=>{
      //     arr.push({
      //       'Patient Name': x['Patient Name'],
      //       'Policy Number': x['Policy Number'],
      //       'Payor': x['Payor'],
      //       'Encounter Number': x['Encounter Number'],
      //       'Diagnosis 1': x['Diagnosis 1'],
      //       'Diagnosis 2': x['Diagnosis 2'],
      //       'Diagnosis 3': x['Diagnosis 3'],
      //       'Diagnosis 4': x['Diagnosis 4'],
      //       'Diagnosis 5': x['Diagnosis 5'],
      //       "subRows": [
      //         {
      //           'Procedure  Code': x['Procedure  Code'],
      //           "Amount": x["Amount"]
      //         }
      //       ]
      //     })
      //   })
      //   setParsedData(arr);
      //   setLoading(false);
      //   setShowFileContent(true); // Show uploaded content
      // };
      // reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
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

  const parseCsvFile = (content) => {
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
    console.log("Parsed Data: ", array);
    const arr = [];
    array.map((x)=>{
      arr.push({
        "id": x["id"],
        'Patient Name': x['Patient Name'],
        'Policy Number': x['Policy Number'],
        'Payer': x['Payer'],
        'Billed Amount': currencyFormat(parseInt(x['Billed Amount']) || 0),
        'Encounter Number': x['Encounter Number'],
        "subRows": [
          {
            'Procedure  Code': x['Procedure  Code'],
            "Amount": currencyFormat(parseInt(x["Amount"]) || 0),
            'Diagnosis 1': x['Diagnosis 1'],
            'Diagnosis 2': x['Diagnosis 2'],
            'Diagnosis 3': x['Diagnosis 3'],
            'Diagnosis 4': x['Diagnosis 4'],
            'Diagnosis 5': x['Diagnosis 5'],
          }
        ]
      })
    })
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
    console.log("Columns", columns);
    setTableColumns(columns);
    setParsedData(result);
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
          <AnimatedProcess currentStep={step} countFiles={countFiles} />
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