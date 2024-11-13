/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import ReusableDataGrid from 'components/correspndence/ReusableDataGrid';
import { Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions,Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Box, Tooltip, Grid, Button, IconButton } from '@mui/material';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate, useParams } from 'react-router';
import pdfIcon from '../../assets/images/icons/pdf_icon.png';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';
import axios from 'axios';
import Loader from 'components/Loader';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import InfoIcon from '@mui/icons-material/Info'; // Import the icon



import AIDrawer from './documentList/AIDrawer';
import { display, textAlign } from '@mui/system';



const DocumentsList = () => {
  const navigate = useNavigate();
  const { docName } = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [rows, setRows] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [aiEobTableData, setAiEobTableData] = useState([]);
  const [aiMedicalRequestTableData, setAiMedicalRequestTableData] = useState([])
  const [patientDetails, setPatientDetails] = useState(null);
  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(false);

  console.log(docName)


  const originalDocName = docName.replace(/-/g, ' ');


  const Eobcolumns = [
    {
      field: 'documentName',
      headerName: 'Document Name',
      width: 170,
      renderCell: (params) => {
        console.log(params.row, "inside column")
        return (
          <Box display="flex" alignItems="center">
            <img src={pdfIcon} alt="pdf icon" style={{ width: '30px', height: '30px', marginRight: '20px' }} />
            <Box
              onClick={() =>(
                navigate(`/correspndence/documentsDetails/${docName}/${params.row.documentName}/${params.row.id}/${params.row.checkId}/${params.row.statusId}`, {
                  state: { row: params.row },
                })
              )}
              sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
            >
              <Typography variant="body2" sx={{ fontSize: '14px', color: "#1677ff" }}>
                {params.value ? params.value : '-'}
              </Typography>

            </Box>
          </Box>
        )
      }
    },
    { field: 'payerName', headerName: 'Payer Name', width: 200, valueFormatter: (params) => `${params ? params : '-'}`, align: 'left' },
    {
      field: 'chequeNumber',
      headerName: 'Cheque Number',
      width: 110,
      valueFormatter: (params) => `${params ? params : '-'}`
    },
    {
      field: 'chequeAmount',
      headerName: 'Cheque Amount',
      width: 130,
      valueFormatter: (params) => `$${params ? params : '-'}`
    },
    {
      field: 'depositDate',
      headerName: 'Deposit Date',
      width: 110,
      //type: 'date',
      sortable: true,
      valueFormatter: (params) => `${params ? params : '-'}`
    },
    {
      field: 'fileDate',
      headerName: 'File Date',
      width: 150,
      //type: 'date',
      sortable: true,
      valueFormatter: (params) => `${params ? params : '-'}`
    },
    {
      field: 'openSince',
      headerName: 'Open Since',
      width: 100,
      renderHeader: () => (
        <Box display="flex" alignItems="center">
          Open Since
          <Tooltip title="Number of days since deposit">
            {/* <HelpOutlineIcon sx={{ fontSize: 18, marginLeft: 0.5, color: 'grey.500' }} /> */}
          </Tooltip>
        </Box>
      ),
      valueFormatter: (params) => {
        return `${params ? params : '-'} ${params > 1 ? 'days ago' : 'day ago'}`
      }

    },
    {
      field: 'fileDate',
      headerName: 'File Date',
      width: 100,
      //type: 'date',
      sortable: true,
      valueFormatter: (params) => `${params ? params : '-'}`
    },
    {
      field: 'patientInfo',
      headerName: 'Patient Info',
      width: 100,
      renderCell: (params) => {
        const handleMouseEnter = async () => {
          try {
            // Fetch patient details from the backend using POST
            const response = await axios.post(CORRESPONDENCE_ENDPOINTS.FETCH_PATIENT_LEVEL_DATA, {
              eobCheckId: params.row.checkId // Send checkId as payload
            });
            // Assuming response.data contains the patient details
            setPatientDetails(response.data); // Store the patient details in state
            setIsPatientInfoOpen(true); // Open the popup
          } catch (error) {
            console.error("Error fetching patient details:", error);
            // Handle error (e.g., show a notification)
          }
        };
  
        return (
          <Tooltip title="View Patient Info" arrow>
            <IconButton onMouseEnter={handleMouseEnter}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        );
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      filterable: true,
      align: 'left',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '100%',
              backgroundColor: params.value === 'Need attention' ? 'orange' : 'red',
              marginRight: '6px',
              textAlign: 'left'
            }}
          ></div>
          <p style={{ margin: '0px', padding: '0px' }}>{params.value ? params.value : '-'}</p>
        </div>
      )
    }
  ];

  const MedicalRequestColumns = [
    // { id: 'name', label: 'Document Name' },
    {
      id: 'documentName',
      field: 'documentName',
      headerName: 'Document Name',
      width: 266,
      renderCell: (params) => {
        console.log(params.row.status, "inside column")

        return (
          <Box display="flex" alignItems="center" sx={{ marginTop: "10px" }}>
            <img src={pdfIcon} alt="pdf icon" style={{ width: '30px', height: '30px', marginRight: '20px' }} />
            <Box
              // onClick={() => navigate(`/correspndence/documentsDetails/${docName}/${params.row.documentName}/${params.row.id}/${params.row.checkId}`)}
              onClick={() => (
                navigate(`/correspndence/documentsDetails/${docName}/${params.row.documentName}/${params.row.id}/${params.row.checkId}/${params.row.statusId}`, {
                  state: { row: params.row },
                })
              )

              }
              sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
            >
              <Typography variant="body2" sx={{ fontSize: '14px', color: "#1677ff" }}>
                {params.value ? params.value : '-'}
              </Typography>
              {/* <Typography variant="caption" sx={{ fontSize:'14px'}} color="textSecondary">
              {params.row.documentSize}
            </Typography> */}
            </Box>
          </Box>
        )
      }
    },
    { id: 'payerName', field: 'payerName', headerName: 'Payer Name', width: 200, valueFormatter: (params) => `${params ? params : '-'}`, align: 'left' },
    {
      id: 'patientName',
      field: 'patientName',
      headerName: 'Patient Name',
      width: 200,
      valueFormatter: (params) => `${params ? params : '-'}`
    },
    {
      id: 'claimNumber',
      field: 'claimNumber',
      headerName: 'Claim Number',
      width: 180,
      valueFormatter: (params) => `${params ? params : '-'}`
    },
    {
      id: 'documentAge',
      field: 'documentAge',
      headerName: 'Document Age',
      width: 180,
      valueFormatter: (params) => {

        return `${params ? params : '-'} ${params > 1 ? 'days ago' : 'day ago'}`
      }
    },
    // {
    //   id: 'patientInfo',
    //   field: 'patientInfo',
    //   headerName: 'Patient Info',
    //   width: 150,
    //   renderCell: (params) => {
    //     const handleMouseEnter = async () => {
    //       try {
    //         // Fetch patient details from the backend using POST
    //         const response = await axios.post(CORRESPONDENCE_ENDPOINTS.FETCH_PATIENT_LEVEL_DATA, {
    //           checkId: params.row.checkId // Send checkId as payload
    //         });
    //         // Assuming response.data contains the patient details
    //         setPatientDetails(response.data); // Store the patient details in state
    //         setIsPatientInfoOpen(true); // Open the popup
    //       } catch (error) {
    //         console.error("Error fetching patient details:", error);
    //         // Handle error (e.g., show a notification)
    //       }
    //     };
  
    //     return (
    //       <Tooltip title="View Patient Info" arrow>
    //         <IconButton onMouseEnter={handleMouseEnter}>
    //           <InfoIcon />
    //         </IconButton>
    //       </Tooltip>
    //     );
    //   }
    // },
    {
      id: 'status',
      field: 'status',
      headerName: 'Status',
      width: 200,
      filterable: true,
      align: 'left',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '100%',
              backgroundColor: params.value === 'Need attention' ? 'orange' : 'red',
              marginRight: '6px',
              textAlign: 'left'
            }}
          ></div>
          <p style={{ margin: '0px', padding: '0px' }}>{params.value ? params.value : '-'}</p>
        </div>
      )
    }
  ];


  const columns = docName == "EOB" ? Eobcolumns : MedicalRequestColumns;


  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.FETCH_PREDICTION_FILES, {
        prediction: originalDocName
      });
      console.log(response)
      let processedData = response.data.map((item, index) => {
        const { id, checkAmount, checkNumber, depositDate, documentAge, letterName, payerName, statusName, checkId,statusId } =
          item;
        const shortDocumentName = letterName ? letterName.split('_').pop() : '-';

        return {
          id: id,
          documentName: letterName ? shortDocumentName : '-',
          payerName: payerName ? payerName : '-',
          chequeNumber: checkNumber ? checkNumber : '-',
          chequeAmount: checkAmount ? checkAmount : '-',
          depositDate: depositDate ? depositDate : '-',
          openSince: documentAge ? documentAge : '-',
          status: statusName ? statusName : '-',
          checkId: checkId ? checkId : '-',
          statusId: statusId? statusId:'-',
          // fileDate:fileDate?fileDate : '-'
        };
      });
      // setRows(processedData);
      setAiEobTableData(processedData);
    } catch (err) {
      setLoader(false);
      setError('Failed to fetch data');
    } finally {
      setLoader(false);
    }
  };

  const fetchMedicalRequestData = async () => {
    try {
      setLoader(true);
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.FETCH_MEDICAL_PREDICTION_FILES_WITH_STATUS, {
        prediction: originalDocName
      });
      console.log(response,"RESPONSE")
      let processedData = response.data.map((item, index) => {
        console.log(item,"ITEMS")
        const { id, depositDate, documentAge, letterName, payerName, status, checkId, patientName, claimNumber, numOfPages ,statusId} =
          item;
        const shortDocumentName = letterName ? letterName.split('_').pop() : '-';
        console.log(letterName)
        return {
          id: id,
          documentName: letterName ? letterName : '-',
          payerName: payerName ? payerName : '-',
          patientName: patientName ? patientName : '-',
          claimNumber: claimNumber ? claimNumber : '-',
          documentAge: documentAge ? documentAge : '-',
          numOfPages: numOfPages ? numOfPages : '-',
          depositDate: depositDate ? depositDate : '-',
          openSince: documentAge ? documentAge : '-',
          status: status ? status : '-',
          checkId: checkId ? checkId : '-',
          statusId: statusId ? statusId:'-'
        };
      });
      console.log(processedData)
      setRows(processedData);
    } catch (err) {
      setLoader(false);
      setError('Failed to fetch data');
    } finally {
      setLoader(false);
    }
  };


  useEffect(() => {
    if (originalDocName == "EOB") {
      fetchData();
    } else {
      fetchMedicalRequestData()
    }

  }, []);

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const handleSetAIEobTableData = (data) => {
    console.log("handleSetAIEobTableData", data)

    setIsTableLoading(true)
    setTimeout(() => {
      setAiEobTableData(data);
      setIsTableLoading(false)
    }, 1000);
  };

  const handleSetAIMedicalRequestTableData = (data) => {
    console.log("data", data)
    setIsTableLoading(true)
    setTimeout(() => {
      setAiMedicalRequestTableData(data);
      setIsTableLoading(false)
    }, 1000)
  };

  const handleEOBRefresh = () => {
    setAiEobTableData([]);
    fetchData();
  }

// Function to close the popup
const handleClosePatientInfo = () => {
  setIsPatientInfoOpen(false);
};

  const handleMedicalRequestRefresh = () => {
    setAiMedicalRequestTableData([]);
    fetchMedicalRequestData();
  }

  const aiData = docName == "EOB" ? aiEobTableData : aiMedicalRequestTableData;

  return (
    <>
      <Grid container style={{ padding: '0px' }}>
        <Grid xs={12} sx={{ bgcolor: '#ffffff', display: 'flex', padding: 2 }} alignItems="center">
          <Grid item xs={6}>
            {/* <Typography variant="h3">Overview</Typography> */}
            <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
              <Link underline="hover" color="inherit" href="/correspndence/dashboard">
                Overview
              </Link>
              <Typography sx={{ color: 'text.primary' }}>List of Document</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Grid>
      <Paper
        sx={{
          //width:"92%",
          padding: 0,
          borderRadius: 2,
          marginTop: 2
        }}
      >
        <Grid direction="row" alignItems="center" container sx={{ padding: '20px 16px' }}>
          <Grid item>
            <Typography sx={{ fontSize: '1.3rem', fontWeight: '800' }}>{originalDocName}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              border: '1px solid #D3D3D3',
              borderRadius: '15px',
              padding: '4px 8px',
              marginLeft: '4px',
              color: 'blue',
              background: '#F8F8FF'
            }}
          >
            {aiData.length}
          </Grid>
          <Grid item xs>
          </Grid>
          <Grid item>

            {docName == "EOB"
              ?
              <Button
                variant="outlined"
                startIcon={<AutoAwesomeOutlinedIcon style={{ height: "18px", width: "18px" }} />}
                sx={{
                  minWidth: '100px',
                  fontWeight: 'bold',
                  cursor: "pointer",
                  textTransform:'none'
                }}
                onClick={() => toggleDrawer(true)}
              >
                iCAN Assistance
              </Button>
              :
              <Button
                variant="outlined"
                startIcon={<AutoAwesomeOutlinedIcon style={{ height: "18px", width: "18px" }} />}
                sx={{
                  minWidth: '100px',
                  fontWeight: 'bold',
                  cursor: "pointer",
                  textTransform:'none'
                }}
                onClick={() => toggleDrawer(true)}
              >
                iCAN Assistance
              </Button>

            }
            {docName == "EOB" ? <IconButton
              sx={{ marginRight: "10px", color: "#1677ff" }}
              onClick={handleEOBRefresh}
            >
              <RefreshOutlinedIcon />
            </IconButton>
              :
              <IconButton
                sx={{ marginRight: "10px", color: "#1677ff" }}
                onClick={handleMedicalRequestRefresh}
              >
                <RefreshOutlinedIcon />
              </IconButton>
            }


          </Grid>
        </Grid>

        {/* <ReUsableTable rows={rows} columns={columns1} /> */}
        <ReusableDataGrid rows={aiData?.length > 0 ? aiData : rows} columns={columns} />
        {isPatientInfoOpen && (
  <Dialog open={isPatientInfoOpen} onClose={handleClosePatientInfo} fullWidth>
    <DialogTitle>Patient Details</DialogTitle>
    <DialogContent>
      {patientDetails && patientDetails.patient_level_data.length > 0 ? (
            <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20px' }}>Patient</TableCell>
              <TableCell sx={{ width: '15px' }}>Charge Amount</TableCell>
              <TableCell sx={{ width: '10px' }}>Paid Amount</TableCell>
              <TableCell sx={{ width: '15px' }}>Allowed Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientDetails.patient_level_data.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.patientName}</TableCell>
                <TableCell>
                  {patientDetails.line_level_data
                    .filter(line => line.checkPatientLevelDataId === patient.id)
                    .map(line => line.chargeAmount).join(', ')}
                </TableCell>
                <TableCell>
                  {patientDetails.line_level_data
                    .filter(line => line.checkPatientLevelDataId === patient.id)
                    .map(line => line.paidAmount).join(', ')}
                </TableCell>
                <TableCell>
                {patientDetails.line_level_data
                    .filter(line => line.checkPatientLevelDataId === patient.id)
                    .map(line => line.allowedAmount).join(', ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

            </Box>

      ) : (
        <Typography>No patient data available.</Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClosePatientInfo}>Close</Button>
    </DialogActions>
  </Dialog>
)}
        {console.log(aiData)}
        {console.log(rows)}

      </Paper>

      <AIDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        toggleDrawer={toggleDrawer}
        onSetAIEobTableData={handleSetAIEobTableData}
        handleSetAIMedicalRequestTableData={handleSetAIMedicalRequestTableData}
        docName={docName}
      />
    </>
  );
};

export default DocumentsList;
