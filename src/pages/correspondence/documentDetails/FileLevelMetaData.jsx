import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box,TextField  } from '@mui/material';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';
import { formatUsNumberSystem, getDateFormat_DD_MM_YYYY } from './../helpers';

const MetaDataRow = ({ label, value, isEditable,updateFileLevelData,keyToEdit,isEditMode }) => (
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
    {isEditable && isEditMode ? (
        <TextField
          type={keyToEdit=="depositDate" ? "date": "text"}
          fullWidth
          value={value || ''}
          onChange={(e) => updateFileLevelData(e.target.value,keyToEdit)}
          size="small"
        />
      ) : (
        <Typography variant="body1">{keyToEdit=="checkAmount" && "$"}{keyToEdit=='depositDate' ? getDateFormat_DD_MM_YYYY(value) : keyToEdit=="checkAmount" ? formatUsNumberSystem(value):value || '--'}</Typography>
      )}
    </Grid>
  </>
);

function formatAmount(numberStr) {
 return numberStr?.toLocaleString('en-US');
}

const FileLevelMetaData = ({ fileLevelData, docName, setFileLevelData,isEditMode }) => {
  const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    if (!fileLevelData || fileLevelData.length === 0) return;

    const data = fileLevelData[0];
    const metadataForEob = [
      { id: 1, label: 'Payer Name', value: data.payerName , isEditable:true, keyToEdit:"payerName" },
      { id: 2, label: 'Deposit Date', value: data.depositDate , isEditable:true, keyToEdit:"depositDate" },
      { id: 3, label: 'Check Number', value: data.checkNumber , isEditable:true, keyToEdit:"checkNumber"  },
      { id: 4, label: 'Check Amount', value: `${formatAmount(data.checkAmount)}` ,isEditable:true, keyToEdit:"checkAmount" },
      { id: 5, label: 'Number of Pages', value: `${data.numOfPages} ${data.numOfPages>1 ? "Pages" : "Page"}`, isEditable:false },
      { id: 6, label: 'Patient Count', value: `Only ${data.patientCount} ${data.patientCount>1? "Patients":"Patient"}`,isEditable:false },
      { id: 7, label: 'Document Age', value: `${data.documentAge} ${data.documentAge>1?"days":"day"} ago`, isEditable:false },
      { id: 8, label: 'Confidence Score', value: data.confidenceScore, isEditable:false},
      { id: 9, label: 'Letter Name', value: data.letterName, isEditable:false }
    ];
    const metadataForMedicalRequest = [
      { id: 1, label: 'Payer Name', value: data.payerName ,isEditable:true, keyToEdit:"payerName"},
      { id: 2, label: 'Deposit Date', value: data.depositDate,isEditable:false },
      { id: 3, label: 'Number of Pages', value: `${data.numberOfPages} ${data.numberOfPages>1 ? "Pages" : "Page"}`,isEditable:false },
      { id: 4, label: 'Document Age', value: `${data.documentAge} ${data.documentAge>1?"days":"day"} ago`,isEditable:false },
      { id: 5, label: 'Confidence Score', value: data.confidenceScore,isEditable:false },
      { id: 6, label: 'Patient Count', value: `Only ${data.patientCount} ${data.patientCount>1? "Patients":"Patient"}`,isEditable:false }
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

  const updateFileLevelData = (value, key) => {
    const fileLevelObj = { ...fileLevelData[0] }; 
  
    if (key === "checkAmount") {
      console.log(value,"inside onchange1");
      if (/^\d*\.?\d*$/.test(value.replace(/,/g, ''))) {
        console.log(value,"inside onchange2");
        console.log(formatUsNumberSystem(value),"inside onchange3");
        fileLevelObj[key] = formatUsNumberSystem(value); 
      } else {
        return; 
      }
    } else {
      fileLevelObj[key] = value; 
    }
  
    setFileLevelData([fileLevelObj]); 
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={1} xs={6}>
        <>
          {metaData.map((item, index) => (
            <MetaDataRow
              key={index}
              label={item.label}
              value={item.value}
              isEditable={item.isEditable}
              updateFileLevelData={updateFileLevelData}
              keyToEdit={item.keyToEdit || ''}
              isEditMode={isEditMode}
            />
          ))}
        </>
      </Grid>
    </Box>
  );
};

export default FileLevelMetaData;