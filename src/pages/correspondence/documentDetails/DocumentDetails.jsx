import React, { useState, useEffect } from 'react';
import { Paper, Tabs, Grid, Tab, Stepper, Step, Button, StepLabel, StepConnector, Typography, Box } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import checkIcon from '../../../assets/images/icons/checkIcon.png';
import FileLevelMetaData from './FileLevelMetaData';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QueueIcon from '@mui/icons-material/Queue';
import { styled } from '@mui/material/styles';
import fileattachIcon from '../../../assets/images/icons/fileattach.png';
import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';
import axios from 'axios';
import { PatientLevelData } from './PatientLevelData';
import { MedicalReqPetientLevel } from './MedicalReqPetientLevel';
import { AiInterPretation } from './AiInterpretation';
import { FileResponse } from './FileResponse';
import { useParams } from 'react-router';
import { FilePreviewDialog } from './FilePreviewDialog';
import { useLocation } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1.25),
    paddingRight: theme.spacing(2)
  }
}));

function BootstrapDialogTitle({ children, onClose, ...other }) {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="white"
          sx={{
            position: 'absolute',
            right: 10,
            top: 10
          }}
        >
          <CloseOutlined sx={{ color: "white" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const DocumentPage = () => {
  const { docName, fileName, docId, checkId, statusId, uId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isFileLevelEditMode, setFileLevelEditMode] = useState(false);
  const [isPatientLevelEditMode, setIsPatientLevelEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fileLevelData, setFileLevelData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientsData, setPatientsData] = useState({});
  const [docTypes, setDocTypes] = useState([]);
  const [mailContent, setMailContent] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [userValidation, setUserValidation] = useState(false);
  const [userProcess, setUserProcess] = useState(false);
  const [status, setStatus] = useState('');
  const [customAttachments, setCustomAttachments] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialFileLevelData, setInitialFileLevelData] = useState([])
  const [isEditButtonVisible, setIsEditButtonVisible] = useState(true);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [message, setMessage] = useState('')




  const location = useLocation();
  const row = location.state?.row;
  const receivedStatus = row?.statusId;
  console.log("ptientRow", row)



  const steps = React.useMemo(() => [
    { label: 'Classification', icon: <TaskIcon />, IsStepDone: true },
    { label: 'Data Extraction', icon: <AssignmentIcon />, IsStepDone: true },
    { label: 'iCAN Data Verification', icon: <CheckCircleIcon />, IsStepDone: true },
    {
      label: 'User Validation',
      icon: <HowToRegIcon />,
      IsStepDone: statusId === '2' && !userValidation ? false : true
    },
    {
      // Label logic based on statusId and status
      label: statusId === '1'
        ? 'Processed'
        : statusId === '2'
          ? 'Submitted'
          // : 'Posting Queue',
          : 'Submitted',

      // Icon logic based on statusId and status
      icon: statusId === '1'
        ? <VerifiedIcon />
        : <QueueIcon />,

      // Completion logic
      IsStepDone: (statusId === '1') || (statusId === '3') || (status === 'Success')
    }
  ], [status, statusId, userValidation]);



  console.log("Received row data:", row.statusId);
  const sourceUrl = `https://ican-manage-chit-dem.cognitivehealthit.com/Correspondence/showLabelingpdf?id=${docId}`;
  // Tab Change Handler
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };


  const DottedConnector = styled(StepConnector)(({ theme, isLast }) => ({
    '& .MuiStepConnector-line': {
      borderColor: isLast ? '#656565' : '#0000FF',
      borderStyle: 'dotted',
      borderWidth: 1
    }
  }));

  // Custom StepIcon component with a circle around the icon, changing color for last step
  const StepIconContainer = styled('div')(({ isLast }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: `1px solid ${isLast ? '#656565' : '#0000FF'}`,
    color: isLast ? '#656565' : '#0000FF',
    fontSize: '12px',
    padding: '19px'
  }));

  const StepTitleContainer = styled('div')(({ isLast }) => ({
    color: isLast ? '#656565' : '#0000FF'
  }));

  const fetchEobFileData = async () => {
    try {
      setLoader(true);
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.GET_EOB_FILE_LEVEL_DATA, {
        fileId: docId
      });
      setFileLevelData(response.data);
      setInitialFileLevelData(response.data)
    } catch (err) {
      setLoader(false);
      setError('Failed to fetch data');
    } finally {
      setLoader(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.GET_PATIENT_LIST, {
        eobCheckId: checkId
      });
      if (response.status == 200) {
        setPatients(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false); // Correctly set loader state
    }
  };
  const fetchPatientData = async () => {
    try {
      setLoader(true);
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.FETCH_PATIENT_LEVEL_DATA, {
        eobCheckId: checkId
      });
      setPatientsData(response.data);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setError('Failed to fetch data');
    } finally {
      setLoader(false);
    }
  };

  const updateEobFileLevelData = async () => {
    const {id,payerName,depositDate,checkNumber,checkAmount}=fileLevelData[0]
    try {
      setLoader(true);
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.UPDATE_EOB_FILE_LEVEL_DATA, {
        id,payerName,depositDate,checkNumber,checkAmount
      });
    } catch (err) {
      console.log(err);
      setLoader(false);
      setError('Failed to fetch data');
    } finally {
      setLoader(false);
    }
  };

  const fetchMedicalRequestData = async () => {
    try {
      setLoader(true);
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.GET_MEDICAL_REQUEST_DATA, {
        fileId: Number(checkId)
      });
      setFileLevelData([response.data.medicalReqFileMetaData]);
      setPatientsData(response.data.medicalReqPatientData);
      setDocTypes(response.data.documentTypes);
      setMailContent(response?.data.mailContent || '');
      setAttachments(response?.data.attachments.filter(item => item.fileLocation == null) || []);
      setCustomAttachments(response?.data.attachments.filter(item => item.fileLocation != null) || []);
      //SetPatientsData(response.data);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setError('Failed to fetch data');
    } finally {
      setLoader(false);
    }
  };

  const handlePreviewDoc = () => {
    setShowFile(true);
  };

  useEffect(() => {
    if (docName == 'EOB') {
      fetchEobFileData();
      fetchPatients();
      fetchPatientData();
    }
    if (docName == 'Medical-records-request') {
      fetchMedicalRequestData();
    }
  }, []);
  const shortFileName = fileName.split('_').pop();
  const href = docName == "EOB"
    ? "/correspndence/documentsList/EOB"
    : "/correspndence/documentsList/Medical-records-request";

  const handleEditToggle = () => {
    console.log()
    console.log("handleEditToggle click")
    // setIsEditing((prev) => !prev);
    setIsPatientLevelEditMode(true);
  };
  const updatePatientLevelData = async () => {
    console.log("Payload to click")
    try {
      console.log("patientsData", patientsData)
      // for (const patient of patientsData.patient_level_data) {
      //   const patientLevelPayload = {
      //     id: patient.id,
      //     claimNumber: patient.claimNumber,
      //     claimedAmount: patient.claimAmount,
      //     allowedAmount: patient.allowedAmount,
      //     paidAmount: patient.paidAmount,
      //   };

      //   console.log("Payload to update:", payload);


      //   // const response = await axios.post(CORRESPONDENCE_ENDPOINTS.UPDATE_PATIENT_LEVEL_DATA, payload);
      //   // console.log("Update response:", response.data);
      // }
      const patientLevelPayload = patientsData.patient_level_data.map((patient) => ({
        id: patient.id,
        claimNumber: patient.claimNumber,
        claimedAmount: patient.claimAmount,
        allowedAmount: patient.allowedAmount,
        paidAmount: patient.paidAmount,
      }))[0];
      const lineLevelPayload = patientsData.line_level_data.map((line) => ({
        id: line.id,
        claimNumber: line.checkPatientLevelDataId,
        claimedAmount: line.chargeAmount,
        allowedAmount: line.allowedAmount,
        paidAmount: line.paidAmount,
      }));
      const payload = {
        patientLevelData: patientLevelPayload,
        lineLevelData: lineLevelPayload,
      };
      console.log("bothpayload", payload)
      const response = await axios.post(
        CORRESPONDENCE_ENDPOINTS.UPDATE_EOB_PATIENT_LEVEL_DATA,
        payload
      );
      console.log("Update response:", response.data);
      if (response.data.statusCode == 200) {
        setMessage(response.data.message)
        fetchPatientData()
        setIsPatientLevelEditMode(false);
      } else {
        setMessage(response.data.message)
        fetchPatientData()
      }


    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  const handleClickOpen = () => {
    setUserValidation(true);
    setUserProcess(false);
    setValidationDialogOpen(true)
  };

  const handleClose = () => {
    console.log("close drawwer")
    setValidationDialogOpen(false)
  }
  const updateStatus = async () => {
    console.log('UPDATESTATUS')
    try {
      console.log("USERINPUT");
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.UPDATE_STATUS, { id: uId });

      console.log(response, "USERINPUT1")
      if (response.status == 200) {
        console.log("Response status 200, setting Success");
        // setStatus('Success')
        setStatus(prevStatus => {
          console.log("Updating status to Success");
          return 'Success';
        });
        setValidationDialogOpen(false)
        setIsEditButtonVisible(false);
      }
      else {
        setStatus('')
      }
    } catch (err) {
      console.log(err);
    }

  };


  return (
    <>
      <Grid container style={{ marginBottom: '20px', padding: '0px' }}>
        <Grid xs={12} sx={{ bgcolor: '#ffffff', display: 'flex', padding: 2, justifyContent: 'space-between' }} alignItems="center">
          <Grid item xs={6}>
            <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
              <Link underline="hover" color="inherit" href="/correspndence/dashboard">
                Overview
              </Link>


              <Link underline="hover" color="inherit" href={href}>
                List of Document
              </Link>

              {/* <Link underline="hover" color="inherit" href="/correspndence/documentsList/Medical-records-request">
                List of Document
              </Link> */}
              <Typography sx={{ color: 'text.primary' }}>{fileName ? shortFileName : ''}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{ padding: '10px 16px', width: '11.5rem', height: '2.5rem', border: '1px solid #3A63D2', borderRadius: '.5rem' }}
              onClick={handlePreviewDoc}
            >
              <img src={fileattachIcon} alt="file attach icon" style={{ marginRight: '5px' }} /> Preview Document
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ padding: 1 }}>
        <Paper className="card-box" sx={{ padding: 2, width: '100%' }}>
          {/* Stepper */}
          <Stepper alternativeLabel className="doc-stepper">
            {steps.map((step, index) => (
              <Step key={index} completed={index < 3}>
                <StepLabel
                  StepIconComponent={() => <StepIconContainer isLast={!step.IsStepDone}>{step.icon}</StepIconContainer>}
                  optional={index === 3 ? <Typography variant="caption"></Typography> : null}
                >
                  <StepTitleContainer isLast={!step.IsStepDone}>
                    {step.IsStepDone && <img src={checkIcon} style={{ marginRight: '4px' }} alt="check Icon" />}
                    {step.label}
                  </StepTitleContainer>
                </StepLabel>
                {index > 0 && <DottedConnector isLast={!step.IsStepDone} />}
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Tabs Section */}
        <Paper className="card-box" sx={{ marginTop: 2, padding: 0 }}>
          <Tabs className="doc-tab" value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
            <Tab label="File-level MetaData" />
            <Tab label="Patient-Level Data" />
            {docName == 'Medical-records-request' && <Tab label="iCAN Interpretation" />}
            {docName == 'Medical-records-request' && <Tab label="Response" />}
          </Tabs>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: 2,
              marginTop: statusId==2 && docName=="EOB" ? -6 : 0 // Adjust to align buttons properly
            }}
          >
            {activeTab === 0 && statusId == 2 && docName=="EOB" && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if(isEditMode){
                    updateEobFileLevelData();
                    }
                    setIsEditMode(!isEditMode);
                  }}
                  className='tab-button'
                  sx={{ marginLeft: '10px', borderRadius: '8px', marginTop: '5px' }}
                >
                  {isEditMode ? 'Save' : 'Edit'}
                </Button>
              </>
            )}

            {activeTab === 0 && statusId == 2 && isEditMode && (
              <Button
                variant="outlined"
                onClick={() => setIsEditMode(false)} // Call save or other logic here
                className='tab-button'
                sx={{ marginLeft: '10px', borderRadius: '8px' }}
              >
                Cancel
              </Button>
            )}

            {activeTab === 1 && statusId == 2 && docName == 'EOB' && (
              <Button
                variant="outlined"
                startIcon={ <AppRegistrationOutlinedIcon/>}
                onClick={isPatientLevelEditMode ? () => updatePatientLevelData() : handleEditToggle}
                className='tab-button'
              >
                {!isPatientLevelEditMode ? ' Edit' : ' Save'}

              </Button>
            )}
            {activeTab === 1 && isPatientLevelEditMode && statusId == 2 && docName == 'EOB' && (
              <Button
                variant="outlined"
                onClick={() => setIsPatientLevelEditMode(false)}
                className='tab-button'
                sx={{marginLeft:"10px"}}
              >
                Cancel

              </Button>
            )}
            {activeTab === 1 && !isPatientLevelEditMode && statusId == 2 && docName == 'EOB' && (
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                className='tab-button'
                sx={{ marginLeft: '10px' }}
                startIcon={<HowToRegIcon />}
              >
                Submit

              </Button>
            )}
          </Box>

          {/* Tab Content */}
          {activeTab === 0 && <FileLevelMetaData fileLevelData={fileLevelData} docName={docName} setFileLevelData={setFileLevelData} isEditMode={isEditMode}/>}

          {activeTab === 1 && docName == 'Medical-records-request' && (
            <MedicalReqPetientLevel patients={patients} patientsData={patientsData} docName={docName} />
          )}
          {activeTab === 1 && docName == 'EOB' && (
            <PatientLevelData patients={patients} patientsData={patientsData} docName={docName} receivedStatus={receivedStatus} setUserValidation={setUserValidation}
              setUserProcess={setUserProcess}
              userValidation={userValidation}
              userProcess={userProcess}
              statusId={Number(statusId)}
              status={status}
              setStatus={setStatus}
              uId={Number(uId)}
              isEditing={isPatientLevelEditMode}
              updatePatientLevelData={updatePatientLevelData}
              handleEditToggle={handleEditToggle}
            />
          )}

          {activeTab === 2 && <AiInterPretation docTypes={docTypes || []} />}

          {activeTab === 3 && (
            <FileResponse
              mailContent={mailContent || ''}
              attachments={attachments || []}
              customAttachments={customAttachments || []}
              setCustomAttachments={setCustomAttachments}
              setUserValidation={setUserValidation}
              setUserProcess={setUserProcess}
              userValidation={userValidation}
              userProcess={userProcess}
              statusId={statusId}
              status={status}
              setStatus={setStatus}
              uId={Number(uId)}
              fileId={checkId}
            />
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
              borderRadius: '8px',
              width: '100%',
              boxSizing: 'border-box',
              marginTop: '2'
            }}
          >
            {/* Previous and Next buttons */}
            {/* <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIosNewIcon />}
                sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#656565' }}
              >
                Previous Document
              </Button>
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIosIcon />}
                sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#656565' }}
              >
                Next Document
              </Button>
            </Box> */}

            {/* Cancel and Save & Submit buttons */}
            {/* {(docName == 'Medical-records-request' && activeTab === 3) && <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" sx={{ borderRadius: '8px' }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" sx={{ borderRadius: '8px', background: '#3A63D2' }}>
                Save & Submit
              </Button>
            </Box>} */}
          </Box>
        </Paper>
      </Box>
      {/* <FilePreviewDialog
        dialogOpen={showFile}
        setDialogOpen={setShowFile}
        title="Document"
        sourceUrl="https://ican-manage-chit-dem.cognitivehealthit.com/Correspondence/showpdf?id=21514&batchName=sample%20batch"
      /> */}
      <FilePreviewDialog dialogOpen={showFile} setDialogOpen={setShowFile} title="Document" sourceUrl={sourceUrl} />

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={validationDialogOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="dialog-header" onClose={handleClose}>
          Submit
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Do you want to confirm moving this item to the posting queue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus
            // onClick={updateStatus}
            onClick={() => {
              console.log("Yes clicked, calling updateStatus");
              updateStatus();
            }}
          >
            Yes
          </Button>
          <Button variant='outlined' onClick={handleClose}>No</Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default DocumentPage;