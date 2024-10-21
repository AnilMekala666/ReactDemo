import React, { useState, useMemo, useEffect } from 'react';
import { Grid, Button, Typography, Tabs, Tab } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import CustomDialog from 'components/payments/CustomDialog';
import CustomTable from 'components/payments/CustomTable';
import { useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';
import { Box } from '@mui/system';

const remittance = new URL('src/assets/data/remittance.csv', import.meta.url).href;

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
];

function RemittanceData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(initialStaticData);
  const [RemittanceDataDialogOpen, setRemittanceDataDialogOpen] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [showFileContent, setShowFileContent] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    const headerKeys = Object.keys(Object.assign({}, ...initialStaticData));
    let columns = [];
    columns = headerKeys.map((header, index) => {
      let o = {
        id: index + 1,
        header: header.replace("_", " ").replace("\r", "").toUpperCase(),
        accessorKey: header.replace("\r", "")
      }
      return o;
    })
    console.log("Columns", columns);
    setTableColumns(columns);
  }, [])

  const handleRemittanceDataDialogClose = () => {
    setRemittanceDataDialogOpen(false);
  };

  const fetchCSV = async() => {
    setTableColumns([]);
    // Set the parsed data to the state or return it
    setParsedData([]);
    const file = await fetch(remittance).then(res => res.text());
    console.log(file)
    if (file) {
        setLoading(true);
        const text = file;
        setTimeout(() => {
            parseBaiFile(text);
            setLoading(false);
        }, 2000);
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
          setLoading(false);
          setShowFileContent(true);
        }, 2000);
      };
      reader.readAsText(file);
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
  const parseBaiFile = (content) => {
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
          console.log(object)
          if (object["id"] == undefined) {
            object["id"] = x + 1;
          }
          if (values[index]) {
            object[header.replace(" ", "_").replace("\r", "").toLowerCase()] = values[index] || "";
            return object;
          }
        }
        return object;
      }, {});
      console.log("OBJ", obj)
      return obj;
    }).filter((val) => val != undefined && val.transaction_number != null);
    const headerKeys = Object.keys(Object.assign({}, ...array));
    let columns = [];
    columns = headerKeys.map((header, index) => {
      let o = {
        id: index + 1,
        header: header.replace("_", " ").replace("\r", "").toUpperCase(),
        accessorKey: header.replace("\r", "")
      }
      return o;
    })
    console.log("Columns", columns);
    setTableColumns(columns);
    console.log("Parsed Data: ", array);
    // Set the parsed data to the state or return it
    setParsedData(array);
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
       
      <CustomDialog
        open={RemittanceDataDialogOpen}
        onClose={handleRemittanceDataDialogClose}
        title={"Remittance Data"}
      >
        <CustomTable data={parsedData} datacolumns={tableColumns} />
      </CustomDialog>
    </div>
  );
}

export default RemittanceData;
