import React, { useState } from 'react';
import {
  Paper,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from '@mui/material';
import { getDateFormat_DD_MM_YYYY } from '../helpers';

import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

export const MedicalReqPetientLevel = ({
  patients,
  patientsData,
  setPatientsData,
  editMode = false,
}) => {
  const [patient, setPatient] = useState(patientsData?.patientName || "");

  const handleSelectedPatient = (e) => {
    const id = e.target.value;
    setPatient(id);
    const _patientData = patientsData.patient_level_data?.filter((patient) => {
      return patient.id === id;
    });
    const _lineData = patientsData.line_level_data?.filter((line) => line.checkPatientLevelDataId === id);
    setPatientLevelTable(_patientData);
    setLineLevelTable(_lineData);
  };

  const handleFieldChange = (field, value) => {
    console.log(value,"inside the onchange");
    setPatientsData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
            defaultValue="select"
            value={patient}
          >
            <MenuItem value={patient} disabled style={{ padding: '4px 6px', fontWeight: '500', color: 'gray' }}>
              {patient}
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
              {/* <Button
                variant="outlined"
                startIcon={<AppRegistrationOutlinedIcon />}
                sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
              >
                Edit Column
              </Button> */}
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
      {patient ? (
        <Box className="doc-table-cont" sx={{ padding: 2 }}>
          <label style={{ fontWeight: '600', fontSize: '16px' }}>Patient-Level Data</label>
          <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Claim Number</TableCell>
                  <TableCell>Service Date</TableCell>
                  <TableCell>Date of Birth</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {editMode ? (
                      <TextField
                        value={patientsData.patientName}
                        onChange={(e) => handleFieldChange('patientName', e.target.value)}
                        fullWidth
                      />
                    ) : (
                      patientsData.patientName
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <TextField
                        value={patientsData.claimNumber}
                        onChange={(e) => handleFieldChange('claimNumber', e.target.value)}
                        fullWidth
                      />
                    ) : (
                      patientsData.claimNumber
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <TextField
                        type="date"
                        value={patientsData.serviceDate}
                        onChange={(e) => handleFieldChange('serviceDate', e.target.value)}
                        fullWidth
                      />
                    ) : (
                      getDateFormat_DD_MM_YYYY(patientsData.serviceDate)
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <TextField
                        type="date"
                        value={patientsData.dateOfBirth}
                        onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
                        fullWidth
                      />
                    ) : (
                      getDateFormat_DD_MM_YYYY(patientsData.dateOfBirth)
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography
          sx={{
            height: '250px',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#656565',
            fontSize: '1rem',
          }}
        >
          Please select a patient from the list to access detailed information!
        </Typography>
      )}
    </Box>
  );
};
