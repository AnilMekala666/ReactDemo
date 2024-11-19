import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, TextField, InputAdornment } from '@mui/material';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

const MetaDataRow = ({index, label, value }) => (
  <>
    <Grid item xs={6}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
    </Grid>
    <Grid item xs={1}>
      <Typography variant="body1">:</Typography>
    </Grid>
    <Grid item xs={5}>
      <Typography variant="body1">{value ? value : "--"}</Typography>
    </Grid>
  </>
);

const FileLevelMetaData = ({ fileLevelData, docName, isEditing, setFileLevelData }) => {
  const [metaData, setMetaData] = useState([]);
  const [initialFileData, setInitialFileData] = useState([])

  useEffect(() => {
    if (!fileLevelData || fileLevelData.length === 0) return;
    const data = fileLevelData[0];

    const handleInputChange = (field, value) => {
      const updatedData = [...fileLevelData];
      updatedData[field] = value;
      setFileLevelData(updatedData);
    };
    // const handleCancelEdit = () => {
    //   setFileLevelData(initialPatientLevelData);
    //   setEditableData(initialPatientLevelData);
    //   setIsEditing(false);
    // };

   
    const pagesLabel = data.numOfPages === 1 ? '1 Page' : `${data.numOfPages} Pages`;
    const patientsCount = data.patientCount === 1 ? 'Only 1 Patient' : `${data.patientCount} Patients`;
    const daysCount = data.documentAge === 1 ? '1 day ago' : `${data.documentAge} days ago`
    const metadataForEob = [
      // { id: 1, label: 'Payer Name', value: data.payerName },
      {
        id: 1, label: 'Payer Name', value: isEditing ?
          <TextField
            value={data.payerName}
            onChange={(e) => handleInputChange(index, 'payerName', e.target.value)}
          /> :` ${data.payerName}`
      },
      {
        id: 2, label: 'Deposit Date', value: isEditing ? <TextField
          value={data.depositDate}
          onChange={(e) => handleInputChange(index, 'depositDate', e.target.value)}
        /> :
         ` ${data.depositDate}`
      },
      {
        id: 3, label: 'Check Number', value: isEditing ? <TextField
          value={data.checkNumber}
          onChange={(e) => handleInputChange(index, 'checkNumber', e.target.value)}
        /> :
         ` ${data.checkNumber}`
      },
     
      // { id: 4, label: 'Check Amount', value:  isEditing ? (
      //   <TextField
      //     value={data.checkAmount}
      //     onChange={(e) => handleInputChange(index, 'checkAmount', e.target.value)}
      //     type="number"  // Ensure input is numeric
      //     InputProps={{
      //       startAdornment: <InputAdornment position="start">$</InputAdornment>,  // Add the $ sign before the input value
      //     }}
      //   />
      // ) : (
      //   $${parseFloat(data.checkAmount).toFixed(2).toLocaleString('en-US')}
      // )},
      { id: 4, label: 'Check Amount', value:isEditing ? <TextField
        value={data.checkAmount}
        onChange={(e) => handleInputChange(index, 'checkAmount', e.target.value)}
      /> :
        ` $${parseFloat(data.checkAmount).toFixed(2).toLocaleString('en-US')}` },
      { id: 5, label: 'Number of Pages', value: pagesLabel },
      { id: 6, label: 'Patient Count', value: patientsCount },
      { id: 7, label: 'Document Age', value: daysCount },
      { id: 8, label: 'Confidence Score', value: data.confidenceScore },
      { id: 9, label: 'Letter Name', value: data.letterName }
    ];
    const metadataForMedicalRequest = [
      // { id: 1, label: 'Payer Name', value: data.payerName },
      { id: 1, label: 'Payer Name', value: data.payerName },
      { id: 2, label: 'Deposit Date', value: data.depositDate },
      { id: 3, label: 'Number of Pages', value: `${data.numberOfPages} Pages `},
      { id: 4, label: 'Document Age', value: `${data.documentAge} days ago` },
      { id: 5, label: 'Confidence Score', value: data.confidenceScore },
      { id: 6, label: 'Patient Count', value: `Only ${data.patientCount} Patients` }
    ];
    // {isEditing ? (
    //   <TextField
    //     value={patient.claimNumber}
    //     onChange={(e) => handleInputChange(index, 'claimNumber', e.target.value)}
    //   />
    // ) : (
    //   `  ${patient.claimNumber}`
    // )}

    const selectedMetadata = docName === 'EOB' ? metadataForEob : metadataForMedicalRequest;
    const filteredMetadata = selectedMetadata.filter(item => item.value !== null && item.value !== undefined);

    setMetaData(filteredMetadata);
  }, [docName, fileLevelData]);

  if (!fileLevelData || fileLevelData.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px'
        }}
      >
        <CircularWithPath />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={1} xs={6}>
        <>
          {metaData.map((item, index) => (
            <MetaDataRow key={index} label={item.label} value={item.value} />
          ))}

        </>
      </Grid>
    </Box>
  );
};

export default FileLevelMetaData;