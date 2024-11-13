import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box,TextField  } from '@mui/material';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

const MetaDataRow = ({ label, value }) => (
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

const FileLevelMetaData = ({ fileLevelData, docName }) => {
  const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    if (!fileLevelData || fileLevelData.length === 0) return;

    const data = fileLevelData[0];
    const metadataForEob = [
      { id: 1, label: 'Payer Name', value: data.payerName },
      { id: 2, label: 'Deposit Date', value: data.depositDate },
      { id: 3, label: 'Check Number', value: data.checkNumber },
      { id: 4, label: 'Check Amount', value: `$${parseFloat(data.checkAmount).toFixed(2).toLocaleString('en-US')}` },
      { id: 5, label: 'Number of Pages', value: `${data.numOfPages} Pages` },
      { id: 6, label: 'Patient Count', value: `Only ${data.patientCount} Patients` },
      { id: 7, label: 'Document Age', value: `${data.documentAge} days ago` },
      { id: 8, label: 'Confidence Score', value: data.confidenceScore},
      { id: 9, label: 'Letter Name', value: data.letterName }
    ];
    const metadataForMedicalRequest = [
      { id: 1, label: 'Payer Name', value: data.payerName },
      { id: 2, label: 'Deposit Date', value: data.depositDate },
      { id: 3, label: 'Number of Pages', value: `${data.numberOfPages} Pages` },
      { id: 4, label: 'Document Age', value: `${data.documentAge} days ago` },
      { id: 5, label: 'Confidence Score', value: data.confidenceScore },
      { id: 6, label: 'Patient Count', value: `Only ${data.patientCount} Patients` }
    ];

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
