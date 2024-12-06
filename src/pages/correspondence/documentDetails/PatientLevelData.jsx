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
  Stack,
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
import { AddCircleOutlined } from '@mui/icons-material';
import { MinusCircleFilled } from '@ant-design/icons';
import CustomDrawer from 'components/payments/CustomDrawer';
import AnimateButton from 'components/@extended/AnimateButton';

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
  userProcess, userValidation, statusId, status, setStatus, uId, isEditing, fetchPatientData
}) => {
  console.log("receivedStatus", receivedStatus)
  console.log("patientsData", patientsData)
  const [patientLevelTable, setPatientLevelTable] = useState([]);
  const [newPatient, setNewPatient] = useState(null);
  const [newLineLevel, setNewLineLevel] = useState(null);
  const [newPatientError, setNewPatientError] = useState({});
  const [newLineLevelError, setNewLineLevelError] = useState({});
  const [lineLevelTable, setLineLevelTable] = useState([]);
  const [patient, setPatient] = useState(null);
  // const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [initialPatientLevelData, setInitialPatientLevelData] = useState([]);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false)
  const [isEditButtonVisible, setIsEditButtonVisible] = useState(true);
  const [drawerType, setDrawerType] = useState(null);



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

  const handleAddInputChange = (field, value) => {
    const addedData = [...newPatient];
    addedData[field] = value;
    setNewPatient(addedData);
  }
  const handleAddLineInputChange = (field, value) => {
    const addedData = [...newPatient];
    addedData[field] = value;
    setNewLineLevel(addedData);
  }
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

  const addLineItem = () => {
    let item = [...lineLevelTable, {}];
    setLineLevelTable(item);
  }
  const removeLineItem = (index) => {
    let item = [...lineLevelTable];
    item.splice(index, 1);
    setLineLevelTable(item);
  }

  const addPatientItem = () => {
    let item = [...patientLevelTable, {}];
    setPatientLevelTable(item);
  }
  const removePatientItem = (index) => {
    let item = [...patientLevelTable];
    item.splice(index, 1);
    setPatientLevelTable(item);
  }

  const handleAddDrawer = (type) => {
    setDrawerType(type);

  }

  const handleAddLineLevelSubmit = async () => {
    try {
      if (docName == 'EOB') {
        let err = {}
        if(newLineLevel.serviceStartDate == null || newLineLevel.serviceStartDate == "") {
          err.serviceStartDate = "Service start date is required.";
        }
        if(newLineLevel.serviceEndDate == null || newLineLevel.serviceEndDate == "") {
          err.serviceStartDate = "Service end date is required.";
        }
        if(newLineLevel.procedureCode == null || newLineLevel.procedureCode == "") {
          err.procedureCode = "Procedure code is required.";
        }
        if(newLineLevel.billedAmount == null || newLineLevel.billedAmount == "") {
          err.billedAmount = "Billed amount is required.";
        }
        if(newLineLevel.allowedAmount == null || newLineLevel.allowedAmount == "") {
          err.allowedAmount = "Allowed amount is required.";
        }
        if(newLineLevel.allowedAmount == null || newLineLevel.allowedAmount == "") {
          err.allowedAmount = "Allowed amount is required.";
        }
        if(newLineLevel.coveredAmount == null || newLineLevel.coveredAmount == "") {
          err.coveredAmount = "Covered amount is required.";
        }
        if(newLineLevel.notCoveredAmount == null || newLineLevel.notCoveredAmount == "") {
          err.notCoveredAmount = "Not covered amount is required.";
        }
        if(newLineLevel.discountAmount == null || newLineLevel.discountAmount == "") {
          err.discountAmount = "Discount amount is required.";
        }
        if(newLineLevel.adjustmentAmount == null || newLineLevel.adjustmentAmount == "") {
          err.discountAmount = "Adjustment amount is required.";
        }
        if(newLineLevel.coPay == null || newLineLevel.coPay == "") {
          err.coPay = "Co pay is required.";
        }
        if(newLineLevel.coInsurance == null || newLineLevel.coInsurance == "") {
          err.coInsurance = "Co insurance is required.";
        }
        if(newLineLevel.deductibleAmount == null || newLineLevel.deductibleAmount == "") {
          err.deductibleAmount = "Deductible amount is required.";
        }
        if(newLineLevel.patientResponsibility == null || newLineLevel.patientResponsibility == "") {
          err.patientResponsibility = "Patient responsibility is required.";
        }
        if(newLineLevel.deniedAmount == null || newLineLevel.deniedAmount == "") {
          err.deniedAmount = "Denied amount is required.";
        }
        if(newLineLevel.reasonCodes == null || newLineLevel.reasonCodes == "") {
          err.reasonCodes = "Reason codes is required.";
        }
        if(newLineLevel.remarksCodes == null || newLineLevel.remarksCodes == "") {
          err.reasonCodes = "Remarks codes is required.";
        }
        if(newLineLevel.description == null || newLineLevel.description == "") {
          err.description = "Description is required.";
        }
        if(Object.keys(err).length > 0) {
          setNewLineLevelError(err);
          return;
        }
        const lineLevelPayload = {
          checkPatientLevelDataId: patientLevelTable?.[0]?.id,
          serviceStartDate: newLineLevel.serviceStartDate,
          serviceEndDate: newLineLevel.serviceEndDate,
          procedureCode: newLineLevel.procedureCode,
          billedAmount: newLineLevel.billedAmount,
          allowedAmount: newLineLevel.allowedAmount,
          coveredAmount: newLineLevel.coveredAmount,
          notCoveredAmount: newLineLevel.notCoveredAmount,
          discountAmount: newLineLevel.discountAmount,
          adjustmentAmount: newLineLevel.adjustmentAmount,
          coPay: newLineLevel.coPay,
          coInsurance: newLineLevel.coInsurance,
          deductibleAmount: newLineLevel.deductibleAmount,
          patientResponsibility: newLineLevel.patientResponsibility,
          deniedAmount: newLineLevel.deniedAmount,
          reasonCodes: newLineLevel.reasonCodes,
          remarksCodes: newLineLevel.remarksCodes,
          description: newLineLevel.description
        };
        const response = await axios.post(CORRESPONDENCE_ENDPOINTS.ADD_EOB_PATIENT_LINE_LEVEL_DATA, lineLevelPayload);
        if (response.data.statusCode == 200) {
          setMessage(response.data.message);
          fetchPatientData();
          setIsPatientLevelEditMode(false);
        } else {
          setMessage(response.data.message);
          fetchPatientData();
        }
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  }

  const handleAddPatientSubmit = async () => {
    try {
      if (docName == 'EOB') {
        let err = {}
        if(newLineLevel.visitId == null || newLineLevel.visitId == "") {
          err.visitId = "Visit id is required.";
        }
        if(newLineLevel.paidAmount == null || newLineLevel.paidAmount == "") {
          err.paidAmount = "Paid amount is required.";
        }
        if(newLineLevel.payerName == null || newLineLevel.payerName == "") {
          err.payerName = "Payer name is required.";
        }
        if(newLineLevel.serviceDate == null || newLineLevel.serviceDate == "") {
          err.serviceDate = "Service date is required.";
        }
        if(newLineLevel.claimNo == null || newLineLevel.claimNo == "") {
          err.claimNo = "Claim number is required.";
        }
        if(newLineLevel.checkNo == null || newLineLevel.checkNo == "") {
          err.checkNo = "Check number is required.";
        }
        if(newLineLevel.patientName == null || newLineLevel.patientName == "") {
          err.patientName = "Patient name is required.";
        }
        if(newLineLevel.checkDate == null || newLineLevel.checkDate == "") {
          err.checkDate = "Check date is required.";
        }
        if(Object.keys(err).length > 0) {
          setNewPatientError(err);
          return;
        }
        const patientLevelPayload = {
          visitId: newPatient.visitId,
          paidAmount: newPatient.paidAmount,
          payerName: newPatient.payerName,
          serviceDate: newPatient.serviceDate,
          claimNumber: newPatient.claimNo,
          checkNumber: newPatient.checkNo,
          patientName: newPatient.patientName,
          checkDate: newPatient.checkDate,
        };
        const response = await axios.post(CORRESPONDENCE_ENDPOINTS.ADD_EOB_PATIENT_LEVEL_DATA, patientLevelPayload);
        if (response.data.statusCode == 200) {
          setMessage(response.data.message);
          fetchPatientData();
          setIsPatientLevelEditMode(false);
        } else {
          setMessage(response.data.message);
          fetchPatientData();
        }
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  }

  const RenderAddPatient = () => {
    return (
      <Stack direction="column" width="100%">
        <Stack className='drawer-field'>
          <Typography fontWeight={700}>
            Visit Id
          </Typography>
          <TextField
            value={newPatient?.id}
            onChange={(e) => handleAddInputChange('visitId', e.target.value)}
          />
        </Stack>
        <Stack className='drawer-field'>
          <Typography>
            Paid Amount
          </Typography>
          <TextField
            value={newPatient?.paidAmount}
            onChange={(e) => handleAddInputChange('paidAmount', e.target.value)}
          />
        </Stack>
        <Stack className='drawer-field'>
          <Typography>
            Payer Name
          </Typography>
          <TextField
            value={newPatient?.payerName}
            onChange={(e) => handleAddInputChange('payerName', e.target.value)}
          />
        </Stack>
        <Stack className='drawer-field'>
          <Typography>
            Service Date
          </Typography>
          <TextField
            type="date"
            value={newPatient?.serviceDate}
            onChange={(e) => handleAddInputChange('serviceDate', e.target.value)}
          />
        </Stack>
        <Stack className='drawer-field'>
          <Typography>
            Claim No
          </Typography>
          <TextField
            value={newPatient?.claimNo}
            onChange={(e) => handleAddInputChange('claimNo', e.target.value)}
          />
        </Stack>
        <Stack className='drawer-field'>
          <Typography>
            Patient Name
          </Typography>
          <TextField
            value={newPatient?.patientName}
            onChange={(e) => handleAddInputChange('patientName', e.target.value)}
          />
        </Stack>
        <Stack className='drawer-field'>
          <Typography>
            Check Date
          </Typography>
          <TextField
            type="date"
            value={newPatient?.checkDate}
            onChange={(e) => handleAddInputChange('checkDate', e.target.value)}
          />
        </Stack>
      </Stack>
    )
  }

  const RenderAddLine = () => {
    return (
      <Stack direction="column" width="100%">
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Service Start Date
            </Typography>
            <TextField
              type="date"
              value={newLineLevel?.lineLevelServiceDate}
              onChange={(e) => handleAddLineInputChange('lineLevelServiceDate', e.target.value)}
            />
          </Stack>
          <Stack className='drawer-field' sx={{ width: "50%" }}>
            <Typography>
              Service End Date
            </Typography>
            <TextField
              type="date"
              value={newLineLevel?.lineLevelServiceEndDate}
              onChange={(e) => handleAddLineInputChange('lineLevelServiceEndDate', e.target.value)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Procedure Code
            </Typography>
            <TextField
              value={newLineLevel?.procedureCode}
              onChange={(e) => handleAddLineInputChange('procedureCode', e.target.value)}
            />
          </Stack>
          <Stack className='drawer-field' sx={{ width: "50%" }}>
            <Typography>
              Billed Amount
            </Typography>
            <TextField
              value={newLineLevel?.billedAmount}
              onChange={(e) => handleAddLineInputChange('billedAmount', e.target.value)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Allowed Amount
            </Typography>
            <TextField
              value={newLineLevel?.allowedAmount}
              onChange={(e) => handleAddLineInputChange('allowedAmount', e.target.value)}
            />
          </Stack>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Covered Amount
            </Typography>
            <TextField
              value={newLineLevel?.coveredAmount}
              onChange={(e) => handleAddLineInputChange('coveredAmount', e.target.value)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Discount Amount
            </Typography>
            <TextField
              value={newLineLevel?.discountAmount}
              onChange={(e) => handleAddLineInputChange('discountAmount', e.target.value)}
            />
          </Stack>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Adjustment Amount
            </Typography>
            <TextField
              value={newLineLevel?.adjustmentAmount}
              onChange={(e) => handleAddLineInputChange('adjustmentAmount', e.target.value)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Co Pay
            </Typography>
            <TextField
              value={newLineLevel?.coPay}
              onChange={(e) => handleAddLineInputChange('coPay', e.target.value)}
            />
          </Stack>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Co Insurance
            </Typography>
            <TextField
              value={newLineLevel?.coInsurance}
              onChange={(e) => handleAddLineInputChange('coInsurance', e.target.value)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Deductible Amount
            </Typography>
            <TextField
              value={newLineLevel?.deductibleAmount}
              onChange={(e) => handleAddLineInputChange('deductibleAmount', e.target.value)}
            />
          </Stack>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Patient Responsibility
            </Typography>
            <TextField
              value={newLineLevel?.patientResponsibility}
              onChange={(e) => handleAddLineInputChange('patientResponsibility', e.target.value)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Denied Amount
            </Typography>
            <TextField
              value={newLineLevel?.deniedAmount}
              onChange={(e) => handleAddLineInputChange('deniedAmount', e.target.value)}
            />
          </Stack>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Reason Codes
            </Typography>
            <TextField
              value={newLineLevel?.reasonCodes}
              onChange={(e) => handleAddLineInputChange('reasonCodes', e.target.value)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Remark Codes
            </Typography>
            <TextField
              value={newLineLevel?.remarkCodes}
              onChange={(e) => handleAddLineInputChange('remarkCodes', e.target.value)}
            />
          </Stack>
          <Stack className='drawer-field' sx={{ width: "50%", mt: "10px !important" }}>
            <Typography>
              Description
            </Typography>
            <TextField
              value={newLineLevel?.description}
              onChange={(e) => handleAddLineInputChange('description', e.target.value)}
            />
          </Stack>
        </Stack>
      </Stack>
    )
  }

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
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <InputLabel id="demo-simple-select-helper-label" style={{ fontWeight: '600', fontSize: '16px' }}>
              Choose Patient
            </InputLabel>
            {statusId == 2 &&
              <AddCircleOutlined sx={{ cursor: 'pointer', color: "#585" }} onClick={() => handleAddDrawer("Add Patient")} />
            }
          </Stack>
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
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px' }}>
              Patient-Level Data
            </Typography>
            {/* {statusId == 2  &&
              <AddCircleOutlined sx={{ cursor: 'pointer', color: "#585" }} onClick={addPatientItem} />
            } */}
          </Stack>
          <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Visit Id</TableCell>
                  <TableCell>Paid Amount</TableCell>
                  <TableCell>Payer Name</TableCell>
                  <TableCell>Service Date</TableCell>
                  <TableCell>Claim No</TableCell>
                  <TableCell>Check No</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Check Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(patientLevelTable) && patientLevelTable.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.id}
                          onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                        />
                      ) : (
                        `${patient.id}`
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
                    {/* <TableCell>{patient.claimNumber}</TableCell> */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.insuranceName}
                          onChange={(e) => handleInputChange(index, 'insuranceName', e.target.value)}
                        />
                      ) : (
                        patient.insuranceName
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          type="date"
                          value={patient.patientLevelServiceDate}
                          onChange={(e) => lineLevelInputChange(index, 'patientLevelServiceDate', e.target.value)}
                        />
                      ) : (
                        `${patient.patientLevelServiceDate || ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.checkNumber}
                          onChange={(e) => handleInputChange(index, 'checkNo', e.target.value)}
                        />
                      ) : (
                        patient.checkNumber
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.claimNumber}
                          onChange={(e) => handleInputChange(index, 'claimNo', e.target.value)}
                        />
                      ) : (
                        patient.claimNumber
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.patientName}
                          onChange={(e) => handleInputChange(index, 'patientName', e.target.value)}
                        />
                      ) : (
                        patient.patientName
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          type="date"
                          value={patient.checkDate}
                          onChange={(e) => lineLevelInputChange(index, 'checkDate', e.target.value)}
                        />
                      ) : (
                        `${patient.checkDate || ""}`
                      )}
                    </TableCell>
                    {index == 0 &&
                      <TableCell sx={{ color: "#e55" }}>
                      </TableCell>
                    }
                    {index > 0 &&
                      <TableCell sx={{ color: "#e55" }}>
                        <MinusCircleFilled onClick={() => removePatientItem(index)} />
                      </TableCell>
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <label style={{ fontWeight: '600', fontSize: '16px' }}>Line-Level Data</label> */}
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px' }}>
              Line-Level Data
            </Typography>
            {statusId == 2 &&
              <AddCircleOutlined sx={{ cursor: 'pointer', color: "#585" }} onClick={() => handleAddDrawer("Add Patient Line Level Data")} />
            }
          </Stack>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Service Start Date</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Service End Date</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Procedure Code</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Billed Amount</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Allowed Amount</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Covered Amount</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Not Covered Amount</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Discount Amount</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Adjustment Amount</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Co-Pay</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Co-Insurance</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Deductible Amount</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Patient Responsibility</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Denied Amount</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Reason Codes</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Remark Codes</TableCell>
                  <TableCell sx={{ width: 200, minWidth: 200 }}>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lineLevelTable?.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          type="date"
                          value={patient.lineLevelServiceDate}
                          onChange={(e) => lineLevelInputChange(index, 'lineLevelServiceDate', e.target.value)}
                        />
                      ) : (
                        `${patient.lineLevelServiceDate || ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          type="date"
                          value={patient.lineLevelServiceEndDate}
                          onChange={(e) => lineLevelInputChange(index, 'lineLevelServiceEndDate', e.target.value)}
                        />
                      ) : (
                        `${patient.lineLevelServiceEndDate || ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.procedureCode}
                          onChange={(e) => lineLevelInputChange(index, 'procedureCode', e.target.value)}
                        />
                      ) : (
                        `${patient.procedureCode || ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.billedAmount}
                          onChange={(e) => lineLevelInputChange(index, 'billedAmount', e.target.value)}
                        />
                      ) : (
                        `${patient.billedAmount ? "$" + patient.billedAmount : ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.allowedAmount}
                          onChange={(e) => lineLevelInputChange(index, 'allowedAmount', e.target.value)}
                        />
                      ) : (
                        `${patient.allowedAmount ? "$" + patient.allowedAmount : ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.coveredAmount}
                          onChange={(e) => lineLevelInputChange(index, 'coveredAmount', e.target.value)}
                        />
                      ) : (
                        `${patient.coveredAmount ? "$" + patient.coveredAmount : ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.notCoveredAmount}
                          onChange={(e) => lineLevelInputChange(index, 'notCoveredAmount', e.target.value)}
                        />
                      ) : (
                        `${patient.notCoveredAmount ? "$" + patient.notCoveredAmount : ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.discountAmount}
                          onChange={(e) => lineLevelInputChange(index, 'discountAmount', e.target.value)}
                        />
                      ) : (
                        `${patient.discountAmount ? "$" + patient.discountAmount : ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.adjustmentAmount}
                          onChange={(e) => lineLevelInputChange(index, 'adjustmentAmount', e.target.value)}
                        />
                      ) : (
                        `${patient.adjustmentAmount ? "$" + patient.adjustmentAmount : ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.coPay}
                          onChange={(e) => lineLevelInputChange(index, 'coPay', e.target.value)}
                        />
                      ) : (
                        `${patient.coPay || ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.coInsurance}
                          onChange={(e) => lineLevelInputChange(index, 'coInsurance', e.target.value)}
                        />
                      ) : (
                        `${patient.coInsurance || ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.deductibleAmount}
                          onChange={(e) => lineLevelInputChange(index, 'deductibleAmount', e.target.value)}
                        />
                      ) : (
                        `${patient.deductibleAmount ? "$" + patient.deductibleAmount : ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.patientResponsibility}
                          onChange={(e) => lineLevelInputChange(index, 'patientResponsibility', e.target.value)}
                        />
                      ) : (
                        `${patient.patientResponsibility || ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.deniedAmount}
                          onChange={(e) => lineLevelInputChange(index, 'deniedAmount', e.target.value)}
                        />
                      ) : (
                        `${patient.deniedAmount ? "$" + patient.deniedAmount : ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.reasonCodes}
                          onChange={(e) => lineLevelInputChange(index, 'reasonCodes', e.target.value)}
                        />
                      ) : (
                        `${patient.reasonCodes || ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.remarkCodes}
                          onChange={(e) => lineLevelInputChange(index, 'remarkCodes', e.target.value)}
                        />
                      ) : (
                        `${patient.remarkCodes || ""}`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={patient.description}
                          onChange={(e) => lineLevelInputChange(index, 'description', e.target.value)}
                        />
                      ) : (
                        `${patient.description || ""}`
                      )}
                    </TableCell>
                    {index == 0 &&
                      <TableCell sx={{ color: "#e55" }}>
                      </TableCell>
                    }
                    {index > 0 &&
                      <TableCell sx={{ color: "#e55" }}>
                        <MinusCircleFilled onClick={() => removeLineItem(index)} />
                      </TableCell>
                    }
                    {/* <TableCell>${patient.chargeAmount}</TableCell> */}
                    {/* <TableCell>
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
                      {/* ${patient.paidAmount} 
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
                    <TableCell>{patient.reasonCodes}</TableCell> */}
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
      <CustomDrawer
        open={drawerType != null}
        onClose={() => setDrawerType(null)}
        anchor="right"
        title={drawerType}
        width={drawerType == "Add Patient" ? 400 : 600}
        content={
          <>
            {drawerType == "Add Patient" &&
              <RenderAddPatient />
            }

            {drawerType == "Add Patient Line Level Data" &&
              <RenderAddLine />
            }


            <Stack direction="row" justifyContent="space-between">
              <AnimateButton type="slide">
                <Button variant="contained" color="success" component="label"
                  onClick={() => drawerType == "Add Patient" ? handleAddPatientSubmit() : handleAddLineLevelSubmit()}
                  sx={{ borderRadius: '40px', marginTop: '20px', padding: '10px 30px', float: 'right' }}>Submit</Button>
              </AnimateButton>
              <AnimateButton type="slide">
                <Button variant="contained" color="error" component="label"
                  onClick={() => setDrawerType(null)}
                  sx={{ borderRadius: '40px', marginTop: '20px', padding: '10px 30px', float: 'right' }}>Back</Button>
              </AnimateButton>
            </Stack>
          </>

        }
      >
      </CustomDrawer>
    </Box>
  );
};