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
  TextField
} from '@mui/material';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

export const PatientLevelData = ({ patients, patientsData,docName,receivedStatus }) => {
  console.log(receivedStatus)
  const [patientLevelTable, setPatientLevelTable] = useState([]);
  const [lineLevelTable, setLineLevelTable] = useState([]);
  const [patient, setPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState([]);
  
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

  useEffect(() => {
    // Check if there are patients and set the first one by default
    if (patients && patients.length > 0) {
      const defaultPatient = patients[0].id;
      setPatient(defaultPatient);
  
      const _patientData = patientsData.patient_level_data?.filter((patient) => patient.id === defaultPatient);
      const _lineData = patientsData.line_level_data?.filter((line) => line.checkPatientLevelDataId === defaultPatient);
  
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

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (index, field, value) => {
    const updatedData = [...editableData];
    updatedData[index][field] = value;
    setEditableData(updatedData);
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
          marginTop: '2'
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
              
              {receivedStatus=="Need Attention" ?(
                <Button
                  variant="outlined"
                  startIcon={<AppRegistrationOutlinedIcon />}
                  sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
                  onClick={handleEditToggle}
                > 

                  {isEditing ? 'Save' : 'Edit Column'}
                  
                </Button>
              ):''}
              {/* <Button
                variant="outlined"
                startIcon={<PermIdentityOutlinedIcon />}
                sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
              >
                Manual Validate
              </Button>
              <Button
                variant="outlined"
                startIcon={<AutoAwesomeOutlinedIcon />}
                sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
              >
                AI Validate
              </Button> */}
            </Box>
          </Box>
        )}
      </Box>

      {/* Table for Patient-Level Data */}
      {patient && (
        <Box className="doc-table-cont" sx={{ padding: 2 }}>
          <label style={{ fontWeight: '600', fontSize: '16px' }}>Patient-Level Data</label>
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
                {patientLevelTable?.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>{patient.patientName}</TableCell>
                    <TableCell>{patient.insuranceName}</TableCell>
                    <TableCell>{patient.claimNumber}</TableCell>
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

          <label style={{ fontWeight: '600', fontSize: '16px' }}>Line-Level Data</label>
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
                    <TableCell>${patient.chargeAmount}</TableCell>
                    <TableCell>${patient.allowedAmount}</TableCell>
                    <TableCell>${patient.paidAmount}</TableCell>
                    <TableCell>${patient.adjustmentAmount}</TableCell>
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
    </Box>
  );
};