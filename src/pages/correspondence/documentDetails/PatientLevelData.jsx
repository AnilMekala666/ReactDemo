/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
// import React, { useEffect, useState } from 'react';
// import {
//   Paper,
//   Button,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   MenuItem,
//   InputLabel
// } from '@mui/material';
// import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
// import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
// import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

// export const PatientLevelData = ({ patients, patientsData,docName }) => {
//   const [patientLevelTable, setPatientLevelTable] = useState([]);
//   const [lineLevelTable, setLineLevelTable] = useState([]);
//   const [patient, setPatient] = useState(null);
//   const handleSelectedPatient = (e) => {
//     const id = e.target.value;
//     setPatient(id);
//     const _patientData = patientsData.patient_level_data?.filter((patient) => {
//       return patient.id === id;
//     });
//     const _lineData = patientsData.line_level_data?.filter((line) => line.checkPatientLevelDataId === id);
//     setPatientLevelTable(_patientData);
//     setLineLevelTable(_lineData);
//   };

//   useEffect(() => {

//   }, []);

//   return (
//     <Box sx={{ padding: 2 }}>
//       {/* Patient Selection Input */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: 2,
//           borderRadius: '8px',
//           width: '100%',
//           boxSizing: 'border-box',
//           marginTop: '2'
//         }}
//       >
//         {/* Previous and Next buttons */}
//         <Box sx={{ width: '30%' }}>
//           <InputLabel id="demo-simple-select-helper-label" style={{ fontWeight: '600', fontSize: '16px' }}>
//             Choose Patient
//           </InputLabel>
//           <Select
//             labelId="demo-simple-select-helper-label"
//             placeholder="Select The Patient"
//             fullWidth
//             sx={{ fontWeight: '600' }}
//             onChange={handleSelectedPatient}
//             defaultValue="select"
//           >
//             <MenuItem value="select" disabled style={{ padding: '4px 6px', fontWeight: '500', color: 'gray' }}>
//               Select Patient
//             </MenuItem>
//             {patients && patients.length > 0
//               ? patients.map((patient) => {
//                   const { id, patientName } = patient;
//                   return (
//                     <MenuItem key={id} value={id} style={{ padding: '4px 6px', fontWeight: '500' }}>
//                       {patientName}
//                     </MenuItem>
//                   );
//                 })
//               : null}
//           </Select>
//         </Box>

//         {/* Right buttons */}
//         {patient && (
//           <Box>
//             <Box sx={{ textAlign: 'right' }}>
//               <label style={{ fontWeight: '600', fontSize: '16px' }}>Capture Info - 66%</label>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 variant="outlined"
//                 startIcon={<AppRegistrationOutlinedIcon />}
//                 sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
//               >
//                 Edit Column
//               </Button>
//               <Button
//                 variant="outlined"
//                 startIcon={<PermIdentityOutlinedIcon />}
//                 sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
//               >
//                 Manual Validate
//               </Button>
//               <Button
//                 variant="outlined"
//                 startIcon={<AutoAwesomeOutlinedIcon />}
//                 sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
//               >
//                 AI Validate
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </Box>

//       {/* Table for Patient-Level Data */}
//       {patient && (
//         <Box className="doc-table-cont" sx={{ padding: 2 }}>
//           <label style={{ fontWeight: '600', fontSize: '16px' }}>Patient-Level Data</label>
//           <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 2 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Patient Name</TableCell>
//                   <TableCell>Insurance Name</TableCell>
//                   <TableCell>Claim Number</TableCell>
//                   <TableCell>Service Date</TableCell>
//                   <TableCell>Claimed Amount</TableCell>
//                   <TableCell>Allowed Amount</TableCell>
//                   <TableCell>Paid Amount</TableCell>
//                   <TableCell>Patient Portion</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {patientLevelTable?.map((patient, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{patient.patientName}</TableCell>
//                     <TableCell>{patient.insuranceName}</TableCell>
//                     <TableCell>{patient.claimNumber}</TableCell>
//                     <TableCell>{patient.patientLevelServiceDate}</TableCell>
//                     <TableCell>${patient.claimAmount}</TableCell>
//                     <TableCell>${patient.allowedAmount}</TableCell>
//                     <TableCell>${patient.paidAmount}</TableCell>
//                     <TableCell>{patient.patientPortion}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <label style={{ fontWeight: '600', fontSize: '16px' }}>Line-Level Data</label>
//           <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Service Date</TableCell>
//                   <TableCell>Procedure Code</TableCell>
//                   <TableCell>Service Description</TableCell>
//                   <TableCell>Charge Amount</TableCell>
//                   <TableCell>Allowed Amount</TableCell>
//                   <TableCell>Paid Amount</TableCell>
//                   <TableCell>Adjustment Amount</TableCell>
//                   <TableCell>Reason Codes</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {lineLevelTable?.map((patient, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{patient.lineLevelServiceDate}</TableCell>
//                     <TableCell>{patient.procedureCode}</TableCell>
//                     <TableCell>{patient.serviceDescription}</TableCell>
//                     <TableCell>${patient.chargeAmount}</TableCell>
//                     <TableCell>${patient.allowedAmount}</TableCell>
//                     <TableCell>${patient.paidAmount}</TableCell>
//                     <TableCell>${patient.adjustmentAmount}</TableCell>
//                     <TableCell>{patient.reasonCodes}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}
//       {!patient && (
//         <Typography
//           sx={{
//             height: '250px',
//             display: 'flex',
//             textAlign: 'center',
//             justifyContent: 'center',
//             alignItems: 'center',
//             color: '#656565',
//             fontSize: '1rem'
//           }}
//         >
//           Please select a patient from the list to access detailed information!
//         </Typography>
//       )}
//     </Box>
//   );
// };



import React, { useEffect, useState } from 'react';
import {
  Paper,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';
import GradingIcon from '@mui/icons-material/Grading';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { styled } from '@mui/material/styles';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import IconButton from 'components/@extended/IconButton';
import { color } from 'framer-motion';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(3)
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1.25),
//     paddingRight: theme.spacing(2)
//   }
// }));

// function BootstrapDialogTitle({ children, onClose, ...other }) {
//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           color="white"
//           sx={{
//             position: 'absolute',
//             right: 10,
//             top: 10
//           }}
//         >
//           <CloseOutlined sx={{ color: "white" }} />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

export const PatientLevelData = ({ patients,
  patientsData, docName, receivedStatus, setUserValidation, setUserProcess,
  userProcess, userValidation, statusId, status, setStatus, uId, isEditing
}) => {
  console.log("receivedStatus", receivedStatus)
  console.log("patientsData", patientsData)
  const [patientLevelTable, setPatientLevelTable] = useState([]);
  const [lineLevelTable, setLineLevelTable] = useState([]);
  const [patient, setPatient] = useState(null);
  // const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [initialPatientLevelData, setInitialPatientLevelData] = useState([]);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false)
  const [isEditButtonVisible, setIsEditButtonVisible] = useState(true);



  // const handleSelectedPatient = (e) => {
  //   const id = e.target.value;
  //   setPatient(id);
  //   const _patientData = patientsData.patient_level_data?.filter((patient) => {
  //     return patient.id === id;
  //   });
  //   const _lineData = patientsData.line_level_data?.filter((line) => line.checkPatientLevelDataId === id);
  //   setPatientLevelTable(_patientData);
  //   setLineLevelTable(_lineData);
  //   setEditableData(_patientData);
  // };

  const handleClickOpen = () => {
    setUserValidation(true);
    setUserProcess(false);
    setValidationDialogOpen(true)
  };
  const handleClose = () => {
    console.log("close drawwer")
    setValidationDialogOpen(false)
  }
  console.log("patientLevelTable", patientLevelTable)

  useEffect(() => {
    if (patients && patients.length > 0) {
      const defaultPatient = patients[0].id;
      setPatient(defaultPatient);

      const _patientData = patientsData.patient_level_data?.filter((patient) => patient.id === defaultPatient);
      const _lineData = patientsData.line_level_data?.filter((line) => line.checkPatientLevelDataId === defaultPatient);

      setInitialPatientLevelData(_patientData);
      setPatientLevelTable(_patientData);
      setLineLevelTable(_lineData);
      setEditableData(_patientData);
    }
  }, [patients, patientsData]);





  const handleSelectedPatient = (e) => {
    const id = e.target.value;
    setPatient(id);
    const _patientData = patientsData.patient_level_data?.filter((patient) => patient.id === id);
    const _lineData = patientsData.line_level_data?.filter((line) => line.checkPatientLevelDataId === id);
    setPatientLevelTable(_patientData);
    setLineLevelTable(_lineData);
    setEditableData(_patientData);
  };

  // const handleEditToggle = () => {
  //   console.log()
  //   console.log("handleEditToggle click")
  //   // setIsEditing((prev) => !prev);
  //   setIsEditing(true);
  // };


  const handleInputChange = (index, field, value) => {
    const updatedData = [...patientLevelTable];
    updatedData[index][field] = value;
    setPatientLevelTable(updatedData);
    // const updatedLineLevelData = [...lineLevelTable];
    // updatedLineLevelData[index][field] = value;
    // setLineLevelTable(updatedLineLevelData)
  };
  const lineLevelInputChange = (index, field, value) => {
    const updatedLineLevelData = [...lineLevelTable];
    updatedLineLevelData[index][field] = value;
    setLineLevelTable(updatedLineLevelData)
  };

  // const handleCancelEdit = () => {

  //   setPatientLevelTable(initialPatientLevelData);
  //   setEditableData(initialPatientLevelData);
  //   setIsEditing(false);
  // };




  // const updatePatientLevelData = async () => {
  //   try {
  //     for (const patient of patientLevelTable) {
  //       const payload = {
  //         id: patient.id,
  //         claimNumber: patient.claimNumber,
  //         claimedAmount: patient.claimAmount,
  //         allowedAmount: patient.allowedAmount,
  //         paidAmount: patient.paidAmount,
  //       };

  //       console.log("Payload to update:", payload);


  //       const response = await axios.post(CORRESPONDENCE_ENDPOINTS.UPDATE_PATIENT_LEVEL_DATA, payload);
  //       console.log("Update response:", response.data);
  //     }

  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //   }
  // };



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
      //SetPatientsData(response.data);
    } catch (err) {
      console.log(err);
    }
    // finally {
    // }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Patient Selection Input */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          borderRadius: '8px',
          width: '100%',
          boxSizing: 'border-box',
          marginTop: '20px'
        }}
      >
        {/* Previous and Next buttons */}
        <Box sx={{ width: '30%' }}>
          <InputLabel id="demo-simple-select-helper-label" style={{ fontWeight: '600', fontSize: '16px' }}>
            Choose Patient
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            placeholder="Select The Patient"
            fullWidth
            sx={{ fontWeight: '600' }}
            onChange={handleSelectedPatient}
            // defaultValue="select"
            value={patient || 'select'}
          >
            <MenuItem value="select" disabled style={{ padding: '4px 6px', fontWeight: '500', color: 'gray' }}>
              Select Patient
            </MenuItem>
            {patients && patients.length > 0
              ? patients.map((patient) => {
                const { id, patientName } = patient;
                return (
                  <MenuItem key={id} value={id} style={{ padding: '4px 6px', fontWeight: '500' }}>
                    {patientName}
                  </MenuItem>
                );
              })
              : null}
          </Select>
        </Box>

        {/* Right buttons */}
        {patient && (
          <Box>
            {/* <Box sx={{ textAlign: 'right' }}>
              <label style={{ fontWeight: '600', fontSize: '16px' }}>Capture Info - 66%</label>
            </Box> */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {/* 
              {receivedStatus === 2 && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<AppRegistrationOutlinedIcon />}
                    sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
                    // onClick={handleEditToggle}
                    onClick={isEditing ? () => updatePatientLevelData() : handleEditToggle}
                  >
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>

                  {isEditing && isEditButtonVisible && (
                    <Button
                      variant="outlined"
                      startIcon={<AppRegistrationOutlinedIcon />}
                      sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  )}
                  {receivedStatus === 2 && status !== 'Success' &&
                    <>
                      <Button variant="outlined"
                        startIcon={<HowToRegIcon />}
                        // onClick={handleUserValidation}
                        onClick={handleClickOpen}
                        disabled={isEditing}
                        sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
                      >
                        Submit
                      </Button>
                    </>}

                </>
              )} */}
            </Box>
          </Box>
        )}
      </Box>

      {/* Table for Patient-Level Data */}
      {patient && (
        <Box className="doc-table-cont" sx={{ padding: 2 }}>
          {/* <label style={{ fontWeight: '600', fontSize: '16px' }}>Patient-Level Data</label> */}
          <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px' }}>
            Patient-Level Data
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Insurance Name</TableCell>
                  <TableCell>Claim Number</TableCell>
                  <TableCell>Service Date</TableCell>
                  <TableCell>Claimed Amount</TableCell>
                  <TableCell>Allowed Amount</TableCell>
                  <TableCell>Paid Amount</TableCell>
                  <TableCell>Patient Portion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(patientLevelTable) && patientLevelTable.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>{patient.patientName}</TableCell>
                    <TableCell>{patient.insuranceName}</TableCell>
                    {/* <TableCell>{patient.claimNumber}</TableCell> */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.claimNumber}
                          onChange={(e) => handleInputChange(index, 'claimNumber', e.target.value)}
                        />
                      ) : (
                        `  ${patient.claimNumber}`
                      )}
                    </TableCell>
                    <TableCell>{patient.patientLevelServiceDate}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.claimAmount}
                          onChange={(e) => handleInputChange(index, 'claimAmount', e.target.value)}
                        />
                      ) : (
                        `  $${patient.claimAmount}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.allowedAmount}
                          onChange={(e) => handleInputChange(index, 'allowedAmount', e.target.value)}
                        />
                      ) : (
                        `$${patient.allowedAmount}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.paidAmount}
                          onChange={(e) => handleInputChange(index, 'paidAmount', e.target.value)}
                        />
                      ) : (
                        `$${patient.paidAmount}`
                      )}
                    </TableCell>
                    <TableCell>{patient.patientPortion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <label style={{ fontWeight: '600', fontSize: '16px' }}>Line-Level Data</label> */}
          <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px' }}>
            Line-Level Data
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service Date</TableCell>
                  <TableCell>Procedure Code</TableCell>
                  <TableCell>Service Description</TableCell>
                  <TableCell>Charge Amount</TableCell>
                  <TableCell>Allowed Amount</TableCell>
                  <TableCell>Paid Amount</TableCell>
                  <TableCell>Adjustment Amount</TableCell>
                  <TableCell>Reason Codes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lineLevelTable?.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>{patient.lineLevelServiceDate}</TableCell>
                    <TableCell>{patient.procedureCode}</TableCell>
                    <TableCell>{patient.serviceDescription}</TableCell>
                    {/* <TableCell>${patient.chargeAmount}</TableCell> */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.chargeAmount}
                          onChange={(e) => lineLevelInputChange(index, 'chargeAmount', e.target.value)}
                        />
                      ) : (
                        `$${patient.chargeAmount}`
                      )}
                    </TableCell>
                    <TableCell>
                    {isEditing ? (
                        <TextField
                          value={patient.allowedAmount}
                          onChange={(e) => lineLevelInputChange(index, 'allowedAmount', e.target.value)}
                        />
                      ) : (
                     ` $${patient.allowedAmount}`
                      )}
                      </TableCell>
                    <TableCell>
                      {/* ${patient.paidAmount} */}
                      {isEditing ? (
                        <TextField
                          value={patient.paidAmount}
                          onChange={(e) => lineLevelInputChange(index, 'paidAmount', e.target.value)}
                        />
                      ) : (
                     ` $${patient.paidAmount}`
                      )}
                      </TableCell>
                    <TableCell>
                      ${patient.adjustmentAmount}
                   
                      </TableCell>
                    <TableCell>{patient.reasonCodes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {!patient && (
        <Typography
          sx={{
            height: '250px',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#656565',
            fontSize: '1rem'
          }}
        >
          Please select a patient from the list to access detailed information!
        </Typography>
      )}

      {/* <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={validationDialogOpen}>
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
      </BootstrapDialog> */}
    </Box>
  );
};