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

const DocumentPage = () => {
  const { docName, fileName, docId, checkId, statusId, uId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
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
  const [customAttachments,setCustomAttachments] = useState([]);


  const location = useLocation();
  const row = location.state?.row;
  const receivedStatus = row.statusId;
  console.log("ptientRow", row)

  
  
  const steps = React.useMemo(() => [
    { label: 'Classification', icon: <TaskIcon />, IsStepDone: true },
    { label: 'Data Extraction', icon: <AssignmentIcon />, IsStepDone: true },
    { label: 'iCAN Data Verification', icon: <CheckCircleIcon />, IsStepDone: true },
    {
      label: 'User validation',
      icon: <HowToRegIcon />,
      IsStepDone: statusId === '2' && !userValidation ? false : true
    },
    {
      // Label logic based on statusId and status
      label: statusId === '1' 
        ? 'Processed' 
        : statusId === '2' 
          ? 'In-Posting Queue' 
          : 'Posting Queue',
  
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
      setAttachments(response?.data.attachments.filter(item=>item.fileLocation==null) || []);
      setCustomAttachments(response?.data.attachments.filter(item=>item.fileLocation != null) || []);
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

          {/* Tab Content */}
          {activeTab === 0 && <FileLevelMetaData fileLevelData={fileLevelData} docName={docName} />}

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
              uId={Number(uId)} />
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
    </>
  );
};

export default DocumentPage;
